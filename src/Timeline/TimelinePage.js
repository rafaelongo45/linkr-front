import PostsList from "./PostsList";
import styled, { keyframes } from "styled-components";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";

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
        {loading ?
            <>
                Loading
                <LoadingStyle ><div></div><div></div><div></div></LoadingStyle>
            </>
        : posts === [] ? <PostsList posts={posts} /> : <NoPosts>There are no posts yet</NoPosts>
        }
    </TimelineStyle>
    )
}

const NoPosts = styled.p`
    font-size: 20px;
    color: black;
`

const TimelineStyle = styled.div`
    background-color: #E5E5E5;
    height: 100%;
    display: flex;
    justify-content: center;
    margin-top: 200px;
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
