import React, { useState, useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

import Logo from '../assets/logo.svg';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Types';

import api from '../api';

type PerfilScreenProps = NativeStackScreenProps<RootStackParamList, "Perfil">;

export default function Perfil({ navigation }: PerfilScreenProps){
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/user/profile');
      const { nome, email } = response.data;
      setNome(nome);
      setEmail(email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await api.patch('/user/profile', {
        nome,
        email,
        senha,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 pl-12 pt-16 bg-sky-100">
      <View className="flex flex-col">
        <Text className="text-3xl font-regular">Bem vindo(a)</Text>
        <Text className="font-regular">Informações do usuário</Text>
        // Cria uma caixa que contenha o nome, email e matricula do usuário
        <View className="flex flex-col">
          <Text className="font-regular">Nome</Text>
          <InputComponent
            label="Nome"
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
            keyboardType="default"
          />
        </View>
      </View>
    </View>
  )
}
