import styled, { keyframes } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import axios from "axios";

import PostsList from "./PostsList";
import Header from "../Header";
import PostUrl from "../PostsUrl/PostUrl";
import TrendingHashtags from "../TrendingHashtags";
import UrlContext from "../Contexts/UrlContext";
import UserInfo from "../UserPage/RenderUserPage";

export default function Timeline({ filter }) {
    const [posts, setPosts] = useState([]);
    const [follows, setFollows] = useState('');
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const params = useParams();
    const location = useLocation();
    const BASE_URL = useContext(UrlContext);

    let URL = BASE_URL + filter; let image; let name;
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
        if(filter === 'timeline'){
            getFollows();
        };
        getPosts()
    }, [filter, refresh])

    function getPosts() {
        setLoading(true);
        const userId = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const header = { headers: { authorization: `Bearer ${token}` } }

        const promise = axios.get(
        filter === 'timeline' ? 
        URL + `/${userId}`
        :
        URL, header)

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

    function getFollows(){
        const userId = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        const header = { headers: { authorization: `Bearer ${token}` } }
        
        const promise = axios.get(BASE_URL + `followers/${userId}`, header)
    
        promise.then(res => {
            setFollows(res.data)
        });

        promise.catch(err => {
            console.log(err)
            alert("An error occured while trying to fetch the posts, please refresh the page")
        })
    };

    return (<>
        <TimelineStyle >
            <Header />
            {filter !== "timeline" && filter !== "hashtag" ? <UserInfo userId={params.id} /> : <></>}
            <PostsArea>
                {filter === "timeline" ?
                    <Title><h1>timeline</h1></Title> :
                    filter === "hashtag" ?
                        <Title><h1>{`#${name}`}</h1></Title>
                        :
                        <></>
                }
                {filter === "timeline" ? <PostUrl setRefresh = {setRefresh}/> : <></>}
                {loading ?
                    <>
                        Loading
                        <LoadingStyle ></LoadingStyle>
                    </>
                    : posts !== [] ? <PostsList posts={posts} /> : <NoPosts>There are no posts yet</NoPosts>
                }
                {
                    !follows ? 
                    ''
                    :
                    posts.length === 0 && follows[0].followsAmmount === '0' ?
                    <NoPosts>You don't follow anyone yet. Search for new friends!</NoPosts>
                    :
                    posts.length === 0 && follows[0].postsAmmount === '0' ?
                    <NoPosts>No posts found from your friends</NoPosts>
                    :
                    ''
                }
            </PostsArea>
            {filter !== "hashtag" ? <TrendingHashtags /> : <></>}
        </TimelineStyle>
    </>
    )
}

const NoPosts = styled.p`
    font-size: 20px;
    color: #fff;
`

const TimelineStyle = styled.main`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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

