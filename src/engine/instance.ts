import { clear as clearGraphics } from "./graphic";

export type JobFunc = (progress: number) => void;

const loop = (timestamp: number, lastRender: number, jobs: JobFunc[]) => {
  const progress = timestamp - lastRender;

  clearGraphics();

  jobs.forEach(j => j(progress));

  window.requestAnimationFrame(nextTimestamp =>
    loop(nextTimestamp, timestamp, jobs)
  );
};

export const start = (jobs: JobFunc[]) =>
  window.requestAnimationFrame((timestamp: number) => loop(timestamp, 0, jobs));
