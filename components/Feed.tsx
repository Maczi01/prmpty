'use client';
import { useState, useEffect } from 'react';
import PromptCardList from '@components/PromptCardList';

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
        void fetchPosts().then(r => console.log(r));
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
