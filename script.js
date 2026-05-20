let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function adicionar() {

  const nome = document.getElementById("nome").value;
  const idade = document.getElementById("idade").value;

  const novoUsuario = {
    id: Date.now(),
    nome,
    idade
  };

  usuarios.push(novoUsuario);

  salvar();
  listar();
}

function listar() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  usuarios.forEach((user) => {
    lista.innerHTML += `
      <li>
        ${user.nome} - ${user.idade} anos
        <button onclick="editar(${user.id})">Editar</button>
        <button onclick="remover(${user.id})">Excluir</button>
      </li>
    `;
  });
}

function editar(id) {
  const user = usuarios.find(u => u.id === id);

  const novoNome = prompt("Novo nome:", user.nome);
  const novaIdade = prompt("Nova idade:", user.idade);

  user.nome = novoNome;
  user.idade = novaIdade;

  salvar();
  listar();
}

function remover(id) {
  usuarios = usuarios.filter(u => u.id !== id);

  salvar();
  listar();
}

function salvar() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

listar();