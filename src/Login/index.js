import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import UserContext from "../Contexts/UserContext.js";

export default function Login() {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = useContext(UserContext);
    const [userData, setUserData] = useState({ email: "", password: "" });
    const [buttonState, setButtonState] = useState(false);

    function sendData(e) {
        e.preventDefault();
        setButtonState(true);

        const URL = "http://localhost:4000/signin";
        const loginReq = axios.post(URL, userData);

        loginReq.then(res => {
            const { token, image, userId } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", userId);
            setUserInfo({...userInfo, profileImage: image, userId});
            navigate('/timeline');
        });
        loginReq.catch(err => {
            if(err.response.status === 404) alert("Usuário não cadastrado no sistema!");
            if(err.response.status === 401) alert("Senha incorreta!");
            setButtonState(false);
            console.log(err);
        });
    }

    return (
        <Main>
            <LogoSection>
                <Logo>
                    <h1>linkr</h1>
                    <h2>save, share and discover the best links on the web</h2>
                </Logo>
            </LogoSection>
            <FormSection>
                <Form onSubmit={sendData}>
                    <input type='text' placeholder="e-mail" required value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })}></input>
                    <input type='password' placeholder="password" required value={userData.password} onChange={e => setUserData({ ...userData, password: e.target.value })}></input>
                    <button type="submit" disabled={buttonState}>Log In</button>
                </Form>
                <Button onClick={() => navigate('/signup')}>First time? Create an account!</Button>
            </FormSection>
        </Main>
    );
}

const Main = styled.main`
    height:100%;
    width:100%;
    background-color: var(--background-color);
    display:flex;

    @media(max-width: 460px) {
        flex-direction: column;
    }
`

const LogoSection = styled.section`
    font-family: var(--logo-font);
    font-weight:700;
    color:#fff;
    position:relative;
    width: 60%;
    height: 100%;

    @media(max-width: 460px) {
        width: 100%;
        height: 30%;
        position: static;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const Logo = styled.div`
    width: 300px;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    position: absolute;
    top: 29%;
    left: 20%;

    h1{
        font-size: 100px;
    }

    h2{
        font-size: 28px;
        width: 300px;
        font-family:var(--input-font);
    }

    @media(max-width: 460px) {
        width: 230px;
        height: 110px;
        position: static;
        align-items: center;
        justify-content: center;

        h1 {
            font-size: 68px;
            line-height: 58px;
            padding: 0px;
        }

        h2 {
            font-size: 20px;
            line-height: 28px;
            width: 220px;
            font-family:var(--input-font);
            text-align: center;
        }
    }
`;

const FormSection = styled.section`
    position:relative;
    right: 0;
    width:40%;
    height: 100%;
    background-color:var(--background-color-header);
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;

    @media(max-width: 460px) {
        width: 100%;
        height: 70%;
        position: static;
        justify-content:flex-start;
    }
`

const Form = styled.form`
    width: 80%;
    display:flex;
    flex-direction:column;
    font-family: var(--input-font);

    input{
        height: 50px;
        margin-bottom: 20px;
        border:none;
        border-radius: 6px;
        padding-left: 10px;
        font-weight: 700;
    }
    
    input::placeholder{
        font-size: 22px;
        color: rgba(159, 159, 159, 1);
    }

    button{
        height: 50px;
        border:none;
        border-radius: 6px;
        background-color: rgba(24, 119, 242, 1);
        color: #fff;
        font-size: 22px;
        font-weight: 700;  
    }

    @media(max-width: 460px) {
        width: 92%;
        position: static;
        margin-top: 40px;

        input {
            margin-bottom: 11px;
        }
    }
`

const Button = styled.button`
    margin-top: 20px;
    font-family: var(--link-font);
    font-weight: 400;
    font-size: 16px;
    text-decoration: underline;
    border:none;
    background-color:transparent;
    color:white;

    @media(max-width: 460px) {
        margin-top: 21px;
    }
`