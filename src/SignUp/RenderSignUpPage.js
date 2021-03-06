import styled from "styled-components";
import RenderForm from "./RenderForm";

function RenderSignUpPage(){
  return (
    <Main>
      <LogoSide>
        <div>
          <h1>linkr</h1>
          <h2>save, share and discover the best links on the web</h2>
        </div>
      </LogoSide>

      <FormSide>
        <RenderForm />
      </FormSide>
    </Main>
  )
};

export default RenderSignUpPage;

const Main = styled.main`
  height:100%;
  width:100%;
  background-color: var(--background-color);
  display:flex;

  @media(max-width: 460px){
    flex-wrap:wrap;
  }
`

const LogoSide = styled.section`
    display: flex;
    align-items: center;
    margin-left: 100px;
    font-family: var(--logo-font);
    font-weight:700;
    color:#fff;
    width: 60%;
    height: 100%;

  h1{
    font-size: 100px;
    top: 270px;
    left: 20%;
  }

  h2{
    font-size: 28px;
    width: 300px;
    font-family:var(--input-font);
    top: 360px;
    left: 20%;
    line-height: 45px;
  }

  @media(max-width: 460px){
    width: 100%;
    height: 22%;
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    align-items:center;

    h1{
      font-size: 80px;
      position: static;
      margin-top: 15px;
    }

    h2{
      font-size: 24px;
      position: static;
      text-align:center;
      width: 80%;
      line-height: 30px;
    }
  }
`

const FormSide = styled.section`
  position:relative;
  right: 0;
  width: 40%;
  height: 100%;
  background-color:var(--background-color-header);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;

  @media(max-width: 460px){
    width: 100%;
    height: 78%;
    position: static;
    justify-content:flex-start;
  }
`