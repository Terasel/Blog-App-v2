import { useEffect, useState } from "react"
import BlogPersonal from "./BlogPersonal"
import { Outlet, Link } from "react-router-dom"

function BlogPersonalList() {
    const [blogs, setBlogs] = useState([])

    // useEffect(() => {
    //     async function fetchData() {
    //         const options = { method: 'GET' }
    //         const response = await fetch('http://localhost:3000/api/blog/:authorId/byauthor', options)
    //         const data = await response.json()
    //         setBlogs(data)
    //     }
    //     fetchData()
    // }, [])

    return (
        <div>
            <h1>Your blogs</h1>
            {
                blogs.map(blog => {
                    return (
                        <BlogPersonal key={blog.id} blog={blog} />
                    )
                })
            }
            <button type="button"><Link to={`/`}>Back to blogs</Link></button>
        </div>
    )
}

export default BlogPersonalList