function User({ user }) {
    const bannedStatus = user.banned.toString()
    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.bio}</p>
            <p>{user.role}</p>
            <p>Banned status: {bannedStatus}</p>
            <button type="button">Ban</button>
            <button type="button">Unban</button>
        </div>
    )
}

export default User