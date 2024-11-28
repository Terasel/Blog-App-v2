import { useEffect, useState } from "react"

function UserEdit({ useredit }) {
    // const [user, setUser] = useState([])

    // useEffect(() => {
    //     async function fetchData() {
    //         const options = { method: 'GET' }
    //         const response = await fetch('http://localhost:3000/api/users/:id', options)
    //         const data = await response.json()
    //         setUser(data)
    //     }
    //     fetchData()
    // }, [])

    return (
        <div>
            <input type="text" name="name" placeholder="Name placeholder" />
            <input type="text" name="email" placeholder="Email placeholder" />
            <input type="text" name="bio" placeholder="Bio placeholder" />
            <button type="button">Submit changes</button>
        </div>
    )
}

export default UserEdit