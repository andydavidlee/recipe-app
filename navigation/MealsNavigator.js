import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
// import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
// import { createDrawerNavigator } from 'react-navigation-drawer'

// Import Screens
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailsScreen from '../screens/MealDetailsScreen'
import FavouritesScreen from '../screens/FavouritesScreen'
import { Platform } from 'react-native'
import Colors from '../constants/Colors'

const defaultStackNavOptions = { 
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
}

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailsScreen
}, {
    // Ctrl + space bar to discover what other options you can configure
    defaultNavigationOptions: defaultStackNavOptions
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

const FavNavigator = createStackNavigator({
    Favorites: FavouritesScreen,
    MealDetails: MealDetailsScreen
},  {defaultNavigationOptions: defaultStackNavOptions
}
)

const tabScreenConfig = {

    Meals: {screen: MealsNavigator, navigationOptions: {
        tabBarLabel: 'Meals!',
        tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
        },
        tabBarColor: Colors.primaryColor
    }
},
    Favourites: {screen: FavNavigator, navigationOptions: { 
        tabBarLabel: 'Favourites!',
        tabBarIcon: (tabInfo) => {
            return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
        },
        tabBarColor: Colors.accentColor
        }
    }
}

const MealsFavTabNavigator = Platform.OS === 'android' 
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
            activeColor: 'white',
            shifting: true
        }) 
        : createBottomTabNavigator( tabScreenConfig,
    {
        tabBarOptions: {
            activeTintColor: Colors.accentColor,

        }
})

export default createAppContainer(MealsFavTabNavigator)
