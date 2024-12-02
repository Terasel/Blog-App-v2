import { useEffect, useState } from "react"

const Login = () => {
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const loginData = async (e) => {
        e.preventDefault()
        const user = {
            email, password
        }
        console.log(user)
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            credentials: "include",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const savedJson = await response.json()
        console.log(savedJson)
        if (!response.ok) {
            console.log('Login error')
        } else {
            window.location.assign(`/bloglist/${savedJson.id}`)
        }
        setEmail('')
        setPassword('')
    }
    return (
        <div>
            <form onSubmit={loginData}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login