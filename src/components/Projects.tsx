import { projects, type ProjectIcon } from "../data/site";
import { Reveal } from "./Reveal";
import { ArrowUpRightIcon, LayersIcon, RadarIcon, TerminalIcon } from "./Icons";

const icons: Record<ProjectIcon, typeof RadarIcon> = {
  radar: RadarIcon,
  layers: LayersIcon,
  terminal: TerminalIcon,
};

export function Projects() {
  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="section__head">
        <div>
          <p className="section__kicker">Projects</p>
          <h2 id="projects-title">最近在做的</h2>
        </div>
        <a className="link" href="#projects">
          全部项目
          <ArrowUpRightIcon />
        </a>
      </div>

      <div className="grid">
        {projects.map((project) => {
          const Icon = icons[project.icon];
          return (
            <Reveal key={project.title} className="card project">
              <div className="project__top">
                <span className="icon-tile" aria-hidden="true">
                  <Icon />
                </span>
                <ArrowUpRightIcon className="project__arrow" width={17} height={17} />
              </div>
              <h3 className="project__title">
                <a href={project.href}>{project.title}</a>
              </h3>
              <p className="project__blurb">{project.blurb}</p>
              <ul className="tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
