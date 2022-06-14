import styled from "styled-components";
import RenderForm from "./RenderForm";

function RenderSignUpPage(){
  return (
    <Main>
      <LeftSide>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </LeftSide>

      <RightSide>
        <RenderForm />
      </RightSide>
    </Main>
  )
};

export default RenderSignUpPage;

const Main = styled.main`
  height:100%;
  width:100%;
  background-color: var(--background-color);
  display:flex;
`

const LeftSide = styled.section`
  font-family: var(--logo-font);
  font-weight:700;
  color:#fff;
  position:relative;
  width: 60%;
  height: 100%;

  h1{
    position:absolute;
    font-size: 100px;
    top: 270px;
    left: 20%;
  }

  h2{
    position:absolute;
    font-size: 28px;
    width: 300px;
    font-family:var(--input-font);
    top: 360px;
    left: 20%;
  }
`

const RightSide = styled.section`
  position:relative;
  right: 0;
  width:40%;
  height: 100%;
  background-color:var(--background-color-header);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`