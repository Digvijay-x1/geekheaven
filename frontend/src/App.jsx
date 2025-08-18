
import { Routes , Route , Navigate  } from "react-router-dom"

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import  { Toaster } from 'react-hot-toast'
import { useThemeStore } from "./stores/useTheme.js"
import useAuthStore from "./stores/useAuthStore.js"
import BookmarkPage from "./pages/BookmarkPage.jsx"
import { useEffect } from "react"

const App = () => {

  const {theme} = useThemeStore(); 

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const  {authUser} = useAuthStore();



  return (
    <div className="min-h-screen bg-background text-foreground">
      <Routes>
        <Route path='/dashboard' element={<HomePage/>}/>
        <Route path='/login' element={!authUser ?<LoginPage/>: <Navigate to="/dashboard"/>}/>
        <Route path='/register' element={!authUser ?<RegisterPage/>: <Navigate to="/dashboard"/>}/>
        <Route  path='/bookmarks' element={authUser ? <BookmarkPage/> : <Navigate to="/dashboard"/>}  />
        <Route path='*' element={<Navigate to="/dashboard"/>}/>

      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
