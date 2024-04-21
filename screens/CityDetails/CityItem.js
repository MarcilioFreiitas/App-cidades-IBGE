// components/CityItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CityItem = ({ city, navigation }) => {
  const cityName = city.nome;
  const ufName =
    city.municipio &&
    city.municipio.microrregiao &&
    city.municipio.microrregiao.mesorregiao &&
    city.municipio.microrregiao.mesorregiao.UF &&
    city.municipio.microrregiao.mesorregiao.UF.nome;

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Detalhes da cidade', { city })}>
        <View style={styles.itemContainer}>
          <Text style={styles.cityName}>{cityName}</Text>
          {ufName && <Text style={styles.ufName}>{ufName}</Text>}
        </View>
      </TouchableOpacity>
      <View style={{ height: 1, width: '100%', backgroundColor: '#CCC' }} />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 17,
  },
  cityName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#212121',
  },
  ufName: {
    fontSize: 16,
  },
});

export default CityItem;
