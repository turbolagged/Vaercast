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

    return (
        <div className="flex items-center justify-center bg-page min-h-screen">
            <div className="w-full max-w-sm rounded-2xl bg-card shadow-md p-6 ring-1 ring-line">
                <h4 className="text-lg font-semibold text-emerslateld-700">Dhaka Weather</h4>
                <p className="mt-4 text-5xl font-bold text-main"> {temperature?.temp_C ?? '--'}°C</p>
                <p className="mt-2 text-sm text-muted">Feels Like {temperature?.FeelsLikeC ?? '--'}°C</p>
            </div>
        </div>
    )
}