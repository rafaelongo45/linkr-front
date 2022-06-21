import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import UrlContext from "../Contexts/UrlContext";

function RenderUserPage(){
  const location = useLocation();
  const [user, setUser] = useState([]);
  const token = localStorage.getItem("token");
  const BASE_URL = useContext(UrlContext);

  useEffect(() => {
    const URL = BASE_URL + `user/${location.state.userId}`;
    const promise = axios.get(URL, {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    });

    promise.then(response => setUser(response.data));

    promise.catch(err => console.log(err));

  }, [location.state.userId]);

  return(
     <Main>
      <Posts>
        <h1>{user.name} posts </h1>
        <Post>  </Post>
      </Posts>  
    </Main>
  )
}

export default RenderUserPage;


const Main = styled.main`
  margin-top: 60px;
  width: 100%;
  min-height:calc(100% - 60px);
  height: fit-content;
  background-color: var(--background-color-header);
  position:absolute;
  top:0;
  bottom: 0;
  left:0;
  display:flex;
`;

const Posts = styled.section`
  margin: 60px 0 0 15%; 
  width: 40%;
  height: fit-content;

  h1{
    color: #fff;
    font-weight: 700;
    font-family: var(--input-font);
    font-size: 38px;
    margin-bottom: 40px;
  }
`;

const Trending = styled.section`
  height: 400px;
  width: 250px;
  background-color:var(--background-color);
  margin: 138px 0 0 30px;
  border-radius: 14px;

  h1{
    color: #fff;
    font-family: var(--input-font);
    font-size: 28px;
    font-weight: 700;
    margin: 20px 15px;
  }

  div{
    width: 100%;
    height: 2px;
    background-color:var(--background-color-header);
  }
`;

const Post = styled.section`
  height: 270px;
  width: 100%;
  background-color: green;
  margin-bottom: 20px;
  border-radius: 14px;
`

const Hashtags = styled.section`
  height: 80%;
  width: 90%;
  margin: 15px auto ;
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
`