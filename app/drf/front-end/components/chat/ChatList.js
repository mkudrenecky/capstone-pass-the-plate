import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';
import { getChatList } from '../helperFunctions/apiHelpers'; 
import AuthContext from '../../context/AuthContext';
import styles from '../profilePage/profilePageStyles';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Image } from 'react-native';

const ChatList = () => {
  const [chatList, setChatList] = useState([]);
  const { authTokens, userId } = useContext(AuthContext);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        if (authTokens) {
          const chats = await getChatList(authTokens);
          console.log('Fetched chat list:', chats);
          setChatList(chats);
        } else {
          //Clearing chatlist when user logs out
          setChatList([]); 
        }
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };
    fetchChatList();
  }, [authTokens]);
  

  const handleFetchAllChats = async () => {
    try {
      const allChats = await getChatList(authTokens); 
      console.log('Fetched all chat lists:', allChats);
    } catch (error) {
      console.error('Error fetching all chat lists:', error);
    }
  };

  const navigateToChat = (chat) => {
    console.log("trying to navigate to chat with id", chat.id);
    navigation.navigate('UserMessages', { chatId: chat.id , receiver: chat.receiver, product: chat.product});
  };

  const formatTime = (timestamp) => {
    const currentTime = moment();
    const messageTime = moment(timestamp);
    const diffHours = currentTime.diff(messageTime, 'hours');
    return `${diffHours} hours ago`;
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      {/* Header Text for testing */}
      
      <FlatList
  data={chatList}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => navigateToChat(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ width: 40, height: 40, borderRadius: 20, overflow: 'hidden' }}>
        <Image
          //actual pfps wont render right now
              //source={item.receiver.profile_picture ? { uri: item.receiver.profile_picture } : require('../../assets/icons/profile.png')}
              source={ require('../../assets/icons/profile.png')}

              style={{ width: '100%', height: '100%' }}
            />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Sender: {item.sender.firstname ?? item.sender.email}</Text>
          <Text>Receiver: {item.receiver.firstname ?? item.receiver.email}</Text>
          <Text>Time: {formatTime(item.timestamp)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
/>
    </View>
  );
};

export default ChatList;