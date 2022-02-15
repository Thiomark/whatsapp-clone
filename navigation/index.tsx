import { EvilIcons, FontAwesome, Fontisto } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors'

import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/ChatsScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { Feather } from '@expo/vector-icons'; 
import tw from 'tailwind-react-native-classnames';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.light.tint
                },
                headerTintColor: Colors.light.background,
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerTitleAlign: 'left',
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen 
                name="Root" 
                component={BottomTabNavigator} 
                options={{ 
                    headerTitle: 'Whatsapp', 
                    headerRight: () => {
                        return (
                            <View style={tw`flex items-center flex-row`}>
                                <TouchableOpacity style={tw`mr-4`}>
                                    <EvilIcons name="search" size={28} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Feather name="more-vertical" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                }} 
            />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const TopTab = createMaterialTopTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
    const colorScheme = useColorScheme();

    return (
        <TopTab.Navigator
            initialRouteName="Camera"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].background,
                tabBarStyle: {
                    backgroundColor: Colors[colorScheme].tint
                },
                tabBarIndicatorStyle: {
                    backgroundColor: Colors[colorScheme].background,
                    height: 2
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            <TopTab.Screen
                name="Camera"
                component={TabOneScreen}
                options={{
                    tabBarIcon: () => <Fontisto name="camera" size={20} color="white" />,
                    tabBarLabel: () => null,
                }}
            />
            <TopTab.Screen
                name="Chats"
                component={TabOneScreen}
            />
            <TopTab.Screen
                name="Status"
                component={TabOneScreen}
            />
            <TopTab.Screen
                name="Calls"
                component={TabTwoScreen}
            />
        </TopTab.Navigator>
    );
}
