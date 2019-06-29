import { RESTAURANT_DATA, HAS_GEOLOCATION, UPDATE_USER_COORDS } from '../actions/action_types';

const initialState = {
  restaurant: {
    name: null,
    coordinates: null,
    url: null
  },
  user: {
    hasGeolocation: false,
    coordinates: null,
    center: null,
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case RESTAURANT_DATA:
      return action.data
    case HAS_GEOLOCATION:
      return {
        ...state,
        user: {
          ...state.user,
          hasGeolocation: action.bool,
        }
      }
    case UPDATE_USER_COORDS:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        }
      }
    default:
      return state
  }
}