import { useState } from 'react'
import { AppRoutes } from './routes'
import LoadingPage from './pages/LoadingPage';

function App() {
  const [page, setPage] = useState("loading");


  return (
    <div className='app'>
      <div className='celular'>
        {/*page === "loading"*/}
        <AppRoutes />
      </div>
      
    </div>
  )
}

export default App