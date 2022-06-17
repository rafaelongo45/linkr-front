import PostsList from "./PostsList";
import styled, { keyframes } from "styled-components";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";
import PostUrl from "../PostsUrl/PostUrl";

export default function Timeline () {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPosts()
    },[])

    function getPosts () {
        setLoading(true)
        
        const URL = "http://localhost:4000/timeline";
        const token = localStorage.getItem('token');
        const header = {headers: {authorization: `Bearer ${token}`}}
        
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

    return (
    <TimelineStyle >
        <Title><h1>timeline</h1></Title>
        <Header /> 
        <PostUrl />
        {loading ?
            <>
                Loading ...
                <LoadingStyle ></LoadingStyle>
            </>
        : posts !== [] ? <PostsList posts={posts} /> : <NoPosts>There are no posts yet</NoPosts>
        }
    </TimelineStyle>
    )
}

const NoPosts = styled.p`
    font-size: 20px;
    color: black;
`

const TimelineStyle = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 60px;
    color: white;
    background-color: var(--background-page);
`

const Title = styled.div`
    width: 651px;
    font-family: var(--input-font);
    font-weight: bold;
    font-size: 43px;
    margin-top: 53px;
    color: #FFFFFF;
`

const loadingAnimation = keyframes`
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
`

const LoadingStyle = styled.div`
    margin-top: 5px;
    border: 6px solid #f3f3f3;
    border-radius: 50%;
    border-top: 6px solid black;
    width: 40px;
    height: 40px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    animation-name: ${loadingAnimation};
    
`

