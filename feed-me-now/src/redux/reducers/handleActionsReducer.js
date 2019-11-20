import {
  RESTAURANT_DATA,
  HAS_GEOLOCATION,
  UPDATE_USER_COORDS,
  GET_RESTAURANT_FAIL,
  GET_RESTAURANT_SUCCESS,
} from '../actions/action_types';

const initialState = {
  restaurant: {
    name: null,
    coordinates: null,
    url: null,
  },
  user: {
    hasGeolocation: false,
    coordinates: null,
    center: null,
  },
  hasError: false,
  errorMsg: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RESTAURANT_DATA:
      return action.data;
    case HAS_GEOLOCATION:
      return {
        ...state,
        user: {
          ...state.user,
          hasGeolocation: action.bool,
        },
      };
    case GET_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurant: {
          name: action.response.name,
          address: action.response.location.display_address,
          coordinates: action.response.coordinates,
          url: action.response.url,
        },
      };
    case GET_RESTAURANT_FAIL:
      return {
        ...state,
        hasError: true,
        errorMsg: action.error,
      };
    case UPDATE_USER_COORDS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
