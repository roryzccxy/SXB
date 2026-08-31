(function () {
  const KEY = "crm-auth-v1";
  const USER = "admin";
  const PASS = "123456789";
  const STAFF_KEY = "crm-staff-v2";
  const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const isLogin = file === "index.html" || file === "login.html";

  const loggedIn = () => !!sessionStorage.getItem(KEY);

  window.CRMAuth = {
    loggedIn,
    login(user, pass) {
      const u = String(user || "").trim();
      const p = String(pass || "");
      if (u === USER && p === PASS) {
        sessionStorage.setItem(KEY, USER);
        sessionStorage.setItem(KEY + "-name", "用户");
        return true;
      }
      try {
        const list = JSON.parse(localStorage.getItem(STAFF_KEY) || "[]");
        const hit = (Array.isArray(list) ? list : []).find((s) =>
          s && s.statusId !== "left" && (s.phone === u || s.jobNo === u || s.no === u)
        );
        if (hit && p === String(hit.password || "123456")) {
          sessionStorage.setItem(KEY, hit.id);
          sessionStorage.setItem(KEY + "-name", hit.name || "用户");
          return true;
        }
      } catch (e) {}
      return false;
    },
    logout() {
      sessionStorage.removeItem(KEY);
      sessionStorage.removeItem(KEY + "-name");
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
