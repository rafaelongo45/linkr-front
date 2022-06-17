import IsLoggedIn from "../Utils/CheckLogin.js";
import RenderHeader from "./RenderHeader.js";

function Header(){
  IsLoggedIn();
  return <RenderHeader />
};

export default Header;