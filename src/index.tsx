import { useEffect, useReducer } from "react";
import * as ActionTypes from "./constants";
import * as requestTypes from "./requestTypes";
import axios, { AxiosResponse } from "axios";

// reducer setup
const initialfetchState = { data: null, loading: true, error: null };
const initialMutationState = { data: null, loading: false, error: null };
type ACTIONTYPE =
  | { type: "LOADING"; payload?: AxiosResponse<any>; error?: string | null }
  | { type: "SUCCESS"; payload?: AxiosResponse<any>; error?: string | null }
  | { type: "ERROR"; payload?: AxiosResponse<any>; error?: string | null };
const fetchReducer = (state: typeof initialfetchState, action: ACTIONTYPE) => {
  switch (action.type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload?.data,
        error: null,
      };
    case ActionTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
const mutationReducer = (
  state: typeof initialMutationState,
  action: ACTIONTYPE
) => {
  switch (action.type) {
    case ActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload?.data,
        error: null,
      };
    case ActionTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
// data fetching hook
const useFetch = (url: string, headers?: { [key: string]: any }) => {
  const [state, dispatch] = useReducer(fetchReducer, initialfetchState);
  useEffect(() => {
    axios
      .get(
        url,
        headers && {
          headers,
        }
      )
      .then((resp) => {
        dispatch({
          type: ActionTypes.SUCCESS,
          payload: resp,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.ERROR,
          error: err.message,
        });
      });
  }, [url]);
  const refetch = () => {
    dispatch({ type: ActionTypes.LOADING });
    axios
      .get(
        url,
        headers && {
          headers,
        }
      )
      .then((resp) => {
        dispatch({
          type: ActionTypes.SUCCESS,
          payload: resp,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.ERROR,
          error: err.message,
        });
      });
  };
  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refetch,
  };
};
const useMutation = (
  url: string,
  requestType: "post" | "put" | "delete",
  headers?: { [key: string]: any }
) => {
  const [state, dispatch] = useReducer(mutationReducer, initialMutationState);
  const requestHandler = (body: any) => {
    if (typeof body !== "object") {
      console.log("body must be an object");
      return;
    }
    dispatch({
      type: ActionTypes.LOADING,
    });
    if (requestType === requestTypes.POST) {
      axios
        .post(
          url,
          body,
          headers && {
            headers,
          }
        )
        .then((resp) => {
          dispatch({
            type: ActionTypes.SUCCESS,
            payload: resp,
          });
        })
        .catch((error) => {
          dispatch({
            type: ActionTypes.ERROR,
            error: error.message,
          });
        });
    }
    if (requestType === requestTypes.PUT) {
      axios
        .put(
          url,
          body,
          headers && {
            headers,
          }
        )
        .then((resp) => {
          dispatch({
            type: ActionTypes.SUCCESS,
            payload: resp,
          });
        })
        .catch((error) => {
          dispatch({
            type: ActionTypes.ERROR,
            error: error.message,
          });
        });
    }
    if (requestType === requestTypes.DELETE) {
      axios
        .delete(url, {
          data: body,
          headers: headers && headers,
        })
        .then((resp) => {
          dispatch({
            type: ActionTypes.SUCCESS,
            payload: resp,
          });
        })
        .catch((err) => {
          dispatch({
            type: ActionTypes.ERROR,
            error: err.message,
          });
        });
    }
  };
  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    handleRequest: requestHandler,
  };
};
export { useFetch, useMutation };
