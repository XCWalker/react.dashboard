// Imports
import { useState, useRef } from "react";
import { login, useAuth } from "../../firebase"
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

// components
import { AccountBackground } from "../../components/account.background";

// css
import "../../style/account/default.css"
import "../../style/account/unAuth.css"

export function AccountLogin() {
    const currentUser = useAuth(null);
    const [error, setError] = useState();

    const emailRef = useRef();
    const passwordRef = useRef();
    const persistanceRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();

        login(emailRef.current.value, passwordRef.current.value, persistanceRef.current.checked)
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
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" ref={emailRef} placeholder="example@xcwalker.dev" required />
                            </div>
                            <div className="input">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" ref={passwordRef} placeholder="" required />
                            </div>
                            <div className="line">
                                <div className="group">
                                    <input type="checkbox" name="rememberMe" id="rememberMe" ref={persistanceRef} />
                                    <label htmlFor="rememberMe" className="checkbox"></label>
                                    <label htmlFor="rememberMe">Remember Me</label>
                                </div>
                                <Link to="../forgot">Forgot Password?</Link>
                            </div>
                            <button type="submit">Login</button>
                        </main>
                    </form>
                </div>
                <AccountBackground />
            </section>
        </>}
    </>
}