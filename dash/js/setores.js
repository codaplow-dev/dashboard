const sectors = [
  {
    name: "GRH",
    description: "Gestão de pessoas e solicitações funcionais.",
    processes: 24,
    members: 8,
    icon: "fa-users",
  },
  {
    name: "SEFA",
    description: "Demandas fiscais e alterações cadastrais.",
    processes: 18,
    members: 6,
    icon: "fa-file-invoice-dollar",
  },
  {
    name: "Tecnologia da Informação",
    description: "Acessos, sistemas e suporte tecnológico.",
    processes: 31,
    members: 12,
    icon: "fa-laptop-code",
  },
  {
    name: "Protocolo",
    description: "Recebimento, análise e distribuição documental.",
    processes: 15,
    members: 5,
    icon: "fa-folder-open",
  },
  {
    name: "Jurídico",
    description: "Pareceres e acompanhamento de demandas legais.",
    processes: 12,
    members: 4,
    icon: "fa-scale-balanced",
  },
];
const sectorGrid = document.querySelector("#sectorGrid"),
  sectorSearch = document.querySelector("#sectorSearch");
function renderSectors(list = sectors) {
  sectorGrid.innerHTML =
    list
      .map(
        (s) =>
          `<article class="sector-card"><span class="sector-icon"><i class="fa-solid ${s.icon}"></i></span><h2>${s.name}</h2><p>${s.description}</p><div class="sector-details"><span><strong>${s.processes}</strong> processos</span><span><strong>${s.members}</strong> pessoas</span></div></article>`,
      )
      .join("") || "<p>Nenhum setor encontrado.</p>";
}
sectorSearch.addEventListener("input", () => {
  const term = sectorSearch.value.toLowerCase();
  renderSectors(
    sectors.filter((s) =>
      (s.name + s.description).toLowerCase().includes(term),
    ),
  );
});
document.querySelector("#sectorCount").textContent = sectors.length;
document.querySelector("#sectorProcesses").textContent = sectors.reduce(
  (sum, s) => sum + s.processes,
  0,
);
document.querySelector("#sectorMembers").textContent = sectors.reduce(
  (sum, s) => sum + s.members,
  0,
);
document
  .querySelector("#newSector")
  .addEventListener("click", () =>
    alert("O cadastro de setor será adicionado na próxima etapa."),
  );
renderSectors();
