let treinadores = JSON.parse(localStorage.getItem("treinadores"));

if (treinadores === null) {
    treinadores = [];
    carregarInicial();
} 

function listar(){

    let linhas = "";

    for(let i=0; i<treinadores.length; i++){
        const treinador = treinadores[i];
        linhas+=`<tr>
        <td>${treinador.id}</td>
        <td>${treinador.nome}</td>
        <td>${treinador.regiao}</td>
        <td>${treinador.anoIni}</td>
        <td><a href="#" class="link" onclick="editar(${treinador.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${treinador.id})">Excluir</a></td>
        </tr>`
    }
    document.getElementById("tabela").innerHTML = linhas;
}

function carregarInicial(){
    const novo = {
        id: Date.now()+1,
        nome: "Red",
        regiao: "Kanto",
        anoIni: 1996
    }

    treinadores.push(novo);

    const novo2 = {
        id: Date.now()+2,
        nome: "Ash Ketchum",
        regiao: "Kanto",
        anoIni: 1997
    }

    treinadores.push(novo2);

    const novo3 = {
        id: Date.now()+3,
        nome: "Misty",
        regiao: "Kanto",
        anoIni: 1997
    }

    treinadores.push(novo3);

    const novo4 = {
        id: Date.now()+4,
        nome: "Brock",
        regiao: "Kanto",
        anoIni: 1997
    }

    treinadores.push(novo4);

    const novo5 = {
        id: Date.now()+5,
        nome: "Gold",
        regiao: "Johto",
        anoIni: 1999
    }

    treinadores.push(novo5);

    const novo6 = {
        id: Date.now()+6,
        nome: "May",
        regiao: "Hoenn",
        anoIni: 2002
    }

    treinadores.push(novo6);

    salvar();
}

function adicionar() {

  const nome = document.getElementById("nome").value;
  const regiao = document.getElementById("reg").value;
  const anoIni = document.getElementById("anoInicio").value;

  const novoTrei = {
    id: Date.now(),
    nome,
    regiao,
    anoIni
  };

  treinadores.push(novoTrei);

  salvar();
}

function editar(id) {
  const user = treinadores.find(u => u.id === id);

  const novoNome = prompt("Novo nome:", user.nome);
  const novaReg = prompt("Nova regiao:", user.regiao);
  const novoAno = prompt("Nova data inicio:", user.anoIni);

  user.nome = novoNome;
  user.regiao = novaReg;
  user.anoIni = novoAno;

  salvar();
}

function remover(id) {
  treinadores = treinadores.filter(u => u.id !== id);

  salvar();
}

function salvar() {
  localStorage.setItem("treinadores", JSON.stringify(treinadores));
  listar()
}