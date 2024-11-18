import { useEffect, useState } from "react"

function BlogNew(req) {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [authorId, setAuthorId] = useState('')
    const submitData = async (e) => {
        e.preventDefault()
        const blog = {
            title, content, authorId
        }
        console.log(blog)
        const response = await fetch('http://localhost:3000/api/blog', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog)
        })
        console.log(response)
        await setTitle('')
        await setContent('')
        await setAuthorId('')
    }

    return (
        <div>
            <form onSubmit={submitData}>
                <label>Blog title:</label>
                <input
                    type="text"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)} />
                <label>Blog content:</label>
                <textarea
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} />
                {/* <label>Blog author:</label>
                <input
                    type="number"
                    value={authorId}
                    required
                    onChange={(e) => setAuthorId(Number(e.target.value))} /> */}
                <button type="submit">Create blog</button>
            </form>
        </div>
    )
}

export default BlogNew