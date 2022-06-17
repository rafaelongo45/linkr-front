import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import TrendingHashtags from "../TrendingHashtags/index.js";
import Login from "../Login/index.js";
import SignUp from "../SignUp/Index.js";
import Timeline from "../Timeline/TimelinePage.js";
import UserContext from "../Contexts/UserContext.js";
import UserPage from "../UserPage/index.js";
import PostUrl from "../PostsUrl/PostUrl.js";

function App(){
  const [userInfo, setUserInfo] = useState({name: '', profileImage: '', userId: ''});

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/timeline' element={<Timeline />} />
          <Route path='/user/:id' element={<UserPage />} />
          <Route path='/hashtag/:hashtag' element={<TrendingHashtags />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
};

export default App;
