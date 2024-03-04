import React, { useReducer, useEffect, useCallback } from "react";

interface State {
  isRequestInProgress: boolean;
  requestStep: "idle" | "start" | "pending" | "finished";
}

enum ActionType {
  START_REQUEST = "START_REQUEST",
  PENDING_REQUEST = "PENDING_REQUEST",
  FINISH_REQUEST = "FINISH_REQUEST",
  RESET_REQUEST = "RESET_REQUEST",
}

type Action =
  | { type: ActionType.START_REQUEST }
  | { type: ActionType.PENDING_REQUEST }
  | { type: ActionType.FINISH_REQUEST }
  | { type: ActionType.RESET_REQUEST };

const initialState: State = {
  isRequestInProgress: false,
  requestStep: "idle",
};

function requestReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.START_REQUEST:
      return { ...state, isRequestInProgress: true, requestStep: "start" };
    case ActionType.PENDING_REQUEST:
      return { ...state, isRequestInProgress: true, requestStep: "pending" };
    case ActionType.FINISH_REQUEST:
      return { ...state, isRequestInProgress: false, requestStep: "finished" };
    case ActionType.RESET_REQUEST:
      return { ...state, isRequestInProgress: false, requestStep: "idle" };
    default:
      return state;
  }
}

export function RequestComponent() {
  const [requestState, requestDispatch] = useReducer(
    requestReducer,
    initialState
  );

  const startRequest = useCallback(() => {
    requestDispatch({ type: ActionType.START_REQUEST });
    // Імітуємо запит до сервера
    setTimeout(() => {
      requestDispatch({ type: ActionType.PENDING_REQUEST });
      // Імітуємо отримання відповіді від сервера
      setTimeout(() => {
        requestDispatch({ type: ActionType.FINISH_REQUEST });
      }, 2000);
    }, 2000);
  }, []);

  const resetRequest = useCallback(() => {
    requestDispatch({ type: ActionType.RESET_REQUEST });
  }, []);

  useEffect(() => {}, [requestState]);

  return (
    <div>
      <button onClick={startRequest}>Почати запит</button>
      <button onClick={resetRequest}>Скинути запит</button>
      <p>Стан запиту: {requestState.requestStep}</p>
    </div>
  );
}

export default RequestComponent;
