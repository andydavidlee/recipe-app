// Hit the favorite icon in the MealDetailsScreen.js and the meal selected will appear in this menu

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import MealList from '../components/MealList'
import HeaderButton from '../components/HeaderButton'

const FavouritesScreen = (props) => {
	const favMeals = useSelector((state) => state.meals.favoriteMeals)

	if (favMeals.length === 0 || !favMeals) {
		return (
			<View style={styles.content}>
				<Text>No favorite meals found. Start adding some!</Text>
			</View>
		)
	}

	return <MealList listData={favMeals} navigation={props.navigation} />
}
FavouritesScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Your Favourites',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Menu'
					iconName='ios-menu'
					onPress={() => {
						navData.navigation.toggleDrawer()
					}}
				/>
			</HeaderButtons>
		),
	}
}

const styles = StyleSheet.create({
	content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})

export default FavouritesScreen
