import styled from "styled-components";
import Post, { PostModel } from "./Post";
import { Button, Input } from "../../ui";
import { ChangeEvent, useCallback, useState } from "react";
import { useParams } from "react-router";

interface PostsListProps {
    className?: string;
    posts: PostModel[];
}

enum Order {
    ASC,
    DESC
}

export function PostsList({className, posts}: PostsListProps) {
    const [order, setOrder] = useState(Order.DESC);
    const [query, setQuery] = useState("");
    const { authorId } = useParams();

    const setOrderToAsc = useCallback(() => {
        setOrder(Order.ASC);
    }, []);

    const setOrderToDesc = useCallback(() => {
        setOrder(Order.DESC);
    }, []);

    const handleQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }, []);

    let displayedPosts = [...posts];

    if (query) {
        displayedPosts = displayedPosts.filter((post) => {
            return post.message.indexOf(query) !== -1;
        });
    }

    if (authorId) {
        displayedPosts = displayedPosts.filter((post) => {
            return post.fromId === authorId;
        });
    }
    
    displayedPosts.sort((postA, postB) => {
        if (order === Order.ASC) {
            return postA.createdTime - postB.createdTime;
        } else {
            return postB.createdTime - postA.createdTime;
        }
    })

    return (
        <div className={className}>
            <nav>
                <span>
                Order 
                    <Button onClick={setOrderToDesc} title="From newest" className={`${order === Order.DESC && "is-active"}`}>&darr;</Button>
                    <Button onClick={setOrderToAsc} title="From oldest" className={`${order === Order.ASC && "is-active"}`}>&uarr;</Button>
                </span>
                <Input type="text" value={query} placeholder="Search" onChange={handleQueryChange}/>
            </nav>
            <div className="posts-list">
                {
                    displayedPosts.map((post) => 
                        <Post key={post.id} post={post}/>
                    )
                }
            </div>
        </div>
    )
}

const StyledPostsList = styled(PostsList)`
    nav {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .posts-list {
        padding-top: 20px;
        width: 100%;
    }

    ${Post} {
        margin-bottom: 10px;
    }

    ${Button} {
        opacity: 0.7;

        &.is-active {
            opacity: 1;
        }
        
        &:first-of-type {
            margin-left: 5px;
        }
    }
`;

export default StyledPostsList;