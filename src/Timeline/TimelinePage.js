import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled, { keyframes } from "styled-components";
import { BiRefresh } from 'react-icons/bi';
import useInterval from "use-interval";
import axios from "axios";

import PostsList from "./PostsList";
import Header from "../Header";
import PostUrl from "../PostsUrl/PostUrl";
import TrendingHashtags from "../TrendingHashtags";
import UrlContext from "../Contexts/UrlContext";
import UserInfo from "../UserPage/RenderUserPage";
import SearchBar from "../Header/SearchBar";

export default function Timeline({ filter }) {
    const [posts, setPosts] = useState([]);
    const [follows, setFollows] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const [newPosts, setNewPosts] = useState(0);
    const params = useParams();
    const location = useLocation();

    const BASE_URL = useContext(UrlContext);
    const userId = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const header = { headers: { authorization: `Bearer ${token}` } }

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
        if (filter === 'timeline') {
            getFollows();
        };
        getPosts()
    }, [filter])

    function getPosts() {
        setLoading(true);
        if(!offset) {
            setLoadingMore(true)
            setPosts([])
        }

        const promise = axios.get(
            filter === 'timeline' ?
                URL + `/${userId}?offset=${offset}`
                :
                URL + `?offset=${offset}`, header)

        promise.then(res => {
            setPosts(res.data);
            setLoading(false);
            setOffset(offset +1)
            if(posts.length === offset*10) {
                setLoadingMore(true)
            }
            else {
                setLoadingMore(false)
            }
        });

        promise.catch(err => {
            setLoadingMore(false)
            setLoading(false)
            console.log(err)
            alert("An error occured while trying to fetch the posts, please refresh the page")
        })
    };

    function getFollows() {
        
        const promise = axios.get(BASE_URL + `followers/${userId}`, header)

        promise.then(res => {
            setFollows(res.data)
        });

        promise.catch(err => {
            console.log(err)
            alert("An error occured while trying to fetch the posts, please refresh the page")
        })
    };

    useInterval(() => {
        if (filter === "timeline" && !loading) {
            const promise = axios.get(BASE_URL + `new-posts/${posts[0].id}`, header);
            promise.then((res) => setNewPosts(parseInt(res.data.count)));
        }
    }, 15000);

    function loadMorePosts() {
        if(posts.length === offset*10) {
            setLoadingMore(true)
        }
        else {
            setOffset(0)
            setLoadingMore(false)
            return
        }
        if (offset < 2) setOffset(offset + 1)
        
        const promise = axios.get(
            filter === 'timeline' ?
                URL + `/${userId}?offset=${offset}`
                :
                URL + `?offset=${offset}`, header)
        
        promise.then(res => {
            setPosts(posts.concat(res.data))
            console.log(posts)
            if(posts.length === offset*10) {
                
                setLoadingMore(true)
            } else {
                setLoadingMore(false)
            }
        })
        promise.catch(err => {
            setLoadingMore(false)
            console.log(err)
            alert("An error occured while trying to fetch the posts, please refresh the page")
        })
    }

    return (<>
        <TimelineStyle >
            <Header setOffset={setOffset}/>
            <em><SearchBar /></em>
            <PostsArea>
                {filter !== "timeline" && filter !== "hashtag" ? <UserInfo userId={params.id} /> : <></>}
                {filter === "timeline" ?
                    <Title><h1>timeline</h1></Title> :
                    filter === "hashtag" ?
                        <Title><h1 className="hashtagTitle">{`#${name}`}</h1></Title>
                        :
                        <></>
                }
                {filter === "timeline" ? <PostUrl getPosts={getPosts} /> : <></>}
                {loading ?
                    <>
                        <NoPosts>Loading</NoPosts>
                        <LoadingStyle ></LoadingStyle>
                    </>
                    : posts !== [] ?
                        <>
                            {newPosts !== 0 ? 
                                <NewPosts onClick={() => { getPosts(); setNewPosts(0)}} >
                                    <p>{`${newPosts} new posts, load more!`}</p>
                                    <BiRefresh className="refresh-icon" />
                                </NewPosts>
                            : <></>}
                            <></>
                            <PostsList 
                                posts={posts} 
                                loadMorePosts={loadMorePosts} 
                                loadingMore={loadingMore}
                                offset={offset} />
                        </>
                        :
                        <NoPosts>There are no posts yet</NoPosts>
                }
                {
                    filter === 'hashtag' ?
                        ''
                        :
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
    font-family: 'Lato';
    font-weight: 700;

    @media(max-width: 460px){
        text-align:center;
    }
`

const TimelineStyle = styled.main`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 113px;
    
    em{
        position: fixed;
        top: 10px;
        width: 40%;
        z-index: 3;
    }

    @media(max-width: 460px){
        width: 100%;

        em{
            position: absolute;
            left: 0;
            width: 100%;
            top: 0;
            z-index:1;
        }
    }
`

const PostsArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 460px){
        width: 100%;
    }
`

const Title = styled.div`
    width: 651px;
    font-family: var(--input-font);
    font-weight: bold;
    font-size: 43px;
    color: #FFFFFF;

    .hashtagTitle{
        margin-bottom: 30px;
    }

    @media(max-width: 460px){
        width: 90%;
        margin: 40px 0 0 0;
    }
`

const loadingAnimation = keyframes`
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
    
`

export const LoadingStyle = styled.div`
    margin-top: 20px;
    border: 6px solid #f3f3f3;
    border-radius: 50%;
    border-top: 6px solid black;
    width: 40px;
    height: 40px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    animation-name: ${loadingAnimation};
`
const NewPosts = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 650px;
    height: 61px;
    margin-bottom: 17px;
    font-family: var(--link-font);
    font-size: 16px;
    border-radius: 16px;
    color: #FFFFFF;
    background-color: var(--background-button);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .refresh-icon{
        font-size: 26px;
        margin-left: 14px;
    }

    @media(max-width: 460px){
        width: 100%;
        border-radius: 0;
    }
`