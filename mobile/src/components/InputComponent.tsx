import { KeyboardTypeOptions, Text, TextInput, View } from 'react-native';

type InputProps = {
  label: string;
  onChangeText: any;
  value: string;
  placeholder: string;
  keyboardType: string;
  secureTextEntry?: boolean;
}

export default function InputComponent(props: InputProps) {
  const keyboardType: KeyboardTypeOptions = props.keyboardType as KeyboardTypeOptions;
  return (
    <>
      <Text className="font-regular text-xs">{props.label}</Text>
      <TextInput 
        className="rounded-lg bg-white p-2 placeholder:text-base font-regular"
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        keyboardType={keyboardType}
        secureTextEntry={props.secureTextEntry}
      />
    </>
  )
}
