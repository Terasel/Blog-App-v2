import { useEffect, useState } from "react"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('simpleUser')

    const submitData = async (e) => {
        e.preventDefault()
        const user = {
            name, email, password, role
        }
        console.log(user)
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        console.log(response)
        setName('')
        setEmail('')
        setPassword('')
        setRole('')
    }

    return (
        <div>
            <form onSubmit={submitData}>
                <label>User name:</label>
                <input
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)} />
                <label>User email:</label>
                <input
                    type="text"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)} />
                <label>User password:</label>
                <input
                    type="text"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)} />
                <label>User role:</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}>
                    <option value="simpleUser">simpleUser</option>
                    <option value="admin">admin</option>
                </select>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Register