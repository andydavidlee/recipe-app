// Main Navigation Component

// import react and react native components
import React from 'react'
import { Text, Platform } from 'react-native'

import { createAppContainer } from 'react-navigation'

// 3 main navigation options for React Native. Stack, Tab and Drawer
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

// Extras for the tab navigation
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../constants/Colors'

// Import Screens
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailsScreen from '../screens/MealDetailsScreen'
import FavouritesScreen from '../screens/FavouritesScreen'
import FiltersScreen from '../screens/FiltersScreen'

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
}

const MealsNavigator = createStackNavigator(
	{
		Categories: CategoriesScreen,
		CategoryMeals: CategoryMealsScreen,
		MealDetail: MealDetailsScreen,
	},
	{
		// Ctrl + space bar to discover what other options you can configure
		defaultNavigationOptions: defaultStackNavOptions,
	}
)

// Optional way - keeps this in one file rather than writing into each component file.
//     Categories: CategoriesScreen,
//     CategoryMeals: CategoryMealsScreen,
//     MealDetail:{
//             screen: MealDetailsScreen,
//             navigationOptions:
//                 headerStyle: {
//                     backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
//                 },
//                 headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
//         }
//     }

const FavNavigator = createStackNavigator(
	{
		Favorites: FavouritesScreen,
		MealDetails: MealDetailsScreen,
	},
	{ defaultNavigationOptions: defaultStackNavOptions }
)

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarLabel: 'Meals!',
			tabBarIcon: (tabInfo) => {
				return (
					<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
				)
			},
			tabBarColor: Colors.primaryColor,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans' }}>Meals</Text>
				) : (
					'Meals'
				),
		},
	},
	Favourites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarLabel: 'Favourites!',
			tabBarIcon: (tabInfo) => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans' }}>Favourites</Text>
				) : (
					'Favourites'
				),
		},
	},
}

const FiltersNavigator = createStackNavigator(
	{
		Filters: FiltersScreen,
	},
	{ defaultNavigationOptions: defaultStackNavOptions }
)

const MealsFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: 'white',
				shifting: true,
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					labelStyle: {
						fontFamily: 'open-sans-bold',
					},
					activeTintColor: Colors.accentColor,
				},
		  })

const MainNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealsFavTabNavigator,
			navigationOptions: {
				drawerLabel: 'Meals',
			},
		},
		FiltersScreen: FiltersNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.accentColor,
			labelStyle: {
				fontFamily: 'open-sans-bold',
				paddingTop: 20,
			},
		},
	}
)

export default createAppContainer(MainNavigator)
