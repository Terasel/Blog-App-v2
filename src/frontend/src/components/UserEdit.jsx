import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'

function UserEdit() {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')

    const submitData = async (e) => {
        e.preventDefault()

        const user = {
            name, email, bio
        }
        console.log(user)
        const update = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const data = await update.json()
        console.log(data)
        setName('')
        setEmail('')
        setBio('')
    }

    return (
        <div>
            <form onSubmit={submitData}>
                <label>User name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <label>User email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <label>User bio:</label>
                <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)} />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UserEdit