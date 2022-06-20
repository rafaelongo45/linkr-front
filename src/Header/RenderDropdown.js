import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import UserContext from "../Contexts/UserContext.js";

function RenderDropdown(){
  const {setUserInfo} = useContext(UserContext);
  const navigate = useNavigate();

  function logOut(){
    localStorage.clear();
    setUserInfo({name: '', profileImage: ''});
    navigate('/');
  }

  return (
    <>
      <Background>
      </Background>

      <Dropdown>
        <p onClick={logOut}>Logout</p>
      </Dropdown>
    </>
  )
}

export default RenderDropdown;

const Background = styled.section`
  position:absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100vh;
  z-index: 1;
  margin: 0;

  :hover{
    cursor: default;
  }
`

const Dropdown = styled.section`
  position: absolute;
  height: 50px;
  width: 125px;
  background-color: #171717;
  bottom: -45px;
  right: 0;
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:2;
  border-bottom-left-radius: 20px;

  :hover{
    cursor: default;
  }

  p{
    font-family:var(--link-font);
    font-weight: 700;
    font-size: 16px;

    :hover{
      cursor: pointer;
    }
  }
`