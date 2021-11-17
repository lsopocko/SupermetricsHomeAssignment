import styled from "styled-components";

export default styled.span`
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 3px solid rgba(135,192,255,1.0);
    border-radius: 50%;
    border-top-color: rgba(73,145,230,1.0);
    animation: spin 1s ease-in-out infinite;

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`