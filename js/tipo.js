let tipos = JSON.parse(localStorage.getItem("tipos"));

if (tipos === null) {
    tipos = [];
    carregarInicial();
} 

function listar(){

    let linhas = "";

    for(let i=0; i<tipos.length; i++){
        const tipo = tipos[i];
        linhas+=`<tr>
        <td>${tipo.id}</td>
        <td>${tipo.nome}</td>
        <td>${tipo.fraqueza}</td>
        <td>${tipo.resistencia}</td>
        <td>${tipo.imunidade}</td>
        <td><a href="#" class="link" onclick="editar(${tipo.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${tipo.id})">Excluir</a></td>
        </tr>`
    }
    document.getElementById("tabela").innerHTML = linhas;
}

function carregarInicial(){
    const novo = {
        id: Date.now()+1,
        nome: "Fogo",
        fraqueza: "Agua, Pedra, Terra",
        resistencia: "Fogo, Planta, Gelo, Inseto, Aço, Fada",
        imunidade: "-"
    }

    tipos.push(novo);

    const novo2 = {
        id: Date.now()+2,
        nome: "Agua",
        fraqueza: "Planta, Eletrico",
        resistencia: "Fogo, Agua, Gelo, Aço",
        imunidade: "-"
    }

    tipos.push(novo2);

    const novo3 = {
        id: Date.now()+3,
        nome: "Planta",
        fraqueza: "Fogo, Gelo, Veneno, Voador, Inseto",
        resistencia: "Agua, Eletrico, Planta, Terra",
        imunidade: "-"
    }

    tipos.push(novo3);

    const novo4 = {
        id: Date.now()+4,
        nome: "Eletrico",
        fraqueza: "Terra",
        resistencia: "Eletrico, Voador, Aço",
        imunidade: "-"
    }

    tipos.push(novo4);

    const novo5 = {
        id: Date.now()+5,
        nome: "Normal",
        fraqueza: "Lutador",
        resistencia: "-",
        imunidade: "Fantasma"
    }

    tipos.push(novo5);

    const novo6 = {
        id: Date.now()+6,
        nome: "Voador",
        fraqueza: "Eletrico, Gelo, Pedra",
        resistencia: "Planta, Lutador, Inseto",
        imunidade: "Terra"
    }

    tipos.push(novo6);


    salvar();
}

function adicionar() {

  const nome = document.getElementById("nome").value;
  const fraqueza = document.getElementById("fraq").value;
  const resistencia = document.getElementById("res").value;
  const imunidade = document.getElementById("imu").value;

  const novoTipo = {
    id: Date.now(),
    nome,
    fraqueza,
    resistencia,
    imunidade
  };

  tipos.push(novoTipo);

  salvar();
}

function editar(id) {
  const user = tipos.find(u => u.id === id);

  const novoNome = prompt("Novo nome:", user.nome);
  const novaFraq = prompt("Nova fraqueza:", user.fraqueza);
  const novaRes = prompt("Nova resistencia:", user.resistencia);
  const novaImu = prompt("Nova imunidade:", user.imunidade);

  user.nome = novoNome;
  user.fraqueza = novaFraq;
  user.resistencia = novaRes;
  user.imunidade = novaImu;

  salvar();
}

function remover(id) {
  tipos = tipos.filter(u => u.id !== id);

  salvar();
}

function salvar() {
  localStorage.setItem("tipos", JSON.stringify(tipos));
  listar();
}