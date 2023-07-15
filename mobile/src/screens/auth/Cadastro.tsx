import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons'; 

import Logo from '../../assets/logo.svg';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../Types';

type CadastroScreenProps = NativeStackScreenProps<RootStackParamList, "Cadastro">;

export default function Cadastro({ navigation }: CadastroScreenProps){
  const [registration, setRegistration] = useState('')
  const [email, setEmail] = useState('')
  const [course, setCourse] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(){
  // alert('Cadastro realizado com sucesso!')
  }

  const inputFields = [
  {
    label: "Matrícula",
    onChangeText: setRegistration,
    value: registration,
    placeholder: "Digite sua matrícula",
    keyboardType: "numeric",
  },
  {
    label: "Email Institucional",
    onChangeText: setEmail,
    value: email,
    placeholder: `${registration}@aluno.unb.br`,
    keyboardType: "default",
  },
  {
    label: "Curso",
    onChangeText: setCourse,
    value: course,
    placeholder: "Digite seu curso",
    keyboardType: "default", 
  },
  {
    label: "Senha",
    onChangeText: setPassword,
    value: password,
    placeholder: "Digite sua senha",
    keyboardType: "default",
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
            <Text className="text-3xl font-regular">Cadastro</Text>
            <Text className="font-regular">Informe seus dados para o cadastro</Text>
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
              <Text>Já possui uma conta? </ Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")} className="text-center"> 
                <Text className="underline text-blue-700 font-medium">Faça login</Text>
              </TouchableOpacity>
            </View>
          </Text>
          <View className="items-center">
              <ButtonComponent 
                text="Cadastrar"
                onPress={handleSubmit()}
              />
          </View>
      </View>
    </View>
)}

