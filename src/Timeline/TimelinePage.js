import styled, { keyframes } from "styled-components";
import { IoPersonCircle } from 'react-icons/io5';
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import axios from "axios";

import PostsList from "./PostsList";
import Header from "../Header";
import PostUrl from "../PostsUrl/PostUrl";
import TrendingHashtags from "../TrendingHashtags";

export default function Timeline({ filter }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const params = useParams();
    const location = useLocation();

    let URL = `http://localhost:4000/${filter}`; let image; let name;
    if (filter === "hashtag") {
        name = params.hashtag;
        URL = `${URL}/${name}`;
    }

    if (filter === "posts") {
        image = localStorage.getItem('userImage');
        name = location.state.name;
        const { id } = params;
        URL = `${URL}/${id}`;
    }

    useEffect(() => {
        getPosts()
    }, [filter, refresh])

    function getPosts() {
        setLoading(true)

        const token = localStorage.getItem('token');
        const header = { headers: { authorization: `Bearer ${token}` } }

        const promise = axios.get(URL, header)

        promise.then(res => {
            setPosts(res.data)
            setLoading(false)
            setRefresh(false);
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
                {filter === "timeline" ?
                    <Title><h1>timeline</h1></Title> :
                    filter === "hashtag" ?
                        <Title><h1 className="specific-page">{`#${name}`}</h1></Title>
                        :
                        <User className="specific-page">
                            {
                                image ?
                                <Image src={image} />
                                :
                                <IoPersonCircle />
                            }
                            <Title><h1>{`${name}'s posts`}</h1></Title>
                        </User>
                }
                {filter === "timeline" ? <PostUrl setRefresh = {setRefresh}/> : <></>}
                {loading ?
                    <>
                        Loading
                        <LoadingStyle ></LoadingStyle>
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

    .specific-page{
        margin-bottom: 45px;
    }
`

const User = styled.div`
    display: flex;
    margin-left: 69px;
    align-items: center;

    svg{
        width: 60px;
        height: 60px;
        color:#fff;
        margin: 10px 18px 0 0;
    }
`

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    margin-right: 18px;
    object-fit: cover;
`

const Title = styled.div`
    width: 651px;
    font-family: var(--input-font);
    font-weight: bold;
    font-size: 43px;
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

