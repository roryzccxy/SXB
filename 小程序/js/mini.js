(function () {
  const TAB_ICONS = {
    workbench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>',
    leads: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z"/><path d="M14 3v5h5M8 13h8M8 17h5"/></svg>',
    customers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5M17 8h4M19 6v4"/></svg>',
    contracts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    mine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="3"/><path d="M5 19c1-4 3.5-6 7-6s6 2 7 6"/></svg>'
  };

  const pad = (n) => String(n).padStart(2, "0");

  const toast = (m) => {
    const wrap = document.getElementById("toasts");
    if (!wrap) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = m;
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 1800);
  };

  const qs = (k) => new URLSearchParams(location.search).get(k) || "";

  const now = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
  };

  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  const toLocal = (s) => {
    if (!s) return "";
    return String(s).replace(" ", "T").slice(0, 16);
  };

  const fromLocal = (s) => {
    if (!s) return "";
    return String(s).replace("T", " ") + (s.length === 16 ? ":00" : "");
  };

  const yuan = (n) => "¥" + Number(n || 0).toLocaleString("zh-CN");

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return "早上好";
    if (h < 18) return "下午好";
    return "晚上好";
  };

  const ownerId = () => {
    const u = window.CRM && CRM.currentUser ? CRM.currentUser() : { id: "admin", isAdmin: true };
    if (u.isAdmin) return "";
    return u.id;
  };

  const isMineLead = (l) => {
    const id = ownerId();
    return !id || l.ownerId === id;
  };

  const isMineOpp = (o) => {
    const id = ownerId();
    return !id || o.ownerId === id;
  };

  const isMineCust = (c) => {
    const id = ownerId();
    return !id || c.ownerId === id;
  };

  const isMineCt = (c) => {
    const id = ownerId();
    if (!id) return true;
    const u = CRM.currentUser();
    return c.signerId === id || c.signerName === u.name;
  };

  const fillSel = (el, list, placeholder) => {
    if (!el) return;
    el.innerHTML = `<option value="">${placeholder || "请选择"}</option>` +
      list.map((x) => `<option value="${x.id}">${x.name}</option>`).join("");
  };

  const fitPhone = () => {
    const phone = document.getElementById("phone");
    const wrap = document.querySelector(".phone-scale");
    if (!phone || !wrap) return;
    const maxW = Math.max(280, window.innerWidth - 32);
    const maxH = Math.max(500, window.innerHeight - 32);
    const s = Math.min(1, maxW / 375, maxH / 812);
    phone.style.transform = s === 1 ? "none" : `scale(${s})`;
    wrap.style.width = 375 * s + "px";
    wrap.style.height = 812 * s + "px";
  };

  const clock = () => {
    const el = document.getElementById("statusTime");
    if (!el) return;
    const d = new Date();
    el.textContent = `${d.getHours()}:${pad(d.getMinutes())}`;
  };

  const tabbarHtml = (active) => {
    const items = [
      ["workbench", "工作台", "index.html"],
      ["leads", "线索", "leads.html"],
      ["customers", "客户", "customers.html"],
      ["contracts", "合同", "contracts.html"],
      ["mine", "我的", "mine.html"]
    ];
    return items.map(([id, name, href]) =>
      `<a href="${href}" class="${id === active ? "active" : ""}">${TAB_ICONS[id]}<span>${name}</span></a>`
    ).join("");
  };

  const mount = (opt) => {
    opt = opt || {};
    clock();
    setInterval(clock, 30000);
    fitPhone();
    window.addEventListener("resize", fitPhone);
    const bar = document.querySelector(".tabbar");
    if (bar && opt.tab) bar.innerHTML = tabbarHtml(opt.tab);
    if (!window.__miniSoonBound) {
      window.__miniSoonBound = true;
      document.addEventListener("click", (e) => {
        const el = e.target.closest(".soon");
        if (!el) return;
        e.preventDefault();
        toast("功能即将开放");
      });
    }
  };

  window.Mini = {
    toast,
    qs,
    now,
    today,
    toLocal,
    fromLocal,
    yuan,
    greet,
    ownerId,
    isMineLead,
    isMineOpp,
    isMineCust,
    isMineCt,
    fillSel,
    mount,
    user() {
      return CRM.currentUser();
    },
    openCustomer(opts) {
      opts = opts || {};
      const name = opts.name || "";
      const leadId = opts.leadId || "";
      const phone = opts.phone || "";
      const cu = CRM.loadCustomers().find((c) =>
        (leadId && c.leadId === leadId) ||
        (name && c.name === name) ||
        (phone && c.phone === phone)
      );
      if (cu) location.href = "customer-detail.html?id=" + encodeURIComponent(cu.id);
      else if (name) location.href = "customer-detail.html?name=" + encodeURIComponent(name);
      else location.href = "customers.html";
    }
  };
})();
