import { clear as clearGraphics } from "./graphic";

export interface IJob {
  work: (progress: number) => void;
}

const jobs: IJob[] = [];

let lastRender = 0;
const loop = (timestamp: number) => {
  var progress = timestamp - lastRender;

  clearGraphics();

  jobs.forEach(j => j.work(progress));

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

export const start = () => {
  window.requestAnimationFrame(loop);
};

export const addJob = (job: IJob) => {
  jobs.push(job);
};
