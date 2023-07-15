import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

type ButtonProps = {
  text: string;
  onPress: any;
}

export default function ButtonComponent(props: ButtonProps) {
  return (
    <TouchableOpacity 
      className="rounded-full bg-sky-500 p-1 w-full font-regular"
      onPress={props.onPress}
    >
      <Text className="text-white text-center text-lg font-regular">{props.text}</Text>
    </TouchableOpacity>
  )
}