import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PreLoaderProvider } from './Context/PreLoaderContext.jsx'
import { UserProvider } from './Context/UserContext.jsx'

createRoot(document.getElementById('root')).render( 
  <PreLoaderProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </PreLoaderProvider>
)
