import { Outlet, Link } from "react-router-dom"
import { useEffect, useState } from "react"

const Login = () => {
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        console.log(response)
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
                <button type="submit">
                    {/* <Link to={`/bloglist`}> */}
                    Login
                    {/* </Link> */}
                </button>
            </form>
        </div>
        // <div>
        //     <input type="text" name="email" placeholder="Email placeholder" />
        //     <input type="text" name="password" placeholder="Password placeholder" />
        //     <button type="button"><Link to={`/bloglist`}>Login</Link></button>
        // </div>
    )
}

export default Login