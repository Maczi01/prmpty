import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import type { NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
    try {
        await connectToDB();
        const url = new URL(request.url);
        const searchText = url.searchParams.get('searchText');
        const prompts = await Prompt.find({
            $or: [
                { prompt: { $regex: searchText, $options: 'i' } },
                { tag: { $regex: searchText, $options: 'i' } }
            ]
        }).populate('creator');
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log('error', error);
        return new Response('Failed to fail', { status: 500 });
    }
}
