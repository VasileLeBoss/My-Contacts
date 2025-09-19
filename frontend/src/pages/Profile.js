function Profile({user, setUser}) {

    return(
        <div className="user-profile">
            <h1>Salut !</h1>
            <pre>
                {user}
            </pre>
            <h2>{user.lastName} {user.firstName}</h2>
        </div>
    )
}

export default Profile;