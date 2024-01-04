import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import {  Power, ToggleLeft, ToggleRight } from "react-native-feather";
import MQTT from 'sp-react-native-mqtt';

function HomeScreen({ navigation }) {

  const [led1, setLed1] = useState(false);
  const [led2, setLed2] = useState(false);
  const [led3, setLed3] = useState(false);
  const [plug, setPlug] = useState(false);
  const [connected, setConnected] = useState("Not Connected");
  const [mqttClient, setMqttClient] = useState(null);



  useEffect(()=>{
    let id = parseInt(Math.random() * 1000000000000000000000)
    console.log(id);
    MQTT.createClient({
      uri: 'mqtt://broker.hivemq.com:1883',
      clientId:id.toString(),
    }).then(function(client) {
      console.log(client);
      setMqttClient(client);

      client.on('closed', function() {
        console.log('mqtt.event.closed');
      });

      client.on('error', function(msg) {
        console.log('mqtt.event.error', msg);
      });

      client.on('message', function(msg) {
        console.log('mqtt.event.message', msg);
        switch (msg.topic) {
          case "/uwu/iot/led-01":
            console.log(msg.data);
            setLed1(msg.data === "1");
            break;
          case "/uwu/iot/led-02":
            setLed2(msg.data === "1");
            break;
          case "/uwu/iot/led-03":
            setLed3(msg.data === "1");
            break;
          case "/uwu/iot/plug":
            setPlug(msg.data === "1");
            break;
          default:
            break;
        }
        // let msgData = JSON.parse(msg.data)
        // console.log(msgData);
      });

      client.on('connect', function() {
        console.log('connected');
        setConnected("Connected")
        client.subscribe('/uwu/iot/led-01', 0);
        client.subscribe('/uwu/iot/led-02', 0);
        client.subscribe('/uwu/iot/led-03', 0);
        client.subscribe('/uwu/iot/plug', 0);
        setMqttClient(client)
      });

      client.connect();
    }).catch(function(err){
      console.log(err);
    });
  },[])

  console.log(mqttClient);

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <View style={[ styles.connectedCard,{
        height: 70,
        borderWidth:1,
        borderRadius: 9,
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row",
        marginBottom:16,
        borderColor:"#e9e9e9",
        marginHorizontal:16,

      }]}>
        <View style={{ height: 7, width: 7, backgroundColor: connected ? "#07dd07" : "#696969", borderRadius: 100 }} />
        <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold",color:"#000" }}> {connected} </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity onPress={() => {
          // setLed1(!led1);

          mqttClient.publish('/uwu/iot/led-01', led1 ? "0":"1", 0, false);
        }}
                          style={[styles.shadow, {
                            backgroundColor: "#FFBFB2",
                            width: "44%",
                            height: 120,
                            borderRadius: 9,
                          }]}>

          <View style={{ padding: 12, flexDirection: "row", justifyContent: "space-between" }}>
            {led1 ? <ToggleRight color={led1 ? "#6cbd6c" : "#a4a4a4"} size={30} /> :
              <ToggleLeft color={led1 ? "#fff" : "#a4a4a4"} size={30} />}
            <Power color={led1 ? "#6cbd6c" : "#a4a4a4"} size={25} />
          </View>
          <View style={{ marginTop: 20, margin: 12 }}>
            <Text style={{ color: "#000", fontWeight: "bold" }}> Led 1 </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 12, marginTop: 6 }}>
              <View style={{ height: 7, width: 7, backgroundColor: led1 ? "#07dd07" : "#696969", borderRadius: 100 }} />
              <Text style={{ color: "#000", fontSize: 12 }}> {led1 ? "On" : "Off"} </Text>

            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          // setLed2(!led2);
          mqttClient.publish('/uwu/iot/led-02', led2 ? "0":"1", 0, false);
        }}
                          style={[styles.shadow, {
                            backgroundColor: "#FFDFA8",
                            width: "44%",
                            height: 120,
                            borderRadius: 9,
                          }]}>
          <View style={{ padding: 12, flexDirection: "row", justifyContent: "space-between" }}>
            {led2 ? <ToggleRight color={led2 ? "#6cbd6c" : "#a4a4a4"} size={30} /> :
              <ToggleLeft color={led2 ? "#fff" : "#a4a4a4"} size={30} />}
            <Power color={led2 ? "#6cbd6c" : "#a4a4a4"} size={25} />
          </View>
          <View style={{ marginTop: 20, margin: 12 }}>
            <Text style={{ color: "#000", fontWeight: "bold" }}> Led 2 </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 12, marginTop: 6 }}>
              <View style={{ height: 7, width: 7, backgroundColor: led2 ? "#07dd07" : "#696969", borderRadius: 100 }} />
              <Text style={{ color: "#000", fontSize: 12 }}> {led2 ? "On" : "Off"} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 24 }}>
        <TouchableOpacity onPress={() => {
          // setLed3(!led3);
          mqttClient.publish('/uwu/iot/led-03', led3 ? "0":"1", 0, false);
        }}
                          style={[styles.shadow, {
                            backgroundColor: "#CBE7FF",
                            width: "44%",
                            height: 120,
                            borderRadius: 9,
                          }]}>
          <View style={{ padding: 12, flexDirection: "row", justifyContent: "space-between" }}>
            {led3 ? <ToggleRight color={led3 ? "#6cbd6c" : "#a4a4a4"} size={30} /> :
              <ToggleLeft color={led3 ? "#fff" : "#a4a4a4"} size={30} />}
            <Power color={led3 ? "#6cbd6c" : "#a4a4a4"} size={25} />
          </View>
          <View style={{ marginTop: 20, margin: 12 }}>
            <Text style={{ color: "#000", fontWeight: "bold" }}> Led 3 </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 12, marginTop: 6 }}>
              <View style={{ height: 7, width: 7, backgroundColor: led3 ? "#07dd07" : "#696969", borderRadius: 100 }} />
              <Text style={{ color: "#000", fontSize: 12 }}> {led3 ? "On" : "Off"} </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          mqttClient.publish('/uwu/iot/plug', plug ? "0":"1", 0, false);
          // setPlug(!plug);
        }}
                          style={[styles.shadow, {
                            backgroundColor: "#DAFFC6",
                            width: "44%",
                            height: 120,
                            borderRadius: 9,
                          }]}>
          <View style={{ padding: 12, flexDirection: "row", justifyContent: "space-between" }}>
            {plug ? <ToggleRight color={plug ? "#6cbd6c" : "#a4a4a4"} size={30} /> :
              <ToggleLeft color={plug ? "#fff" : "#a4a4a4"} size={30} />}
            <Power color={plug ? "#6cbd6c" : "#a4a4a4"} size={25} />
          </View>
          <View style={{ marginTop: 20, margin: 12 }}>
            <Text style={{ color: "#000", fontWeight: "bold" }}> Plug </Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 12, marginTop: 6 }}>
              <View style={{ height: 7, width: 7, backgroundColor: plug ? "#07dd07" : "#696969", borderRadius: 100 }} />
              <Text style={{ color: "#000", fontSize: 12 }}> {plug ? "On" : "Off"} </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  connectedCard: {
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#3a3451",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
    zIndex:100,

  }
});
