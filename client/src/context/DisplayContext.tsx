import React, { createContext, useReducer, useContext, Dispatch } from "react";

type DisplayAction =
  | { type: "SHOW_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "START_LOADING" }
  | { type: "STOP_LOADING" };

interface DisplayState {
  showModal: boolean;
  isLoading: boolean;
}

const initialState: DisplayState = {
  showModal: false,
  isLoading: false,
};

const DisplayContext = createContext<
  | {
      displayState: DisplayState;
      displayDispatch: Dispatch<DisplayAction>;
    }
  | undefined
>(undefined);

const displayReducer = (
  state: DisplayState,
  action: DisplayAction
): DisplayState => {
  switch (action.type) {
    case "SHOW_MODAL":
      return { ...state, showModal: true };
    case "CLOSE_MODAL":
      return { ...state, showModal: false };
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "STOP_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export const DisplayProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [displayState, displayDispatch] = useReducer(
    displayReducer,
    initialState
  );

  return (
    <DisplayContext.Provider value={{ displayState, displayDispatch }}>
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplayContext = () => {
  const context = useContext(DisplayContext);

  if (context === undefined) {
    throw new Error("useDisplayContext must be used within a Displayrovider");
  }

  return context;
};
