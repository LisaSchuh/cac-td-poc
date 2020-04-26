export const sendStatusChangedEvent = (crystals: number) => {
  let event = new CustomEvent("statusChanged", {
    detail: {
      crystals: crystals,
    },
  });
  document.body.dispatchEvent(event);
};

export const registerStatusChangedEvent = (fn: (crystals: number) => void) => {
  document.body.addEventListener("statusChanged", (e: any) => {
    fn(e.detail.crystals);
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
    fn(e.detail.name, e.detail.active);
  });
};
