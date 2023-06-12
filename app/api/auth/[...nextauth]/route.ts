import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        session: async function ({session}) {
            // store the user id from MongoDB to session
            const sessionUser = await User.findOne({email: session?.user?.email});
            // @ts-ignore
            session && session.user ? session.user.id : undefined = sessionUser._id.toString();

            return session;
        },
        signIn: async function ({account, profile, user, credentials}) {
            try {
                await connectToDB();

                // check if user already exists
                const userExists = await User.findOne({email: profile?.email});

                // if not, create a new document and save user in MongoDB
                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "").toLowerCase(),
                        image: profile?.image,
                    });
                }

                return true
            } catch (error) {
                console.log("Error checking if user exists: ", error);
                return false
            }
        },
    }
})

export { handler as GET, handler as POST }
