import { Hero } from "../components/Hero";
import { About } from "../components/About";

export function ProfilePage() {
  return (
    <div className="page-wrap">
      <Hero />
      <About />
    </div>
  );
}
