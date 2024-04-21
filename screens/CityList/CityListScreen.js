// screens/CityList/index.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Button, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import CityItem from '../CityDetails/CityItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const CityListScreen = ({ navigation }) => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error(error);
        // Você pode adicionar mais tratamento de erros aqui, se necessário
      });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons>
          <Item
            title="Logout"
            iconName="log-out"
            onPress={() => {
              // Aqui você pode adicionar a lógica para o logout
              // Por exemplo, limpar o armazenamento local, atualizar o estado global, etc.
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }], // Substitua 'Login' pelo nome da sua tela de login
              });
            }}
            IconComponent={Ionicons}
            iconSize={30}
            color="#000"
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const filteredCities = cities.filter((city) =>
    city.nome.toLowerCase().includes(search.toLowerCase())
  );

  const citiesToShow = filteredCities.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        value={search}
        onChangeText={setSearch}
        placeholder="Pesquisar cidade"
      />
      <FlatList
        data={citiesToShow}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CityItem city={item} navigation={navigation} />}
      />
      <View style={styles.pagination}>
        {page > 1 && <Button title="Anterior" onPress={() => setPage(page - 1)} color="#000" />}
        {citiesToShow.length === itemsPerPage && (
          <Button title="Próximo" onPress={() => setPage(page + 1)} color="#000" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  },
  header: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchBar: {
    height: 50,
    fontSize: 18,
    marginTop: 5,
    marginBottom: 8,
    borderWidth: 1, // Adiciona borda
    borderColor: '#000', // Define a cor da borda
    borderRadius: 5, // Arredonda os cantos da borda
    paddingLeft: 10, // Adiciona um pouco de espaço à esquerda do texto
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default CityListScreen;