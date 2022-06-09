import { ImageBackground, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base } from '../styles/index.js'; 
import { StatusBar } from 'expo-status-bar';
import nature from '../assets/nature.jpg';
import falkendev from '../assets/FalkenDevLogo.png';

export default function Home(route) {
  console.log("Home");
  return (
    <SafeAreaView style={Base.container}>
        <View style={Base.home}>
        <ImageBackground source={nature} resizeMode="cover" style={Base.image}>
          <Image source={falkendev} style={{marginLeft: 50, marginBottom: 300}}></Image>
        </ImageBackground>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}