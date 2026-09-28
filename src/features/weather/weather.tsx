import { useEffect, useState } from "react";
import type { CurrentCondition, WeatherResponse } from "./types";
import { weatherUrl } from "./api";
type tempInfo = Pick<CurrentCondition, 'temp_C' | 'FeelsLikeC'>

export default function Weather() {
    const [temperature, setTemperature] = useState<tempInfo | null>(null);

    useEffect(() => {

        const contrtoller = new AbortController();
        fetch(weatherUrl('dhaka'), { signal: contrtoller.signal })
            .then((res) => {
                if (res.status !== 200) throw new Error(`http response: ${res.status}`);
                return res.json();
            })
            .then((data: WeatherResponse) => {
                setTemperature(data.current_condition[0]);
            })
            .catch(error => {
                if (error.name === 'AbortError') return;
                console.error(error)
            })
        return () => contrtoller.abort();
    }, [])

    return <div>
        <h4>Dhaka Weather </h4>
        <h5>Current Temperature: {temperature?.temp_C}°C</h5>
        <h5>FeelsLike: {temperature?.FeelsLikeC}°C</h5>
    </div>
}