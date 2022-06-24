import IsLoggedIn from "../Utils/CheckLogin.js";
import RenderHeader from "./RenderHeader.js";

function Header({setOffset}){
  IsLoggedIn();
  return <RenderHeader setOffset={setOffset}/>
};

export default Header;