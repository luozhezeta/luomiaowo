import { Hero } from "../components/Hero";
import { Projects } from "../components/Projects";
import { Posts } from "../components/Posts";
import { About } from "../components/About";

export function ProfilePage() {
  return (
    <>
      <Hero />
      <Projects />
      <Posts />
      <About />
    </>
  );
}
