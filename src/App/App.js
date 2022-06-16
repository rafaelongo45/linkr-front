import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../Login/index.js";
import SignUp from "../SignUp/Index.js";
import Timeline from "../Timeline/TimelinePage.js";
import HashtagsPage from "../HashtagsPage/index.js";
import UserContext from "../Contexts/UserContext.js";
import PostUrl from "../PostsUrl/PostUrl.js";

function App(){
  const [userInfo, setUserInfo] = useState({name: '', profileImage: ''});
  return (
    <BrowserRouter>
      <UserContext.Provider value={{userInfo, setUserInfo}}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/timeline' element={<Timeline />} />
          <Route path='/hashtag/:hashtag' element={<HashtagsPage />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
};

export default App;
