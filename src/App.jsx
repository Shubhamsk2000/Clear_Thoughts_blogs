
import { useContext, useEffect, useState } from "react";
import { Navbar, Footer,  } from "./components/index";
import { Outlet } from "react-router-dom";
import { getUserAw } from "./appwrite/appwriteFun";
import { GlobalContext } from "./context/Context";
export default function App() {

  const { setIsLogin, setUserData } = useContext(GlobalContext);
  useEffect(() => {
    getUserAw().then((data) => {
      if(data){
        setUserData(data)
        setIsLogin(true)
        console.log("app.jsx : update context");
      }
    })
  },[])
  return (  
    <>
      <Navbar/>
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* <CreatePost/> */}
    </>
  )
}
