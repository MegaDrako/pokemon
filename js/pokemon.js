let pokemons = JSON.parse(localStorage.getItem("pokemons"));

if (pokemons === null) {
    pokemons = [];
    carregarInicial();
} 

function listar(){

    let linhas = "";

    for(let i=0; i<pokemons.length; i++){
        const pokemon = pokemons[i];
        linhas+=`<tr>
        <td>${pokemon.id}</td>
        <td>${pokemon.nome}</td>
        <td>${pokemon.geracao}</td>
        <td>${pokemon.regiao}</td>
        <td>${pokemon.tipagem}</td>
        <td><a href="#" class="link" onclick="editar(${pokemon.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${pokemon.id})">Excluir</a></td>
        </tr>`
    }
    document.getElementById("tabela").innerHTML = linhas;
}

function carregarInicial(){
    const novo = {
        id: Date.now(),
        nome: "Bulbasaur",
        geracao: "1",
        regiao: "Kanto",
        tipagem: "Planta/Veneno"
    }

    pokemons.push(novo);

    const novo2 = {
        id: Date.now()+1,
        nome: "Charmander",
        geracao: "1",
        regiao: "Kanto",
        tipagem: "Fogo"
    }

    pokemons.push(novo2);

    const novo3 = {
        id: Date.now()+2,
        nome: "Squirtle",
        geracao: "1",
        regiao: "Kanto",
        tipagem: "Agua"
    }

    pokemons.push(novo3);

    const novo4 = {
        id: Date.now()+3,
        nome: "Pikachu",
        geracao: "1",
        regiao: "Kanto",
        tipagem: "Eletrico"
    }

    pokemons.push(novo4);

    const novo5 = {
        id: Date.now()+4,
        nome: "Chikorita",
        geracao: "2",
        regiao: "Johto",
        tipagem: "Planta"
    }

    pokemons.push(novo5);

    const novo6 = {
        id: Date.now()+5,
        nome: "Cyndaquil",
        geracao: "2",
        regiao: "Johto",
        tipagem: "Fogo" 
    }

    pokemons.push(novo6);

    salvar();
}

function adicionar() {

  const nome = document.getElementById("nome").value;
  const geracao = document.getElementById("gen").value;
  const regiao = document.getElementById("reg").value;
  const tipagem = document.getElementById("tipagem").value;

  const novoPokemon = {
    id: Date.now(),
    nome,
    geracao,
    regiao,
    tipagem
  };

  pokemons.push(novoPokemon);

  salvar();
}

function editar(id) {
  const user = pokemons.find(u => u.id === id);

  const novoNome = prompt("Novo nome:", user.nome);
  const novaGen = prompt("Nova geracao:", user.geracao);
  const novaReg = prompt("Nova regiao:", user.regiao);
  const novaTip = prompt("Nova tipagem:", user.tipagem);

  user.nome = novoNome;
  user.geracao = novaGen;
  user.regiao = novaReg;
  user.tipagem = novaTip;

  salvar();
}

function remover(id) {
  pokemons = pokemons.filter(u => u.id !== id);

  salvar();
}

function salvar() {
  localStorage.setItem("pokemons", JSON.stringify(pokemons));
  listar();
}