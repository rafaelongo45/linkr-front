import styled from "styled-components";
import { IoPersonCircle } from 'react-icons/io5';

function RenderComments( { comment, posts } ){
  const authorId = comment.commenter.id;
  const userId = posts.userId;
  return (
    <>
      <Comment>
        {
          comment.commenter.image ? 
          <img src={comment.commenter.image}/>
          :
          <IoPersonCircle />
        }
        

        <CommentInfo>
          <Commenter>
            <h1>{comment.commenter.username}</h1>
            <h2>
              {
                authorId === userId ? 
                '• post’s author' 
                : 
                  comment.commenter.isFollower ? 
                '• following'
                :
                ''
              }
            </h2>
          </Commenter>
          
          <Text>{comment.commenter.comment}</Text>
          
        </CommentInfo>
      </Comment>

      <Bar></Bar>
    </>
  )
}

export default RenderComments;

const Comment = styled.section`
  position: relative;
  height: 80px;
  bottom: 0;
  width: 95%;
  padding-left: 18px;
  display:flex;
  align-items:center;
  font-family: 'Lato';
  font-size: 16px;

  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 15px;
  }

  svg{
    color: white;
    width: 45px;
    height: 45px;
    margin-right: 10px;
  }

  @media(max-width: 460px){
    padding: 0;
    margin-left: 10px;
  }
`

const CommentInfo = styled.div`
  width: 100%;
  margin-left: 5px;
  display: flex;
  flex-wrap:wrap;
`

const Commenter = styled.div`
  display: flex;

  h1{
    font-weight: 700;
    color: #fff;
    margin-right: 8px;
  }

  h2{
    color: rgba(86, 86, 86, 1);
  }
`

const Text = styled.div`
  width: 100%;
  color: rgba(172, 172, 172, 1);
  margin-top: 8px;
`

const Bar = styled.div`
  width: 95%;
  height: 1px;
  background-color: rgba(53, 53, 53, 1);
  margin: auto;

  :last-of-type{
    margin-bottom: 20px;
  }
`