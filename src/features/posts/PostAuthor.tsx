import styled from "styled-components";

export interface PostAuthorModel {
    name: string;
    id: string;
    numberOfPosts: number;
}

interface PostAuthorProps {
    className?: string;
    author: PostAuthorModel;
}

function PostAuthor({className, author}: PostAuthorProps) {
    return (
        <span className={className}>{author.name} ({author.numberOfPosts})</span>
    )
}

const styledPostAuthor = styled(PostAuthor)`
    color: #414849;
    text-decoration: none;
    padding: 3px;
    display: block;
    background: rgba(135,192,255,0.3);
`;

export default styledPostAuthor;