import { createSelector } from 'reselect'


const getAuth = (state) =>  state.auth

export const getSelectorAuth = createSelector(
  [ getAuth ],
  (auth) => auth
)