import { useEffect, useState } from "react"
import BlogPersonal from "./BlogPersonal"

function BlogPersonalList() {
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function fetchData() {
            const options = { method: 'GET' }
            const response = await fetch('http://localhost:3000/api/blog/:authorId/byauthor', options)
            const data = await response.json()
            setBlogs(data)
        }
        fetchData()
    }, [])

    const blogList = async () => {
        window.location.assign("/bloglist")
    }

    return (
        <div>
            <h1>Your blogs</h1>
            {
                blogs.map(blogpersonal => {
                    return (
                        <BlogPersonal key={blogpersonal.id} blog={blogpersonal} />
                    )
                })
            }
            <button type="button" onClick={blogList}>Back to blogs</button>
        </div>
    )
}

export default BlogPersonalList