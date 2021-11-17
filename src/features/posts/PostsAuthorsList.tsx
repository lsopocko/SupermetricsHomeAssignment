import styled from "styled-components";
import PostAuthor, { PostAuthorModel } from "./PostAuthor";
import { Input } from "../../ui";
import { NavLink } from "react-router-dom";

interface PostsAuthorsListProps {
    className?: string;
    authors: PostAuthorModel[];
}

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: #414849;

    &.active,
    &:hover {
        text-decoration: underline;
    }
`;

function PostsAuthorsList({className, authors}: PostsAuthorsListProps) {
    return (
        <div className={className}>
            <form action="">
                <Input type="text" placeholder="Search" />
            </form>
            <div className="authors-list">
                {
                    authors.map((author) => 
                        <StyledNavLink key={author.id} to={`/posts/${author.id}`}>
                            <PostAuthor author={author}></PostAuthor>
                        </StyledNavLink>
                    )
                }
            </div>
        </div>
    )
}

const StyledPostsAuthorsList = styled(PostsAuthorsList)`
    .authors-list {
        padding-top: 20px;

        ${PostAuthor} {
            margin-bottom: 5px;
        }
    }
`;

export default StyledPostsAuthorsList;