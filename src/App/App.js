import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignUp from "../SignUp/Index.js";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;