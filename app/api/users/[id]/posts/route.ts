import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';
import { IParams } from '@types';

export const GET = async (
  request: Request,
  { params }: { params: IParams }
) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ creator: params.id }).populate(
      'creator'
    );

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompts created by user', {
      status: 500,
    });
  }
};
