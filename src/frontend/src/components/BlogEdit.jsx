function BlogEdit() {

    const submitChanges = async () => {
        window.location.assign("/myblogs/:id")
    }

    const blogList = async () => {
        window.location.assign("/bloglist")
    }

    return (
        <div>
            <h1>Edit your blog</h1>
            <input type="text" name="title" placeholder="Title placeholder" />
            <input type="text" name="content" placeholder="Content placeholder" />
            <button type="button" onClick={submitChanges}>Submit changes</button>
            <button type="button" onClick={blogList}>Back to blogs</button>
        </div>
    )
}

export default BlogEdit