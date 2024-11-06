import { Outlet, Link } from "react-router-dom"

function BlogEdit() {
    return (
        <div>
            <h1>Edit your blog</h1>
            <input type="text" name="title" placeholder="Title placeholder" />
            <input type="text" name="content" placeholder="Content placeholder" />
            <button type="button"><Link to={`/myblogs/:id`}>Submit changes</Link></button>
            <button type="button"><Link to={`/`}>Back to blogs</Link></button>
        </div>
    )
}

export default BlogEdit