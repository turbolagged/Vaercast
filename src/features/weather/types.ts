export interface WeatherResponse {
  current_condition: CurrentCondition[]
}

export interface CurrentCondition {
  FeelsLikeC: string
  FeelsLikeF: string
  cloudcover: string
  humidity: string
  observation_time: string
  precipInches: string
  precipMM: string
  pressure: string
  pressureInches: string
  temp_C: string
  temp_F: string
  uvIndex: string
  visibility: string
  visibilityMiles: string
  weatherCode: string
  weatherDesc: WttrValue[]
  weatherIconUrl: WttrValue[]
  winddir16Point: string
  winddirDegree: string
  windspeedKmph: string
  windspeedMiles: string
}

export interface WttrValue {
  value: string
}