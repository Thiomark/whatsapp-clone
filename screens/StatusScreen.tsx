import tw from 'tailwind-react-native-classnames';
import { Text, View } from '../components/Themed';
import { TouchableOpacity, Image } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import Colors from '../constants/Colors';

export default function StatusScreen() {
    return (
        <View style={tw`flex-1 p-4`}>
            <TouchableOpacity style={tw`pb-4 flex flex-row items-center`}>
                <View style={tw`h-14 w-14 rounded-full`}>
                    <Image
                        style={[tw`rounded-full`, {width: '100%', height: '100%'}]}
                        source={require('../assets/avator.jpg')}
                    />
                    <View style={[{backgroundColor: "#308F56"}, tw`absolute border-2 border-white h-6 w-6 rounded-full flex items-center justify-center -bottom-1 -right-1`]}>
                        <Text style={[{color: 'white'}, tw``]}>+</Text>
                    </View>
                </View>
                <View style={tw`flex-1 ml-3`}>
                <View style={tw`flex flex-row items-center justify-between`}>
                        <Text style={[{fontSize: 16}, tw`font-bold`]}>My status</Text>
                </View>
                    <Text numberOfLines={1} style={tw`text-gray-600`}>Tap to add status update</Text>
                </View>
            </TouchableOpacity>
            <Text numberOfLines={1} style={tw`text-gray-600 font-semibold`}>Recent updates</Text>
        </View>
    );
}
