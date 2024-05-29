import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalState from './context/Context.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage, { CreatePost, Home, Registration, Post, MyBlogs } from "./components/index.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalState>
      <RouterProvider router={router} />
    </GlobalState>
  </React.StrictMode>,
)
