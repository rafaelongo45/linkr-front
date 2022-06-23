import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { IoPersonCircle } from 'react-icons/io5';

import UrlContext from "../Contexts/UrlContext";

function UserInfo(props) {
  const { userId } = props;

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  }

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const BASE_URL = useContext(UrlContext);

  useEffect(() => {
    const URL = BASE_URL + `user/${userId}`;
    const promise = axios.get(URL, config);
    promise.then(response => setUser(response.data));
    promise.catch(err => console.log(err));

  }, [userId]);

  function followOrUnfollowRequest() {
    setLoading(true);

    if (user.following) {
      const URL = BASE_URL + `follows/${userId}`;
      const promise = axios.delete(URL, config);
      promise.then(() => {
        const aux = { ...user };
        aux.following = false;
        setUser({ ...aux });
        setLoading(false);
      });
      promise.catch(e => {
        alert("Houve um erro ao tentar deixar de seguir o usuário!");
        console.log(e);
        setLoading(false);
      });
    }
    else {
      const URL = BASE_URL + `follows/${userId}`;
      const promise = axios.post(URL, null, config);
      promise.then(() => {
        const aux = { ...user };
        aux.following = true;
        setUser({ ...aux });
        setLoading(false);
      });
      promise.catch(e => {
        alert("Houve um erro ao tentar seguir o usuário!");
        console.log(e);
        setLoading(false);
      });
    }
  }

  return (
    <UserInfoBody>
      <Title>
        {
          user.photoLink ?
            <img src={user.photoLink}/>
            :
            <IoPersonCircle className="userIcon" />
        }
        <h1>{`${user.name}'s posts`}</h1>
      </Title>
      <FollowButton
        onClick={() => followOrUnfollowRequest()}
        backgroundColor={user.following ? "#FFFFFF" : "#1877F2"}
        fontColor={user.following ? "#1877F2" : "#FFFFFF"}
        disabled={loading}>
        {user.following ? "Unfollow" : "Follow"}
      </FollowButton>
    </UserInfoBody>
  )
}

export default UserInfo;


const UserInfoBody = styled.div`
  box-sizing: border-box;
  width: 650px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 33px;

  @media(max-width: 460px){
    width: 95%;
  }
  
`;

const Title = styled.div`
  width: fit-content;
  height: 64px;
  display: flex;
  align-items: center;

  svg {
    width:50px;
    height: 50px;
    color: #fff;
    margin:0;
  }

  img {
    width: 58px;
    height: 58px;
    object-fit: cover;
    border-radius: 50%;
  }

  h1 {
    font-family: 'Oswald';
    font-weight: 700;
    font-size: 43px;
    line-height: 58px;
    color: #FFFFFF;
    margin-left: 18px;
    padding-bottom: 6px;
  }

  @media(max-width: 460px){
    
    img{
      width: 50px;
      height: 50px;
      margin-left: 5px;
    }

    h1{
      font-size: 26px;
      line-height: 22px;
      margin-left: 10px;
    }
  }
`;

const FollowButton = styled.button`
  width: 112px;
  height: 31px;
  background: ${props => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  color: ${props => props.fontColor};
  font-family: 'Lato';
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  cursor: pointer;

  @media(max-width: 460px){
    width: 60px;
    height: 26px;
    margin-right: 5px;
  }
`;