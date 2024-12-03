import { useEffect, useState } from "react"
import BlogPersonal from "./BlogPersonal"
import { useParams } from 'react-router-dom'

function BlogPersonalList() {
    const { id } = useParams()
    const [blogs, setBlogs] = useState([])

    useEffect(() => {
        async function fetchData() {
            const options = { method: 'GET', credentials: 'include' }
            const response = await fetch(`http://localhost:3000/api/myblogs`, options)
            const data = await response.json()
            setBlogs(data)
        }
        fetchData()
    }, [])

    const blogList = async () => {
        window.location.assign(`/bloglist/${id}`)
    }
    if (blogs == []) {
        return <div>
            <p>Cargando...</p>
        </div>
    } else {
        return (
            <div>
                <h1>Your blogs</h1>
                {
                    blogs.map(blogpersonal => {
                        return (
                            <BlogPersonal key={blogpersonal.id} blogpersonal={blogpersonal} />
                        )
                    })
                }
                <button type="button" onClick={blogList}>Back to blogs</button>
            </div>
        )
    }

}

export default BlogPersonalList