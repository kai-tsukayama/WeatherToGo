import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Top from './components/Top'
import CheckWeather from './components/CheckWeather'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/home" element={<Home />} />
        <Route path='/location' element={<CheckWeather />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
