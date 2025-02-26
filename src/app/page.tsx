import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-primary font-semibold text-2xl">Welcome Home</h1>
      <Button variant="default" className="cursor-pointer">
        Add Money
      </Button>
    </div>
  );
}
