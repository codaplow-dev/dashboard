const processos = [
  {
    id: 1,
    numero: "2026/001245",
    assunto: "Solicitação de licença",
    status: "Em andamento",
    setor: "GRH",
    responsavel: "Ana Silva",
    prioridade: "Alta",
    data: "19/08/2026",
    descricao: "Solicitação de licença funcional.",
  },
  {
    id: 2,
    numero: "2026/001198",
    assunto: "Alteração cadastral",
    status: "Concluído",
    setor: "SEFA",
    responsavel: "Carlos Souza",
    prioridade: "Baixa",
    data: "18/08/2026",
    descricao: "Atualização dos dados cadastrais do servidor.",
  },
  {
    id: 3,
    numero: "2026/001176",
    assunto: "Solicitação de acesso",
    status: "Pendente",
    setor: "TI",
    responsavel: "Marcos Lima",
    prioridade: "Alta",
    data: "17/08/2026",
    descricao: "Aguardando aprovação para liberação de acesso ao sistema.",
  },
  {
    id: 4,
    numero: "2026/001155",
    assunto: "Criação de usuário",
    status: "Em andamento",
    setor: "TI",
    responsavel: "Pedro Henrique",
    prioridade: "Média",
    data: "16/08/2026",
    descricao: "Criação de credencial de acesso para novo colaborador.",
  },
  {
    id: 5,
    numero: "2026/001102",
    assunto: "Análise documental",
    status: "Concluído",
    setor: "Protocolo",
    responsavel: "Juliana Costa",
    prioridade: "Baixa",
    data: "15/08/2026",
    descricao: "Documentação analisada e encaminhada ao setor responsável.",
  },
  {
    id: 6,
    numero: "2026/001087",
    assunto: "Homologação de solicitação",
    status: "Pendente",
    setor: "GRH",
    responsavel: "Fernanda Alves",
    prioridade: "Média",
    data: "14/08/2026",
    descricao: "Processo aguardando homologação da chefia.",
  },
  {
    id: 7,
    numero: "2026/001054",
    assunto: "Solicitação de parecer",
    status: "Em andamento",
    setor: "Jurídico",
    responsavel: "Ricardo Martins",
    prioridade: "Alta",
    data: "13/08/2026",
    descricao: "Solicitação de parecer jurídico para continuidade do processo.",
  },
];

const processList = document.querySelector("#processList");
const searchInput = document.querySelector("#processSearchInput");
const statusFilter = document.querySelector("#processStatusFilter");
const newProcessButton = document.querySelector("#novoProcessoBtn");

function statusClass(status) {
  return status === "Em andamento"
    ? "andamento"
    : status === "Concluído"
      ? "concluido"
      : "pendente";
}

function priorityClass(priority) {
  return priority
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function renderProcesses(list = processos) {
  if (!list.length) {
    processList.innerHTML = `<div class="empty-state"><i class="fa-regular fa-folder-open"></i><p>Nenhum processo encontrado com esses filtros.</p></div>`;
    return;
  }

  processList.innerHTML = list
    .map(
      (process) => `
        <article class="process-item">
            <div class="process-main">
                <span class="process-number">${process.numero}</span>
                <span class="process-subject" title="${process.assunto}">${process.assunto}</span>
            </div>
            <div class="process-meta"><small>Setor</small><span>${process.setor}</span></div>
            <div class="process-meta"><small>Responsável</small><span>${process.responsavel}</span></div>
            <div class="process-meta"><small>Status</small><span class="status ${statusClass(process.status)}">${process.status}</span></div>
            <div class="process-meta"><small>Prioridade</small><span class="priority ${priorityClass(process.prioridade)}">${process.prioridade}</span></div>
            <button class="details-button" type="button" data-id="${process.id}" aria-label="Ver detalhes de ${process.numero}" title="Ver detalhes"><i class="fa-solid fa-eye"></i></button>
        </article>
    `,
    )
    .join("");
}

function filterProcesses() {
  const term = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const result = processos.filter((process) => {
    const matchesSearch = [
      process.numero,
      process.assunto,
      process.setor,
      process.responsavel,
    ].some((value) => value.toLowerCase().includes(term));
    return matchesSearch && (status === "todos" || process.status === status);
  });
  renderProcesses(result);
}

function openModal(content) {
  document.querySelector(".modal-overlay")?.remove();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="modal-overlay active"><div class="process-modal" role="dialog" aria-modal="true">${content}</div></div>`,
  );
  const overlay = document.querySelector(".modal-overlay");
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) overlay.remove();
  });
  overlay
    .querySelector(".close-modal")
    ?.addEventListener("click", () => overlay.remove());
}

function openDetails(id) {
  const process = processos.find((item) => item.id === Number(id));
  if (!process) return;
  openModal(`
        <header class="modal-header"><h2>Detalhes do processo</h2><button class="close-modal" type="button" aria-label="Fechar">×</button></header>
        <div class="modal-content"><div class="detail-grid">
            <div><small>Número</small><strong>${process.numero}</strong></div><div><small>Status</small><span><span class="status ${statusClass(process.status)}">${process.status}</span></span></div>
            <div><small>Assunto</small><strong>${process.assunto}</strong></div><div><small>Prioridade</small><strong class="priority ${priorityClass(process.prioridade)}">${process.prioridade}</strong></div>
            <div><small>Setor</small><strong>${process.setor}</strong></div><div><small>Responsável</small><strong>${process.responsavel}</strong></div>
            <div><small>Data de abertura</small><strong>${process.data}</strong></div><div><small>Descrição</small><strong>${process.descricao}</strong></div>
        </div></div>`);
}

function openNewProcessForm() {
  openModal(`
        <header class="modal-header"><h2>Novo processo</h2><button class="close-modal" type="button" aria-label="Fechar">×</button></header>
        <form class="modal-content process-form" id="newProcessForm">
            <div class="form-row"><div class="form-field"><label for="numero">Número</label><input id="numero" required placeholder="2026/001246"></div><div class="form-field"><label for="assunto">Assunto</label><input id="assunto" required placeholder="Digite o assunto"></div></div>
            <div class="form-row"><div class="form-field"><label for="setor">Setor</label><input id="setor" required placeholder="Ex.: TI"></div><div class="form-field"><label for="responsavel">Responsável</label><input id="responsavel" required placeholder="Nome do responsável"></div></div>
            <div class="form-row"><div class="form-field"><label for="status">Status</label><select id="status"><option>Em andamento</option><option>Pendente</option><option>Concluído</option></select></div><div class="form-field"><label for="prioridade">Prioridade</label><select id="prioridade"><option>Baixa</option><option selected>Média</option><option>Alta</option></select></div></div>
            <div class="form-field"><label for="descricao">Descrição</label><textarea id="descricao" placeholder="Inclua uma breve descrição"></textarea></div>
            <div class="modal-actions"><button class="secondary-button close-modal" type="button">Cancelar</button><button class="primary-button" type="submit"><i class="fa-solid fa-plus"></i> Criar processo</button></div>
        </form>`);
  document
    .querySelectorAll(".close-modal")
    .forEach((button) =>
      button.addEventListener("click", () =>
        document.querySelector(".modal-overlay")?.remove(),
      ),
    );
  document
    .querySelector("#newProcessForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const getValue = (id) => document.querySelector(`#${id}`).value.trim();
      processos.unshift({
        id: Date.now(),
        numero: getValue("numero"),
        assunto: getValue("assunto"),
        setor: getValue("setor"),
        responsavel: getValue("responsavel"),
        status: getValue("status"),
        prioridade: getValue("prioridade"),
        descricao: getValue("descricao") || "Sem descrição.",
        data: new Intl.DateTimeFormat("pt-BR").format(new Date()),
      });
      document.querySelector(".modal-overlay")?.remove();
      filterProcesses();
    });
}

searchInput.addEventListener("input", filterProcesses);
statusFilter.addEventListener("change", filterProcesses);
newProcessButton.addEventListener("click", openNewProcessForm);
processList.addEventListener("click", (event) => {
  const button = event.target.closest(".details-button");
  if (button) openDetails(button.dataset.id);
});

renderProcesses();
