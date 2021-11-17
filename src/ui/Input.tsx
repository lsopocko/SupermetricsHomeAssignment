import styled from "styled-components";

const input = styled.input`
    padding: 5px;
    font-size: 12px;
    border: none;
    border-bottom: 1px solid #87c0ff;

    &:focus {
        outline: none;
        border-bottom: 1px solid #4991e6;
    }
`

export default input;