import { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../Contexts/UserContext";
import createHashtags from "./createHashtags";

function PostUrl({setRefresh}){
    const URL = "https://linkrback.herokuapp.com/posts";
    const {userInfo} = useContext(UserContext);
    const [disable, setDisable] = useState(false);
    const userPhoto = localStorage.getItem('userImage');

    const [data, setData] = useState({
        link: "", description: ""
    });

    function sendUrl(e){
        e.preventDefault();
        setRefresh(true);
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
        const promise = axios.post('https://linkrback.herokuapp.com/hashtag', hashtag, config);
        promise.then(() => console.log('Hashtag posted')); promise.catch(warnError);
        
        })
    }

    function warnError(error) {
        alert("Houve um erro ao publicar seu link");
        setDisable(false);
    }

    return (
    <Post>
        <div>
            <Image src={userInfo.profileImage || userPhoto} />
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
    height: 190px;
    max-height: 490px;
    width: 611px;
    margin: 43px 0 29px 0;
    padding: 16px 20px 55px 20px;
    border-radius: 16px;
    background-color: var(--background-post-url);

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
`
const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    object-fit: cover;
`

const Url = styled.input`
    font-family: var(--link-font);
    font-size: 15px;
    box-sizing: border-box;
    height: 30px;
    width: 100%;
    padding: 0 13px;
    margin-bottom: 5px;
    border: none;
    border-radius: 5px;
    background-color: var(--background-input);

    ::placeholder{
        font-family: var(--link-font);
        font-size: 15px;
        color: var(--placeholder-color);
    }
`

const Description = styled.input`
    font-family: var(--link-font);
    font-size: 15px;
    box-sizing: border-box;
    height: 90px;
    width: 100%;
    padding: 7px 13px;
    border: none;
    border-radius: 5px;
    background-color: var(--background-input);

    ::placeholder{ //TODO: posicionar placeholder na parte superior do input
        font-family: var(--link-font);
        font-size: 15px;
        color: var(--placeholder-color);
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
`