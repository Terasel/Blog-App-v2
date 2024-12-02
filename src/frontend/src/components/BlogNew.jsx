import { useEffect, useState } from "react"

function BlogNew() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const submitData = async (e) => {
        e.preventDefault()
        const blog = {
            title, content
        }
        console.log(blog)

        const response = await fetch('http://localhost:3000/api/blog', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(blog)
        })
        console.log(response.json())
        await setTitle('')
        await setContent('')
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
                <button type="submit">Create blog</button>
            </form>
        </div>
    )
}

export default BlogNew