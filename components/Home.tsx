import { ImageBackground, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, Typography } from '../styles/index.js'; 
import { StatusBar } from 'expo-status-bar';
import nature from '../assets/nature.jpg';

export default function Home(route) {
  console.log("Home");
  return (
    <SafeAreaView style={Base.container}>
        <View style={Base.home}>
        <ImageBackground source={nature} resizeMode="cover" style={Base.image}>
        <Text style={Typography.title}>I denna app kan du hitta:</Text>
          <Text style={Typography.title}>Trafikinfo</Text>
          <Text style={Typography.title}>Karta och GPS</Text>
          <Text style={Typography.title}>Stationer</Text>
        </ImageBackground>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}