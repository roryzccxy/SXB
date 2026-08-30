(function () {
  const KEY = "crm-auth-v1";
  const USER = "admin";
  const PASS = "123456789";
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const isLogin = file === "index.html" || file === "login.html";

  const loggedIn = () => sessionStorage.getItem(KEY) === USER;

  window.CRMAuth = {
    loggedIn,
    login(user, pass) {
      if (String(user || "").trim() === USER && String(pass || "") === PASS) {
        sessionStorage.setItem(KEY, USER);
        return true;
      }
      return false;
    },
    logout() {
      sessionStorage.removeItem(KEY);
      location.href = "index.html";
    }
  };

  if (isLogin) {
    if (loggedIn()) location.replace("workbench.html");
  } else if (!loggedIn()) {
    location.replace("index.html");
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-logout]").forEach((btn) => {
      btn.addEventListener("click", () => window.CRMAuth.logout());
    });
  });
})();
