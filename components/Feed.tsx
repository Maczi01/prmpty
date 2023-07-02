'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import PromptCardList from '@components/PromptCardList';

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  console.log({ searchText });
  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/prompt?searchText=${searchText}`);
        const data = await res.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [searchText]);

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchTextChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
