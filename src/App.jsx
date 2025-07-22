import { useState } from 'react'
import { LoadingScreen } from './components/LoadingScreen'
import './App.css'
import './index.css'

function App() {

  const [isLoaded, setIstLoaded] = useState(false);

  return (
    <>
    {!isLoaded && <LoadingScreen onComplete={() => setIstLoaded(true)}></LoadingScreen>}
    </>
  )
}

export default App
