import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import styled from "styled-components";
import { register } from "../features/user/userSlice";
import { RootState } from "../store";
import { Popup, Button, Input } from "../ui";
import validateEmail from "../validators/emailValidator";

interface LoginProps {
    className?: string;
}

function Login({className}: LoginProps) {
    const { isAuthenticated } = useSelector((state: RootState) => state.user);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isFormInvalid, setIsFormInvalid] = useState(false);
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/posts" } };

    const dispatch = useDispatch();

    const handleSubmit = useCallback((event: MouseEvent) => {
        event.preventDefault();

        if (email && name && validateEmail(email)) {
            dispatch(register({email, name}));
        } else {
            setIsFormInvalid(true);
        }
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
                { isFormInvalid && <p className="error">Enter valid e-mail and name</p> }
                <form>
                    <fieldset>
                        <Input value={name} placeholder="Name" type="text" onChange={handleNameChange} required/>
                    </fieldset>
                    <fieldset>
                        <Input value={email} placeholder="E-mail" type="email" onChange={handleEmailChange} required/>
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

    .error {
        font-size: 12px;
        color: rgba(223,78,69,1.0);
    }

    ${Input} {
        width: 200px;
    }
`;

export default styledLogin;