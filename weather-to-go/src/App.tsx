import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Top from './components/Top'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
