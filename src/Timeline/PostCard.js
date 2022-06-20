import styled from "styled-components";
import { useNavigate } from "react-router";
import ReactHashtag from "@mdnm/react-hashtag";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";

import LikesContainer from "./LikesContainer.js";
import editIcon from "../assets/img/edit-icon.svg";
import deleteIcon from "../assets/img/delete-icon.svg";

function ProfileImg({ img }) {
    return (
        <ProfileImgStyle src={img} />
    )
}

function LinkData({ linkTitle, linkDesc, linkImg, link }) {

    return (
        <LinkSnnipet onClick={() => window.open(link)}>
            <SnippetDesc>
                <h1>{linkTitle}</h1>
                <h3>{linkDesc}</h3>
                <h2>{link}</h2>
            </SnippetDesc>
            <SnippetImg src={linkImg} />
        </LinkSnnipet>
    )
}

export default function Card(data) {
    const token = localStorage.getItem("token");
    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }
    const navigate = useNavigate();
    const localUserId = parseInt(localStorage.getItem("user"));

    const posts = data.data;
    const inputRef = useRef();
    const [editClicked, setEditClicked] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState("Yes, delete it");
    const [description, setDescription] = useState(posts.description);
    const [inputDescription, setInputDescription] = useState(posts.description);
    const [userLiked, setUserLiked] = useState(false);
    const [likes, setLikes] = useState([])

    useEffect(() => {
        peopleWhoLiked()
    }, [userLiked])

    function peopleWhoLiked () {
        const URL = `https://linkrback.herokuapp.com/post-likes/${posts.id}`;
		const promise = axios.get(URL, config);

        promise.then((res) => {
            setLikes(res.data)
        })
        promise.catch(warnError)
    }

    function warnError(error) {
        alert("Houve um erro ao publicar seu link");
        console.log(error);
    }

    function editPost() {
        if (editClicked === false) {
            setEditClicked(true);
        }
        else {
            setEditClicked(false);
        }
    }

    function sendEditRequisition() {        
        const URL = `https://linkrback.herokuapp.com/posts/${posts.id}`;
        const promise = axios.put(URL, {description: inputDescription}, config);

        setEditLoading(true);
      
        promise.then(() => {
            setDescription(inputDescription);
            setEditLoading(false);
            setEditClicked(false);
        });
        promise.catch(e => {
            alert("Houve um erro ao alterar a descrição do post!");
            console.log(e);
            setEditLoading(false);
        });
    }

    if (editClicked === true) {
        inputRef.current.focus();
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(255, 255, 255, 0)'
        },
    };

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    function sendDeleteRequisition() {
        setDeleteLoading(<ThreeDots color="#FFFFFF" height={23} width={23} />);

        const URL = `http://localhost:4000/posts/${posts.id}`;
        const promise = axios.delete(URL, config);
        promise.then(() => {
            window.location.reload(true);
        });
        promise.catch(e => {
            alert("Houve um erro ao deletar o post!");
            console.log(e);
            setDeleteLoading("Yes, delete it");
        });
    }

    const user = { userId: posts.userId, name: posts.username, image: posts.photoLink };

    return (
        <CardDiv>
            <IconsDiv>
                <ProfileImg img={posts.photoLink} />
                <LikesContainer
                    liked={userLiked}
                    likes={likes}
                    posts={posts}
                    setLiked={setUserLiked} />
            </IconsDiv>
            <CardDetails>
                <PostUsername>
                    <h1 onClick={() => navigate(`/user/${posts.userId}`, { state: user })}>{posts.username}</h1>
                    <EditAndDeleteDiv visibility={posts.userId === localUserId ? "default" : "hidden"}>
                        <img onClick={() => editPost()} src={editIcon} />
                        <img onClick={() => openModal()} src={deleteIcon} />
                    </EditAndDeleteDiv>
                </PostUsername>
                <PostDescription>
                    <ReactHashtag onHashtagClick={name => navigate(`/hashtag/${name.replace('#', '')}`)}>
                        {description}
                    </ReactHashtag >
                    <EditInput
                        ref={inputRef}
                        value={inputDescription}
                        onChange={e => {
                            setInputDescription(e.target.value);
                        }}
                        onKeyDown={(ev) => {
                            if (ev.key === "Enter") {
                                ev.preventDefault();
                                sendEditRequisition();
                            }
                            if (ev.key === "Escape") {
                                ev.preventDefault();
                                setEditClicked(false);
                            }
                        }}
                        disabled={editLoading}
                        visibility={editClicked === true ? "default" : "hidden"}
                    />
                </PostDescription>
                <LinkData
                    linkTitle={posts.linkTitle}
                    linkDesc={posts.linkDesc}
                    linkImg={posts.linkImg}
                    link={posts.link} />
            </CardDetails>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
                <ModalAlert>
                    <h1>Are you sure you want to delete this post?</h1>
                    <YesOrNoDiv>
                        <button onClick={() => closeModal()}>No, go back</button>
                        <button onClick={() => sendDeleteRequisition()}>{deleteLoading}</button>
                    </YesOrNoDiv>
                </ModalAlert>
            </Modal>
        </CardDiv>
    )
}

const CardDiv = styled.div`
    background-color: #171717;
    width: 631px;
    height: 270px;
    min-height: 230px;
    display: flex;
    min-width: 500px;
    flex-direction: row;
    margin-bottom: 50px;
    border-radius: 15px;
    padding: 10px;

    span{
        color:#fff;
        font-weight: 700;
    }
`

const IconsDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    
    svg {
        font-size: 20px;
        margin-top: 20px;
        margin-bottom: 10px;
        color: red;
    }
`;

const CardDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-left: 20px;
`

const PostUsername = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        width: auto;
        color: white;
        font-size: 18px;
    }

    h1:hover{
        cursor:pointer;
        text-decoration: underline;
    }
`

const EditAndDeleteDiv = styled.div`
    width: 45px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    visibility: ${props => props.visibility};

    img {
        width: 16px;
        height: 16px;
        cursor:pointer;
    }
`;

const PostDescription = styled.div`
    font-size: 14px;
    color: #B7B7B7;
    min-height: 40px;
    position: relative;
`

const EditInput = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    border: none;
    border-radius: 7px;
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 8px;
    font-size: 14px;
    line-height: 17px;
    color: #4C4C4C;
    visibility: ${props => props.visibility};
`

const ProfileImgStyle = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`

const LinkSnnipet = styled.div`
    border: 1px solid #C4C4C4;
    height: 160px;
    border-radius: 10px;
    width: 100%;
    display: flex;
    justify-content:center;
    cursor: pointer;
`

const SnippetImg = styled.img`
    width: 30%;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
`

const SnippetDesc = styled.div`
    color: #CECECE;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    h1 {
        font-size: 18px;
    }
    h2{
        font-size: 14px;
        opacity: 0.9;
    }
    h3 {
        font-size: 12px;
        opacity: 0.7;
    }
`

const ModalAlert = styled.div`
    width: 597px;
    height: 262px;
    background: #333333;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50px;

    h1 {
        width: 338px;
        height: 82px;
        font-family: 'Lato';
        font-weight: 700;
        font-size: 34px;
        line-height: 41px;
        text-align: center;
        color: #FFFFFF;
    }
`;

const YesOrNoDiv = styled.div`
    width: 300px;
    height: 37px;
    display: flex;
    justify-content: space-between;
    margin-top: 40px;

    button {
        width: 130px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        border: none;
        font-family: 'Lato';
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
    }

    button:first-child {
        background: #FFFFFF;
        color: #1877F2;
    }

    button:last-child {
        background: #1877F2;
        color: #FFFFFF;
    }
`;
