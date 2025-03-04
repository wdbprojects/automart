import DarkMode from "@/components/shared/dark-mode";
import Test from "@/components/shared/test";

export default function Home() {
  return (
    <div>
      <h1 className="text-primary font-semibold text-2xl">Welcome Home</h1>
      <DarkMode />
      <Test />
    </div>
  );
}
