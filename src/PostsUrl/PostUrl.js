import { useContext, useState } from "react";
import styled from "styled-components";

import UserContext from "../Contexts/UserContext";

function PostUrl(){
    const {userInfo} = useContext(UserContext);
    const [url, setUrl] = useState("");
    const [descripiton, setDescription] = useState("");

    return (
    <Post>
        <div>
            <Image src={userInfo.profileImage} />
        </div>
        <div>
            <p>What are you going to share today?</p>
            <Form>
                <Url type ='text' placeholder="http://..." onChange={(e) => {setUrl(e.target.value)}}/>
                <Description type ='text' placeholder="Awesome article about #javascript" onChange={(e) => {setDescription(e.target.value)}}/>
            </Form>
            <Button>Publish</Button>
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