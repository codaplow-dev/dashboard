const savedPreferences = JSON.parse(localStorage.getItem("processos-preferencias") || "{}");
document.documentElement.dataset.theme = savedPreferences.theme === "system" || !savedPreferences.theme
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : savedPreferences.theme;
document.documentElement.dataset.sidebar = savedPreferences.sidebar || "expanded";
if (savedPreferences.primaryColor) document.documentElement.style.setProperty("--primary", savedPreferences.primaryColor);

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".menu-item[href]").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === currentPage);
    });

    document.querySelectorAll('.sidebar-footer .menu-item[href="#"]').forEach(link => {
        link.setAttribute("href", "configuracoes.html");
    });
});
