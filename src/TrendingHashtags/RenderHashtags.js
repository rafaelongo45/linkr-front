import styled from "styled-components";

function RenderHashtags({name}){
  return (
    <Hashtag>
      # {name}
    </Hashtag>
  )
}

export default RenderHashtags;

const Hashtag = styled.li`
  margin: 6px 0;
  font-size: 18px;
  color: #fff;
  font-family: var(--link-font);
  font-weight: 700;
` 