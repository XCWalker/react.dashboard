import { useState } from "react"
import { useEffect } from "react"
import { apiUrl } from "../../components/react.radio";
import { reactRadioPlayPause } from "../../radio"

import "../../style/dashboard/index.css"
import "../../style/dashboard/component.css"
import "../../style/dashboard/hero.component.css"
import "../../style/dashboard/radio.component.css"
import { getUserInfo, useAuth } from "../../firebase";

export function DashboardIndex() {
    return <>
        <section className="dashboard" id="index">
            <div className="container">
                <HeroComponent />
                <RadioComponent />
            </div>
        </section>
    </>
}

function HeroComponent() {
    const currentUser = useAuth();
    const [user, setUser] = useState();

    useEffect(() => {
        if (!currentUser) return

        getUserInfo(currentUser.uid)
            .then(res => {
                setUser(res);
            })
    }, [currentUser])

    return <>
        <section className="dashboardComponent" id="hero">
            <div className="container">
                <div className="about">
                    <h1>Welcome back, {user?.about?.firstname}!</h1>
                    <p>Clock in and let's get back to work.</p>
                    <ol className="weather">
                        <li>
                            <span className="material-symbols-outlined">rainy</span>
                            <span className="title">Rainy</span>
                        </li>
                        <li>
                            <span className="material-symbols-outlined">rainy</span>
                            <span className="title">Rainy</span>
                        </li>
                        <li>
                            <span className="material-symbols-outlined">rainy</span>
                            <span className="title">Rainy</span>
                        </li>
                        <li>
                            <span className="material-symbols-outlined">rainy</span>
                            <span className="title">Rainy</span>
                        </li>
                    </ol>
                </div>
                <img src={user?.images?.photoURL} className="profilePicture" alt="" />
            </div>
        </section>
    </>
}

function RadioComponent() {
    // const [dj, setDJ] = useState();
    const [nowPlaying, setNowPlaying] = useState();
    const [ticking, setTicking] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch(apiUrl)
            .then(
                (data) => {
                    data.json().then(res => {
                        setNowPlaying(res.now_playing)
                        // setDJ(res.djs.now)
                    })
                },
                (error) => {
                    console.error(error);
                }
            )
    }, [count])

    useEffect(() => {
        const timer = setTimeout(() => ticking && setCount(count + 1), 10000)
        return () => clearTimeout(timer)
    }, [count, ticking])

    return <section className="dashboardComponent" id="reactRadio">
        <div className="container">
            <div className="about">
                <span className="title">{nowPlaying?.title}</span>
                <span className="subTitle">{nowPlaying?.artists}</span>
            </div>
            <button className="material-symbols-outlined large" onClick={() => { reactRadioPlayPause() }} title="Pause">play_pause</button>
        </div>
        <img src={nowPlaying?.art} alt="" className="background" />
        <a href="https://reactradio.xcwalker.dev/">
            <svg
                width={512}
                height={288.43}
                viewBox="0 0 135.47 76.313"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M34.901-.002v17.006h63.82c4.505 0 7.848.98 10.029 2.942 2.252 1.963 3.379 4.725 3.379 8.286 0 3.488-1.127 6.213-3.38 8.175-2.18 1.962-5.523 2.944-10.029 2.944H34.901V56.03h63.61l13.835 20.276h23.11l-16.468-23.997c4.617-2.221 8.217-5.268 10.8-9.142 2.761-4.216 4.142-9.194 4.142-14.935 0-5.814-1.38-10.83-4.142-15.045-2.762-4.287-6.687-7.558-11.774-9.81-5.014-2.253-11.01-3.38-17.987-3.38z" />
                <path d="M0-.002v17.007h33.575c4.506 0 7.85.98 10.03 2.942 2.252 1.963 3.379 4.725 3.379 8.286 0 3.488-1.127 6.214-3.38 8.176-2.18 1.962-5.523 2.943-10.029 2.943H0v16.68h33.368l13.835 20.276h23.11L53.846 52.311c4.617-2.221 8.217-5.268 10.8-9.142 2.761-4.216 4.142-9.194 4.142-14.935 0-5.814-1.38-10.83-4.142-15.044-2.762-4.288-6.687-7.558-11.774-9.811-5.015-2.253-11.01-3.38-17.987-3.38z" />
            </svg>
        </a>
    </section>
}