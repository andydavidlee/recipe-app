// The categories for the meal types are displayed here

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import HeaderButton from '../components/HeaderButton'

const CategoriesScreen = (props) => {
	const renderGridItem = (itemData) => {
		return (
			<CategoryGridTile
				color={itemData.item.color}
				title={itemData.item.title}
				onSelect={() => {
					props.navigation.navigate('CategoryMeals', {
						categoryId: itemData.item.id,
					})
				}}
			/>
		)
	}

	return (
		<FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
	)
}

// You can use 'push' instead of 'navigate' in order to reload the page you are on but with new content (Like dropbox for example).
{
	/* <Button title="Go Back" onPress={() => {
    props.navigate.goBack()
}} /> */
}
// The 'goBack' allows the user to go back to the previous page and save and changes on the present page eg. form details will be saved.
// navigation.pop() like 'goBack' but only used in stack navigator
// navigation.replace(); changes the screen rather than adding to the stack. It has no back button either. This is good for login screens for example where they don't need to go back once they have logged in.

CategoriesScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Meal Categories',
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

export default CategoriesScreen
