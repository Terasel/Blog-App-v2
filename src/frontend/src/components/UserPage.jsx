import UserEdit from "./UserEdit"
import BlogNew from "./BlogNew"
import { Outlet, Link, useParams } from "react-router-dom"

function UserPage() {
    const { id } = useParams()
    const blogList = async () => {
        window.location.assign(`/bloglist/${id}`)
    }
    return (
        <div>
            <h1>Your personal page</h1>
            <h2>Edit your personal data</h2>
            <UserEdit />
            <h2>Write a new blog</h2>
            <BlogNew />
            <button type="button" onClick={blogList}>Back to blogs</button>
        </div>
    )
}

export default UserPage