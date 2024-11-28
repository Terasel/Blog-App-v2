import { useEffect, useState } from "react"

function UserEdit() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')

    const submitData = async (e) => {
        e.preventDefault()
        // const userL = {
        //     name, email, bio
        // }
        // const response = await fetch('http://localhost:3000/api/login', {
        //     method: 'POST',
        //     credentials: "include",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(userL)
        // })
        const user = {
            name, email, bio
        }
        console.log(user)
        const cookie = document.cookie
        const update = await fetch(`http://localhost:3000/api/users/${cookie.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Cookie': cookie },
            body: JSON.stringify(user)
        })
        console.log(update)
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
                    required
                    onChange={(e) => setName(e.target.value)} />
                <label>User email:</label>
                <input
                    type="text"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)} />
                <label>User bio:</label>
                <input
                    type="text"
                    value={bio}
                    required
                    onChange={(e) => setBio(e.target.value)} />
                <button type="submit">Update</button>
            </form>
        </div>
    )


    // return (
    //     <div>
    //         <input type="text" name="name" placeholder="Name placeholder" />
    //         <input type="text" name="email" placeholder="Email placeholder" />
    //         <input type="text" name="bio" placeholder="Bio placeholder" />
    //         <button type="button">Submit changes</button>
    //     </div>
    // )
}

export default UserEdit