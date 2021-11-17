import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../features/posts/postsSlice";
import { RootState } from "../store";
import { PostModel } from "../features/posts/Post";
import { PostAuthorModel } from "../features/posts/PostAuthor";
import { PostsAuthorsList, PostsList } from "../features/posts";
import { Spinner } from "../ui";

interface PostsProps {
    className?: string;
}

function Posts({className}: PostsProps) {
    const dispatch = useDispatch();
    const loadingStatus = useSelector((state: RootState) => state.posts.status);
    const posts: PostModel[] = useSelector((state: RootState) => state.posts.items);
    const authors: PostAuthorModel[] = useSelector((state: RootState) => state.posts.authors);
    const token: string = useSelector((state: RootState) => state.user.slToken);

    useEffect(() => {
        if (loadingStatus === "idle") {
            dispatch(fetchPosts({ page: 1, token }));
        }
    }, [dispatch, loadingStatus, token]);


    return (
        <div className={className}>
            {
                loadingStatus !== "succeeded" ? 
                <Spinner role="spinner" /> :
                <>
                    <PostsAuthorsList authors={authors}></PostsAuthorsList>
                    <PostsList posts={posts}></PostsList>
                </>
            }
            
        </div>
    );
}

const styledPosts = styled(Posts)`
    display: flex;
    padding: 5px;

    ${PostsAuthorsList} {
        width: 200px;
        flex: 0 0 200px;
        margin-right: 10px;
    }

    ${PostsList} {
        flex-grow: 1;
    }

    ${Spinner} {
        position: fixed;
        top: 50%;
        left: 50%;
    }
`;

export default styledPosts;