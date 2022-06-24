import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import Card from "./PostCard";
import { LoadingStyle } from "./TimelinePage";

export default function PostsList ({posts, loadMorePosts, loadingMore, offset}) {
    return (
        <TimelinePosts >
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMorePosts}
                hasMore={loadingMore}
                threshold={100}
                loader={<LoadingDiv><LoadingStyle ></LoadingStyle></LoadingDiv>}
            >
                {posts.map((data) => <Card data={data} />)}
            </InfiniteScroll>
        </TimelinePosts>
    )
};

const TimelinePosts = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(max-width: 460px){
        width: 100%;
    }
`;

const LoadingDiv = styled.div`
    color: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;



