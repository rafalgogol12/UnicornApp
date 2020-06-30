import { REQUEST, SUCCESS, FAILURE, CLEAR } from "../consts";

export const initialEmptyData = {
  data: null,
  isFetching: false,
  error: false,
};

const apiReducer = (type) => {
  const makeType = (param) => [param + REQUEST, param + SUCCESS, param + FAILURE, param + CLEAR];
  const [REQUEST_TYPE, SUCCESS_TYPE, FAILURE_TYPE, CLEAR_TYPE] = makeType(type);

  return (state = initialEmptyData, action) => {
    switch (action.type) {
      case REQUEST_TYPE:
        return {
          ...state,
          isFetching: true,
        };
      case SUCCESS_TYPE: {
        return {
          isFetching: false,
          error: false,
          data: action.data,
        };
      }
      case FAILURE_TYPE:
        return {
          ...state,
          error: action.error,
          isFetching: false,
        };
      case CLEAR_TYPE:
        return initialEmptyData;
      default:
        return state;
    }
  };
};

export default apiReducer;
