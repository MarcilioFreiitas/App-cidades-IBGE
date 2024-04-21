import React from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    fetch('http://10.0.0.106:8080/usuario/cadastrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert('Cadastrado com sucesso!');
          navigation.navigate('Login');
        } else {
          throw new Error('Failed to register');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error:', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Cadastro</Title>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Nome"
            mode="outlined"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.input}
            error={!!errors.name}
          />
        )}
        name="username"
        rules={{ required: 'Name is required' }}
        defaultValue=""
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

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
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Invalid email address',
          },
        }}
        defaultValue=""
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

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
            error={!!errors.senha}
          />
        )}
        name="senha"
        rules={{ required: 'Senha é obrigatória' }}
        defaultValue=""
      />
      {errors.senha && <Text style={styles.error}>{errors.senha.message}</Text>}

      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Cadastrar
      </Button>
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
  error: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
