import axios from "axios";
import { AiFillHeart } from "react-icons/ai"
import styled from "styled-components";

function LikesContainer ({likeCount, likes, liked, posts, setLiked}) {

	function likePost(e) {
		e.preventDefault();
		const URL = "http://localhost:4000/like";
		const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

		const promise = axios.post(URL, {id: posts.id}, config);
        promise.then(() => setLiked(!liked)); 
		promise.catch(warnError);

	}

	function warnError(error) {
        alert("Houve um erro ao publicar seu link");
    }

	return (
		<LikesDiv>
			<AiFillHeart onClick={likePost} style={{color: liked ? "red" : "white"}} />
			{likeCount} {likeCount < 2 ? "like" : "likes"}
		</LikesDiv>
	)
}

const LikesDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default LikesContainer