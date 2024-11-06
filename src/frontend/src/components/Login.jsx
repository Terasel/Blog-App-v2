import { Outlet, Link } from "react-router-dom"

function Login() {
    return (
        <div>
            <input type="text" name="name" placeholder="Name placeholder" />
            <input type="text" name="password" placeholder="Password placeholder" />
            <button type="button"><Link to={`/bloglist`}>Login</Link></button>
        </div>
    )
}

export default Login