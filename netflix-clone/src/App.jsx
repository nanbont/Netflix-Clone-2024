import { useState } from 'react'
import './App.css'
import Home from './Pages/Home/Home'
import '@fortawesome/fontawesome-svg-core/styles.css';


function App() {
  const [count, setCount] = useState(0)

  return (
  
      <div>
        <Home/>
      </div>
       
  )
}

export default App
