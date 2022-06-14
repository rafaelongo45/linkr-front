import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignUp from "../SignUp/Index.js";
import Timeline from "../Timeline/TimelinePage.js";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/timeline' element={<Timeline />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;