export interface IParams {
  id?: string;
}

export interface Creator {
  _id: string;
  email: string;
  username: string;
  __v: number;
  image: string;
}

export interface Prompt {
  _id: string;
  creator: Creator;
  prompt: string;
  tag: string;
  __v: number;
}
