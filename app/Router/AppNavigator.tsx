import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterPage from '../Container/RegisterPage';
import LoginPage from '../Container/LoginPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {

    // const TabBar = () => {
    //     return (
    //         <>
    //             <Tab.Navigator
    //                 initialRouteName='Search'
    //                 screenOptions={{
    //                     tabBarLabelStyle: { display: 'none' },
    //                     tabBarStyle: {
    //                         backgroundColor: 'rgba(0, 0, 0, 0.5)',
    //                         borderTopWidth: 0,
    //                         position: 'absolute',
    //                         height: 64
    //                     },
    //                     tabBarItemStyle: {
    //                         backgroundColor: 'rgba(0, 0, 0, 0.5)'
    //                     },
    //                     tabBarHideOnKeyboard: true
    //                 }}
                    
    //             >
    //                 <Tab.Screen
    //                     name='Search' component={SearchPage} options={{
    //                         tabBarIcon: ({ focused }) => {
    //                             const colorFocused = focused ? '#FFF' : '#B8AFB2'
    //                             const iconName = focused ? 'search' : 'search-plus'
    //                             return (
    //                                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //                                     <FontAwesome name={iconName} color={colorFocused} size={24} />
    //                                     <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Search</Text>
    //                                 </View>
    //                             )
    //                         },
    //                         headerShown: false
    //                     }}
    //                 />
    //                 <Tab.Screen
    //                     name='Favorites' component={FavoritesPage} options={{
    //                         tabBarIcon: ({ focused }) => {
    //                             const colorFocused = focused ? '#FFF' : '#B8AFB2'
    //                             const iconName = focused ? 'heart' : 'heart-o'
    //                             return (
    //                                 <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //                                     <FontAwesome name={iconName} color={colorFocused} size={24} />
    //                                     <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Favorites</Text>
    //                                 </View>
    //                             )
    //                         },
    //                         headerShown: false
    //                     }}
    //                 />
    //             </Tab.Navigator>
    //         </>
    //     )
    // }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LoginPage'>
                <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
                <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;