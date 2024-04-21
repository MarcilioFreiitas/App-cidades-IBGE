import { Alert } from 'react-native';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

const CustomLoginScreen = () => {
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch('http://10.0.0.106:8080/usuario/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Cidades IBGE' }],
          });
        } else {
          Alert.alert(
            'Erro de Autenticação',
            'As credenciais fornecidas estão incorretas. Por favor, tente novamente.'
          );
        }
      })
      .catch((error) => {
        console.error('Erro:', error);
        Alert.alert(
          'Erro de Autenticação',
          'Ocorreu um erro durante a autenticação. Por favor, tente novamente.'
        );
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>IBGE Cidades</Text>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.input}
            error={!!errors.email}
          />
        )}
        name="email"
        rules={{ required: 'Email is required' }}
        defaultValue=""
      />
      {errors.email && <Text style={styles.error}>{errors.username.message}</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Senha"
            mode="outlined"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.input}
            error={!!errors.password}
          />
        )}
        name="senha"
        rules={{ required: 'Password is required' }}
        defaultValue=""
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Login
      </Button>
      <View style={styles.links}>
        <Text style={styles.link}>Esqueceu a senha?</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.link}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#000',
  },
  register: {
    marginTop: 18,
    marginRight: 17,
    textAlign: 'right',
    color: 'blue',
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    margin: 5,
  },
  link: {
    color: '#000',
  },
});

export default CustomLoginScreen;
