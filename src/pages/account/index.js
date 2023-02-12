// Imports
import { logout, useAuth } from "../../firebase"
import { Navigate } from "react-router-dom";

// components
import { AccountBackground } from "../../components/account.background";

// css
import "../../style/account/default.css"
import "../../style/account/auth.css"

export function AccountIndex() {
    const currentUser = useAuth(null);

    function handleLogout() {
        logout();
    }

    return <>
        {currentUser === null && <Navigate to="/account/login" />}
        {currentUser && <>
            <section className="account auth" id="index">
                <div className="container">
                    <button onClick={() => handleLogout()}>Logout</button>
                </div>
                <AccountBackground />
            </section>
        </>}
    </>
}