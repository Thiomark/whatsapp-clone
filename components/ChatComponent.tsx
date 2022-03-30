import React from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import tw from "tailwind-react-native-classnames"
import { Chat } from "../types"
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useNavigation } from '@react-navigation/native';

const ChatComponent: React.FC<Chat> = ({id, lastMessage, user}) => {
    const navigate = useNavigation();

    const click = () => {
        navigate.navigate('ChatRoom', {user});
    }

    return (
        <TouchableOpacity onPress={click} style={tw`p-2 flex flex-row items-center`}>
            <View style={tw`h-14 w-14 rounded-full`}>
                <Image
                    style={[tw`rounded-full`, {width: '100%', height: '100%'}]}
                    source={user.profile ? {uri: user.profile} : require('../assets/avator.jpg')}
                />
            </View>
            {/* <View style={tw`bg-green-500 h-14 rounded-full w-14`}/> */}
            <View style={tw`flex-1 ml-3`}>
               <View style={tw`flex flex-row items-center justify-between`}>
                    <Text style={[{fontSize: 16}, tw`font-bold`]}>{user.name}</Text>
                    <Text style={tw`text-gray-400`}>{formatDistanceToNow(Date.now())}</Text>
               </View>
               <Text numberOfLines={1} style={tw`text-gray-600`}>{lastMessage.content}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ChatComponent