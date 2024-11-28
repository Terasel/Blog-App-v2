import Register from "./Register"
import Login from "./Login"

function Entry() {
    return (
        <div>
            <h1>Register user</h1>
            <Register />
            <h1>Login user</h1>
            <Login />
        </div>
    )
}

export default Entry