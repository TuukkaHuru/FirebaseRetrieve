import React, { useState, useEffect } from 'react';
import { firestore , MESSAGES, collection, addDoc} from './firebase/Config';
import {  query, onSnapshot } from 'firebase/firestore';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Constants from 'expo-constants';
import { convertFirebaseTimeStampToJS } from './Functions';






export default function App() {
    const [messages, setMessages] = useState([])
    const [ newMessage, setNewMessage] = useState('')

   
    

    useEffect (() =>{
        const q = query(collection(firestore,MESSAGES))

        const unsubscribe = onSnapshot(q,(querySnapshot) => {
            const tempMessages =[]

            querySnapshot.forEach((doc) => {
                const messageObject = {
                    id: doc.id,
                    text: doc.data().text,
                    created: convertFirebaseTimeStampToJS(doc.data().created)
                }
                tempMessages.push(messageObject)
            })
            setMessages(tempMessages)
            
        })
           
        
        return () => {
            unsubscribe()
        }
         
}, [])

return(
    <SafeAreaView style={styles.container}>
        <ScrollView>
            {
                messages.map((message) => (
                    <View style={styles.message} key={message.id}>
                        <Text style={styles.messageInfo}>{message.created}</Text>
                        <Text>{message.text}</Text>
                    </View>              
                      ))
            }
        </ScrollView>
    </SafeAreaView>
)


}

const styles =StyleSheet.create({
    container: {
        paddingTop : Constants.statusBarHeight,
        flex: 1,
        backgroundColor: '#fff',
    },
    message: {
        paddingTop: 10,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#f5f5f5',
        borderColor:'#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10
    },
    messageInfo: {
        fontSize: 12
    }
})