import { HAS_GEOLOCATION, UPDATE_USER_COORDS } from './action_types';

export const handleGeolocation = bool => ({
  type: HAS_GEOLOCATION,
  bool
})

export const updateUserLocation = payload => ({
  type: UPDATE_USER_COORDS,
  payload
})