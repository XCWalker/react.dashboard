import { useAuth } from "../firebase"
import { Navigate } from "react-router-dom";

export function Home() {
    const currentUser = useAuth(null);

    return <>
        {currentUser && <Navigate to="/dashboard" />}
        {currentUser === null && <Navigate to="/account/login" />}
    </>
}