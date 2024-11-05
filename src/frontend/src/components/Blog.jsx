function Blog({ blog }) {
    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>{blog.authorId}</p>
            <p>{blog.createdAt}</p>
            <p>{blog.updatedAt}</p>
            <p>Popularity placeholder</p>
            <button type="button">Like</button>
            <button type="button">Hard delete</button>
        </div>
    )
}

export default Blog