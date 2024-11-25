function Blog({ blog }) {
    return (
        <div>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            <p>Created at: {blog.createdAt}</p>
            <p>Updated at: {blog.updatedAt}</p>
            <p>Popularity: {blog.popularity}</p>
            <p>Author: {blog.author.name}</p>
            <button type="button">Popularity update</button>
            <button type="button">Like</button>
            <button type="button">Hard delete</button>
        </div>
    )
}

export default Blog