import { MEALS } from '../../data/dummy-data'
import { TOGGLE_FAVORITE } from '../actions/meals'

const initialState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favouriteMeals: [],
}

const mealsReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			const existingIndex = state.favouriteMeals.findIndex(
				(meal) => meal.id === action.mealId
			)
			if (existingIndex >= 0) {
				const updatedFavMeals = [...state.favouriteMeals]
				updatedFavMeals.splice(existingIndex, 1)
				return { ...state, favoriteMeals: updatedFavMeals }
			} else {
				const meal = state.meals.find((meal) => meal.id === action.mealId)
				return { ...state, favoriteMeals: state.favouriteMeals.concat(meal) }
			}
		default:
			return state
	}
}

export default mealsReducer
