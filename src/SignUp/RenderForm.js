import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import UrlContext from "../Contexts/UrlContext";

function RenderForm(){
  const navigate = useNavigate();
  const [userData, setUserData] = useState({name: '', email: '', password: '', photoLink: ''});
  const [buttonState, setButtonState] = useState(false);
  const BASE_URL = useContext(UrlContext);

  function isImage() {
    const image = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(userData.photoLink);
    return image
  }

  function sendData(e){
    e.preventDefault();
    setButtonState(true);

    if(!isImage()){
      alert('Please insert a valid link for the image!');
      return window.location.reload();
    }

    console.log('passei')

    const URL = BASE_URL + 'signup';
    const promise = axios.post(URL, userData);

    promise.then(() => {
      navigate('/');
    });

    promise.catch(err => {
      alert(err.response.data);
      console.log(err);
    });

  };
  
  return (
    <>
      <Form onSubmit={sendData}>
        <input type ='text' placeholder="e-mail" required value={userData.email} onChange={e => setUserData({...userData, email: e.target.value})}></input>
        <input type ='password' placeholder="password" required value={userData.password} onChange={e => setUserData({...userData, password: e.target.value})}></input>
        <input type ='text' placeholder="username" required value={userData.name} onChange={e => setUserData({...userData, name: e.target.value})}></input>
        <input type ='text' placeholder="picture url" value={userData.photoLink} onChange={e => setUserData({...userData, photoLink: e.target.value})}></input>
        <button type="submit" disabled = {buttonState}>Sign Up</button>
      </Form>
      <Button onClick={() => navigate('/')}>Switch back to log in</Button>
    </>

  )
  
}

export default RenderForm;

const Form = styled.form`
  width: 90%;
  display:flex;
  flex-direction:column;
  font-family: var(--input-font);

  input{
    height: 60px;
    margin-bottom: 10px;
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
    height: 60px;
    border:none;
    border-radius: 6px;
    background-color: rgba(24, 119, 242, 1);
    color: #fff;
    font-size: 22px;
    font-weight: 700;  
    font-family: var(--input-font);

    :hover{
      cursor:pointer;
    }
  }

  @media(max-width: 460px){
    margin-top: 50px;
  }
  
`

const Button =styled.button`
  margin-top: 20px;
  font-family: var(--link-font);
  font-weight: 400;
  font-size: 16px;
  border:none;
  background-color:transparent;
  color:white;
  text-decoration:underline;

  :hover{
    cursor:pointer;
  }
`