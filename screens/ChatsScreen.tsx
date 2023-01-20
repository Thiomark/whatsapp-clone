import { FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ChatComponent from '../components/ChatComponent';
import { View } from '../components/Themed';
import { Chat, RootTabScreenProps } from '../types';
import { Fontisto } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const chatsHistory: Array<Chat> = [
    {
        id: 'fghjas',
        user: {
            name: 'Itumeleng',
            id: 'sd',
            lastSeen: 123455,
            profile: 'https://images.pexels.com/photos/10840765/pexels-photo-10840765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        lastMessage: {
            id: 'sdfwe',
            content: 'amet consectetur adipisicing elit. Nemo soluta',
            createdAt: Date.now()
        }
    },
    {
        id: 'sddff',
        user: {
            name: 'Thabo',
            id: 'swerd',
            lastSeen: 123455,
            // profile: 'https://images.pexels.com/photos/10840765/pexels-photo-10840765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        lastMessage: {
            id: 'sd',
            content: 'soluta nulla nesciunt ab',
            createdAt: 34
        }
    }
]

const ChatsScreen = ({ navigation }: RootTabScreenProps<'Chats'>) => {
    return (
        <View style={tw`flex-1 relative`}>
            <FlatList 
                data={chatsHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                        <ChatComponent user={item.user} id="hhd7dhd78d" lastMessage={item.lastMessage}/>
                    )
                }}
            />
            <TouchableOpacity style={[tw`absolute bottom-6 right-6 rounded-full h-14 w-14 flex items-center justify-center`, {backgroundColor: Colors.light.tint}]}>
                <Fontisto name="camera" size={20} color="white" />
            </TouchableOpacity>
        </View>
    );
}

export default ChatsScreen;
