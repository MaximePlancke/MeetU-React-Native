import { createSelector } from 'reselect'


const getCategories = (state) =>  state.categories
const getConfig = (state) =>  state.config

export const getSelectorCategories = createSelector(
  [ getCategories, getConfig ],
  (categoriesList, config) => ({categories: config.categories.map(id => categoriesList[id])})
)