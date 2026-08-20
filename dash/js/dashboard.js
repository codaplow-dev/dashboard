/* ==========================================
   DADOS DOS PROCESSOS
========================================== */

const processos = [
  {
    id: 1,
    numero: "2026/001245",
    assunto: "Solicitação de licença",
    setor: "GRH",
    responsavel: "Ana Silva",
    data: "19/08/2026",
    status: "Em andamento",
    prioridade: "Alta",
    descricao: "Solicitação de licença funcional.",
  },

  {
    id: 2,
    numero: "2026/001198",
    assunto: "Alteração cadastral",
    setor: "SEFA",
    responsavel: "Carlos Souza",
    data: "18/08/2026",
    status: "Concluído",
    prioridade: "Baixa",
    descricao: "Alteração dos dados cadastrais do servidor.",
  },

  {
    id: 3,
    numero: "2026/001176",
    assunto: "Solicitação de acesso",
    setor: "TI",
    responsavel: "Marcos Lima",
    data: "17/08/2026",
    status: "Pendente",
    prioridade: "Alta",
    descricao: "Solicitação de acesso ao sistema.",
  },

  {
    id: 4,
    numero: "2026/001155",
    assunto: "Criação de usuário",
    setor: "TI",
    responsavel: "Pedro Henrique",
    data: "16/08/2026",
    status: "Em andamento",
    prioridade: "Média",
    descricao: "Criação de usuário para acesso ao sistema.",
  },

  {
    id: 5,
    numero: "2026/001102",
    assunto: "Análise documental",
    setor: "Protocolo",
    responsavel: "Juliana Costa",
    data: "15/08/2026",
    status: "Concluído",
    prioridade: "Baixa",
    descricao: "Análise de documentação enviada.",
  },

  {
    id: 6,
    numero: "2026/001087",
    assunto: "Homologação",
    setor: "GRH",
    responsavel: "Fernanda Alves",
    data: "14/08/2026",
    status: "Pendente",
    prioridade: "Média",
    descricao: "Processo aguardando homologação.",
  },

  {
    id: 7,
    numero: "2026/001054",
    assunto: "Solicitação de parecer",
    setor: "Jurídico",
    responsavel: "Ricardo Martins",
    data: "13/08/2026",
    status: "Em andamento",
    prioridade: "Alta",
    descricao: "Solicitação de parecer jurídico.",
  },

  {
    id: 8,
    numero: "2026/001023",
    assunto: "Atualização de cadastro",
    setor: "SEFA",
    responsavel: "Lucas Oliveira",
    data: "12/08/2026",
    status: "Concluído",
    prioridade: "Baixa",
    descricao: "Atualização de informações cadastrais.",
  },
];

/* ==========================================
   ELEMENTOS
========================================== */

const totalProcessos = document.getElementById("totalProcessos");

const processosAndamento = document.getElementById("processosAndamento");

const processosConcluidos = document.getElementById("processosConcluidos");

const processosPendentes = document.getElementById("processosPendentes");

const tabela = document.getElementById("processosTable");

const searchInput = document.getElementById("searchInput");

const statusFilter = document.getElementById("statusFilter");

const setorFilter = document.getElementById("setorFilter");

const modal = document.getElementById("modal");

const modalBody = document.getElementById("modalBody");

const closeModal = document.getElementById("closeModal");

/* ==========================================
   ATUALIZAR CARDS
========================================== */

function atualizarCards() {
  const total = processos.length;

  const andamento = processos.filter(
    (processo) => processo.status === "Em andamento",
  ).length;

  const concluidos = processos.filter(
    (processo) => processo.status === "Concluído",
  ).length;

  const pendentes = processos.filter(
    (processo) => processo.status === "Pendente",
  ).length;

  totalProcessos.textContent = total;

  processosAndamento.textContent = andamento;

  processosConcluidos.textContent = concluidos;

  processosPendentes.textContent = pendentes;
}

/* ==========================================
   GERAR FILTRO DE SETORES
========================================== */

function carregarSetores() {
  const setores = [...new Set(processos.map((processo) => processo.setor))];

  setores.forEach((setor) => {
    const option = document.createElement("option");

    option.value = setor;

    option.textContent = setor;

    setorFilter.appendChild(option);
  });
}

/* ==========================================
   RENDERIZAR TABELA
========================================== */

function renderizarTabela(lista = processos) {
  tabela.innerHTML = "";

  if (lista.length === 0) {
    tabela.innerHTML = `
            <tr>
                <td colspan="8" class="empty">
                    Nenhum processo encontrado.
                </td>
            </tr>
        `;

    return;
  }

  lista.forEach((processo) => {
    const tr = document.createElement("tr");

    let statusClass = "";

    if (processo.status === "Em andamento") {
      statusClass = "andamento";
    }

    if (processo.status === "Concluído") {
      statusClass = "concluido";
    }

    if (processo.status === "Pendente") {
      statusClass = "pendente";
    }

    const prioridadeClass = processo.prioridade.toLowerCase();

    tr.innerHTML = `
            <td>
                <span class="process-number">
                    ${processo.numero}
                </span>
            </td>

            <td>
                <span class="process-subject">
                    ${processo.assunto}
                </span>
            </td>

            <td>
                ${processo.setor}
            </td>

            <td>
                ${processo.responsavel}
            </td>

            <td>
                ${processo.data}
            </td>

            <td>
                <span class="status ${statusClass}">
                    ${processo.status}
                </span>
            </td>

            <td>

                <span class="priority ${prioridadeClass}">

                    <span class="priority-dot"></span>

                    ${processo.prioridade}

                </span>

            </td>

            <td>

                <button
                    class="action-button"
                    onclick="abrirDetalhes(${processo.id})"
                    title="Visualizar processo"
                >
                    <i class="fa-solid fa-eye"></i>
                </button>

            </td>
        `;

    tabela.appendChild(tr);
  });
}

/* ==========================================
   FILTRAR PROCESSOS
========================================== */

function filtrarProcessos() {
  const pesquisa = searchInput.value.toLowerCase().trim();

  const status = statusFilter.value;

  const setor = setorFilter.value;

  const resultado = processos.filter((processo) => {
    const correspondePesquisa =
      processo.numero.toLowerCase().includes(pesquisa) ||
      processo.assunto.toLowerCase().includes(pesquisa) ||
      processo.responsavel.toLowerCase().includes(pesquisa);

    const correspondeStatus = status === "todos" || processo.status === status;

    const correspondeSetor = setor === "todos" || processo.setor === setor;

    return correspondePesquisa && correspondeStatus && correspondeSetor;
  });

  renderizarTabela(resultado);
}

/* ==========================================
   MODAL DE DETALHES
========================================== */

function abrirDetalhes(id) {
  const processo = processos.find((item) => item.id === id);

  if (!processo) {
    return;
  }

  modalBody.innerHTML = `

        <div class="detail">

            <label>Número do processo</label>

            <strong>
                ${processo.numero}
            </strong>

        </div>


        <div class="detail">

            <label>Assunto</label>

            <strong>
                ${processo.assunto}
            </strong>

        </div>


        <div class="detail">

            <label>Setor</label>

            <strong>
                ${processo.setor}
            </strong>

        </div>


        <div class="detail">

            <label>Responsável</label>

            <strong>
                ${processo.responsavel}
            </strong>

        </div>


        <div class="detail">

            <label>Data de abertura</label>

            <strong>
                ${processo.data}
            </strong>

        </div>


        <div class="detail">

            <label>Status</label>

            <strong>
                ${processo.status}
            </strong>

        </div>


        <div class="detail">

            <label>Prioridade</label>

            <strong>
                ${processo.prioridade}
            </strong>

        </div>


        <div class="detail">

            <label>Descrição</label>

            <strong>
                ${processo.descricao}
            </strong>

        </div>

    `;

  modal.classList.add("active");
}

/* ==========================================
   FECHAR MODAL
========================================== */

closeModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("active");
  }
});

/* ==========================================
   EVENTOS DOS FILTROS
========================================== */

searchInput.addEventListener("input", filtrarProcessos);

statusFilter.addEventListener("change", filtrarProcessos);

setorFilter.addEventListener("change", filtrarProcessos);

/* ==========================================
   GRÁFICO — STATUS
========================================== */

function criarGraficoStatus() {
  const andamento = processos.filter((p) => p.status === "Em andamento").length;

  const concluido = processos.filter((p) => p.status === "Concluído").length;

  const pendente = processos.filter((p) => p.status === "Pendente").length;

  const ctx = document.getElementById("statusChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",

    data: {
      labels: ["Em andamento", "Concluído", "Pendente"],

      datasets: [
        {
          data: [andamento, concluido, pendente],

          borderWidth: 0,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}

/* ==========================================
   GRÁFICO — SETORES
========================================== */

function criarGraficoSetores() {
  const setores = {};

  processos.forEach((processo) => {
    if (!setores[processo.setor]) {
      setores[processo.setor] = 0;
    }

    setores[processo.setor]++;
  });

  const ctx = document.getElementById("setorChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",

    data: {
      labels: Object.keys(setores),

      datasets: [
        {
          label: "Processos",

          data: Object.values(setores),

          borderRadius: 5,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,

      scales: {
        y: {
          beginAtZero: true,

          ticks: {
            precision: 0,
          },
        },
      },

      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

/* ==========================================
   INICIALIZAÇÃO
========================================== */

function inicializarDashboard() {
  atualizarCards();

  carregarSetores();

  renderizarTabela();

  criarGraficoStatus();

  criarGraficoSetores();
}

/* ==========================================
   NAVEGAÇÃO
========================================== */

const menuItems = document.querySelectorAll(".menu-item[data-page]");

const pages = document.querySelectorAll(".page");

menuItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();

    const pageName = item.dataset.page;

    /* Remove o active de todos os menus */

    menuItems.forEach((menu) => {
      menu.classList.remove("active");
    });

    /* Adiciona active no menu selecionado */

    item.classList.add("active");

    /* Esconde todas as páginas */

    pages.forEach((page) => {
      page.classList.remove("active");
    });

    /* Mostra a página selecionada */

    const selectedPage = document.getElementById(`page-${pageName}`);

    if (selectedPage) {
      selectedPage.classList.add("active");
    }
  });
});

/* ==========================================
   SISTEMA DE NOTIFICAÇÕES
========================================== */

/* DADOS DAS NOTIFICAÇÕES */

let notificacoes = [
  {
    id: 1,

    titulo: "Novo processo recebido",

    mensagem: "O processo 2026/001245 foi encaminhado para o setor GRH.",

    tipo: "info",

    icone: "fa-folder-open",

    tempo: "Há 5 minutos",

    lida: false,
  },

  {
    id: 2,

    titulo: "Processo concluído",

    mensagem: "O processo 2026/001198 foi concluído com sucesso.",

    tipo: "success",

    icone: "fa-circle-check",

    tempo: "Há 25 minutos",

    lida: false,
  },

  {
    id: 3,

    titulo: "Processo pendente",

    mensagem: "O processo 2026/001176 está aguardando uma ação.",

    tipo: "warning",

    icone: "fa-clock",

    tempo: "Há 1 hora",

    lida: false,
  },

  {
    id: 4,

    titulo: "Alta prioridade",

    mensagem: "O processo 2026/001054 recebeu prioridade alta.",

    tipo: "danger",

    icone: "fa-triangle-exclamation",

    tempo: "Há 2 horas",

    lida: true,
  },
];

/* ELEMENTOS */

const notificationButton = document.getElementById("notificationButton");

const notificationPanel = document.getElementById("notificationPanel");

const notificationList = document.getElementById("notificationList");

const notificationDot = document.getElementById("notificationDot");

const notificationCount = document.getElementById("notificationCount");

const notificationSummary = document.getElementById("notificationSummary");

const markAllRead = document.getElementById("markAllRead");

const viewNotifications = document.getElementById("viewNotifications");

/* ==========================================
   RENDERIZAR NOTIFICAÇÕES
========================================== */

function renderizarNotificacoes() {
  notificationList.innerHTML = "";

  const naoLidas = notificacoes.filter((notificacao) => !notificacao.lida);

  /* ATUALIZA CONTADOR */

  if (naoLidas.length > 0) {
    notificationDot.classList.add("active");

    notificationCount.classList.add("active");

    notificationCount.textContent = naoLidas.length;

    notificationSummary.textContent = `${naoLidas.length} ${
      naoLidas.length === 1 ? "nova notificação" : "novas notificações"
    }`;
  } else {
    notificationDot.classList.remove("active");

    notificationCount.classList.remove("active");

    notificationSummary.textContent = "Nenhuma nova notificação";
  }

  /* SEM NOTIFICAÇÕES */

  if (notificacoes.length === 0) {
    notificationList.innerHTML = `

            <div class="no-notifications">

                <i class="fa-regular fa-bell-slash"></i>

                <p>
                    Você não possui notificações.
                </p>

            </div>

        `;

    return;
  }

  /* RENDERIZA */

  notificacoes.forEach((notificacao) => {
    const item = document.createElement("div");

    item.className = `notification-item ${!notificacao.lida ? "unread" : ""}`;

    item.innerHTML = `

            <div
                class="notification-icon
                ${notificacao.tipo}"
            >

                <i
                    class="fa-solid
                    ${notificacao.icone}"
                ></i>

            </div>


            <div class="notification-content">

                <strong>
                    ${notificacao.titulo}
                </strong>

                <p>
                    ${notificacao.mensagem}
                </p>

                <span class="notification-time">
                    ${notificacao.tempo}
                </span>

            </div>


            ${
              !notificacao.lida
                ? `
                        <span
                            class="notification-unread"
                        ></span>
                    `
                : ""
            }

        `;

    /* CLICAR NA NOTIFICAÇÃO */

    item.addEventListener("click", () => {
      marcarComoLida(notificacao.id);
    });

    notificationList.appendChild(item);
  });
}

/* ==========================================
   MARCAR COMO LIDA
========================================== */

function marcarComoLida(id) {
  const notificacao = notificacoes.find((item) => item.id === id);

  if (!notificacao) {
    return;
  }

  notificacao.lida = true;

  renderizarNotificacoes();
}

/* ==========================================
   MARCAR TODAS COMO LIDAS
========================================== */

markAllRead.addEventListener("click", (event) => {
  event.stopPropagation();

  notificacoes.forEach((notificacao) => {
    notificacao.lida = true;
  });

  renderizarNotificacoes();
});

/* ==========================================
   ABRIR / FECHAR PAINEL
========================================== */

notificationButton.addEventListener("click", (event) => {
  event.stopPropagation();

  notificationPanel.classList.toggle("active");
});

/* ==========================================
   FECHAR AO CLICAR FORA
========================================== */

document.addEventListener("click", (event) => {
  if (
    !notificationPanel.contains(event.target) &&
    !notificationButton.contains(event.target)
  ) {
    notificationPanel.classList.remove("active");
  }
});

/* ==========================================
   VER TODAS
========================================== */

viewNotifications.addEventListener("click", () => {
  notificationPanel.classList.remove("active");

  /*
            Futuramente podemos criar uma página
            exclusiva de notificações.

            Por enquanto, vamos para a página
            de processos.
        */

  const processosMenu = document.querySelector('[data-page="processos"]');

  if (processosMenu) {
    processosMenu.click();
  }
});

/* ==========================================
   INICIALIZAR NOTIFICAÇÕES
========================================== */

inicializarDashboard();

renderizarNotificacoes();
