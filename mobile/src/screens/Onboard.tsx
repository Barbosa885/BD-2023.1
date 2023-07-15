import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Types';
import Onboarding from '../components/Onboarding';

type OnboardScreenProps = NativeStackScreenProps<RootStackParamList, "Onboarding">;

const Slides = [
  {
    id: 1,
    title: "Bem vindo ao Unb Labs",
    description: "O Unb Labs é um aplicativo que te ajuda a encontrar laboratórios disponíveis na UnB",
    image: require("../assets/onboard/feedback.svg")
  },
  {
    id: 2,
    title: "Encontre laboratórios",
    description: "Encontre laboratórios disponíveis na UnB",
    image: require("../assets/onboard/reviews.svg")
  }
]

export default function Onboard({ navigation }: OnboardScreenProps) {
  const renderItem = ({ item }) => (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Image source={item.image} />
    </View>
  )

  return (
    <View className="flex-1 items-center justify-center">
      <FlatList data={Slides} renderItem={renderItem} />
    </View>
  )
}

