import styled from "styled-components";

export interface PostModel {
    createdTime: number;
    message: string;
    id: string;
    fromId: string;
    fromName: string;
}

interface PostProps {
    className?: string;
    post: PostModel;
}

const formatDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format;


function Post({className, post}: PostProps) {
    return (
        <div className={className}>
            <time>{formatDate(post.createdTime)}</time>
            <main>
                <p>{post.message}</p>
            </main>
        </div>
    )
}

const styledPost = styled(Post)`
    padding: 10px;
    background: #fff;

    time {
        font-size: 11px;
        margin-bottom: 10px;
        display: block;
        color: #737d81;
    }

    p {
        font-size: 14px;
        line-height: 18px;
        margin-bottom: 5px;
        margin-top: 0;
    }
`;

export default styledPost;