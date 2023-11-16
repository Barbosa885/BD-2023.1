import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import Logo from '../../assets/logo.svg';

import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { AntDesign } from '@expo/vector-icons'; 

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Types';
import api from '../../api';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({navigation}: LoginScreenProps){
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const handleSubmit = async () => {
    try {
      const response = await api.post('/estudante/login', {
        email,
        senha
      })
      console.log(response.data)
      navigation.navigate("Perfil")
    } catch (error) {
      console.log(error)
    } 
  }

  const inputFields = [
  {
    label: "Email Institucional",
    onChangeText: setEmail,
    value: email,
    placeholder: `Matrícula@aluno.unb.br`,
    keyboardType: "email-address",
  },
  {
    label: "Senha",
    onChangeText: setSenha,
    value: senha,
    placeholder: "Digite sua senha",
    keyboardType: "password",
    secureTextEntry: true,
  },
];

  return (
      <View className="flex-1 justify-center p-8 bg-sky-100">
        <TouchableOpacity onPress={() => {}} className="absolute top-0 left-0 pt-16 pl-8">
          <AntDesign name="arrowleft" size={28} color="black"/>
        </TouchableOpacity>
        <View className="items-center mb-14">
          <Logo fill="#212121" width={200} height={60}/>
        </View>
        <View className="bg-sky-200 rounded-lg p-4">
          <View className="mb-6">
            <Text className="text-3xl font-regular">Login</Text>
            <Text className="font-regular">Informe seus dados para o login</Text>
          </View>
          <View>
            {inputFields.map((field, index) => (
              <View className="pb-2" key={index}>
                <InputComponent {...field} />
              </View>
            ))}
          </View>
        </View>
        <View className="space-y-4 mt-10">
          <Text className="text-center font-regular">
            <View className="flex flex-row items-center justify-center">
              <Text>Não tem um conta? </ Text>
              <TouchableOpacity onPress={() => navigation.navigate("Cadastro")} className="text-center"> 
                <Text  className="underline text-blue-700 font-medium">Cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </Text>
          <View className="items-center">
              <ButtonComponent 
                text="Entrar"
                onPress={handleSubmit()}
              />
          </View>
      </View>
    </View>
)}