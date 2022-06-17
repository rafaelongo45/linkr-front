import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

import PostsList from "./PostsList";
import Header from "../Header";
import PostUrl from "../PostsUrl/PostUrl";
import TrendingHashtags from "../TrendingHashtags";

export default function Timeline({ filter }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();

    let URL = "http://localhost:4000"; let name;
    if(filter === "hashtag"){
        name = params.hashtag
        URL = `${URL}/${filter}/${name}`;
    }

    useEffect(() => {
        getPosts()
    }, [])

    function getPosts() {
        setLoading(true)

        const token = localStorage.getItem('token');
        const header = { headers: { authorization: `Bearer ${token}` } }

        const promise = axios.get(URL, header)

        promise.then(res => {
            setPosts(res.data)
            setLoading(false)
        });
        promise.catch(err => {
            setLoading(false)
            console.log(err)
            alert("An error occured while trying to fetch the posts, please refresh the page")
        })
    };

    return (<>
        <TimelineStyle >
            <Header />
            <PostsArea>
                {filter === "timeline" ? <Title><h1>timeline</h1></Title> : <Title><h1>{name}</h1></Title>}
                {filter === "timeline" ? <PostUrl /> : <></>}
                {loading ?
                    <>
                        Loading
                        <LoadingStyle ><div></div><div></div><div></div></LoadingStyle>
                    </>
                    : posts !== [] ? <PostsList posts={posts} /> : <NoPosts>There are no posts yet</NoPosts>
                }
            </PostsArea>
            {filter === "timeline" ? <TrendingHashtags /> : <></>}
        </TimelineStyle>
    </>
    )
}

const NoPosts = styled.p`
    font-size: 20px;
    color: black;
`

const TimelineStyle = styled.main`
    display: flex;
    justify-content: center;
    margin-top: 113px;
`

const PostsArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.div`
    width: 651px;
    font-family: var(--input-font);
    font-weight: bold;
    font-size: 43px;
    color: #FFFFFF;
`

const loadingAnimation = keyframes`
    0% {
        top: 8px;
        height: 64px;
    }
    50%, 100% {
        top: 24px;
        height: 32px;
    }
`

const LoadingStyle = styled.div`
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    div {
        color: black;
        display: inline-block;
        position: absolute;
        left: 8px;
        width: 16px;
        background: #fff;
        animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    div:nth-child(1) {
        left: 8px;
        animation-delay: -0.24s;
    }
    div:nth-child(2) {
        left: 32px;
        animation-delay: -0.12s;
    }
    div:nth-child(3) {
        left: 56px;
        animation-delay: 0;
    }
    animation-name: ${loadingAnimation};
    
`

