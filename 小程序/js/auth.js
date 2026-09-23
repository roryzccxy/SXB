(function () {
  const KEY = "crm-auth-v1";

  const ensureWeChatSession = () => {
    if (!sessionStorage.getItem(KEY)) {
      sessionStorage.setItem(KEY, "admin");
      sessionStorage.setItem(KEY + "-name", "用户");
    }
  };

  window.CRMAuth = {
    loggedIn() {
      return !!sessionStorage.getItem(KEY);
    },
    login() {
      ensureWeChatSession();
      return true;
    },
    logout() {
      ensureWeChatSession();
      if (window.Mini && typeof Mini.toast === "function") Mini.toast("小程序默认微信登录，暂不支持退出");
    }
  };

  ensureWeChatSession();

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-logout]").forEach((btn) => {
      btn.addEventListener("click", () => window.CRMAuth.logout());
    });
  });
})();
