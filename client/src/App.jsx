import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Default from './pages/Default'
// import React from 'react'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={ <Default /> }></Route>
      </Routes>
    </BrowserRouter>    
  )
}

export default App
