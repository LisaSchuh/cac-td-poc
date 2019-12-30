import { IPosition } from "@models/types";

export const getScreenWidth = () => {
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
};

export const getScreenHeight = () => {
  return (
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  );
};

export const getCanvasElement = (): HTMLCanvasElement => {
  return <HTMLCanvasElement>document.getElementById("canvas");
};

export const getCursorPosition = (event: MouseEvent): IPosition => {
  const rect = getCanvasElement().getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
};
