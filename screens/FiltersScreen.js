import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Switch, Platform } from 'react-native'

import HeaderButton from '../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import Colors from '../constants/Colors'

const FilterSwitch = (props) => {
	return (
		<View style={styles.filterContainer}>
			<Text>{props.label}</Text>
			<Switch
				trackColor={{ true: Colors.primaryColor }}
				thumbColor={Platform.OS === 'android' ? Colors.primaryColor : 'white'}
				value={props.state}
				onValueChange={props.onChange}
			/>
		</View>
	)
}

const FiltersScreen = (props) => {
	const { navigation } = props

	const [isGlutenFree, setIsGlutenFree] = useState(false)
	const [isLactoseFree, setIsLactoseFree] = useState(false)
	const [isVegan, setIsVegan] = useState(false)
	const [isVegetarian, setIsVegetarian] = useState(false)

	const saveFilters = useCallback(() => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,
			vegan: isVegan,
			Vegetarian: isVegetarian,
		}
		console.log(appliedFilters)
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian])

	// setParams() causes the component to reuild because its props (the navigation prop) change
	useEffect(() => {
		navigation.setParams({ save: saveFilters })
	}, [saveFilters])

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			<FilterSwitch
				label='Gluten Free'
				state={isGlutenFree}
				onChange={(newValue) => setIsGlutenFree(newValue)}
			/>
			<FilterSwitch
				label='Lactose Free'
				state={isLactoseFree}
				onChange={(newValue) => setIsLactoseFree(newValue)}
			/>
			<FilterSwitch
				label='Vegan'
				state={isVegan}
				onChange={(newValue) => setIsVegan(newValue)}
			/>
			<FilterSwitch
				label='Vegetarian'
				state={isVegetarian}
				onChange={(newValue) => setIsVegetarian(newValue)}
			/>
		</View>
	)
}

// Adds a title to the header
FiltersScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'Filtered Menu',
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
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Save'
					iconName='ios-save'
					onPress={navData.navigation.getParam('save')}
				/>
			</HeaderButtons>
		),
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 10,
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		margin: 20,
		textAlign: 'center',
	},
})

export default FiltersScreen
