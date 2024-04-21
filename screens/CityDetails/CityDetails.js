import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const CityDetailsScreen = ({ route }) => {
  const { city } = route.params;

  const cityName = city.nome;
  const ufName = city.microrregiao.mesorregiao.UF.nome;
  const regiaoNome = city.microrregiao.mesorregiao.UF.regiao.nome;
  const mesorregiaoNome = city.microrregiao.mesorregiao.nome;
  const microrregiaoNome = city.microrregiao.nome;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.textInfo}>Cidade:</Text>
        <Text style={styles.text}>{cityName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textInfo}>Estado:</Text>
        <Text style={styles.text}>{ufName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textInfo}>Região:</Text>
        <Text style={styles.text}>{regiaoNome}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textInfo}>Mesorregião:</Text>
        <Text style={styles.text}>{mesorregiaoNome}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textInfo}>Microrregião:</Text>
        <Text style={styles.text}>{microrregiaoNome}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    alignContent: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    width: 0.9 * width,
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  textInfo: {
    fontSize: 16,
    fontWeight: '700',
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
  },
});

export default CityDetailsScreen;
