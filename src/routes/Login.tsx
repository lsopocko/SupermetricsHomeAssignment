import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import styled from "styled-components";
import { register } from "../features/user/userSlice";
import { RootState } from "../store";
import { Popup, Button, Input } from "../ui";

interface LoginProps {
    className?: string;
}

function Login({className}: LoginProps) {
    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/posts" } };

    const dispatch = useDispatch();

    const handleSubmit = useCallback((event: MouseEvent) => {
        event.preventDefault();
        dispatch(register({email, name}));
    }, [dispatch, email, name])

    const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }, []);

    const handleEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }, []);

    return (
        isAuthenticated ? 
        <Navigate to={from} /> :
        <Popup className={className}>
            <>
                <h1>Login</h1>
                <form>
                    <fieldset>
                        <Input value={name} placeholder="Name" type="text" onChange={handleNameChange} />
                    </fieldset>
                    <fieldset>
                        <Input value={email} placeholder="E-mail" type="text" onChange={handleEmailChange}/>
                    </fieldset>
                    <Button role="submitButton" onClick={handleSubmit}>Go</Button>
                </form>
            </>
        </Popup>
    );
}

const styledLogin = styled(Login)`
    h1 {
        padding-bottom: 5px;
        margin-bottom: 15px;
        color: #ff8683;
        font-weight: 600;
    }

    label {
        display: block;
        margin-bottom: 10px;
    }

    fieldset {
        padding: 0;
        border: none;
        margin: 0;
        margin-bottom: 10px;
    }

    ${Input} {
        width: 200px;
    }
`;

export default styledLogin;