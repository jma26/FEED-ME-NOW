import { RESTAURANT_DATA } from '../actions';

const initialState = {
  restaurant_name: null,
  restaurant_coordinates: null,
  restaurant_url: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case RESTAURANT_DATA:
      return action.data
    default:
      return state
  }
}