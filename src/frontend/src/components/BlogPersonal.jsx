function BlogPersonal({ blogpersonal }) {
    return (
        <div>
            <h2>{blogpersonal.title}</h2>
            <p>{blogpersonal.content}</p>
            <p>{blogpersonal.authorId}</p>
            <p>{blogpersonal.createdAt}</p>
            <p>{blogpersonal.updatedAt}</p>
            <p>Popularity placeholder</p>
            <button type="button">Delete</button>
            <button type="button">Recover</button>
            <button type="button">Update</button>
        </div>
    )
}

export default BlogPersonal