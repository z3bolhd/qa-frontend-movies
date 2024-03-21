import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size: number;
}

const LoadingSpinner = ({ size }: LoadingSpinnerProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 size={size} color="#000000" className="animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
