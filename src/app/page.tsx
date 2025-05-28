import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Home() {
  return (
    <div>
      <h2>Welcome to love and abundance</h2>
      <Button>Testing ShadCN</Button>
      <DarkMode />
    </div>
  );
}
