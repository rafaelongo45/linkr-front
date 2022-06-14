import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignUp from "../SignUp/Index.js";
import Login from "../Login/index.js";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;