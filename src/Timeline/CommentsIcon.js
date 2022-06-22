import axios from "axios";
import { AiOutlineComment } from "react-icons/ai"
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import UrlContext from "../Contexts/UrlContext.js";

function CommentsIcon({ posts, setCommentClick, commentClick}){
  const BASE_URL = useContext(UrlContext);
  const postId = posts.id
  const [comments, setComments] = useState()

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }

    const promise = axios.get(`${BASE_URL}comments/count/${postId}`, config);

    promise.then(response => setComments(response.data[0].count));
    promise.catch(err => console.log(err));
  }, []);

  return (
    <Comments>
        <b onClick={() => commentClick ? setCommentClick(false) : setCommentClick(true)}> <AiOutlineComment /> </b>
      <p>
        {comments} comments
      </p>
    </Comments>
  )
}

export default CommentsIcon;

const Comments = styled.article`
  color: #fff;
  text-align:center;
  display: flex;
  flex-wrap:wrap;
  justify-content:center;

  b svg{
    font-size: 26px;
    color: #fff;

    :hover{
      cursor: pointer;
  }
  }
`