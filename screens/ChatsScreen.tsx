import { FlatList, StyleSheet } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import ChatComponent from '../components/ChatComponent';
import { Text, View } from '../components/Themed';
import { Chat, RootTabScreenProps } from '../types';

const a = [1,2,3,4]

const currentChat: Chat = {
    id: 'sddff',
    user: {
        name: 'Itumeleng',
        id: 'sd',
        lastSeen: 123455,
    },
    lastMessage: {
        id: 'sd',
        content: 'I was realy there bro was realy there bro was realy there bro',
        createdAt: Date.now()
    }
}

const ChatsScreen = ({ navigation }: RootTabScreenProps<'Chats'>) => {
    return (
        <View style={tw`flex-1`}>
            <FlatList 
                data={a}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                        <ChatComponent user={currentChat.user} id="hhd7dhd78d" lastMessage={currentChat.lastMessage}/>
                    )
                }}
            />

            
        </View>
    );
}

export default ChatsScreen;
