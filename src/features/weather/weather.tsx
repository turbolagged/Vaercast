import { useEffect, useState } from "react";
import type { CurrentCondition, WeatherResponse } from "./types";
import { weatherUrl } from "./api";
import CitySelect from "./components/City-select";

type tempInfo = Pick<CurrentCondition, 'temp_C' | 'FeelsLikeC'>

export default function Weather() {
    const [temperature, setTemperature] = useState<tempInfo | null>(null);
    const [city, setCity] = useState<string>('dhaka');

    useEffect(() => {

        const controller = new AbortController();
        fetch(weatherUrl(city), { signal: controller.signal })
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
        return () => controller.abort();
    }, [city])

    return (
        <div className="flex items-center justify-center bg-page min-h-screen">
            <div className="w-full max-w-sm rounded-2xl bg-card shadow-md p-6 ring-1 ring-line">
                <h4 className="text-lg font-semibold text-emerslateld-700 capitalize">{city} Weather</h4>
                <p className="mt-4 text-5xl font-bold text-main"> {temperature?.temp_C ?? '--'}°C</p>
                <p className="mt-2 text-sm text-muted">Feels Like {temperature?.FeelsLikeC ?? '--'}°C</p>

                <CitySelect city={city} setCity={setCity} />
            </div>
        </div>
    )
}

