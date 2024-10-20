import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterPage from '../Container/RegisterPage';
import LoginPage from '../Container/LoginPage';
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// Admin Stack
import SummaryPageAdmin from '../Container/Admins/SummaryPageAdmin';
import UserListPageAdmin from '../Container/Admins/UserListPageAdmin';
import ExchangeRatePage from '../Container/ExchangeRate';
import ProfilePage from '../Container/ProfilePage';

// User Stack
import SummaryPageUser from '../Container/Users/SummaryPageUser';
import ExpensesDetailPageUser from '../Container/Users/ExpensesDetailPageUser';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {

    const TabBarAdmin = () => {
        return (
            <>
                <Tab.Navigator
                    initialRouteName='SummaryPageAdmin'
                    screenOptions={{
                        tabBarLabelStyle: { display: 'none' },
                        tabBarStyle: {
                          backgroundColor: '#505383',
                          borderTopWidth: 0,
                          position: 'absolute',
                          height: 64,
                          flex: 1,
                          shadowColor: '#000',
                          shadowOffset: { width: 1, height: 2 },
                          shadowOpacity: 0.15,
                          shadowRadius: 3,
                          elevation: 5,
                        }
                    }}
                >
                    <Tab.Screen
                        name='SummaryPageAdmin' component={SummaryPageAdmin} options={{
                            tabBarIcon: ({ focused }) => {
                                const colorFocused = focused ? '#FFF' : '#B8AFB2'
                                const iconName = 'graph-pie'
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Foundation name={iconName} color={colorFocused} size={24} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Summary</Text>
                                    </View>
                                )
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name='UserListPageAdmin' component={UserListPageAdmin} options={{
                            tabBarIcon: ({ focused }) => {
                                const colorFocused = focused ? '#FFF' : '#B8AFB2'
                                const iconName = focused ? 'clipboard-list' : 'clipboard-list-outline'
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name={iconName} color={colorFocused} size={24} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>User List</Text>
                                    </View>
                                )
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name='ExchangeRatePage' component={ExchangeRatePage} options={{
                            tabBarIcon: ({ focused }) => {
                                const colorFocused = focused ? '#FFF' : '#B8AFB2'
                                const iconName = 'currency-exchange'
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <MaterialIcons name={iconName} color={colorFocused} size={24} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Rates</Text>
                                    </View>
                                )
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name='ProfilePage' component={ProfilePage} options={{
                            tabBarIcon: ({ focused }) => {
                                const colorFocused = focused ? '#FFF' : '#B8AFB2'
                                const iconName = focused ? 'user' : 'user-o'
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome name={iconName} color={colorFocused} size={24} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Profile</Text>
                                    </View>
                                )
                            },
                            headerShown: false
                        }}
                    />
                </Tab.Navigator>
            </>
        )
    }

    const TabBarUser = () => {
        return (
            <>
                <Tab.Navigator
                    initialRouteName='SummaryPageAdmin'
                    screenOptions={{
                        tabBarLabelStyle: { display: 'none' },
                        tabBarStyle: {
                          backgroundColor: '#505383',
                          borderTopWidth: 0,
                          position: 'absolute',
                          height: 64,
                          flex: 1,
                          shadowColor: '#000',
                          shadowOffset: { width: 1, height: 2 },
                          shadowOpacity: 0.15,
                          shadowRadius: 3,
                          elevation: 5,
                        }
                    }}
                >
                    <Tab.Screen
                        name='SummaryPageUser' component={SummaryPageUser} options={{
                            tabBarIcon: ({ focused }) => {
                                const colorFocused = focused ? '#FFF' : '#B8AFB2'
                                const iconName = 'graph-pie'
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Foundation name={iconName} color={colorFocused} size={24} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Summary</Text>
                                    </View>
                                )
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name='ExpensesDetailPageUser' component={ExpensesDetailPageUser} options={{
                            tabBarIcon: ({ focused }) => {
                                const colorFocused = focused ? '#FFF' : '#B8AFB2'
                                const iconName = 'contactless-payment-circle'
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <MaterialCommunityIcons name={iconName} color={colorFocused} size={24} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Expenses</Text>
                                    </View>
                                )
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name='ExchangeRatePage' component={ExchangeRatePage} options={{
                            tabBarIcon: ({ focused }) => {
                                const colorFocused = focused ? '#FFF' : '#B8AFB2'
                                const iconName = 'currency-exchange'
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <MaterialIcons name={iconName} color={colorFocused} size={24} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Rates</Text>
                                    </View>
                                )
                            },
                            headerShown: false
                        }}
                    />
                    <Tab.Screen
                        name='ProfilePage' component={ProfilePage} options={{
                            tabBarIcon: ({ focused }) => {
                                const colorFocused = focused ? '#FFF' : '#B8AFB2'
                                const iconName = focused ? 'user' : 'user-o'
                                return (
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <FontAwesome name={iconName} color={colorFocused} size={24} />
                                        <Text style={{ fontSize: 12, fontFamily: 'Poppins-SemiBold', color: colorFocused, paddingTop: 4 }}>Profile</Text>
                                    </View>
                                )
                            },
                            headerShown: false
                        }}
                    />
                </Tab.Navigator>
            </>
        )
    }

    const AdminStack = () => {
        return (
            <Stack.Navigator initialRouteName='BottomTabNavigatorAdmin'>
                <Stack.Screen name="BottomTabNavigatorAdmin" component={TabBarAdmin} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    };
    
    const UserStack = () => {
        return (
            <Stack.Navigator initialRouteName='BottomTabNavigatorUser'>
                <Stack.Screen name="BottomTabNavigatorUser" component={TabBarUser} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    };

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LoginPage'>
                <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
                <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ headerShown: false }} />
                <Stack.Screen name="AdminStack" component={AdminStack} options={{ headerShown: false }} />
                <Stack.Screen name="UserStack" component={UserStack} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;