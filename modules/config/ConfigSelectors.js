import { createSelector } from 'reselect'


const getConfig = (state) =>  state.config

export const getSelectorConfig = createSelector(
  [ getConfig ],
  (config) => config
)