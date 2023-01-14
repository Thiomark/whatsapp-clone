import { EvilIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Animated, ColorSchemeName, Image, Pressable, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors'

import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/ChatsScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { Feather } from '@expo/vector-icons'; 
import tw from 'tailwind-react-native-classnames';

const { width } = Dimensions.get('screen');

const CAMERA_TAB_ITEM_WIDTH = width * 0.1;
const NORMAL_TAB_ITEM_WIDTH = width * 0.3;

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

const MyTabBar = ({ state, descriptors, navigation } : any) => {
    const colorScheme = useColorScheme();

    return (
      <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          const tabBarItemWidth = route.name === "Camera" ? CAMERA_TAB_ITEM_WIDTH : NORMAL_TAB_ITEM_WIDTH;
  
          return (
            <TouchableOpacity
                key={route.name}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ 
                    width: tabBarItemWidth,
                    display: 'flex',
                    backgroundColor: Colors[colorScheme].tint,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 5,
                    height: 40 
                }}
            >
                {route.name === "Camera" ? (
                    <Animated.View>
                        <Fontisto name="camera" size={20} color="white" />
                    </Animated.View>
                ) : (
                <Animated.Text style={{ 
                    color: Colors[colorScheme].background, fontWeight: "bold" }}>
                    {label}
                </Animated.Text>
                )}
            </TouchableOpacity>
          );
        })}
        <TabBarIndicator state={state}/>
      </View>
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
            <Stack.Screen 
                name="ChatRoom" 
                component={ChatRoomScreen} 
                options={({route}) => ({ 
                    headerTitle: () => {
                        return (
                            <View style={tw`flex flex-row items-center -ml-8`}>
                                <View style={tw`h-9 w-9 rounded-full mr-3`}>
                                    <Image
                                        style={[tw`rounded-full`, {width: '100%', height: '100%'}]}
                                        source={route.params.user.profile ? {uri: route.params.user.profile} : require('../assets/avator.jpg')}
                                    />
                                </View>
                                <View style={tw`flex justify-center`}>
                                    <Text style={tw`text-white text-lg font-bold`}>{route.params.user.name}</Text>
                                    <Text style={tw`text-xs -my-0.5 pb-0.5 text-gray-100`}>online</Text>
                                </View>
                            </View>
                        )
                    },
                    headerRight: () => {
                        return (
                            <View>
                                <View style={tw`flex flex-row items-center`}>
                                    <TouchableOpacity>
                                        <Ionicons name="ios-videocam" size={23} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={tw`ml-5 mr-4`}>
                                        <Ionicons name="call" size={19} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Feather name="more-vertical" size={22} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                })} 
            />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name="Modal" component={ModalScreen} />
            </Stack.Group>
        </Stack.Navigator>
    );
}

const TopTab = createMaterialTopTabNavigator<RootTabParamList>();

const TabBarIndicator = ({ state }: any) => {
    const [translateValue, setTranslateValue] = React.useState(new Animated.Value(CAMERA_TAB_ITEM_WIDTH));
    const [itemWidth, setItemWidth] = React.useState(NORMAL_TAB_ITEM_WIDTH);
    const colorScheme = useColorScheme();

    const slide = () => {
        setItemWidth(state.routes[state.index].name === "Camera" ? CAMERA_TAB_ITEM_WIDTH : NORMAL_TAB_ITEM_WIDTH);
        const toValue = state.routes[state.index].name === "Camera" ? 0 : state.routes[state.index].name === "Conversations"
        ? CAMERA_TAB_ITEM_WIDTH
        : CAMERA_TAB_ITEM_WIDTH + ((state.index - 1) * NORMAL_TAB_ITEM_WIDTH);
        Animated.timing(translateValue, {
            toValue: toValue,
            duration: 300,
            useNativeDriver: true
        }).start();
    }

    React.useEffect(() => {
        slide();
    }, [state]);

    return (
        <Animated.View
            style={{
                position: 'absolute',
                width: itemWidth,
                borderBottomColor: Colors[colorScheme].background,
                borderBottomWidth: 3,
                bottom: 0,
                transform: [{ translateX: translateValue }]
            }} 
        />
    );

}

const BottomTabNavigator = () => {
    return (
        <TopTab.Navigator
            tabBar={props => <MyTabBar {...props} />}
            initialRouteName="Camera"
        >
            <TopTab.Screen
                name="Camera"
                component={TabOneScreen}
                options={{
                    tabBarIcon: () => <Fontisto style={{width: 50}} name="camera" size={20} color="white" />,
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
