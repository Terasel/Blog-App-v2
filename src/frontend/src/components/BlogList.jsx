import { useEffect, useState } from "react"
import Blog from "./Blog"

function BlogList() {
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
    return (
        <div>
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