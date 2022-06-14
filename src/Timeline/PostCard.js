import styled from "styled-components";
const urlMetadata = require("url-metadata");

function ProfileImg ({img}) {
    return (
        <ProfileImg src={img} />
    )
}

async function getMetadata (link) {
    try {
        const data = await urlMetadata(link);
        console.log(data)
        return data
    } catch(e){
        console.error(e)
        return "Ocorreu um erro no metadata"
    }
}

function LinkData ({link}) {
    const data = getMetadata(link);

    return (
        <div></div>
    )
}

export default function Card (data) {
    return (
        <CardDiv>
            <div>
                <ProfileImg img={data.photoLink} />
            </div>
            <CardDetails>
                <PostUsername>{data.username}</PostUsername>
                <PostDescription>{data.description}</PostDescription>
                <LinkData link={data.link}/>
            </CardDetails>
        </CardDiv>
    )
}

const CardDiv = styled.div`
    background-color: #171717;
    width: 40%;
    height: 160px;
    max-width: 400px;
    display: flex;
    flex-direction: row;
`

const CardDetails = styled.div`
    display: flex;
    flex-direction: column;
`

const PostUsername = styled.div`
    font-size: 18px;
    color: white;
`

const PostDescription = styled.div`
    font-size: 14px;
    color: #171717;
`

const ProfileImgStyle = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`