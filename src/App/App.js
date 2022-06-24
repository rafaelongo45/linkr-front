import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../Login/index.js";
import SignUp from "../SignUp/Index.js";
import Timeline from "../Timeline/TimelinePage.js";
import UserContext from "../Contexts/UserContext.js";
import ClickContext from "../Contexts/HeaderClickContext.js";
import UrlContext from "../Contexts/UrlContext.js";

function App(){
  const [click, setClick] = useState(false);
  const [userInfo, setUserInfo] = useState({name: '', profileImage: '', userId: ''});

  const BASE_URL = "https://linkrback.herokuapp.com/";

  return (
    <BrowserRouter>
      <UrlContext.Provider value={BASE_URL}>
      <UserContext.Provider value={{userInfo, setUserInfo}}>
      <ClickContext.Provider value={{click, setClick}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/user/:id' element={<Timeline filter={"posts"} />} />
          <Route path='/timeline' element={<Timeline filter={"timeline"} />} />
          <Route path='/hashtag/:hashtag' element={<Timeline filter={"hashtag"} />} />
        </Routes>
      </ClickContext.Provider>
      </UserContext.Provider>
      </UrlContext.Provider>
    </BrowserRouter>
  )
};

export default App;
