import { createSelector } from 'reselect'


const getProfile = (state) =>  state.profile

const getCategories = (state) =>  state.categories



export const getSelectorGeneralProfile = createSelector(
	[ getProfile ],
	(profile) => {
		const { name, username, bio, gender, loading } = profile
		return { name, username, bio, gender, loading } 
	}
)


export const getSelectorPasswordProfile = createSelector(
	[ getProfile ],
	(profile) => {
		const { password, confirmPassword, loading } = profile
		return { password, confirmPassword, loading } 
	}
)

export const getSelectorCategoriesProfile = createSelector(
	[ getCategories, getProfile ],
	(categoriesList, profile) => categoriesList[profile.selectedCategory]
)