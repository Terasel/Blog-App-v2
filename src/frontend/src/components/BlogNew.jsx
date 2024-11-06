function BlogNew({ blognew }) {
    return (
        <div>
            <input type="text" name="title" placeholder="Title placeholder" />
            <input type="text" name="content" placeholder="Content placeholder" />
            <button type="button">Create blog</button>
        </div>
    )
}

export default BlogNew