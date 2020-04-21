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

export const getCanvasContext = (): CanvasRenderingContext2D => {
  return getCanvasElement().getContext("2d");
};
