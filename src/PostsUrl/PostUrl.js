import { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import {IoPersonCircle} from 'react-icons/io5';

import UserContext from "../Contexts/UserContext";
import createHashtags from "./createHashtags";
import UrlContext from "../Contexts/UrlContext";

function PostUrl({getPosts}){
    const BASE_URL = useContext(UrlContext);
    const URL = BASE_URL + "posts";
    const {userInfo} = useContext(UserContext);
    const [disable, setDisable] = useState(false);
    const userPhoto = localStorage.getItem('userImage');
    
    const [data, setData] = useState({
        link: "", description: ""
    });

    function sendUrl(e){
        e.preventDefault();
        setData({ ...data, link: "", description: ""});

        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.post(URL, data, config);
        promise.then(() => setDisable(false)); promise.catch(warnError);
        sendHashtags();
        setDisable(true);
        getPosts();
        window.location().reload()
    }

    function sendHashtags(){
        const hashtags = createHashtags(data.description);
        
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        
        hashtags.forEach(hashtag => {
            const promise = axios.post(BASE_URL + 'hashtag', hashtag, config);
            promise.then(() => console.log('Hashtag posted')); promise.catch(warnError);

            const hashtagsPostsPromise = axios.post(BASE_URL + 'hashtagsPosts', hashtag, config);
            hashtagsPostsPromise.then(() => console.log('Hashtag posted')); promise.catch(warnError);
        })
    }

    function warnError(error) {
        alert("Houve um erro ao publicar seu link");
        setDisable(false);
    }

    return (
    <Post>
        <div>
            {
                userPhoto ? 
                <Image src={userPhoto} />
                :
                <IoPersonCircle />
            }
            
        </div>
        <div>
            <p>What are you going to share today?</p>
            <form onSubmit={sendUrl}>
                <Url
                    value={data.link}
                    type ='text' 
                    placeholder="http://..." 
                    onChange={(e) => { setData({ ...data, link: e.target.value }) }}
                    disabled={disable}
                    required
                />
                <Description
                    value={data.description}
                    type ='text' 
                    placeholder="Awesome article about #javascript" 
                    onChange={(e) => { setData({ ...data, description: e.target.value }) }}
                    disabled={disable}
                />
                <Button disabled={disable} type="submit">
                    {disable? "Publishing..." : "Publish"}
                </Button>
            </form>
        </div>
    </Post>
    )
};

export default PostUrl;

const Post = styled.div`
    position: relative;
    display: flex;
    height: 170px;
    max-height: 490px;
    width: 610px;
    margin: 43px 0 29px 0;
    padding: 16px 20px 55px 20px;
    border-radius: 16px;
    background-color: var(--background-post-url);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    div>svg{
        width: 50px;
        height: 50px;   
    }

    div:first-child{
        width: 50px;
        margin-right: 18px;
    }

    div:nth-child(2){
        display: flex;
        width: 100%;
        flex-direction: column;

        p{
            font-family: var(--link-font);
            font-size: 20px;
            margin: 8px 0 17px 0;
            color: var(--post-color);
        }
    }

    @media(max-width: 460px){
        width: 100%;
        height: 230px;
        max-width: 425px;
        border-radius: 0;
        padding: 0;

        div:first-child{
            display: none;
        }

        div:nth-child(2){
            width: 90%;
            margin: 10px auto;

            p{
                text-align: center;
            }
        }
    }
`
const Image = styled.img`
    width: 58px;
    height: 58px;
    border-radius: 50%;
    object-fit: cover;
`

const Url = styled.input`
    font-family: var(--link-font);
    font-size: 15px;
    box-sizing: border-box;
    height: 30px;
    width: 100%;
    padding: 0 13px;
    margin-bottom: 7px;
    border: none;
    border-radius: 5px;
    background-color: var(--background-input);

    ::placeholder{
        font-family: var(--link-font);
        font-size: 15px;
        color: var(--placeholder-color);
    }
`

const Description = styled.textarea`
    font-family: var(--link-font);
    font-size: 15px;
    box-sizing: border-box;
    height: 90px;
    width: 100%;
    padding: 7px 13px;
    border: none;
    border-radius: 5px;
    background-color: var(--background-input);
    resize: none;

    ::placeholder{
        font-family: var(--link-font);
        font-size: 15px;
        color: var(--placeholder-color);
    };

    @media(max-width: 460px){
        height: 70px;
        
        ::placeholder{
            padding: 3px;
        }
    }
`

const Button = styled.button`
    font-size: 14px;
    font-weight: 700;
    position: absolute;
    bottom: 16px;
    right: 20px;
    width: 112px;
    height: 31px;
    border: none;
    border-radius: 5px;
    color: var(--button-text);
    background-color: var(--background-button);

    :hover{
        cursor: pointer;
    }

    @media(max-width: 460px){
        height: 25px;
    }
`