import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../Login/index.js";
import SignUp from "../SignUp/Index.js";
import Timeline from "../Timeline/TimelinePage.js";
import UserContext from "../Contexts/UserContext.js";
import ClickContext from "../Contexts/HeaderClickContext.js";

function App(){
  const [click, setClick] = useState(false);
  const [userInfo, setUserInfo] = useState({name: '', profileImage: '', userId: ''});

  
  return (
    <BrowserRouter>
      <UserContext.Provider value={{userInfo, setUserInfo}}>
      <ClickContext.Provider value={{click, setClick}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/user/:id' element={<Timeline filter={"user"} />} />
          <Route path='/timeline' element={<Timeline filter={"timeline"} />} />
          <Route path='/hashtag/:hashtag' element={<Timeline filter={"hashtag"} />} />
        </Routes>
      </ClickContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  )
};

export default App;
