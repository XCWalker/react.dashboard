// Imports
import { useState, useRef } from "react";
import { forgot, login, useAuth } from "../../firebase"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

// components
import { AccountBackground } from "../../components/account.background";

// css
import "../../style/account/default.css"
import "../../style/account/unAuth.css"

export function AccountForgot() {
    const currentUser = useAuth(null);
    const [error, setError] = useState();

    const emailRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();

        forgot(emailRef.current.value)
            .then(res => {
                if (res?.error) {
                    setError(res.error)
                }
            })
    }

    return <>
        {currentUser && <Navigate to="/dashboard" />}
        {currentUser === null && <>
            <section className="account unAuth" id="login">
                <div className="container">
                    <form action="" onSubmit={(Event) => { handleSubmit(Event) }}>
                        {!error && <header>
                            <h1>Dashboard</h1>
                        </header>}
                        {error && <span className="error">{error}</span>}
                        <main>
                            <div className="input">
                                <div className="line">
                                    <label htmlFor="email">Email</label>
                                    <Link to="../login">Login</Link>
                                </div>
                                <input type="email" id="email" ref={emailRef} placeholder="example@xcwalker.dev" required />
                            </div>
                            <button type="submit">Reset Password</button>
                        </main>
                    </form>
                </div>
                <AccountBackground />
            </section>
        </>}
    </>
}