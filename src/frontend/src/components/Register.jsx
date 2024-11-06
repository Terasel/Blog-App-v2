import { Outlet, Link } from "react-router-dom"

function Register() {
    return (
        <div>
            <input type="text" name="name" placeholder="Name placeholder" />
            <input type="text" name="email" placeholder="Email placeholder" />
            <input type="text" name="password" placeholder="Password placeholder" />
            <input type="text" name="repeatpassword" placeholder="Repeat password placeholder" />
            <input type="text" name="role" placeholder="Role placeholder" />
            <button type="button"><Link to={`/bloglist`}>Sign up</Link></button>
        </div>
    )
}

export default Register