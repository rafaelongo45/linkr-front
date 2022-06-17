import styled from "styled-components";
import { useNavigate } from "react-router";
import {IoPersonCircle} from 'react-icons/io5';

function SearchResults({user, setClick, setSearchString}){
  console.log(user)
  const navigate = useNavigate()

  return (
      <Result onClick={
        () => { 
          navigate(`/user/${user.id}`, {state: {userId: user.id}}); 
          setClick(false); 
          setSearchString('')} }>

        {
          user.photoLink === null ?
          <div>
            <IoPersonCircle />
          </div>
          :
          <img src={user.photoLink}/>
        }
        
        <p>{user.name}</p>
      </Result>
  )
};

export default SearchResults;

const Result = styled.section`
  width: 100%;
  height: 60px;
  display:flex;
  align-items: center;
  margin: 10px 0;

  :hover{
    cursor: pointer;
    background-color: rgba(169,169,169, 0.1);
  }

  div>svg{
    border-radius: 50%;
    width: 45px;
    height: 45px;
    padding-left: 15px;
    position: initial;
  }

  img{
    border-radius: 50%;
    width: 45px;
    height: 45px;
    padding-left: 15px;
  }

  p{
    margin-left: 15px;
  }
`