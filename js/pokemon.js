let pokemons = JSON.parse(localStorage.getItem("pokemons"));

if (pokemons === null) {
    pokemons = [];
    carregarInicial();
}

// ===== ID do registro sendo editado =====
let editandoId = null;

// ===== LISTAR com filtro de busca =====
function listar() {
    const termo = (document.getElementById("campoBusca")?.value || "").toLowerCase().trim();

    const filtrados = pokemons.filter(p => {
        if (!termo) return true;
        return (
            p.nome.toLowerCase().includes(termo)    ||
            p.tipagem.toLowerCase().includes(termo) ||
            p.regiao.toLowerCase().includes(termo)  ||
            String(p.geracao).toLowerCase().includes(termo)
        );
    });

    // Contagem
    const cont = document.getElementById("contagem");
    if (cont) {
        if (termo) {
            cont.textContent = `${filtrados.length} resultado(s) encontrado(s) para "${termo}"`;
        } else {
            cont.textContent = `${pokemons.length} pokémon(s) cadastrado(s)`;
        }
    }

    // Linhas da tabela
    if (filtrados.length === 0) {
        document.getElementById("tabela").innerHTML =
            `<tr><td colspan="7" class="no-results">Nenhum Pokémon encontrado.</td></tr>`;
        return;
    }

    let linhas = "";
    filtrados.forEach(pokemon => {
        linhas += `<tr>
        <td>${pokemon.id}</td>
        <td>${pokemon.nome}</td>
        <td>${pokemon.geracao}</td>
        <td>${pokemon.regiao}</td>
        <td>${pokemon.tipagem}</td>
        <td><a href="#" class="link" onclick="abrirModal(${pokemon.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${pokemon.id})">Excluir</a></td>
        </tr>`;
    });
    document.getElementById("tabela").innerHTML = linhas;
}

// ===== MODAL =====
function abrirModal(id) {
    const pokemon = pokemons.find(p => p.id === id);
    if (!pokemon) return;

    editandoId = id;
    document.getElementById("editNome").value = pokemon.nome;
    document.getElementById("editGen").value  = pokemon.geracao;
    document.getElementById("editReg").value  = pokemon.regiao;
    document.getElementById("editTip").value  = pokemon.tipagem;
    document.getElementById("modalEditar").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalEditar").style.display = "none";
    editandoId = null;
}

function fecharModalFora(event) {
    if (event.target === document.getElementById("modalEditar")) {
        fecharModal();
    }
}

function salvarEdicao() {
    if (editandoId === null) return;

    const pokemon = pokemons.find(p => p.id === editandoId);
    if (!pokemon) return;

    pokemon.nome    = document.getElementById("editNome").value.trim();
    pokemon.geracao = document.getElementById("editGen").value.trim();
    pokemon.regiao  = document.getElementById("editReg").value.trim();
    pokemon.tipagem = document.getElementById("editTip").value.trim();

    salvar();
    fecharModal();
}

// ===== TECLA ESC fecha o modal =====
document.addEventListener("keydown", e => {
    if (e.key === "Escape") fecharModal();
});

// ===== CARREGAR DADOS INICIAIS =====
function carregarInicial() {
    const iniciais = [
        { id: Date.now(),   nome: "Bulbasaur",  geracao: "1", regiao: "Kanto", tipagem: "Planta/Veneno" },
        { id: Date.now()+1, nome: "Charmander", geracao: "1", regiao: "Kanto", tipagem: "Fogo" },
        { id: Date.now()+2, nome: "Squirtle",   geracao: "1", regiao: "Kanto", tipagem: "Agua" },
        { id: Date.now()+3, nome: "Pikachu",    geracao: "1", regiao: "Kanto", tipagem: "Eletrico" },
        { id: Date.now()+4, nome: "Chikorita",  geracao: "2", regiao: "Johto", tipagem: "Planta" },
        { id: Date.now()+5, nome: "Cyndaquil",  geracao: "2", regiao: "Johto", tipagem: "Fogo" },
    ];
    iniciais.forEach(p => pokemons.push(p));
    salvar();
}

// ===== ADICIONAR =====
function adicionar() {
    const nome    = document.getElementById("nome").value;
    const geracao = document.getElementById("gen").value;
    const regiao  = document.getElementById("reg").value;
    const tipagem = document.getElementById("tipagem").value;

    pokemons.push({ id: Date.now(), nome, geracao, regiao, tipagem });
    salvar();
}

// ===== REMOVER =====
function remover(id) {
    pokemons = pokemons.filter(p => p.id !== id);
    salvar();
}

// ===== SALVAR =====
function salvar() {
    localStorage.setItem("pokemons", JSON.stringify(pokemons));
    listar();
}
