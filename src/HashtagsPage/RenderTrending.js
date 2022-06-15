import styled from "styled-components";

function RenderTrending({name}){
  return (
    <Hashtag>
      # {name}
    </Hashtag>
  )
}

export default RenderTrending;

const Hashtag = styled.p`
  margin: 6px 0;
  font-size: 18px;
  color: #fff;
  font-family: var(--link-font);
  font-weight: 700;
` 