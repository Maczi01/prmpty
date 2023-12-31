'use client';

import PromptCard from '@components/PromptCard';
import { Prompt } from '@types';

interface ProfileProps {
  name: string;
  desc: string;
  data: Prompt[];
  handleEdit?: (post: Prompt) => void;
  handleDelete?: (post: Prompt) => void;
}

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data?.map((post: Prompt) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit?.(post)}
            handleDelete={() => handleDelete?.(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
