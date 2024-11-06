import UserEdit from "./UserEdit"
import BlogNew from "./BlogNew"

function UserPage() {
    return (
        <div>
            <h1>Your personal page</h1>
            <h2>Edit your personal data</h2>
            <UserEdit />
            <h2>Write a new blog</h2>
            <BlogNew />
            <button type="button">Submit changes</button>
        </div>
    )
}

export default UserPage