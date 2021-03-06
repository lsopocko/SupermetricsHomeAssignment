import styled from "styled-components";
import PostAuthor, { PostAuthorModel } from "./PostAuthor";
import { Input } from "../../ui";
import { NavLink } from "react-router-dom";
import { ChangeEvent, useCallback, useState } from "react";

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
    const [query, setQuery] = useState("");

    const handleQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }, []);

    let displayedAuthors = [...authors];

    if (query) {
        displayedAuthors = displayedAuthors.filter((author) => {
            return author.name.indexOf(query) !== -1;
        });
    }

    return (
        <div className={className}>
            <form action="">
                <Input type="text" value={query} placeholder="Search" onChange={handleQueryChange}/>
            </form>
            <div className="authors-list">
                {
                    displayedAuthors.map((author) => 
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