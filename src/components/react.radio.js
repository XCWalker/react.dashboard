import { useState } from "react";
import { useEffect } from "react"

export const apiUrl = "https://apiv2.simulatorradio.com/metadata/combined"

export function ReactRadioHover() {
    const [dj, setDJ] = useState();
    const [nowPlaying, setNowPlaying] = useState();
    const [ticking, setTicking] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch(apiUrl)
            .then(
                (data) => {
                    data.json().then(res => {
                        setNowPlaying(res.now_playing)
                        setDJ(res.djs.now)
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

    return <>
        <audio id="radio" src="" crossOrigin="anonymous" />
    </>
}