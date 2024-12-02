function BlogPersonal({ blogpersonal }) {
    // const deletedStatus = blogpersonal.deleted.toString()
    return (
        <div>
            <h2>{blogpersonal.title}</h2>
            <p>{blogpersonal.content}</p>
            <p>Created at: {blogpersonal.createdAt}</p>
            <p>Updated at: {blogpersonal.updatedAt}</p>
            <p>Popularity: {blogpersonal.popularity}</p>
            <p>Author: {blogpersonal.author.name}</p>
            <p>Deleted status: {blogpersonal.deleted}</p>
            <button type="button">Delete</button>
            <button type="button">Recover</button>
            <button type="button">Update</button>
        </div>
    )
}

export default BlogPersonal