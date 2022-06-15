import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";

import RenderTrending from "./RenderTrending.js";

function RenderHashtagsPage(){
  const [trendingHashtags, setTrendingHashtags] = useState([]); 
  const URL = 'http://localhost:4000/trending';

  useEffect(() => {
    const trendingPromise = axios.get(URL);
    
    trendingPromise.then(response => {
      setTrendingHashtags(response.data)
    });

    trendingPromise.catch(err => console.log(err));
  }, []);
  
  return (
    <Main>
      <Posts>
        <h1># react</h1>
        <Post></Post>
      </Posts>

      <Trending>
        <h1>trending</h1>
        <div></div>
        <Hashtags>
          {
            trendingHashtags.map((hashtag, index) => {
              return <RenderTrending key ={index + hashtag.name}name = {hashtag.name} />
            })
          }
        </Hashtags>
      </Trending>
    </Main>
  )
}

export default RenderHashtagsPage;

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