import { CircleCheckBig } from "lucide-react";

const DialogSuccess = ({ message }: { message: string }) => {
  return (
    <div className="text-destructive !bg-destructive/15 animate-collapsible-down !mt-4 flex w-full items-center gap-x-2 rounded-md px-2 py-2 text-sm transition-all">
      <CircleCheckBig className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default DialogSuccess;
