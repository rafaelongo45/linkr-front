import { useContext, useState } from "react";
import axios from "axios";
import styled from "styled-components";

import UserContext from "../Contexts/UserContext";

function PostUrl(){
    const URL = "http://localhost:4000/posts";
    const {userInfo} = useContext(UserContext);
    const [disable, setDisable] = useState(false);

    const [data, setData] = useState({
        link: "", description: ""
    });

    function sendUrl(e){
        e.preventDefault();
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const promise = axios.post(URL, data, config);
        promise.then(() => setDisable(false)); promise.catch(warnError);
        setDisable(true);
    }

    function warnError(error) {
        alert("Houve um erro ao publicar seu link");
        setDisable(false);
    }


    return (
    <Post>
        <div>
            <Image src={userInfo.profileImage} />
        </div>
        <div>
            <p>What are you going to share today?</p>
            <Form onSubmit={sendUrl}>
                <Url
                    value={data.url}
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
            </Form>
        </div>
    </Post>
    )
};

export default PostUrl;

const Post = styled.main`
    display: flex;
    height: 209px;
    width: 611px;
    padding: 16px 20px;
    border-radius: 16px;
    background-color: red;

    div:first-child{
        width: 50px;
        margin-right: 18px;
        background-color: blue;
    }

    div:nth-child(2){
        display: flex;
        width: 100%;
        flex-direction: column;
    }
`
const Image = styled.img`

`
const Form = styled.form`

`

const Url = styled.input`
    box-sizing: border-box;
    width: 100%;
`

const Description = styled.input`
    box-sizing: border-box;
    width: 100%;
`

const Button = styled.button`

`