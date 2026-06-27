let treinadores = JSON.parse(localStorage.getItem("treinadores"));

if (treinadores === null) {
    treinadores = [];
    carregarInicial();
}

// ===== ID do registro sendo editado =====
let editandoId = null;

// ===== LISTAR com filtro de busca =====
function listar() {
    const termo = (document.getElementById("campoBusca")?.value || "").toLowerCase().trim();

    const filtrados = treinadores.filter(t => {
        if (!termo) return true;
        return (
            t.nome.toLowerCase().includes(termo)   ||
            t.regiao.toLowerCase().includes(termo) ||
            String(t.anoIni).includes(termo)
        );
    });

    // Contagem
    const cont = document.getElementById("contagem");
    if (cont) {
        if (termo) {
            cont.textContent = `${filtrados.length} resultado(s) encontrado(s) para "${termo}"`;
        } else {
            cont.textContent = `${treinadores.length} treinador(es) cadastrado(s)`;
        }
    }

    // Linhas da tabela
    if (filtrados.length === 0) {
        document.getElementById("tabela").innerHTML =
            `<tr><td colspan="6" class="no-results">Nenhum treinador encontrado.</td></tr>`;
        return;
    }

    let linhas = "";
    filtrados.forEach(treinador => {
        linhas += `<tr>
        <td>${treinador.id}</td>
        <td>${treinador.nome}</td>
        <td>${treinador.regiao}</td>
        <td>${treinador.anoIni}</td>
        <td><a href="#" class="link" onclick="abrirModal(${treinador.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${treinador.id})">Excluir</a></td>
        </tr>`;
    });
    document.getElementById("tabela").innerHTML = linhas;
}

// ===== MODAL =====
function abrirModal(id) {
    const treinador = treinadores.find(t => t.id === id);
    if (!treinador) return;

    editandoId = id;
    document.getElementById("editNome").value = treinador.nome;
    document.getElementById("editReg").value  = treinador.regiao;
    document.getElementById("editAno").value  = treinador.anoIni;
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

    const treinador = treinadores.find(t => t.id === editandoId);
    if (!treinador) return;

    treinador.nome   = document.getElementById("editNome").value.trim();
    treinador.regiao = document.getElementById("editReg").value.trim();
    treinador.anoIni = document.getElementById("editAno").value.trim();

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
        { id: Date.now()+1, nome: "Red",         regiao: "Kanto", anoIni: 1996 },
        { id: Date.now()+2, nome: "Ash Ketchum", regiao: "Kanto", anoIni: 1997 },
        { id: Date.now()+3, nome: "Misty",       regiao: "Kanto", anoIni: 1997 },
        { id: Date.now()+4, nome: "Brock",       regiao: "Kanto", anoIni: 1997 },
        { id: Date.now()+5, nome: "Gold",        regiao: "Johto", anoIni: 1999 },
        { id: Date.now()+6, nome: "May",         regiao: "Hoenn", anoIni: 2002 },
    ];
    iniciais.forEach(t => treinadores.push(t));
    salvar();
}

// ===== ADICIONAR =====
function adicionar() {
    const nome   = document.getElementById("nome").value;
    const regiao = document.getElementById("reg").value;
    const anoIni = document.getElementById("anoInicio").value;

    treinadores.push({ id: Date.now(), nome, regiao, anoIni });
    salvar();
}

// ===== REMOVER =====
function remover(id) {
    treinadores = treinadores.filter(t => t.id !== id);
    salvar();
}

// ===== SALVAR =====
function salvar() {
    localStorage.setItem("treinadores", JSON.stringify(treinadores));
    listar();
}
