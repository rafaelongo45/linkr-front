import axios from "axios";
import { AiOutlineComment } from "react-icons/ai"
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import UrlContext from "../Contexts/UrlContext.js";

function CommentsIcon({ posts, setCommentClick, commentClick}){
  const BASE_URL = useContext(UrlContext);
  const postId = posts.id
  const [comments, setComments] = useState()
  const [reload, setReload] = useState()

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const promise = axios.get(`${BASE_URL}comments/count/${postId}`, config);

    promise.then(response => {
      setComments(response.data[0].count)
      setReload(false)
    });
    promise.catch(err => console.log(err));
  }, [reload]);

  return (
    <Comments>
        <b onClick={() => {
          setCommentClick(!commentClick)
          setReload(true) 
        }}> <AiOutlineComment /> </b>
      <p>
        {comments} comments
      </p>
    </Comments>
  )
}

export default CommentsIcon;

const Comments = styled.article`
  color: #fff;
  display: flex;
  flex-wrap:wrap;
  flex-direction: column;
  text-align:center;
  justify-content:center;

  b svg{
    color: #fff;

    :hover{
      cursor: pointer;
  }
  }
`