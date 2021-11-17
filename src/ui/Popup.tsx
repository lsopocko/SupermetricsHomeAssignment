import styled from "styled-components"

interface PopupProps {
    className?: string;
    children: JSX.Element;
}

function Popup({className, children}: PopupProps): JSX.Element {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

const styledPopup = styled(Popup)`
    position: fixed;
    top: 50%;
    left: 50%;
    background: #ffffff;
    padding: 20px;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    box-shadow: 0px 0px 12px 0px rgba(115, 125, 129, 0.59);
`;

export default styledPopup;