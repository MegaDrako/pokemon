let tipos = JSON.parse(localStorage.getItem("tipos"));

if (tipos === null) {
    tipos = [];
    carregarInicial();
}

// ===== ID do registro sendo editado =====
let editandoId = null;

// ===== LISTAR com filtro de busca =====
function listar() {
    const termo = (document.getElementById("campoBusca")?.value || "").toLowerCase().trim();

    const filtrados = tipos.filter(t => {
        if (!termo) return true;
        return (
            t.nome.toLowerCase().includes(termo)        ||
            t.fraqueza.toLowerCase().includes(termo)    ||
            t.resistencia.toLowerCase().includes(termo) ||
            t.imunidade.toLowerCase().includes(termo)
        );
    });

    // Contagem
    const cont = document.getElementById("contagem");
    if (cont) {
        if (termo) {
            cont.textContent = `${filtrados.length} resultado(s) encontrado(s) para "${termo}"`;
        } else {
            cont.textContent = `${tipos.length} tipo(s) cadastrado(s)`;
        }
    }

    // Linhas da tabela
    if (filtrados.length === 0) {
        document.getElementById("tabela").innerHTML =
            `<tr><td colspan="7" class="no-results">Nenhum tipo encontrado.</td></tr>`;
        return;
    }

    let linhas = "";
    filtrados.forEach(tipo => {
        linhas += `<tr>
        <td>${tipo.id}</td>
        <td>${tipo.nome}</td>
        <td>${tipo.fraqueza}</td>
        <td>${tipo.resistencia}</td>
        <td>${tipo.imunidade}</td>
        <td><a href="#" class="link" onclick="abrirModal(${tipo.id})">Editar</a></td>
        <td><a href="#" class="link" onclick="remover(${tipo.id})">Excluir</a></td>
        </tr>`;
    });
    document.getElementById("tabela").innerHTML = linhas;
}

// ===== MODAL =====
function abrirModal(id) {
    const tipo = tipos.find(t => t.id === id);
    if (!tipo) return;

    editandoId = id;
    document.getElementById("editNome").value = tipo.nome;
    document.getElementById("editFraq").value = tipo.fraqueza;
    document.getElementById("editRes").value  = tipo.resistencia;
    document.getElementById("editImu").value  = tipo.imunidade;
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

    const tipo = tipos.find(t => t.id === editandoId);
    if (!tipo) return;

    tipo.nome        = document.getElementById("editNome").value.trim();
    tipo.fraqueza    = document.getElementById("editFraq").value.trim();
    tipo.resistencia = document.getElementById("editRes").value.trim();
    tipo.imunidade   = document.getElementById("editImu").value.trim();

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
        { id: Date.now()+1, nome: "Fogo",     fraqueza: "Agua, Pedra, Terra",          resistencia: "Fogo, Planta, Gelo, Inseto, Aço, Fada",  imunidade: "-" },
        { id: Date.now()+2, nome: "Agua",     fraqueza: "Planta, Eletrico",             resistencia: "Fogo, Agua, Gelo, Aço",                   imunidade: "-" },
        { id: Date.now()+3, nome: "Planta",   fraqueza: "Fogo, Gelo, Veneno, Voador, Inseto", resistencia: "Agua, Eletrico, Planta, Terra",    imunidade: "-" },
        { id: Date.now()+4, nome: "Eletrico", fraqueza: "Terra",                        resistencia: "Eletrico, Voador, Aço",                   imunidade: "-" },
        { id: Date.now()+5, nome: "Normal",   fraqueza: "Lutador",                      resistencia: "-",                                       imunidade: "Fantasma" },
        { id: Date.now()+6, nome: "Voador",   fraqueza: "Eletrico, Gelo, Pedra",        resistencia: "Planta, Lutador, Inseto",                 imunidade: "Terra" },
    ];
    iniciais.forEach(t => tipos.push(t));
    salvar();
}

// ===== ADICIONAR =====
function adicionar() {
    const nome       = document.getElementById("nome").value;
    const fraqueza   = document.getElementById("fraq").value;
    const resistencia = document.getElementById("res").value;
    const imunidade  = document.getElementById("imu").value;

    tipos.push({ id: Date.now(), nome, fraqueza, resistencia, imunidade });
    salvar();
}

// ===== REMOVER =====
function remover(id) {
    tipos = tipos.filter(t => t.id !== id);
    salvar();
}

// ===== SALVAR =====
function salvar() {
    localStorage.setItem("tipos", JSON.stringify(tipos));
    listar();
}
