
import { useContext, useEffect, useState } from "react";
import { Navbar, Footer, } from "./components/index";

import { createBrowserRouter, RouterProvider, Routes, Route } from 'react-router-dom'

import { getUserAw } from "./appwrite/appwriteFun";
import { GlobalContext } from "./context/Context";
import LoginPage, { CreatePost, Home, Registration, Post, MyBlogs } from "./components/index.js"


export default function App() {

  const { setIsLogin, setUserData } = useContext(GlobalContext);
  useEffect(() => {
    getUserAw().then((data) => {
      if (data) {
        setUserData(data)
        setIsLogin(true)
        console.log("app.jsx : update context");
      }
    })
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <Registration />
    },
    {
      path: "/create-post",
      element: <CreatePost />
    },
    {
      path: "/post/:id",
      element: <Post />
    },
    {
      path: "/my-blogs",
      element: <MyBlogs />
    },
  ])


return (
  <>
   <Navbar/>
   <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/register" element={<Registration/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/post/:id" element={<Post/>}/>
          <Route path="/my-blogs" element={<MyBlogs/>}/>
        </Routes>
    <Footer/>
  </>
)
}
