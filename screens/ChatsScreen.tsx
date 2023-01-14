import { FlatList } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ChatComponent from '../components/ChatComponent';
import { View } from '../components/Themed';
import { Chat, RootTabScreenProps } from '../types';

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
            id: 'sd',
            content: 'I was realy there bro was realy there bro was realy there bro',
            createdAt: Date.now()
        }
    },
    {
        id: 'sddff',
        user: {
            name: 'Thabo',
            id: 'sd',
            lastSeen: 123455,
            profile: 'https://images.pexels.com/photos/10840765/pexels-photo-10840765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        },
        lastMessage: {
            id: 'sd',
            content: 'I was realy there bro was realy there bro was realy there bro',
            createdAt: Date.now()
        }
    }
]

const ChatsScreen = ({ navigation }: RootTabScreenProps<'Chats'>) => {
    return (
        <View style={tw`flex-1`}>
            <FlatList 
                data={chatsHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                        <ChatComponent user={item.user} id="hhd7dhd78d" lastMessage={item.lastMessage}/>
                    )
                }}
            />
        </View>
    );
}

export default ChatsScreen;
