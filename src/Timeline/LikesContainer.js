/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai"
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

function LikesContainer ({likes, liked, posts, setLiked}) {
	const userId = localStorage.getItem("user");
	const [likesPlaceholder, setLikes] = useState(posts.likeCount);
	const [usersLikes, setUsersLikes] = useState(likes);
	const [randomID, setRandomID] = useState(String(Math.random()))

	function likePost(e) {
		e.preventDefault();

		if(liked) {
			setLikes(likesPlaceholder -1)
			setLiked(false)
		} else {
			setLikes(likesPlaceholder +1)
			setLiked(true)
		}
		
		const URL = "http://localhost:4000/like";
		const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

		const promise = axios.post(URL, {id: posts.id}, config);
        promise.then(); 
		promise.catch(warnError);

	}

	function whoLiked () {
		if (!likes.length) {
			setLiked(false)
			setUsersLikes([])
			return 
		}
		const youLiked = likes.filter(item => item.id === Number(userId))
		const usersLiked = likes.filter(item => item.id !== Number(userId))
		console.log(usersLiked)
		if (youLiked.length) {
			setLiked(true)
		}
		else {
			setLiked(false)
		}
		setUsersLikes(usersLiked)
	}

	function warnError(error) {
		setLiked(!false)
        alert("Houve um erro ao publicar seu link");
    }

	useEffect(() => {
		whoLiked()
	},[likes, likesPlaceholder, liked])

	return (
		<LikesDiv>
			<AiFillHeart onClick={likePost} style={{color: liked ? "red" : "white"}} />
			<p data-tip data-for={randomID}>{likesPlaceholder} {posts.likeCount < 2 ? "like" : "likes"}</p>
			<ReactTooltip id={randomID} place='bottom' effect='solid'>
				<TooltopMessage>
					{liked ? 
						likesPlaceholder === 1 ? "Você curtiu" : 
							likesPlaceholder >= 3 ? 
								`Você, ${usersLikes[0]?.name} and other ${likesPlaceholder - 2} people` :
								`Você e ${usersLikes[0]?.name}`
					: likesPlaceholder < 1 ? "Ninguem curtiu" :
						likesPlaceholder >= 3 ? 
								`${usersLikes[0]?.name}, ${usersLikes[1]?.name} and other ${likesPlaceholder - 2} people` : 
							likesPlaceholder === 1 ? 
									`${usersLikes[0]?.name} curtiu` :
									`${usersLikes[0]?.name} e ${usersLikes[1]?.name}`
						
					}		
				</TooltopMessage>
			</ReactTooltip>
		</LikesDiv>
	)
}

const LikesDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

	svg {
		cursor: pointer;
	}
`;

const TooltopMessage = styled.div`
	font-size: 12px;
	cursor: pointer;
`

export default LikesContainer