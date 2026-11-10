import { UV_BY_INDEX } from "../assets/data/uvData";

export default function getUvDetails(uvValue: number) {
  const roundedUvValue = Math.round(uvValue);
  const uvDetails = UV_BY_INDEX[Math.min(roundedUvValue, 11)];
  return { uvValue: roundedUvValue, ...uvDetails };
}
