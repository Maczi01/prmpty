'use client';
import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }: any) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((post: any, index: number) => (
                <PromptCard
                    key={index}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    );
}

const Feed = () => {
    const [searchText, setSearchText] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSeatchTextChange = (e: any) => {
        setSearchText(e.target.value);
    }
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/prompt');
                const data = await res.json();
                setPosts(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPosts().then(r => console.log(r));
    }, [searchText]);

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList
                data={posts}
                handleTagClick={handleSeatchTextChange}
            />
        </section>

    )
        ;
};

export default Feed
