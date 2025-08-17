
import { Routes , Route , Navigate  } from "react-router-dom"

import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import  { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import {axiosInstance} from './lib/axios.js'

const App = () => {

  const {data:authdata } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    },
    retry: false , // auth check
  })

  const authUser = authdata?.user;


  return (
    <div className="h-screen" data-theme="dark">
      <Routes>
        <Route path='/dashboard' element={<HomePage/>}/>
        <Route path='/login' element={!authUser ?<LoginPage/>: <Navigate to="/dashboard"/>}/>
        <Route path='/register' element={!authUser ?<RegisterPage/>: <Navigate to="/dashboard"/>}/>
        <Route path='*' element={<Navigate to="/dashboard"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
