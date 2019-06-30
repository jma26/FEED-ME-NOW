import { HAS_GEOLOCATION, UPDATE_USER_COORDS, GET_RESTAURANT_FAIL, GET_RESTAURANT_SUCCESS } from './action_types';
import axios from 'axios';

export const handleGeolocation = bool => ({
  type: HAS_GEOLOCATION,
  bool
})

export const updateUserLocation = payload => ({
  type: UPDATE_USER_COORDS,
  payload
})

export const getRestaurantSuccess = response => ({
  type: GET_RESTAURANT_SUCCESS,
  response
})

export const getRestaurantFail = error => ({
  type: GET_RESTAURANT_FAIL,
  error
})

export const getRestaurantData = (coords) => {
  return (dispatch) => {
    return axios.post('/restaurants', {
      lng: coords.lng,
      lat: coords.lat,
      hasGeolocation: true
    })
    .then((response) => {
      if (response.data.error) {
        dispatch(getRestaurantFail(response.data.error))
      } else {
        dispatch(getRestaurantSuccess(response.data))
      }
    })
    .catch((error) => {
      if (error) {
        dispatch(getRestaurantFail('Error posting to /restaurants'))
      }
    })
  }
}