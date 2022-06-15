import styled from "styled-components";
import Card from "./PostCard";

export default function PostsList ({posts}) {
    return (
        <TimelinePosts >
            {posts.map(data => <Card data={data} />)}
        </TimelinePosts>
    )
};

const TimelinePosts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;



