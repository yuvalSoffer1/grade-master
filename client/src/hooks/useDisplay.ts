import { useDisplayContext } from "../context/DisplayContext";

export enum DisplayType {
  SHOW_MODAL = "SHOW_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  START_LOADING = "START_LOADING",
  STOP_LOADING = "STOP_LOADING",
}

export const useDisplay = () => {
  const { displayDispatch } = useDisplayContext();

  const displayManager = (display: DisplayType) => {
    displayDispatch({ type: display });
  };
  return { displayManager };
};
