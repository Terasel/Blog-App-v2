import { useEffect, useState } from "react"
import User from "./User"
import { useParams } from 'react-router-dom'

function UserList() {
    const { id } = useParams()
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchData() {
            const options = { method: 'GET' }
            const usersResponse = await fetch('http://localhost:3000/api/users', options)
            const usersData = await usersResponse.json()
            setUsers(usersData)
        }
        fetchData()
    }, [])

    const blogList = async () => {
        window.location.assign(`/bloglist/${id}`)
    }

    return (

        <div>
            <h1>The user list</h1>
            {
                users.map(user => {
                    return (
                        <User key={user.id} user={user} />
                    )
                })
            }
            <button type="button" onClick={blogList}>Back to blogs</button>
        </div>
    )
}

export default UserList