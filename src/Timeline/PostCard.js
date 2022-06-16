import styled from "styled-components";
import { useNavigate } from "react-router";
import ReactHashtag from "@mdnm/react-hashtag";

function ProfileImg ({img}) {
    return (
        <ProfileImgStyle src={img} />
    )
}

function LinkData ({linkTitle,linkDesc,linkImg,link}) {
  
    return (
        <LinkSnnipet onClick={() => window.open(link)}>
            <SnippetDesc>
                <h1>{linkTitle}</h1>
                <h3>{linkDesc}</h3>
                <h2>{link}</h2>
            </SnippetDesc>
            <SnippetImg src={linkImg}/>
        </LinkSnnipet>
    )
}

export default function Card (data) {
    const posts = data.data;
    const navigate = useNavigate();
  
    return (
        <CardDiv>
            <div>
                <ProfileImg img={posts.photoLink} />
            </div>
            <CardDetails>
                <PostUsername onClick={() => navigate(`/user/${posts.userId}`, {state: {userId: posts.userId}})}>{posts.username}</PostUsername>
                
                <PostDescription>
                    <ReactHashtag onHashtagClick={name => navigate(`/hashtag/${name.replace('#','')}`)}>
                        {posts.description}
                    </ReactHashtag > 
                </PostDescription>
                
                <LinkData
                    linkTitle={posts.linkTitle} 
                    linkDesc={posts.linkDesc} 
                    linkImg={posts.linkImg}
                    link={posts.link} />
            </CardDetails>
        </CardDiv>
    )
}

const CardDiv = styled.div`
    background-color: #171717;
    width: 40%;
    height: 250px;
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

const CardDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    margin-left: 20px;
    cursor: pointer;
`

const PostUsername = styled.div`
    height: 40px;
    font-size: 18px;
    color: white;
    display: flex;
    align-items: center;
    :hover{
        cursor:pointer;
    }
`

const PostDescription = styled.div`
    font-size: 14px;
    color: #B7B7B7;
    color: white;
    opacity: 0.7;
    min-height: 30px;
    display: flex;
    align-items: center;
`

const ProfileImgStyle = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`

const LinkSnnipet = styled.div`
    border: 1px solid #C4C4C4;
    height: 130px;
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