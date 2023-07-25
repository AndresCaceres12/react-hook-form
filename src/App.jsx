import Register from "./pages/Register";
import AllNoticias from "./pages/AllNoticias";
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {

  return (
    <>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Register/>}/>
  <Route path="/Allnoticias" element ={<AllNoticias/>}/>
</Routes>
</BrowserRouter>
    </>
  )
}

export default App
