import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ActivityIndicator() {
  return (
    <div className="flex w-full justify-center py-4">
      <AiOutlineLoading3Quarters className="animate-spin text-secondary text-4xl" />
    </div>
  );
}
