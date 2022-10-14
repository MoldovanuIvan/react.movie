import {useState} from "react";

export function useCoolDown(callback = (...args) => {}, timeout = 400) {

    const [timer, setTimer] = useState(0)

    return (...args) => {
        if (timer)
            clearTimeout(timer)

        const newTimer = setTimeout(() => {
            return callback(...args)
        }, timeout)

        setTimer(newTimer)
    }
}