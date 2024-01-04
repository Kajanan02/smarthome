import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { Colors,
} from 'react-native/Libraries/NewAppScreen';
import MQTT from 'sp-react-native-mqtt';
import { SendDirectSms } from 'react-native-send-direct-sms';
import TabsNavigation from "./src/navigation/tabs-navigation";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = React.useState("");
  const [body, setBody] = React.useState("No body");
  const [connected, setConnected] = React.useState("Not Connected");

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  function sendSmsData(mobileNumber, bodySMS) {
    setBody(bodySMS + "sending")
    SendDirectSms(mobileNumber, bodySMS)
      .then((res) => {
        setBody(body + "sent")
      })
      .catch((err) => console.log("catch", err))
  }

  // useEffect(()=>{
  //   let id = parseInt(Math.random() * 100000)
  //   MQTT.createClient({
  //     uri: 'mqtt://broker.hivemq.com:1883',
  //     clientId:id.toString(),
  //   }).then(function(client) {
  //
  //     client.on('closed', function() {
  //       console.log('mqtt.event.closed');
  //     });
  //
  //     client.on('error', function(msg) {
  //       console.log('mqtt.event.error', msg);
  //     });
  //
  //     client.on('message', function(msg) {
  //       console.log('mqtt.event.message', msg);
  //       let msgData = JSON.parse(msg.data)
  //       console.log(msgData);
  //       sendSmsData(msgData.mobileNumber, msgData.body)
  //     });
  //
  //     client.on('connect', function() {
  //       console.log('connected');
  //       setConnected("Connected")
  //       client.subscribe('/ins-subs-msg', 0);
  //     });
  //
  //     client.connect();
  //   }).catch(function(err){
  //     console.log(err);
  //   });
  // },[])
  return (
    <NavigationContainer>
      <TabsNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'green',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
