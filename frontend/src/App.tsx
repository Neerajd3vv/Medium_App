
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blogs from './pages/Blogs'
import Blog from './pages/Blog'

function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element= {<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/blogs' element={<Blogs/>}/>
      <Route path='/blog/:id' element={<Blog/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App