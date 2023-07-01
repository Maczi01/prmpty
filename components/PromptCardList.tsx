import PromptCard from '@components/PromptCard';
import { Prompt } from '@types';
import { ChangeEvent } from 'react';

interface PromptCardListProps {
  data: Prompt[];
  handleTagClick: (post: string) => void;
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => (
  <div className="mt-16 prompt_layout">
    {data.map((post: Prompt, index: number) => (
      <PromptCard key={index} post={post} handleTagClick={handleTagClick} />
    ))}
  </div>
);

export default PromptCardList;
