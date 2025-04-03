import './App.css'
import Aisle from './components/Aisle'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard'
import { AisleTable } from './components/AisleTable'
import Topbar from './components/Topbar'
import Rearrange from './components/Rearrange'
import ShopLayout from './components/ShopLayout';
function App() {
  return (
    <ShopLayout/>
    // <BrowserRouter>
    //   <Topbar />
    //   <Routes>
    //     <Route path='/allProducts' element={<Aisle />} />
    //     <Route path='/dashboard' element={<Dashboard />} />
    //     <Route path='/aisletable' element={<AisleTable />} />
    //     <Route path='/rearrange' element={<Rearrange />} />
    //   </Routes>
    // </BrowserRouter>
  )
}

export default App
