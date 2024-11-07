import UserEdit from "./UserEdit"
import BlogNew from "./BlogNew"
import { Outlet, Link } from "react-router-dom"

function UserPage() {
    return (
        <div>
            <h1>Your personal page</h1>
            <h2>Edit your personal data</h2>
            <UserEdit />
            <h2>Write a new blog</h2>
            <BlogNew />
            <button type="button"><Link to={`/bloglist`}>Back to blogs</Link></button>
        </div>
    )
}

export default UserPage