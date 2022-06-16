import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";

import RenderHashtags from "./RenderHashtags.js";

function TrendingHashtags() {
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
    <TrendingArea>
      <h1>trending</h1>
      <div></div>
      <Hashtags>
        {
          trendingHashtags.map((hashtag, index) => {
            return <RenderHashtags
              key={index + hashtag.name}
              name={hashtag.name}
            />
          })
        }
      </Hashtags>
    </TrendingArea>
  )
}

export default TrendingHashtags;

const TrendingArea = styled.aside`
  height: 400px;
  width: 250px;
  padding-top: 20px;
  background-color: var(--background-color);
  border-radius: 14px;

  h1{
    color: #fff;
    font-family: var(--input-font);
    font-size: 28px;
    font-weight: 700;
    margin: 0 15px 20px 15px;
  }

  div{
    width: 100%;
    height: 2px;
    background-color:var(--background-color-header);
  }
`;

const Hashtags = styled.ul`
  height: 80%;
  width: 90%;
  margin: 15px auto ;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`