import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import BlogList from "./components/BlogList"
import UserList from "./components/UserList"
import ErrorPage from "./components/ErrorPage"
import UserPage from './components/UserPage'
import BlogPersonalList from './components/BlogPersonalList'
import BlogEdit from './components/BlogEdit'
import Entry from './components/Entry'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Entry />
    </div>,
    errorElement: <ErrorPage />
  },
  {
    path: "/bloglist",
    element: <div>
      <BlogList />
    </div>,
    errorElement: <ErrorPage />
  },
  {
    path: "/userlist",
    element: <div>
      <UserList />
    </div>,
    errorElement: <ErrorPage />
  },
  {
    path: "/userpage/:id",
    element: <div>
      <UserPage />
    </div>,
    errorElement: <ErrorPage />
  },
  {
    path: "/myblogs/:id",
    element: <div>
      <BlogPersonalList />
    </div>,
    errorElement: <ErrorPage />
  },
  {
    path: "/blogedit/:id",
    element: <div>
      <BlogEdit />
    </div>,
    errorElement: <ErrorPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
