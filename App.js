// App main component
import React, { useState } from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { enableScreens } from 'react-native-screens'

import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

// Importing Navigation Stack
import MealsNavigator from './navigation/MealsNavigator'
import mealsReducer from './store/reducers/meals'

enableScreens()

// bringing in reducers into a 'root' reducer
const rootReducer = combineReducers({
	meals: mealsReducer,
})

// Root reducer is then placed into the store
const store = createStore(rootReducer)

// Async function returning a promise. Loading the fonts types into the application
const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	})
}

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false)

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		)
	}

	return (
		<Provider store={store}>
			<MealsNavigator />
		</Provider>
	)
}
