axios
  .get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
  .then((response) => {
    const cityData = response.data;
    const city = new city(
      cityData.id,
      cityData.nome,
      new Microrregiao(
        cityData.microrregiao.id,
        cityData.microrregiao.nome,
        new Mesorregiao(
          cityData.microrregiao.mesorregiao.id,
          cityData.microrregiao.mesorregiao.nome,
          new UF(
            cityData.microrregiao.mesorregiao.UF.id,
            cityData.microrregiao.mesorregiao.UF.sigla,
            cityData.microrregiao.mesorregiao.UF.nome,
            new Regiao(
              cityData.microrregiao.mesorregiao.UF.regiao.id,
              cityData.microrregiao.mesorregiao.UF.regiao.sigla,
              cityData.microrregiao.mesorregiao.UF.regiao.nome
            )
          )
        )
      )
    );
    // Agora você pode usar o objeto 'city' conforme necessário
  })
  .catch((error) => {
    console.error(error);
  });
