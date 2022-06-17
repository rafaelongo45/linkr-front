import styled from "styled-components";
import { useContext, useState } from "react";
import {IoPersonCircle} from 'react-icons/io5';
import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io';

import SearchBar from "./SearchBar.js";
import RenderDropdown from "./RenderDropdown.js";
import UserContext from "../Contexts/UserContext.js";

function RenderHeader(){
  const {userInfo} = useContext(UserContext);
  const [click, setClick] = useState(false);

  return (
    <Header>
      <Logo>
        <h1>linkr</h1>
      </Logo>

      <SearchBar /> 

      <User onClick = {() => setClick(click ? false : true)}>
        {
          click ?
          <>
            <IoIosArrowUp />
            <RenderDropdown />
          </>
          :
          <IoIosArrowDown />
        }
        {
          userInfo.profileImage !== '' ? 
          <img src = {userInfo.profileImage} alt = 'User profile'/>
          :
          <div>
            <IoPersonCircle />
          </div>
        }
      </User>
    </Header>
  )
};
export default RenderHeader;

const Header = styled.header`
  top: 0;
  z-index: 1;
  width: 100%;
  height: 60px;
  position: fixed;
  background-color: var(--background-color);
  display:flex;
  align-items:center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-family: var(--logo-font);
  font-size: 40px;
  font-weight: 700;
  color:white;
  margin-left: 25px;
`;

const User = styled.section`
  font-size: 26px;
  color: #fff;
  margin-right: 30px;
  display: flex;
  align-items:center;

  :hover{
    cursor: pointer;
  }

  div{
    font-size: 45px;
    color: #fff;
    display:flex;
    align-items:center;
    margin-left: 5px;
  }

  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 5px;
  }
`

