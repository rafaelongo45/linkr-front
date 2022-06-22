import axios from "axios";
import styled from "styled-components";
import { IoPaperPlaneOutline, IoPersonCircle } from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import UrlContext from "../Contexts/UrlContext";
import RenderComments from "./RenderComments";

function CommentsContainer({ posts }){
  const BASE_URL = useContext(UrlContext);
  const [comments, setComments] = useState([]);
  const userPhoto = localStorage.getItem('userImage');

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    };

    URL = BASE_URL + `comments/${posts.id}`;

    const promise = axios.get(URL, config);

    promise.then(response => setComments(response.data));
    promise.catch(e => console.log(e));
  }, []);

  return (
    <Container>
      {
        comments.length === 0 ?
        ''
        :
        comments.map(comment => {
          return <RenderComments comment = {comment} posts = {posts}/>
        })
      }
      
      <Form>
        {
          userPhoto ?
          <img src = {userPhoto} />
          :
          <b><IoPersonCircle /> </b>
        }
        <input placeholder="write a comment..."></input>
        <button type="submit"> < IoPaperPlaneOutline /></button>
      </Form>
    </Container>
  )
}

export default CommentsContainer;

const Container = styled.article`
  background-color: #1E1E1E;
  width: 651px;
  min-height: 100px;
  position:relative;
  top: -35px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  margin-bottom: 10px;
`

const Form = styled.form`
  position: absolute;
  bottom:0;
  left: 0;
  width: 95%;
  padding: 0 18px 18px 18px;
  display:flex;
  align-items:center;

  input{
    height: 36px; 
    border: none;
    width: 100%;
    border-radius: 6px;
    padding-left: 15px;
    background-color: #333333;
    font-family: 'Lato';
    font-size: 14px;
  }

  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
  }

  b svg{
    color: white;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  button{
    position:absolute;
    right: 25px;
    bottom: 26px;
    border:none;
    display:flex;
    color: #fff;
    font-size: 18px;
    background:none;
  }
`