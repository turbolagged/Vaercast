import { LuLoaderCircle } from "react-icons/lu";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-375px)]">
      <LuLoaderCircle className="animate-spin text-lime-600 text-5xl" />
    </div>
  );
}
