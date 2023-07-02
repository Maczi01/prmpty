'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import { Prompt } from '@types';

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setMyPosts(data);
    };
    if (session?.user?.id) fetchPosts().catch(e => console.log(e))
  }, [session?.user?.id]);

  const handleEdit = (post: Prompt) => {
    console.log({ post });
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Prompt) => {
    const hasConfirmed = confirm(
      'Are you sure you want to delete this prompt?'
    );
    if (!hasConfirmed) return;
    try {
      await fetch(`/api/prompt/${post._id.toString()}`, {
        method: 'DELETE',
      });
      const filteredPosts = myPosts.filter((p: Prompt) => p._id !== post._id);
      setMyPosts(filteredPosts);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page.
      Share your exceptional prompts and inspire others with the power of your imagination"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
