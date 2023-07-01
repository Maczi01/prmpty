import PromptCard from '@components/PromptCard';

const PromptCardList = ({ data, handleTagClick }: any) => (
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

export default PromptCardList;
