import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: '694861587703-iqj0vp6io0rrdhrkcb0798kka98bpkum.apps.googleusercontent.com',
            clientSecret: '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',
        })
    ],
    callbacks: {
        async session({ session }) {
            // store the user id from MongoDB to session
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const sessionUser = await User.findOne({ email: session?.user.email });
            // store the user id from MongoDB to session
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            session.user.id = sessionUser._id.toString();

            return session;
        },
        signIn: async function ({ account, profile, user, credentials }) {
            try {
                await connectToDB();

                const userExists = await User.findOne({ email: profile?.email });

                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(' ', '').toLowerCase(),
                        image: profile?.image,
                    });
                }
                return true
            } catch (error) {
                console.log('Error checking if user exists: ', error);
                return false
            }
        },
    }
})

export { handler as GET, handler as POST }
