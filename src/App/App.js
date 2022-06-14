import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignUp from "../SignUp/Index.js";
import Login from "../Login/index.js";
import UserContext from "../Contexts/UserContext.js";

function App(){
  const [userInfo, setUserInfo] = useState({name: '', profileImage: ''});
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <UserContext.Provider value={{userInfo, setUserInfo}}>
        <Routes>
            <Route path='/signup' element={<SignUp />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
};

export default App;
