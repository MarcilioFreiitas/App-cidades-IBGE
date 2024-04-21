class City {
  constructor(id, nome, microrregiao) {
    this.id = id;
    this.nome = nome;
    this.microrregiao = microrregiao;
  }
}

class Microrregiao {
  constructor(id, nome, mesorregiao) {
    this.id = id;
    this.nome = nome;
    this.mesorregiao = mesorregiao;
  }
}

class Mesorregiao {
  constructor(id, nome, UF) {
    this.id = id;
    this.nome = nome;
    this.UF = UF;
  }
}

class UF {
  constructor(id, sigla, nome, regiao) {
    this.id = id;
    this.sigla = sigla;
    this.nome = nome;
    this.regiao = regiao;
  }
}

class Regiao {
  constructor(id, sigla, nome) {
    this.id = id;
    this.sigla = sigla;
    this.nome = nome;
  }
}
