import { useEffect, useState } from "react"
import Blog from "./Blog"
import { useParams } from 'react-router-dom'

function BlogList() {
    const { id } = useParams()
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function fetchData() {
            const options = { method: 'GET' }
            const blogsResponse = await fetch('http://localhost:3000/api/blog', options)
            const blogsData = await blogsResponse.json()
            setBlogs(blogsData)
        }
        fetchData()
    }, [])

    const logoutData = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' }
        })
        console.log(response)
        window.location.assign("/")
    }

    const userList = async () => {
        window.location.assign("/userlist")
    }

    const userPage = async () => {
        window.location.assign(`/userpage/${id}`)
    }

    const myBlogs = async () => {
        window.location.assign(`/myblogs/${id}`)
    }

    return (
        <div>
            <h1>The blog app</h1>
            <button type="button" onClick={userList}>User list</button>
            <button type="button" onClick={userPage}>User page</button>
            <button type="button" onClick={myBlogs}>My blogs</button>
            <button type="button" onClick={logoutData}>Log out</button>
            {
                blogs.map(blog => {
                    return (
                        <Blog key={blog.id} blog={blog} />
                    )
                })
            }
        </div>
    )
}

export default BlogList