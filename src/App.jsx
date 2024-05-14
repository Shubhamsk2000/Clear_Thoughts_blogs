
import { useContext, useEffect, useState } from "react";
import { Navbar, Footer, CreatePost } from "./components/index";
import { Outlet } from "react-router-dom";
import { getUserAw } from "./appwrite/appwriteFun";
import { GlobalContext } from "./context/Context";
export default function App() {

  const { setIsLogin, setUserData , isLogin, userData} = useContext(GlobalContext);
  useEffect(() => {
    getUserAw().then((data) => {
      if(data){
        setUserData(data)
        setIsLogin(true)
      }
    })
  },[])
  return (  
    <>
      <Navbar isLoginProp = {isLogin} userDataProp = {userData}/>
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* <CreatePost/> */}
    </>
  )
}
