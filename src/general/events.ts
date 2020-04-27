export const sendStatusChangedEvent = (crystals: number, health: number) => {
  let event = new CustomEvent("statusChanged", {
    detail: {
      crystals,
      health,
    },
  });
  document.body.dispatchEvent(event);
};

export const registerStatusChangedEvent = (
  fn: (crystals: number, health: number) => void
) => {
  document.body.addEventListener("statusChanged", (e: Event) => {
    e.stopPropagation();
    fn((e as any).detail.crystals, (e as any).detail.health);
  });
};

export const sendLogEvent = (message: string) => {
  let event = new CustomEvent("log", {
    detail: {
      message,
    },
  });
  document.body.dispatchEvent(event);
};

export const registerLogEvent = (fn: (message: string) => void) => {
  document.body.addEventListener("log", (e: Event) => {
    fn((e as any).detail.message);
  });
};

export const sendActionToggledEvent = (action: string, active: boolean) => {
  let event = new CustomEvent("actionToggled", {
    detail: {
      name: action,
      active,
    },
  });
  document.body.dispatchEvent(event);
};

export const registerActionToggledEvent = (
  fn: (action: string, active: boolean) => void
) => {
  document.body.addEventListener("actionToggled", (e: any) => {
    e.stopPropagation();
    fn((e as any).detail.name, e.detail.active);
  });
};
