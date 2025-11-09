import { useLocation } from "react-router-dom"

function Profile() {
    const location = useLocation();
    const { email, password } = location.state || {};

    return (
        <div>
            <p>{email}</p>
            <p>{password}</p>
        </div>
    )
}

export default Profile