const preferences = JSON.parse(
  localStorage.getItem("processos-preferencias") || "{}",
);
const toast = document.querySelector("#toast");
function notify(message = "Configurações salvas com sucesso.") {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}
document.querySelectorAll(".settings-tab").forEach((button) =>
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".settings-tab,.settings-panel")
      .forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    document.querySelector("#" + button.dataset.tab).classList.add("active");
  }),
);
const themeInput = document.querySelector(
  `input[name="theme"][value="${preferences.theme || "system"}"]`,
);
if (themeInput) themeInput.checked = true;
const sidebarInput = document.querySelector(
  `input[name="sidebar"][value="${preferences.sidebar || "expanded"}"]`,
);
if (sidebarInput) sidebarInput.checked = true;
const color = document.querySelector("#primaryColor");
color.value = preferences.primaryColor || "#4f46e5";
document.querySelector("#colorValue").textContent = color.value;
color.addEventListener(
  "input",
  () => (document.querySelector("#colorValue").textContent = color.value),
);
document.querySelectorAll("form").forEach((form) =>
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.id === "appearance") {
      const next = {
        theme: document.querySelector('input[name="theme"]:checked').value,
        sidebar: document.querySelector('input[name="sidebar"]:checked').value,
        primaryColor: color.value,
      };
      localStorage.setItem("processos-preferencias", JSON.stringify(next));
      document.documentElement.dataset.theme =
        next.theme === "system"
          ? matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : next.theme;
      document.documentElement.dataset.sidebar = next.sidebar;
      document.documentElement.style.setProperty(
        "--primary",
        next.primaryColor,
      );
    }
    notify();
  }),
);
document
  .querySelectorAll(".action-message")
  .forEach((button) =>
    button.addEventListener("click", () =>
      notify("Ação registrada. A funcionalidade será integrada ao sistema."),
    ),
  );
