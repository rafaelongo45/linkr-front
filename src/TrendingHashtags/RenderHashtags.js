import { Link } from "react-router-dom";
import styled from "styled-components";

function RenderHashtags({ name }) {
  return (
    <Hashtag>
      <Link to={`/hashtag/${name}`}>
        # {name}
      </Link>
    </Hashtag>
  )
}

export default RenderHashtags;

const Hashtag = styled.li`
  margin: 6px 0;

  a{
    text-decoration: none;
    font-size: 18px;
    color: #fff;
    font-family: var(--link-font);
    font-weight: 700;
  }
` 