/* 营销目标数据：字典为来源，目标写入列表/汇总，实际由业务回写只读 */
const CRM = (() => {
  const KEY = "crm-marketing-goals-v1";

  const dicts = {
    periods: [
      { id: "year", name: "年度" },
      { id: "quarter", name: "季度" },
      { id: "month", name: "月度" }
    ],
    years: Array.from({ length: 10 }, (_, i) => 2026 + i),
    depts: [
      { id: "s1", name: "销售一组" },
      { id: "s2", name: "销售二组" },
      { id: "w1", name: "网销一组" },
      { id: "c1", name: "常规组" },
      { id: "mkt", name: "市场部" },
      { id: "fin", name: "财务部" },
      { id: "adm", name: "行政部" },
      { id: "cs", name: "常熟组" }
    ],
    people: [
      { id: "lqh", name: "lqh", deptId: "s1" },
      { id: "dwj", name: "dwj", deptId: "s1" },
      { id: "chenhai", name: "陈海", deptId: "s1" },
      { id: "licheng", name: "李承", deptId: "s1" },
      { id: "wangqian", name: "王倩", deptId: "s2" },
      { id: "chenchen", name: "陈晨", deptId: "s2" },
      { id: "wufang", name: "吴芳", deptId: "cs" },
      { id: "yangting", name: "杨婷", deptId: "w1" },
      { id: "yangwen", name: "杨文", deptId: "c1" },
      { id: "zhaosiyuan", name: "赵思源", deptId: "c1" },
      { id: "lifang", name: "李芳", deptId: "mkt" },
      { id: "zhu", name: "朱总", deptId: "fin" }
    ],
    products: [
      { id: "book", name: "代理记账" },
      { id: "addon", name: "增值服务" },
      { id: "addr", name: "注册地址" },
      { id: "gov", name: "政务服务" },
      { id: "tax", name: "税务申报" }
    ],
    regions: [
      { id: "zj", name: "浙江" },
      { id: "zjh", name: "浙江杭州" },
      { id: "sh", name: "上海" },
      { id: "jssz", name: "江苏苏州" },
      { id: "jscz", name: "江苏常州" }
    ],
    sources: [
      { id: "online", name: "线上推广" },
      { id: "tele", name: "电话营销" },
      { id: "dy", name: "抖音" },
      { id: "ref", name: "转介绍" }
    ],
    industries: [
      { id: "trade", name: "商贸流通" },
      { id: "it", name: "信息技术" },
      { id: "logistics", name: "物流仓储" },
      { id: "food", name: "餐饮服务" },
      { id: "ad", name: "广告传媒" },
      { id: "mfg", name: "制造业" },
      { id: "i11", name: "11" }
    ],
    companyTypes: [
      { id: "llc", name: "有限责任公司" },
      { id: "ltd", name: "有限公司" },
      { id: "ind", name: "个体户" },
      { id: "c22", name: "22" }
    ],
    followResults: [
      { id: "following", name: "跟进中" },
      { id: "abandon", name: "放弃" },
      { id: "invalid", name: "无效" },
      { id: "opportunity", name: "转商机" }
    ],
    categories: [
      { id: "c1", name: "线索一" },
      { id: "none", name: "非目标" },
      { id: "c444", name: "444" }
    ],
    wechat: [
      { id: "yes", name: "是" },
      { id: "no", name: "否" }
    ],
    oppStages: [
      { id: "intent", name: "意向商机" },
      { id: "win", name: "成交商机" },
      { id: "lost", name: "流失商机" }
    ],
    oppLevels: [
      { id: "A", name: "A" },
      { id: "B", name: "B" },
      { id: "C", name: "C" },
      { id: "D", name: "D" }
    ],
    contractTypes: [
      { id: "book", name: "代账合同" },
      { id: "addon", name: "增值服务合同" },
      { id: "addr", name: "注册地址合同" },
      { id: "tax", name: "税务筹划合同" },
      { id: "legal", name: "法务合同" }
    ],
    contractStatuses: [
      { id: "signed", name: "已签约" },
      { id: "pending", name: "待签署" },
      { id: "draft", name: "草拟" },
      { id: "expired", name: "已到期" },
      { id: "void", name: "作废" }
    ],
    payForms: [
      { id: "year", name: "年付" },
      { id: "quarter", name: "季付" },
      { id: "month", name: "月付" }
    ],
    payStatuses: [
      { id: "unpaid", name: "未付款" },
      { id: "partial", name: "部分付款" },
      { id: "paid", name: "已付清" }
    ],
    invoiceTypes: [
      { id: "normal", name: "增值税普通票" },
      { id: "special", name: "增值税专用发票" }
    ],
    addrPackages: [
      { id: "p1", name: "基础注册地址（一年）" },
      { id: "p2", name: "挂靠地址+托管" },
      { id: "p3", name: "商务秘书地址" }
    ],
    addonItems: [
      { id: "chg", name: "工商变更" },
      { id: "plan", name: "税务筹划" },
      { id: "audit", name: "汇算清缴加急" },
      { id: "permit", name: "许可证代办" },
      { id: "tax", name: "税务申报" },
      { id: "gov", name: "政务服务" }
    ],
    customerStatuses: [
      { id: "deal", name: "成交" },
      { id: "intent", name: "意向" },
      { id: "potential", name: "潜在" },
      { id: "churn", name: "流失" }
    ],
    addressTypes: [
      { id: "park", name: "园区地址" },
      { id: "office", name: "办公地址" },
      { id: "reg", name: "注册地址" },
      { id: "wh", name: "仓库地址" }
    ],
    addressStatuses: [
      { id: "full", name: "已满" },
      { id: "inuse", name: "使用中" },
      { id: "idle", name: "空闲" },
      { id: "off", name: "已停用" }
    ],
    itemTypes: [
      { id: "license", name: "营业执照" },
      { id: "seal", name: "公章证件" },
      { id: "finance", name: "财务资料" },
      { id: "tax", name: "税务资料" },
      { id: "contract", name: "合同文件" },
      { id: "other", name: "其他" }
    ],
    itemUnits: [
      { id: "copy", name: "份" },
      { id: "pc", name: "枚" },
      { id: "set", name: "套" },
      { id: "book", name: "本" },
      { id: "vol", name: "册" }
    ],
    itemStatuses: [
      { id: "stock", name: "在存" },
      { id: "borrowed", name: "已借出" },
      { id: "taken", name: "已取回" },
      { id: "lost", name: "已遗失" }
    ],
    reimbTypes: [
      { id: "travel", name: "差旅费" },
      { id: "ent", name: "招待费" },
      { id: "office", name: "办公费" },
      { id: "traffic", name: "交通费" },
      { id: "other", name: "其他" }
    ],
    reimbStatuses: [
      { id: "wait", name: "待审批" },
      { id: "pass", name: "已通过" },
      { id: "reject", name: "已驳回" }
    ],
    reportLines: [
      { id: "book", name: "代账服务" },
      { id: "taxadv", name: "财税咨询" },
      { id: "reg", name: "工商注册" },
      { id: "plan", name: "税务筹划" },
      { id: "addon", name: "增值服务" }
    ],
    hrGenders: [
      { id: "m", name: "男" },
      { id: "f", name: "女" }
    ],
    hrPosts: [
      { id: "sale_mgr", name: "销售经理" },
      { id: "sale", name: "销售专员" },
      { id: "wx_mgr", name: "网销主管" },
      { id: "wx", name: "网销专员" },
      { id: "cs", name: "客户经理" },
      { id: "acct_mgr", name: "会计主管" },
      { id: "acct", name: "会计" },
      { id: "mkt", name: "市场专员" },
      { id: "admin", name: "行政专员" },
      { id: "intern", name: "实习生" }
    ],
    hrEdu: [
      { id: "master", name: "硕士" },
      { id: "bachelor", name: "本科" },
      { id: "college", name: "大专" },
      { id: "high", name: "高中" }
    ],
    hrStatuses: [
      { id: "active", name: "在职" },
      { id: "probation", name: "试用期" },
      { id: "expiring", name: "合同到期" },
      { id: "left", name: "离职" }
    ],
    empStatuses: [
      { id: "live", name: "在职" },
      { id: "left", name: "离职" }
    ],
    salaryStatuses: [
      { id: "paid", name: "已发放" },
      { id: "wait", name: "待发放" },
      { id: "stop", name: "已停发" }
    ],
    roleScopes: [
      { id: "all", name: "全部数据" },
      { id: "dept", name: "本部门数据" },
      { id: "self", name: "个人数据" }
    ],
    roleStatuses: [
      { id: "on", name: "正常" },
      { id: "off", name: "停用" }
    ]
  };

  const metricKeys = [
    { key: "lead", label: "新增线索", unit: "条", createUnit: "条" },
    { key: "customer", label: "成交客户", unit: "家", createUnit: "位" },
    { key: "opp", label: "商机数量", unit: "个", createUnit: "个" },
    { key: "sign", label: "签约金额", unit: "万", createUnit: "万" },
    { key: "renew", label: "续费金额", unit: "万", createUnit: "万" }
  ];

  const seed = [
    ["chenhai", 80, 68, 15, 12, 20, 16, 120, 82.5, 45, 35.2],
    ["wufang", 90, 72, 18, 14, 22, 18, 140, 98, 50, 38],
    ["yangwen", 75, 55, 14, 10, 18, 14, 110, 70, 40, 28],
    ["licheng", 70, 50, 14, 11, 16, 12, 100, 62, 35, 24],
    ["zhaosiyuan", 80, 58, 16, 12, 19, 15, 115, 72, 38, 27],
    ["yangting", 75, 48, 15, 10, 17, 13, 95, 55, 32, 22],
    ["wangqian", 70, 42, 14, 9, 16, 11, 90, 48, 30, 20],
    ["chenchen", 60, 35, 14, 7, 14, 10, 90, 39.3, 30, 21.4]
  ].map((row, i) => {
    const person = dicts.people.find((p) => p.id === row[0]);
    return {
      id: "g" + (i + 1),
      period: "year",
      year: 2026,
      deptId: person.deptId,
      personId: person.id,
      productId: "book",
      leadTarget: row[1],
      leadActual: row[2],
      customerTarget: row[3],
      customerActual: row[4],
      oppTarget: row[5],
      oppActual: row[6],
      signTarget: row[7],
      signActual: row[8],
      renewTarget: row[9],
      renewActual: row[10]
    };
  });

  const load = () => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed.slice();
  };

  const save = (list) => localStorage.setItem(KEY, JSON.stringify(list));

  const person = (id) => dicts.people.find((p) => p.id === id);
  const dept = (id) => dicts.depts.find((d) => d.id === id);
  const product = (id) => dicts.products.find((p) => p.id === id);
  const period = (id) => dicts.periods.find((p) => p.id === id);

  const ratio = (actual, target) => (target ? actual / target : 0);

  const rowRate = (row) =>
    (ratio(row.leadActual, row.leadTarget) +
      ratio(row.customerActual, row.customerTarget) +
      ratio(row.oppActual, row.oppTarget) +
      ratio(row.signActual, row.signTarget) +
      ratio(row.renewActual, row.renewTarget)) /
    5;

  const uniqueKey = (row) => [row.period, row.year, row.personId, row.productId].join("|");

  const bumpMetric = (personId, field, delta) => {
    const list = load();
    const row = list.find((g) => g.personId === personId && g.year === 2026 && g.period === "year");
    if (!row) return;
    row[field] = Math.max(0, (row[field] || 0) + delta);
    save(list);
  };

  const LEAD_KEY = "crm-leads-v2";
  const leadSeed = () => [
    {
      id: "l1",
      name: "商贸",
      contact: "张经理",
      phone: "17816781902",
      regionId: "zj",
      industryId: "i11",
      sourceId: "dy",
      companyTypeId: "c22",
      followResult: "opportunity",
      categoryId: "c444",
      wechatId: "yes",
      followContent: "123123",
      nextFollowAt: "2026-08-29 09:12:00",
      lastFollowAt: "2026-08-29 09:12:00",
      createdAt: "2026-08-29 09:12:00",
      ownerId: "lqh",
      productId: "book",
      oppStageId: "intent",
      oppLevelId: "A",
      logs: [
        { at: "2026-08-29 09:12:00", type: "follow", status: "opportunity", user: "lqh", text: "转商机：代理记账 / 意向商机 / A" },
        { at: "2026-08-29 09:12:00", type: "create", user: "lqh", text: "创建了线索" }
      ]
    },
    {
      id: "l2",
      name: "郑靓",
      companyName: "常熟隆达商贸",
      contact: "郑靓",
      phone: "17816781902",
      regionId: "jssz",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "no",
      followContent: "多少啊打算",
      nextFollowAt: "2026-08-29 16:20:08",
      lastFollowAt: "2026-08-29 16:20:08",
      createdAt: "2026-08-29 09:12:00",
      ownerId: "dwj",
      productId: "book",
      oppStageId: "intent",
      oppLevelId: "A",
      logs: [
        { at: "2026-08-29 16:20:08", type: "follow", status: "opportunity", user: "dwj", text: "转商机：代理记账 / 意向商机 / A" },
        { at: "2026-08-29 16:20:08", type: "follow", status: "following", user: "dwj", text: "跟进内容：多少啊打算" },
        { at: "2026-08-29 09:12:00", type: "create", user: "dwj", text: "创建了线索" }
      ]
    },
    {
      id: "l3",
      name: "—",
      phone: "13700002222",
      regionId: "sh",
      industryId: "",
      sourceId: "dy",
      companyTypeId: "ind",
      followResult: "invalid",
      categoryId: "none",
      wechatId: "no",
      followContent: "",
      nextFollowAt: "",
      lastFollowAt: "2026-08-29 09:15:00",
      createdAt: "2026-08-29 09:12:00",
      ownerId: "dwj",
      logs: [
        { at: "2026-08-29 09:15:00", type: "follow", status: "invalid", user: "dwj", text: "无效说明：号码空号，无法联系" },
        { at: "2026-08-29 09:12:00", type: "create", user: "dwj", text: "创建了线索" }
      ]
    },
    {
      id: "l4",
      name: "lily",
      phone: "13900001111",
      regionId: "zjh",
      industryId: "",
      sourceId: "ref",
      companyTypeId: "",
      followResult: "abandon",
      categoryId: "none",
      wechatId: "no",
      followContent: "",
      nextFollowAt: "",
      lastFollowAt: "2026-08-29 11:08:32",
      createdAt: "2026-08-29 09:12:00",
      ownerId: "lqh",
      logs: [
        { at: "2026-08-29 11:08:32", type: "follow", status: "abandon", from: "following", user: "dwj", text: "放弃说明：客户暂无需求，暂不考虑" },
        { at: "2026-08-29 09:12:00", type: "create", user: "dwj", text: "创建了线索" }
      ]
    },
    {
      id: "l5",
      name: "吴芳客户",
      contact: "吴芳",
      phone: "13800008888",
      regionId: "zj",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "已转商机",
      nextFollowAt: "2026-09-01 10:00:00",
      lastFollowAt: "2026-08-29 10:00:00",
      createdAt: "2026-08-29 10:00:00",
      ownerId: "wufang",
      oppStageId: "intent",
      oppLevelId: "A",
      productId: "book",
      logs: [
        { at: "2026-08-29 10:00:00", type: "follow", status: "opportunity", user: "wufang", text: "转商机：代理记账 / 意向商机 / A" },
        { at: "2026-08-29 10:00:00", type: "create", user: "wufang", text: "创建了线索" }
      ]
    },
    {
      id: "l6",
      name: "杭州云启科技",
      contact: "张经理",
      phone: "17816781902",
      regionId: "zjh",
      industryId: "trade",
      sourceId: "ref",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "合同已签，代理记账年付",
      lastFollowAt: "2026-08-18 09:12:00",
      createdAt: "2026-08-10 09:00:00",
      ownerId: "chenhai",
      productId: "book",
      oppStageId: "win",
      oppLevelId: "A",
      contractNo: "HT20260818001",
      contractAmount: 53,
      closedAt: "2026-08-18 09:12:00",
      logs: [
        { at: "2026-08-18 09:12:00", type: "follow", status: "opportunity", user: "chenhai", text: "成交：合同 HT20260818001，金额 53 万" },
        { at: "2026-08-10 09:00:00", type: "create", user: "chenhai", text: "创建了线索" }
      ]
    },
    {
      id: "l7",
      name: "南京星河信息",
      contact: "陈伟",
      phone: "13912345601",
      regionId: "sh",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "预算已确认，下周出方案",
      lastFollowAt: "2026-08-21 09:12:00",
      createdAt: "2026-08-12 11:00:00",
      ownerId: "licheng",
      productId: "addr",
      oppStageId: "intent",
      oppLevelId: "B",
      logs: [
        { at: "2026-08-21 09:12:00", type: "follow", status: "opportunity", user: "licheng", text: "转商机：注册地址 / 意向商机 / B" },
        { at: "2026-08-12 11:00:00", type: "create", user: "licheng", text: "创建了线索" }
      ]
    },
    {
      id: "l8",
      name: "宁波海丰商贸",
      contact: "李晓",
      phone: "13712345602",
      regionId: "zj",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "no",
      followContent: "价格高于竞品，客户选择他司",
      lastFollowAt: "2026-08-21 09:12:00",
      createdAt: "2026-08-08 14:00:00",
      ownerId: "yangwen",
      productId: "book",
      oppStageId: "lost",
      oppLevelId: "D",
      lostAt: "2026-08-21 09:12:00",
      lostReason: "价格高于竞品，客户选择他司",
      logs: [
        { at: "2026-08-21 09:12:00", type: "follow", status: "opportunity", user: "yangwen", text: "流失说明：价格高于竞品，客户选择他司" },
        { at: "2026-08-08 14:00:00", type: "create", user: "yangwen", text: "创建了线索" }
      ]
    },
    {
      id: "l9",
      name: "李晓",
      contact: "李晓",
      phone: "13612345603",
      regionId: "zjh",
      industryId: "trade",
      sourceId: "ref",
      companyTypeId: "ind",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "待补充联系邮箱",
      lastFollowAt: "2026-08-20 15:30:00",
      createdAt: "2026-08-15 10:00:00",
      ownerId: "wangqian",
      productId: "addon",
      oppStageId: "intent",
      oppLevelId: "C",
      logs: [
        { at: "2026-08-20 15:30:00", type: "follow", status: "opportunity", user: "wangqian", text: "转商机：增值服务 / 意向商机 / C" },
        { at: "2026-08-15 10:00:00", type: "create", user: "wangqian", text: "创建了线索" }
      ]
    },
    {
      id: "l10",
      name: "深圳市宝安区晋味餐饮管理",
      contact: "王磊",
      phone: "13512345604",
      regionId: "sh",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "no",
      followContent: "客户预算取消，短期无需求",
      lastFollowAt: "2026-08-22 11:20:00",
      createdAt: "2026-08-09 09:00:00",
      ownerId: "chenchen",
      productId: "addon",
      oppStageId: "lost",
      oppLevelId: "C",
      lostAt: "2026-08-22 11:20:00",
      lostReason: "客户预算取消，短期无需求",
      logs: [
        { at: "2026-08-22 11:20:00", type: "follow", status: "opportunity", user: "chenchen", text: "流失说明：客户预算取消，短期无需求" },
        { at: "2026-08-09 09:00:00", type: "create", user: "chenchen", text: "创建了线索" }
      ]
    },
    {
      id: "l11",
      name: "苏州锦程电子",
      contact: "郑毅",
      phone: "13412345605",
      regionId: "jssz",
      industryId: "trade",
      sourceId: "ref",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "增值服务已签约",
      lastFollowAt: "2026-08-21 14:00:00",
      createdAt: "2026-08-11 09:00:00",
      ownerId: "wufang",
      productId: "addon",
      oppStageId: "win",
      oppLevelId: "B",
      contractNo: "HT20260821002",
      contractAmount: 4,
      closedAt: "2026-08-21 14:00:00",
      logs: [
        { at: "2026-08-21 14:00:00", type: "follow", status: "opportunity", user: "wufang", text: "成交：合同 HT20260821002，金额 4 万" },
        { at: "2026-08-11 09:00:00", type: "create", user: "wufang", text: "创建了线索" }
      ]
    },
    {
      id: "l12",
      name: "上海远航物流",
      contact: "陈晨",
      phone: "13312345606",
      regionId: "sh",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "政务服务打包成交",
      lastFollowAt: "2026-08-22 16:40:00",
      createdAt: "2026-08-13 09:00:00",
      ownerId: "licheng",
      productId: "gov",
      oppStageId: "win",
      oppLevelId: "A",
      contractNo: "HT20260822003",
      contractAmount: 12,
      closedAt: "2026-08-22 16:40:00",
      logs: [
        { at: "2026-08-22 16:40:00", type: "follow", status: "opportunity", user: "licheng", text: "成交：合同 HT20260822003，金额 12 万" },
        { at: "2026-08-13 09:00:00", type: "create", user: "licheng", text: "创建了线索" }
      ]
    },
    {
      id: "l13",
      name: "杭州西湖广告",
      contact: "赵敏",
      phone: "13212345607",
      regionId: "zjh",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "已约下周到店沟通",
      lastFollowAt: "2026-08-24 10:18:00",
      createdAt: "2026-08-16 09:00:00",
      ownerId: "yangting",
      productId: "tax",
      oppStageId: "intent",
      oppLevelId: "B",
      logs: [
        { at: "2026-08-24 10:18:00", type: "follow", status: "opportunity", user: "yangting", text: "转商机：税务申报 / 意向商机 / B" },
        { at: "2026-08-16 09:00:00", type: "create", user: "yangting", text: "创建了线索" }
      ]
    },
    {
      id: "l14",
      name: "嘉兴安达汽配",
      contact: "周强",
      phone: "13112345608",
      regionId: "zj",
      industryId: "trade",
      sourceId: "ref",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "方案已发，待报价确认",
      lastFollowAt: "2026-08-25 09:40:00",
      createdAt: "2026-08-17 09:00:00",
      ownerId: "zhaosiyuan",
      productId: "book",
      oppStageId: "intent",
      oppLevelId: "A",
      logs: [
        { at: "2026-08-25 09:40:00", type: "follow", status: "opportunity", user: "zhaosiyuan", text: "转商机：代理记账 / 意向商机 / A" },
        { at: "2026-08-17 09:00:00", type: "create", user: "zhaosiyuan", text: "创建了线索" }
      ]
    },
    {
      id: "l15",
      name: "无锡明达纺织",
      contact: "孙悦",
      phone: "15912345609",
      regionId: "jssz",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "no",
      followContent: "地址政策变化，客户暂缓",
      lastFollowAt: "2026-08-23 13:05:00",
      createdAt: "2026-08-14 09:00:00",
      ownerId: "yangwen",
      productId: "addr",
      oppStageId: "lost",
      oppLevelId: "B",
      lostAt: "2026-08-23 13:05:00",
      lostReason: "地址政策变化，客户暂缓",
      logs: [
        { at: "2026-08-23 13:05:00", type: "follow", status: "opportunity", user: "yangwen", text: "流失说明：地址政策变化，客户暂缓" },
        { at: "2026-08-14 09:00:00", type: "create", user: "yangwen", text: "创建了线索" }
      ]
    },
    {
      id: "l16",
      name: "温州瓯海贸易",
      contact: "吴芳",
      phone: "15812345610",
      regionId: "zj",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "对比三家服务商",
      lastFollowAt: "2026-08-26 11:00:00",
      createdAt: "2026-08-18 09:00:00",
      ownerId: "wufang",
      productId: "addon",
      oppStageId: "intent",
      oppLevelId: "C",
      logs: [
        { at: "2026-08-26 11:00:00", type: "follow", status: "opportunity", user: "wufang", text: "转商机：增值服务 / 意向商机 / C" },
        { at: "2026-08-18 09:00:00", type: "create", user: "wufang", text: "创建了线索" }
      ]
    },
    {
      id: "l17",
      name: "绍兴柯桥布业",
      contact: "钱进",
      phone: "15712345611",
      regionId: "zj",
      industryId: "trade",
      sourceId: "ref",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "代理记账已签约",
      lastFollowAt: "2026-08-25 17:20:00",
      createdAt: "2026-08-19 09:00:00",
      ownerId: "chenhai",
      productId: "book",
      oppStageId: "win",
      oppLevelId: "C",
      contractNo: "HT20260825004",
      contractAmount: 8,
      closedAt: "2026-08-25 17:20:00",
      logs: [
        { at: "2026-08-25 17:20:00", type: "follow", status: "opportunity", user: "chenhai", text: "成交：合同 HT20260825004，金额 8 万" },
        { at: "2026-08-19 09:00:00", type: "create", user: "chenhai", text: "创建了线索" }
      ]
    },
    {
      id: "l18",
      name: "湖州南浔木业",
      contact: "冯涛",
      phone: "15612345612",
      regionId: "zj",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "no",
      followContent: "决策人更换，需重新跟进后流失",
      lastFollowAt: "2026-08-26 09:50:00",
      createdAt: "2026-08-20 09:00:00",
      ownerId: "wangqian",
      productId: "book",
      oppStageId: "lost",
      oppLevelId: "D",
      lostAt: "2026-08-26 09:50:00",
      lostReason: "决策人更换，需重新跟进后流失",
      logs: [
        { at: "2026-08-26 09:50:00", type: "follow", status: "opportunity", user: "wangqian", text: "流失说明：决策人更换，需重新跟进后流失" },
        { at: "2026-08-20 09:00:00", type: "create", user: "wangqian", text: "创建了线索" }
      ]
    },
    {
      id: "l19",
      name: "金华义乌小商品",
      contact: "何丽",
      phone: "15512345613",
      regionId: "zj",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "政务服务打包意向明确",
      lastFollowAt: "2026-08-27 10:06:00",
      createdAt: "2026-08-21 09:00:00",
      ownerId: "chenchen",
      productId: "gov",
      oppStageId: "intent",
      oppLevelId: "A",
      logs: [
        { at: "2026-08-27 10:06:00", type: "follow", status: "opportunity", user: "chenchen", text: "转商机：政务服务 / 意向商机 / A" },
        { at: "2026-08-21 09:00:00", type: "create", user: "chenchen", text: "创建了线索" }
      ]
    },
    {
      id: "l20",
      name: "台州路桥机电",
      contact: "罗斌",
      phone: "15412345614",
      regionId: "zj",
      industryId: "trade",
      sourceId: "ref",
      companyTypeId: "ltd",
      followResult: "opportunity",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "代理记账成交",
      lastFollowAt: "2026-08-28 09:30:00",
      createdAt: "2026-08-22 09:00:00",
      ownerId: "yangting",
      productId: "book",
      oppStageId: "win",
      oppLevelId: "B",
      contractNo: "HT20260828005",
      contractAmount: 6,
      closedAt: "2026-08-28 09:30:00",
      logs: [
        { at: "2026-08-28 09:30:00", type: "follow", status: "opportunity", user: "yangting", text: "成交：合同 HT20260828005，金额 6 万" },
        { at: "2026-08-22 09:00:00", type: "create", user: "yangting", text: "创建了线索" }
      ]
    },
    {
      id: "l21",
      name: "王小明",
      phone: "15012345615",
      regionId: "zj",
      industryId: "trade",
      sourceId: "dy",
      companyTypeId: "ltd",
      followResult: "following",
      categoryId: "c1",
      wechatId: "yes",
      followContent: "已加微信，待确认记账套餐",
      nextFollowAt: "2026-09-02 10:00:00",
      lastFollowAt: "2026-08-29 11:00:00",
      createdAt: "2026-08-28 09:12:00",
      ownerId: "lqh",
      logs: [
        { at: "2026-08-29 11:00:00", type: "follow", status: "following", user: "lqh", text: "跟进内容：已加微信，待确认记账套餐" },
        { at: "2026-08-28 09:12:00", type: "create", user: "lqh", text: "创建了线索" }
      ]
    }
  ];

  const loadLeads = () => {
    try {
      const raw = localStorage.getItem(LEAD_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    const seedLeads = leadSeed();
    localStorage.setItem(LEAD_KEY, JSON.stringify(seedLeads));
    return seedLeads;
  };

  const saveLeads = (list) => localStorage.setItem(LEAD_KEY, JSON.stringify(list));

  const OPP_KEY = "crm-opps-v3";

  const oppFromLead = (lead) => ({
    id: "opp-" + lead.id,
    leadId: lead.id,
    productId: lead.productId || "book",
    customerName: lead.companyName || lead.name || "—",
    contact: lead.contact || lead.name || "",
    phone: lead.phone || "",
    stageId: lead.oppStageId === "win" || lead.oppStageId === "lost" ? lead.oppStageId : "intent",
    levelId: lead.oppLevelId || "A",
    note: lead.followContent || "",
    ownerId: lead.ownerId,
    lastFollowAt: lead.lastFollowAt || "",
    contractNo: lead.contractNo || "",
    contractAmount: lead.contractAmount || 0,
    closedAt: lead.closedAt || "",
    lostAt: lead.lostAt || "",
    lostReason: lead.lostReason || ""
  });

  const oppSeed = () =>
    leadSeed()
      .filter((l) => l.followResult === "opportunity")
      .map(oppFromLead);

  const loadOpps = () => {
    let list = [];
    try {
      const raw = localStorage.getItem(OPP_KEY);
      if (raw) list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch (e) {
      list = [];
    }
    oppSeed().forEach((s) => {
      if (!list.some((o) => o.leadId === s.leadId || o.id === s.id)) list.push(s);
    });
    const leads = loadLeads().filter((l) => l.followResult === "opportunity");
    leads.forEach((l) => {
      if (!list.some((o) => o.leadId === l.id)) list.push(oppFromLead(l));
    });
    localStorage.setItem(OPP_KEY, JSON.stringify(list));
    return list;
  };

  const saveOpps = (list) => localStorage.setItem(OPP_KEY, JSON.stringify(list));

  const upsertOppFromLead = (lead) => {
    const list = loadOpps();
    const i = list.findIndex((o) => o.leadId === lead.id);
    const next = oppFromLead(lead);
    if (i >= 0) {
      list[i] = {
        ...list[i],
        productId: next.productId,
        customerName: next.customerName,
        contact: list[i].contact || next.contact,
        phone: next.phone,
        levelId: next.levelId,
        ownerId: next.ownerId,
        lastFollowAt: next.lastFollowAt,
        stageId: list[i].stageId === "win" || list[i].stageId === "lost" ? list[i].stageId : "intent"
      };
    } else list.unshift(next);
    saveOpps(list);
    return list;
  };

  const dictName = (key, id) => {
    const list = dicts[key] || [];
    const hit = list.find((x) => x.id === id);
    return hit ? hit.name : id || "—";
  };

  const ADDR_KEY = "crm-addresses-v1";
  const autoAddrStatus = (row) => {
    if (row.statusId === "off") return "off";
    const area = Number(row.area || 0);
    const used = Number(row.usedArea || 0);
    if (area > 0 && used / area >= 0.9) return "full";
    if (used > 0) return "inuse";
    return "idle";
  };
  const addressSeed = () => [
    { id: "ad1", no: "ADDR001", name: "杭州云启科技园", regionId: "zjh", typeId: "park", detail: "杭州市余杭区文一西路969号A栋", area: 2000, usedArea: 1850, ownerId: "chenhai", phone: "17816781902", remark: "注册地址合同可挂靠" },
    { id: "ad2", no: "ADDR002", name: "苏州锦程商务楼", regionId: "jssz", typeId: "office", detail: "苏州市姑苏区干将东路168号B座", area: 1500, usedArea: 820, ownerId: "wufang", phone: "13912345678", remark: "" },
    { id: "ad3", no: "ADDR003", name: "上海浦东商务中心", regionId: "sh", typeId: "office", detail: "上海市浦东新区世纪大道100号8楼", area: 1800, usedArea: 960, ownerId: "licheng", phone: "13712345602", remark: "" },
    { id: "ad4", no: "ADDR004", name: "杭州西湖创意园", regionId: "zjh", typeId: "park", detail: "杭州市西湖区文三路259号", area: 1200, usedArea: 640, ownerId: "yangting", phone: "13212345607", remark: "" },
    { id: "ad5", no: "ADDR005", name: "宁波海丰仓储中心", regionId: "zj", typeId: "wh", detail: "宁波市江北区通途路88号", area: 2200, usedArea: 1100, ownerId: "yangwen", phone: "13712345602", remark: "" },
    { id: "ad6", no: "ADDR006", name: "嘉兴安达注册点", regionId: "zj", typeId: "reg", detail: "嘉兴市南湖区中环南路66号", area: 800, usedArea: 120, ownerId: "zhaosiyuan", phone: "13112345608", remark: "" },
    { id: "ad7", no: "ADDR007", name: "常州宏达物流园", regionId: "jscz", typeId: "wh", detail: "常州市新北区通江中路88号", area: 2500, usedArea: 0, ownerId: "yangting", phone: "13100044444", remark: "" },
    { id: "ad8", no: "ADDR008", name: "无锡明达办公楼", regionId: "jssz", typeId: "office", detail: "无锡市滨湖区太湖大道188号", area: 1000, usedArea: 450, ownerId: "yangwen", phone: "15912345609", remark: "" },
    { id: "ad9", no: "ADDR009", name: "温州瓯海产业园", regionId: "zj", typeId: "park", detail: "温州市瓯海区梧田街道", area: 1600, usedArea: 1600, ownerId: "wufang", phone: "15812345610", remark: "" },
    { id: "ad10", no: "ADDR010", name: "绍兴柯桥注册地址", regionId: "zj", typeId: "reg", detail: "绍兴市柯桥区金柯桥大道", area: 600, usedArea: 0, ownerId: "chenhai", phone: "15712345611", remark: "" },
    { id: "ad11", no: "ADDR011", name: "金华义乌商务楼", regionId: "zj", typeId: "office", detail: "金华市义乌市稠州北路128号", area: 900, usedArea: 210, ownerId: "chenchen", phone: "15512345613", remark: "" },
    { id: "ad12", no: "ADDR012", name: "台州路桥机电园", regionId: "zj", typeId: "park", detail: "台州市路桥区银安街88号", area: 1400, usedArea: 700, ownerId: "yangting", phone: "15412345614", remark: "" },
    { id: "ad13", no: "ADDR013", name: "南京星河信息园", regionId: "jssz", typeId: "park", detail: "南京市建邺区江东中路", area: 1700, usedArea: 400, ownerId: "licheng", phone: "13912345601", remark: "" },
    { id: "ad14", no: "ADDR014", name: "上海远航物流仓", regionId: "sh", typeId: "wh", detail: "上海市浦东新区外高桥", area: 3000, usedArea: 0, ownerId: "chenchen", phone: "13312345606", remark: "", statusId: "off" },
    { id: "ad15", no: "ADDR015", name: "杭州云启注册点", regionId: "zjh", typeId: "reg", detail: "杭州市余杭区仓前街道", area: 500, usedArea: 80, ownerId: "wangqian", phone: "17816781902", remark: "" }
  ].map((row) => ({ ...row, statusId: row.statusId || autoAddrStatus(row) }));

  const loadAddresses = () => {
    let list = [];
    try {
      const raw = localStorage.getItem(ADDR_KEY);
      if (raw) list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch (e) {
      list = [];
    }
    addressSeed().forEach((s) => {
      if (!list.some((a) => a.id === s.id || a.no === s.no)) list.push(s);
    });
    list = list.map((a) => (a.statusId === "off" ? a : { ...a, statusId: autoAddrStatus(a) }));
    localStorage.setItem(ADDR_KEY, JSON.stringify(list));
    return list;
  };
  const saveAddresses = (list) => localStorage.setItem(ADDR_KEY, JSON.stringify(list));
  const nextAddressNo = (list) => {
    const n = (list || loadAddresses()).reduce((m, a) => {
      const num = Number(String(a.no || "").replace(/\D/g, ""));
      return Math.max(m, num || 0);
    }, 0) + 1;
    return "ADDR" + String(n).padStart(3, "0");
  };
  const occupyAddress = (hint, delta) => {
    const q = String(hint || "").trim();
    if (!q) return;
    const list = loadAddresses();
    const hit = list.find((a) => a.statusId !== "off" && (a.name === q || a.no === q || q.includes(a.name) || q.includes(a.no)));
    if (!hit) return;
    hit.usedArea = Math.min(Number(hit.area || 0), Number(hit.usedArea || 0) + Number(delta || 0));
    hit.statusId = autoAddrStatus(hit);
    saveAddresses(list);
  };

  const ITEM_KEY = "crm-customer-items-v1";
  const itemSeed = () => [
    { id: "it1", no: "WP001", customerName: "上海云启科技有限公司", name: "营业执照(正本)", typeId: "license", qty: 1, unitId: "copy", location: "档案室A-01", inAt: "2026-01-15", statusId: "stock", remark: "正本托管" },
    { id: "it2", no: "WP002", customerName: "上海云启科技有限公司", name: "公章", typeId: "seal", qty: 1, unitId: "pc", location: "保险柜B-03", inAt: "2026-01-15", statusId: "stock", remark: "公章托管" },
    { id: "it3", no: "WP003", customerName: "杭州云启科技有限公司", name: "营业执照(副本)", typeId: "license", qty: 1, unitId: "copy", location: "档案室A-01", inAt: "2026-08-18", statusId: "stock", remark: "代账合同入库" },
    { id: "it4", no: "WP004", customerName: "杭州云启科技有限公司", name: "代账合同原件", typeId: "contract", qty: 1, unitId: "copy", location: "档案室A-02", inAt: "2026-08-18", statusId: "stock", remark: "HT合同归档" },
    { id: "it5", no: "WP005", customerName: "南京星河信息", name: "营业执照(正本)", typeId: "license", qty: 1, unitId: "copy", location: "档案室A-03", inAt: "2026-08-12", statusId: "borrowed", remark: "业务员外带年检" },
    { id: "it6", no: "WP006", customerName: "南京星河信息", name: "财务章", typeId: "seal", qty: 1, unitId: "pc", location: "保险柜B-03", inAt: "2026-08-12", statusId: "stock", remark: "" },
    { id: "it7", no: "WP007", customerName: "宁波海丰商贸", name: "记账凭证", typeId: "finance", qty: 12, unitId: "vol", location: "档案室A-04", inAt: "2026-08-05", statusId: "stock", remark: "2026上半年" },
    { id: "it8", no: "WP008", customerName: "苏州锦程电子", name: "公章", typeId: "seal", qty: 1, unitId: "pc", location: "保险柜B-04", inAt: "2026-08-08", statusId: "taken", remark: "客户已取回" },
    { id: "it9", no: "WP009", customerName: "上海远航物流", name: "税务登记资料", typeId: "tax", qty: 1, unitId: "set", location: "档案室A-05", inAt: "2026-08-10", statusId: "stock", remark: "" },
    { id: "it10", no: "WP010", customerName: "杭州西湖广告", name: "合同文件", typeId: "contract", qty: 2, unitId: "copy", location: "档案室A-02", inAt: "2026-08-11", statusId: "stock", remark: "" },
    { id: "it11", no: "WP011", customerName: "深圳智汇科技", name: "营业执照(正本)", typeId: "license", qty: 1, unitId: "copy", location: "档案室A-01", inAt: "2025-09-01", statusId: "stock", remark: "到期客户续存" },
    { id: "it12", no: "WP012", customerName: "温州瓯海贸易", name: "发票专用章", typeId: "seal", qty: 1, unitId: "pc", location: "保险柜B-03", inAt: "2026-08-20", statusId: "borrowed", remark: "开票外带" },
    { id: "it13", no: "WP013", customerName: "绍兴柯桥布业", name: "账簿", typeId: "finance", qty: 3, unitId: "book", location: "档案室A-06", inAt: "2026-08-16", statusId: "stock", remark: "" },
    { id: "it14", no: "WP014", customerName: "嘉兴安达汽配", name: "完税证明", typeId: "tax", qty: 1, unitId: "copy", location: "档案室A-05", inAt: "2026-08-14", statusId: "lost", remark: "盘点缺失" },
    { id: "it15", no: "WP015", customerName: "无锡明达纺织", name: "营业执照(正本)", typeId: "license", qty: 1, unitId: "copy", location: "档案室A-07", inAt: "2026-08-09", statusId: "stock", remark: "" },
    { id: "it16", no: "WP016", customerName: "常州宏达机电", name: "公章", typeId: "seal", qty: 1, unitId: "pc", location: "保险柜B-04", inAt: "2026-08-07", statusId: "stock", remark: "仓库地址客户" },
    { id: "it17", no: "WP017", customerName: "台州路桥机电", name: "银行开户许可证", typeId: "other", qty: 1, unitId: "copy", location: "档案室A-08", inAt: "2026-08-06", statusId: "stock", remark: "" },
    { id: "it18", no: "WP018", customerName: "金华义乌商务", name: "合同文件", typeId: "contract", qty: 1, unitId: "copy", location: "档案室A-02", inAt: "2026-08-13", statusId: "taken", remark: "" },
    { id: "it19", no: "WP019", customerName: "上海浦东商务", name: "财务报表", typeId: "finance", qty: 4, unitId: "copy", location: "档案室A-04", inAt: "2026-08-04", statusId: "stock", remark: "" },
    { id: "it20", no: "WP020", customerName: "杭州西湖创意", name: "税务申报底稿", typeId: "tax", qty: 1, unitId: "set", location: "档案室A-05", inAt: "2026-08-03", statusId: "stock", remark: "" },
    { id: "it21", no: "WP021", customerName: "宁波海丰商贸", name: "公章", typeId: "seal", qty: 1, unitId: "pc", location: "保险柜B-03", inAt: "2026-08-05", statusId: "borrowed", remark: "" },
    { id: "it22", no: "WP022", customerName: "苏州锦程电子", name: "营业执照(正本)", typeId: "license", qty: 1, unitId: "copy", location: "档案室A-03", inAt: "2026-08-08", statusId: "stock", remark: "" },
    { id: "it23", no: "WP023", customerName: "上海远航物流", name: "运输许可证", typeId: "other", qty: 1, unitId: "copy", location: "档案室A-08", inAt: "2026-08-10", statusId: "stock", remark: "" },
    { id: "it24", no: "WP024", customerName: "杭州云启科技有限公司", name: "财务章", typeId: "seal", qty: 1, unitId: "pc", location: "保险柜B-03", inAt: "2026-08-18", statusId: "stock", remark: "" }
  ];
  const loadItems = () => {
    let list = [];
    try {
      const raw = localStorage.getItem(ITEM_KEY);
      if (raw) list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch (e) {
      list = [];
    }
    itemSeed().forEach((s) => {
      if (!list.some((a) => a.id === s.id || a.no === s.no)) list.push({ ...s, logs: s.logs || [] });
    });
    localStorage.setItem(ITEM_KEY, JSON.stringify(list));
    return list;
  };
  const saveItems = (list) => localStorage.setItem(ITEM_KEY, JSON.stringify(list));
  const nextItemNo = (list) => {
    const n = (list || loadItems()).reduce((m, a) => {
      const num = Number(String(a.no || "").replace(/\D/g, ""));
      return Math.max(m, num || 0);
    }, 0) + 1;
    return "WP" + String(n).padStart(3, "0");
  };
  const itemLocFromAddress = (hint) => {
    const q = String(hint || "");
    const addr = loadAddresses().find((a) => a.statusId !== "off" && (q.includes(a.name) || q.includes(a.no)));
    if (addr) return "档案室-" + addr.no;
    const first = loadAddresses().find((a) => a.statusId !== "off");
    return first ? "档案室-" + first.no : "档案室A-01";
  };
  const itemSafeFromAddress = (hint) => {
    const q = String(hint || "");
    const addr = loadAddresses().find((a) => a.statusId !== "off" && (q.includes(a.name) || q.includes(a.no)));
    if (addr) return "保险柜-" + addr.no;
    return "保险柜B-03";
  };
  const depositContractItems = (ct) => {
    if (!ct || !ct.customerName) return;
    const list = loadItems();
    const hint = ((ct.detail && (ct.detail.addressName || ct.detail.packageName)) || "") + " " + (ct.extra || "");
    const loc = itemLocFromAddress(hint);
    const safe = itemSafeFromAddress(hint);
    const inAt = (ct.signDate || ct.startDate || "2026-08-01").slice(0, 10);
    const logText = ct.renewFrom ? ("续费合同 " + (ct.no || "") + " 入库") : ("合同签署入库 " + (ct.no || ""));
    const push = (row) => {
      if (list.some((x) => x.customerName === row.customerName && x.name === row.name && x.statusId !== "lost")) return;
      list.push({
        id: "it-" + Date.now() + Math.random().toString(16).slice(2, 6),
        no: nextItemNo(list),
        logs: [{ at: inAt, text: logText }],
        contractNo: ct.no || "",
        ...row
      });
    };
    const host = ct.typeId === "book" || ct.typeId === "legal" || ct.typeId === "gov" || ct.typeId === "addr";
    if (host && !list.some((x) => x.customerName === ct.customerName && x.typeId === "license" && x.statusId !== "lost")) {
      push({ customerName: ct.customerName, name: "营业执照(正本)", typeId: "license", qty: 1, unitId: "copy", location: loc, inAt, statusId: "stock", remark: "合同 " + (ct.no || "") + " 入库" });
    }
    if (ct.typeId === "book" && !list.some((x) => x.customerName === ct.customerName && x.typeId === "seal" && x.statusId !== "lost" && x.name === "公章")) {
      push({ customerName: ct.customerName, name: "公章", typeId: "seal", qty: 1, unitId: "pc", location: safe, inAt, statusId: "stock", remark: "代账托管" });
    }
    if (ct.typeId === "book" || ct.typeId === "addr" || ct.typeId === "legal" || ct.typeId === "gov") {
      push({ customerName: ct.customerName, name: (ct.no || "合同") + "原件", typeId: "contract", qty: 1, unitId: "copy", location: loc, inAt, statusId: "stock", remark: ((dicts.contractTypes.find((t) => t.id === ct.typeId) || {}).name || "") + "归档" });
    }
    saveItems(list);
  };
  const depositDealCustomerItems = (cu) => {
    if (!cu || cu.statusId !== "deal" || !cu.name) return;
    const list = loadItems();
    if (list.some((x) => x.customerName === cu.name && x.typeId === "license" && x.statusId !== "lost")) return;
    const loc = itemLocFromAddress(cu.address || cu.region || "");
    const inAt = (cu.createdAt || "2026-08-31").slice(0, 10);
    list.push({
      id: "it-cu-" + Date.now(),
      no: nextItemNo(list),
      customerName: cu.name,
      name: "营业执照(正本)",
      typeId: "license",
      qty: 1,
      unitId: "copy",
      location: loc,
      inAt,
      statusId: "stock",
      remark: "成交客户入库",
      contractNo: "",
      logs: [{ at: inAt, text: "客户成交入库" }]
    });
    saveItems(list);
  };
  const renameCustomerItems = (prevName, nextName) => {
    if (!prevName || !nextName || prevName === nextName) return;
    const list = loadItems();
    let n = 0;
    list.forEach((x) => {
      if (x.customerName === prevName) { x.customerName = nextName; n += 1; }
    });
    if (n) saveItems(list);
  };
  const recordItemMove = (item, text) => {
    const at = "2026-08-31 15:10:00";
    const leads = loadLeads();
    const lead = leads.find((l) => (l.companyName || l.name) === (item && item.customerName));
    if (lead) {
      lead.logs = lead.logs || [];
      lead.logs.unshift({ at, type: "follow", user: "admin", text: "物品：" + (item.name || "") + "，" + text });
      lead.lastFollowAt = at;
      saveLeads(leads);
    }
  };

  const REIMB_KEY = "crm-reimb-v2";
  const reimbCustHint = () => {
    const names = [];
    try {
      loadContracts().forEach((c) => { if (c.customerName) names.push(c.customerName); });
      loadCustomers().forEach((c) => { if (c.name && names.length < 20) names.push(c.name); });
    } catch (e) {}
    return names.filter(Boolean);
  };
  const reimbSeed = () => {
    const companies = ["杭州云启科技有限公司", "苏州锦程电子", "南京星河信息", "宁波海丰商贸", "上海远航物流", "深圳智汇科技", "常熟隆达商贸"];
    const types = ["travel", "ent", "office", "traffic", "other"];
    const staff = dicts.people.filter((p) => p.id !== "zhu");
    const reasons = {
      travel: (c) => c + "拜访差旅",
      ent: (c) => "客户商务招待，与" + c + "洽谈财税服务",
      office: () => "办公耗材及打印费",
      traffic: (c) => c + "上门沟通交通费",
      other: () => "其他杂费报销"
    };
    const rows = [
      {
        id: "rb-lf",
        no: "RB20260825002",
        applicantId: "lifang",
        deptId: "mkt",
        typeId: "ent",
        amount: 2200,
        invoices: 3,
        applyAt: "2026-08-25",
        statusId: "pass",
        approverId: "zhu",
        approvedAt: "2026-08-25 18:30",
        reason: "客户商务招待，与深圳汇丰实业集团陈伟经理洽谈年度财税服务合作，餐费及茶歇费用。",
        remark: "费用符合招待标准，附餐饮发票3张。",
        customerName: "深圳智汇科技",
        files: [
          { name: "餐饮发票_001.pdf", amount: 1200, date: "2026-08-25" },
          { name: "餐饮发票_002.pdf", amount: 650, date: "2026-08-25" },
          { name: "茶歇发票_003.pdf", amount: 350, date: "2026-08-25" }
        ],
        logs: [
          { at: "2026-08-25 14:20", user: "李芳", title: "提交申请", text: "提交招待费报销申请，金额¥2,200，附发票3张" },
          { at: "2026-08-25 18:30", user: "朱总", title: "审批通过", text: "费用合理，符合招待标准，同意报销" },
          { at: "2026-08-26 10:00", user: "财务部", title: "财务打款", text: "已通过银行转账打款¥2,200至申请人账户" }
        ]
      },
      {
        id: "rb-ch",
        no: "RB20260826001",
        applicantId: "chenhai",
        deptId: "s1",
        typeId: "travel",
        amount: 3200,
        invoices: 5,
        applyAt: "2026-08-26",
        statusId: "wait",
        approverId: "zhu",
        approvedAt: "",
        reason: "苏州客户拜访差旅",
        remark: "",
        customerName: "苏州锦程电子",
        files: [],
        logs: [{ at: "2026-08-26 09:12", user: "陈海", title: "提交申请", text: "提交差旅费报销申请，金额¥3,200" }]
      }
    ];
    const waitAmts = [8800, 6500, 7200, 9100, 8500, 9000];
    waitAmts.forEach((amt, i) => {
      const p = staff[i % staff.length];
      const t = types[i % types.length];
      const c = companies[i % companies.length];
      const day = String(20 - i).padStart(2, "0");
      rows.push({
        id: "rb-w" + i,
        no: "RB202608" + day + String(i + 2).padStart(3, "0"),
        applicantId: p.id,
        deptId: p.deptId,
        typeId: t,
        amount: amt,
        invoices: 2 + (i % 4),
        applyAt: "2026-08-" + day,
        statusId: "wait",
        approverId: "zhu",
        approvedAt: "",
        reason: (reasons[t] || reasons.other)(c),
        remark: "",
        customerName: t === "ent" || t === "travel" || t === "traffic" ? c : "",
        files: [],
        logs: [{ at: "2026-08-" + day + " 10:00", user: p.name, title: "提交申请", text: "提交报销申请，金额¥" + amt.toLocaleString("zh-CN") }]
      });
    });
    const rej = [2800, 3200, 2500];
    rej.forEach((amt, i) => {
      const p = staff[i + 3];
      const c = companies[i];
      rows.push({
        id: "rb-r" + i,
        no: "RB2026081" + (8 + i) + "00" + (i + 1),
        applicantId: p.id,
        deptId: p.deptId,
        typeId: "other",
        amount: amt,
        invoices: 1,
        applyAt: "2026-08-1" + (8 + i),
        statusId: "reject",
        approverId: "zhu",
        approvedAt: "2026-08-1" + (8 + i) + " 16:00",
        reason: "费用超标申请",
        remark: "票据不完整",
        customerName: "",
        files: [],
        logs: [
          { at: "2026-08-1" + (8 + i) + " 11:00", user: p.name, title: "提交申请", text: "提交报销" },
          { at: "2026-08-1" + (8 + i) + " 16:00", user: "朱总", title: "审批驳回", text: "票据不完整，驳回" }
        ]
      });
    });
    let rest = 165800;
    const passN = 31;
    const base = 5300;
    for (let i = 0; i < passN; i++) {
      const p = staff[i % staff.length];
      const t = types[i % types.length];
      const c = companies[i % companies.length];
      const amt = i === passN - 1 ? rest - base * (passN - 1) : base;
      const month = (i % 8) + 1;
      const day = String(8 + (i % 20)).padStart(2, "0");
      const applyAt = "2026-" + String(month).padStart(2, "0") + "-" + day;
      const apAt = applyAt + " 18:00";
      rows.push({
        id: "rb-p" + i,
        no: "RB" + applyAt.replace(/-/g, "") + String(10 + i).padStart(3, "0"),
        applicantId: p.id,
        deptId: p.deptId,
        typeId: t,
        amount: amt,
        invoices: 1 + (i % 5),
        applyAt,
        statusId: "pass",
        approverId: "zhu",
        approvedAt: apAt,
        reason: (reasons[t] || reasons.other)(c),
        remark: "",
        customerName: t === "ent" || t === "travel" ? c : "",
        files: t === "ent" ? [{ name: "招待发票.pdf", amount: amt, date: applyAt }] : [],
        logs: [
          { at: applyAt + " 09:00", user: p.name, title: "提交申请", text: "提交报销申请，金额¥" + amt.toLocaleString("zh-CN") },
          { at: apAt, user: "朱总", title: "审批通过", text: "同意报销" }
        ]
      });
    }
    return rows;
  };
  const loadReimbs = () => {
    let list = [];
    try {
      const raw = localStorage.getItem(REIMB_KEY);
      if (raw) list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch (e) {
      list = [];
    }
    reimbSeed().forEach((s) => {
      if (!list.some((a) => a.id === s.id || a.no === s.no)) list.push(s);
    });
    localStorage.setItem(REIMB_KEY, JSON.stringify(list));
    return list;
  };
  const saveReimbs = (list) => localStorage.setItem(REIMB_KEY, JSON.stringify(list));
  const nextReimbNo = (list, day) => {
    const d = String(day || "2026-08-31").replace(/-/g, "");
    const prefix = "RB" + d;
    const n = (list || loadReimbs()).filter((x) => String(x.no || "").startsWith(prefix)).length + 1;
    return prefix + String(n).padStart(3, "0");
  };
  const reimbStats = (list) => {
    const rows = list || loadReimbs();
    const inMonth = (d, y, m) => String(d || "").startsWith(y + "-" + String(m).padStart(2, "0"));
    const by = (st) => rows.filter((x) => x.statusId === st);
    const sum = (arr) => arr.reduce((s, x) => s + Number(x.amount || 0), 0);
    const aug = rows.filter((x) => inMonth(x.applyAt, "2026", 8));
    const jul = rows.filter((x) => inMonth(x.applyAt, "2026", 7) && x.statusId === "pass");
    const monthYuan = sum(aug.filter((x) => x.statusId === "pass" || x.statusId === "wait"));
    const lastYuan = sum(jul);
    const wait = by("wait");
    const pass = by("pass");
    const reject = by("reject");
    const mom = lastYuan ? (monthYuan - lastYuan) / lastYuan : (monthYuan ? 1 : 0);
    return { monthYuan, lastYuan, mom, wait, pass, reject, waitSum: sum(wait), passSum: sum(pass), rejectSum: sum(reject) };
  };
  const recordReimbBiz = (row, action) => {
    if (!row || !row.customerName) return;
    const text = "报销" + (dicts.reimbTypes.find((t) => t.id === row.typeId) || {}).name + " " + action + " ¥" + Number(row.amount || 0).toLocaleString("zh-CN");
    const leads = loadLeads();
    const lead = leads.find((l) => (l.companyName || l.name) === row.customerName);
    if (lead) {
      lead.logs = lead.logs || [];
      lead.logs.unshift({ at: "2026-08-31 16:00:00", type: "follow", user: "zhu", text });
      lead.lastFollowAt = "2026-08-31 16:00:00";
      saveLeads(leads);
    }
  };

  const CONTRACT_KEY = "crm-contracts-v3";
  const wanToYuan = (w) => Math.round(Number(w || 0) * 10000);
  const yuanToWan = (y) => Math.round((Number(y || 0) / 10000) * 100) / 100;
  const productToType = (pid) => (pid === "addon" || pid === "addr" || pid === "book" || pid === "tax" ? pid : "legal");

  const pad = (n) => String(n).padStart(2, "0");
  const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const addYMD = (start, years, months, dayDelta) => {
    const d = new Date(start + "T00:00:00");
    if (Number.isNaN(d.getTime())) return start;
    d.setFullYear(d.getFullYear() + (years || 0));
    d.setMonth(d.getMonth() + (months || 0));
    d.setDate(d.getDate() + (dayDelta || 0));
    return ymd(d);
  };
  const endByDuration = (start, years, giftMonths) => addYMD(start, years || 0, giftMonths || 0, -1);

  const typeToProduct = (typeId) => (typeId === "legal" ? "gov" : typeId);

  const contractFromOpp = (opp) => {
    const start = (opp.closedAt || "2026-09-01").slice(0, 10);
    const typeId = productToType(opp.productId);
    return {
      id: "ct-" + opp.id,
      no: opp.contractNo,
      oppId: opp.id,
      leadId: opp.leadId || "",
      customerName: opp.customerName,
      contact: opp.contact || opp.customerName,
      phone: opp.phone || "",
      productIds: [opp.productId || "book"],
      typeId,
      amountYuan: wanToYuan(opp.contractAmount),
      startDate: start,
      endDate: endByDuration(start, 1, 0),
      nextFollowAt: addYMD(start, 0, 0, 7),
      statusId: "signed",
      signDate: start,
      signerId: opp.ownerId || "",
      signerName: (person(opp.ownerId) || {}).name || "",
      signCompany: "上海税小理科技有限公司",
      payForm: "year",
      firstPay: wanToYuan(opp.contractAmount),
      tailPay: 0,
      invoice: "normal",
      years: 1,
      giftMonths: 0,
      giftReg: false,
      source: "lead",
      remark: "",
      extra: "",
      countedSign: true,
      countedRenew: false,
      renewFrom: ""
    };
  };

  const extraContractSeed = () => {
    const expired = {
      id: "ct-expired-zhihui",
      no: "HT20250901006",
      oppId: "",
      leadId: "",
      customerName: "深圳智汇科技",
      contact: "刘洋",
      phone: "13688886666",
      productIds: ["book"],
      typeId: "book",
      amountYuan: 36000,
      startDate: "2025-09-01",
      endDate: "2026-08-31",
      nextFollowAt: "2026-08-20",
      statusId: "expired",
      signDate: "2025-09-01",
      signerId: "chenhai",
      signerName: "陈海",
      signCompany: "上海税小理科技有限公司",
      payForm: "year",
      firstPay: 36000,
      tailPay: 0,
      invoice: "normal",
      years: 1,
      giftMonths: 0,
      giftReg: false,
      source: "old",
      remark: "到期待续费",
      extra: "",
      countedSign: true,
      countedRenew: false,
      renewFrom: ""
    };
    const pool = [
      ["杭州云启科技有限公司", "张经理", "17816781902", "book", "chenhai"],
      ["南京星河信息", "陈伟", "13912345601", "addr", "licheng"],
      ["宁波海丰商贸", "李晓", "13712345602", "book", "yangwen"],
      ["苏州锦程电子", "郑毅", "13412345605", "addon", "wufang"],
      ["上海远航物流", "陈晨", "13312345606", "gov", "licheng"],
      ["杭州西湖广告", "赵敏", "13212345607", "tax", "yangting"],
      ["嘉兴安达汽配", "周强", "13112345608", "book", "zhaosiyuan"],
      ["无锡明达纺织", "孙悦", "15912345609", "addr", "yangwen"],
      ["温州瓯海贸易", "吴芳", "15812345610", "addon", "wufang"],
      ["绍兴柯桥布业", "钱进", "15712345611", "book", "chenhai"],
      ["金华义乌小商品", "何丽", "15512345613", "gov", "chenchen"],
      ["台州路桥机电", "罗斌", "15412345614", "book", "yangting"]
    ];
    const stCycle = ["signed", "pending", "draft", "signed", "void", "signed"];
    const extras = pool.map((row, i) => {
      const statusId = stCycle[i % stCycle.length];
      const start = `2026-${pad((i % 8) + 1)}-${pad((i % 20) + 8)}`;
      const typeId = productToType(row[3]);
      const amountYuan = [36000, 12000, 8000, 45000, 6000, 18000][i % 6];
      return {
        id: "ct-ex-" + i,
        no: `HT2026083${pad(i + 10)}${pad(i + 1)}`,
        oppId: "",
        leadId: "",
        customerName: row[0],
        contact: row[1],
        phone: row[2],
        productIds: [row[3]],
        typeId,
        amountYuan,
        startDate: start,
        endDate: endByDuration(start, 1, 0),
        nextFollowAt: addYMD(start, 0, 0, 14),
        statusId,
        signDate: statusId === "draft" ? "" : start,
        signerId: row[4],
        signerName: (person(row[4]) || {}).name || "",
        signCompany: "上海税小理科技有限公司",
        payForm: "year",
        firstPay: amountYuan,
        tailPay: 0,
        invoice: "normal",
        years: 1,
        giftMonths: 0,
        giftReg: false,
        source: "old",
        remark: "",
        extra: "",
        countedSign: statusId === "signed" || statusId === "expired",
        countedRenew: false,
        renewFrom: ""
      };
    });
    const more = [];
    for (let i = 0; i < 24; i++) {
      const src = extras[i % extras.length];
      const start = `2026-09-${pad((i % 28) + 1)}`;
      const statusId = ["signed", "pending", "draft", "signed"][i % 4];
      more.push({
        ...src,
        id: "ct-more-" + i,
        no: `HT2026094${pad(i + 1)}${pad(i + 7)}`,
        statusId,
        startDate: start,
        endDate: endByDuration(start, 1, 0),
        nextFollowAt: addYMD(start, 0, 0, 10),
        signDate: statusId === "draft" ? "" : start,
        countedSign: statusId === "signed"
      });
    }
    const monthly = [];
    const lineCycle = ["book", "tax", "addr", "addon", "legal"];
    const peopleCycle = ["chenhai", "yangting", "licheng", "wufang", "yangwen", "zhaosiyuan", "wangqian", "chenchen"];
    for (let m = 1; m <= 8; m++) {
      const typeId = lineCycle[(m - 1) % lineCycle.length];
      const pid = peopleCycle[(m - 1) % peopleCycle.length];
      const start = `2026-${pad(m)}-12`;
      const amountYuan = 88000 + m * 4000;
      monthly.push({
        id: "ct-m26-" + m,
        no: `HT2026${pad(m)}1200${pad(m)}`,
        oppId: "",
        leadId: "",
        customerName: ["杭嘉代账客户", "西湖筹划客户", "园区注册客户", "增值年包客户", "法务顾问客户", "常熟代账客户", "浦东筹划客户", "苏南注册客户"][m - 1],
        contact: "经办人",
        phone: "1380000" + pad(10 + m),
        productIds: [typeId === "legal" ? "gov" : typeId],
        typeId,
        amountYuan,
        startDate: start,
        endDate: endByDuration(start, 1, 0),
        nextFollowAt: addYMD(start, 0, 0, 14),
        statusId: "signed",
        signDate: start,
        signerId: pid,
        signerName: (person(pid) || {}).name || "",
        signCompany: "上海税小理科技有限公司",
        payForm: "year",
        firstPay: amountYuan,
        tailPay: 0,
        invoice: "normal",
        years: 1,
        giftMonths: 0,
        giftReg: false,
        source: "old",
        remark: "",
        extra: "",
        countedSign: true,
        countedRenew: m % 3 === 0,
        renewFrom: m % 3 === 0 ? "HT2025" + pad(m) + "1200" + pad(m) : ""
      });
    }
    const yoyBase = [...extras.filter((c) => c.statusId === "signed" || c.statusId === "pending" || c.statusId === "expired"), ...monthly];
    const yoy = yoyBase.map((c, i) => ({
      ...c,
      id: "ct-yoy-" + i,
      no: String(c.no || "").replace("2026", "2025").replace("2025", "2025"),
      startDate: String(c.startDate || "").replace("2026", "2025"),
      signDate: String(c.signDate || "").replace("2026", "2025"),
      endDate: String(c.endDate || "").replace("2026", "2025"),
      nextFollowAt: String(c.nextFollowAt || "").replace("2026", "2025"),
      amountYuan: Math.round(Number(c.amountYuan || 0) * 0.78),
      firstPay: Math.round(Number(c.amountYuan || 0) * 0.78),
      countedRenew: false,
      renewFrom: ""
    }));
    return [expired, ...extras, ...more, ...monthly, ...yoy];
  };

  const loadContracts = () => {
    let list = [];
    try {
      const raw = localStorage.getItem(CONTRACT_KEY);
      if (raw) list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch (e) {
      list = [];
    }
    extraContractSeed().forEach((s) => {
      if (!list.some((c) => c.id === s.id || c.no === s.no)) list.push(s);
    });
    list.forEach((c) => {
      if ((c.productIds || [])[0] === "tax") c.typeId = "tax";
    });
    loadOpps()
      .filter((o) => o.stageId === "win" && o.contractNo)
      .forEach((o) => {
        if (!list.some((c) => c.oppId === o.id || c.no === o.contractNo)) list.unshift(contractFromOpp(o));
      });
    localStorage.setItem(CONTRACT_KEY, JSON.stringify(list));
    return list;
  };

  const saveContracts = (list) => localStorage.setItem(CONTRACT_KEY, JSON.stringify(list));

  const nextContractNo = (list) => {
    const d = new Date();
    const prefix = `HT${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
    const n = (list || loadContracts()).filter((c) => String(c.no || "").startsWith(prefix)).length + 1;
    return prefix + String(n).padStart(3, "0");
  };

  const applyContractBusiness = (ct, { isNew, isRenew }) => {
    if (ct.oppId) {
      const opps = loadOpps();
      const o = opps.find((x) => x.id === ct.oppId);
      if (o) {
        o.contractNo = ct.no;
        o.contractAmount = yuanToWan(ct.amountYuan);
        o.closedAt = (ct.signDate || ct.startDate || "") + " 09:12:00";
        o.stageId = "win";
        o.customerName = ct.customerName || o.customerName;
        o.contact = ct.contact || o.contact;
        o.phone = ct.phone || o.phone;
        if (ct.productIds && ct.productIds[0]) o.productId = ct.productIds[0];
        saveOpps(opps);
        const leads = loadLeads();
        const lead = leads.find((l) => l.id === o.leadId);
        if (lead) {
          lead.oppStageId = "win";
          lead.lastFollowAt = o.closedAt;
          saveLeads(leads);
        }
      }
    }
    const pid = ct.signerId;
    if (isRenew && !ct.countedRenew) {
      bumpMetric(pid, "renewActual", yuanToWan(ct.amountYuan));
      ct.countedRenew = true;
    } else if (isNew && ct.statusId === "signed" && !ct.countedSign) {
      bumpMetric(pid, "signActual", yuanToWan(ct.amountYuan));
      bumpMetric(pid, "customerActual", 1);
      ct.countedSign = true;
    }
    const addrHint = ((ct.detail && (ct.detail.addressName || ct.detail.packageName)) || "") + " " + (ct.extra || "");
    if (!ct.countedAddr && (ct.typeId === "addr" || /关联地址/.test(ct.extra || ""))) {
      occupyAddress(addrHint, 30);
      ct.countedAddr = true;
    }
    if ((isNew || isRenew) && ct.statusId === "signed" && !ct.countedItems) {
      depositContractItems(ct);
      ct.countedItems = true;
    }
    return ct;
  };

  const CUST_KEY = "crm-customers-v2";
  const regionText = (id) => ({ zj: "浙江-杭州", zjh: "杭州-西湖", sh: "上海-浦东", jssz: "苏州-工业园", jscz: "常州-新北" }[id] || "");
  const khNo = (n) => "KH2026" + String(n).padStart(4, "0");
  const customerStatusOf = (lead, opp, hasSigned) => {
    if (hasSigned || (opp && opp.stageId === "win")) return "deal";
    if (opp && opp.stageId === "lost") return "churn";
    if (opp && opp.stageId === "intent") return "intent";
    if (lead && lead.followResult === "opportunity") return "intent";
    if (lead && (lead.followResult === "abandon" || lead.followResult === "invalid")) return "churn";
    return "potential";
  };

  const extraCustomerSeed = () => {
    const cities = ["深圳-南山", "杭州-西湖", "上海-浦东", "苏州-工业园", "宁波-海曙", "南京-鼓楼", "广州-天河", "成都-高新区"];
    const names = ["华章信息", "博远贸易", "启航物流", "金桥机电", "南岸餐饮", "星河广告", "安达汽配", "明达纺织", "瓯海商贸", "柯桥布业"];
    const sts = ["deal", "intent", "potential", "churn"];
    const rows = [];
    for (let i = 0; i < 110; i++) {
      const p = dicts.people[i % dicts.people.length];
      rows.push({
        id: "cu-ex-" + i,
        no: khNo(i + 400),
        name: names[i % names.length] + (i < 10 ? "" : i),
        contact: ["刘洋", "张经理", "陈伟", "李晓", "王磊", "郑毅"][i % 6],
        phone: "13" + String(800000000 + i).slice(-9),
        region: cities[i % cities.length],
        industryId: ["it", "trade", "logistics", "food", "ad", "mfg"][i % 6],
        companyTypeId: i % 5 === 0 ? "ind" : "llc",
        sourceId: ["online", "tele", "dy", "ref"][i % 4],
        ownerId: p.id,
        statusId: sts[i % 4],
        createdAt: `2026-${String((i % 8) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
        address: "",
        remark: "",
        leadId: "",
        oppId: ""
      });
    }
    return rows;
  };

  const fromLeadRow = (lead, idx) => {
    const opps = loadOpps();
    const opp = opps.find((o) => o.leadId === lead.id);
    const cts = loadContracts();
    const signed = cts.some((c) => c.leadId === lead.id || (opp && c.oppId === opp.id && c.statusId === "signed"));
    return {
      id: "cu-lead-" + lead.id,
      no: khNo(idx),
      name: lead.companyName || lead.name || "—",
      contact: lead.contact || lead.name || "",
      phone: lead.phone || "",
      region: regionText(lead.regionId),
      industryId: lead.industryId || "trade",
      companyTypeId: lead.companyTypeId === "ltd" ? "llc" : (lead.companyTypeId || "llc"),
      sourceId: lead.sourceId === "dy" || lead.sourceId === "ref" ? lead.sourceId : (lead.sourceId || "online"),
      ownerId: lead.ownerId,
      statusId: customerStatusOf(lead, opp, signed),
      createdAt: (lead.createdAt || "2026-08-29").slice(0, 10),
      address: "",
      remark: lead.followContent || "",
      leadId: lead.id,
      oppId: opp ? opp.id : ""
    };
  };

  const loadCustomers = () => {
    let list = [];
    try {
      const raw = localStorage.getItem(CUST_KEY);
      if (raw) list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch (e) {
      list = [];
    }
    extraCustomerSeed().forEach((s) => {
      if (!list.some((c) => c.id === s.id || c.no === s.no)) list.push(s);
    });
    loadLeads()
      .filter((l) => l.name && l.name !== "—")
      .forEach((l, i) => {
        if (!list.some((c) => c.leadId === l.id || (c.phone && c.phone === l.phone && c.name === (l.companyName || l.name)))) {
          list.unshift(fromLeadRow(l, i + 1));
        }
      });
    loadContracts().forEach((ct, i) => {
      if (!ct.customerName) return;
      if (!list.some((c) => c.phone === ct.phone && c.name === ct.customerName)) {
        list.unshift({
          id: "cu-ct-" + ct.id,
          no: khNo(200 + i),
          name: ct.customerName,
          contact: ct.contact || "",
          phone: ct.phone || "",
          region: "深圳-南山",
          industryId: "it",
          companyTypeId: "llc",
          sourceId: "online",
          ownerId: ct.signerId || "",
          statusId: ct.statusId === "expired" || ct.statusId === "void" ? "churn" : "deal",
          createdAt: (ct.signDate || ct.startDate || "2026-08-01").slice(0, 10),
          address: (loadAddresses().find((a) => a.name === ((ct.detail || {}).addressName || (ct.detail || {}).packageName)) || {}).detail || "",
          remark: "",
          leadId: ct.leadId || "",
          oppId: ct.oppId || ""
        });
      }
    });
    localStorage.setItem(CUST_KEY, JSON.stringify(list));
    return list;
  };

  const saveCustomers = (list) => localStorage.setItem(CUST_KEY, JSON.stringify(list));

  const nextCustomerNo = (list) => {
    let max = 0;
    (list || loadCustomers()).forEach((c) => {
      const m = String(c.no || "").match(/KH\d{4}(\d{4})/);
      if (m) max = Math.max(max, Number(m[1]));
    });
    return khNo(max + 1);
  };

  const syncCustomerLinks = (cu, prev) => {
    const leads = loadLeads();
    leads.forEach((l) => {
      const hit = (cu.leadId && l.id === cu.leadId) || (prev && prev.phone && l.phone === prev.phone && (l.name === prev.name || l.companyName === prev.name));
      if (!hit) return;
      if (l.companyName) l.companyName = cu.name;
      else l.name = cu.name;
      l.contact = cu.contact;
      l.phone = cu.phone;
      if (cu.industryId) l.industryId = cu.industryId;
      if (cu.sourceId) l.sourceId = cu.sourceId;
      if (cu.companyTypeId) l.companyTypeId = cu.companyTypeId === "llc" ? "ltd" : cu.companyTypeId;
      if (cu.ownerId) l.ownerId = cu.ownerId;
    });
    saveLeads(leads);
    const opps = loadOpps();
    opps.forEach((o) => {
      const hit = (cu.oppId && o.id === cu.oppId) || (cu.leadId && o.leadId === cu.leadId) || (prev && o.phone === prev.phone && o.customerName === prev.name);
      if (!hit) return;
      o.customerName = cu.name;
      o.contact = cu.contact;
      o.phone = cu.phone;
      if (cu.ownerId) o.ownerId = cu.ownerId;
      if (cu.statusId === "churn" && o.stageId !== "win") o.stageId = "lost";
      if (cu.statusId === "intent" && o.stageId !== "win") o.stageId = "intent";
    });
    saveOpps(opps);
    const cts = loadContracts();
    cts.forEach((c) => {
      const hit = (cu.oppId && c.oppId === cu.oppId) || (prev && c.phone === prev.phone && c.customerName === prev.name);
      if (!hit) return;
      c.customerName = cu.name;
      c.contact = cu.contact;
      c.phone = cu.phone;
    });
    saveContracts(cts);
    if (prev && prev.name) renameCustomerItems(prev.name, cu.name);
  };

  const customerOptions = (source) => {
    const map = new Map();
    const push = (name, contact, phone, oppId, leadId) => {
      if (!name || name === "—") return;
      const key = name + "|" + (phone || "");
      if (!map.has(key)) map.set(key, { name, contact: contact || name, phone: phone || "", oppId: oppId || "", leadId: leadId || "" });
    };
    if (source === "lead") {
      loadLeads().forEach((l) => push(l.companyName || l.name, l.contact || l.name, l.phone, "", l.id));
    } else     if (source === "old") {
      loadCustomers().forEach((c) => push(c.name, c.contact, c.phone, c.oppId, c.leadId));
      loadContracts().forEach((c) => push(c.customerName, c.contact, c.phone, c.oppId, c.leadId));
      loadOpps()
        .filter((o) => o.stageId === "win")
        .forEach((o) => push(o.customerName, o.contact, o.phone, o.id, o.leadId));
    } else {
      loadLeads().forEach((l) => push(l.companyName || l.name, l.contact || l.name, l.phone, "", l.id));
      loadOpps().forEach((o) => push(o.customerName, o.contact, o.phone, o.id, o.leadId));
      loadContracts().forEach((c) => push(c.customerName, c.contact, c.phone, c.oppId, c.leadId));
    }
    return [...map.values()];
  };

  const dateYMD = (s) => String(s || "").slice(0, 10);
  const inPeriod = (dateStr, periodId, year) => {
    const d = dateYMD(dateStr);
    if (d.length < 7) return false;
    if (Number(d.slice(0, 4)) !== Number(year)) return false;
    const m = Number(d.slice(5, 7));
    if (periodId === "quarter") {
      const q = Math.ceil(m / 3);
      return q === (Number(year) === 2026 ? 3 : 1);
    }
    if (periodId === "month") return m === (Number(year) === 2026 ? 8 : 1);
    return true;
  };
  const inYearMonth = (dateStr, y, m) => dateYMD(dateStr).slice(0, 7) === `${y}-${String(m).padStart(2, "0")}`;
  const round2 = (n) => Math.round(Number(n || 0) * 100) / 100;

  const salesPerformance = (filter) => {
    const periodId = filter.period || "year";
    const year = Number(filter.year || 2026);
    const deptId = filter.deptId || "";
    const personId = filter.personId || "";
    const people = dicts.people.filter((p) => (!deptId || p.deptId === deptId) && (!personId || p.id === personId));
    const leads = loadLeads();
    const opps = loadOpps();
    const cts = loadContracts();
    const customers = loadCustomers();
    const goals = load();
    const goalOf = (pid) =>
      goals.find((g) => g.personId === pid && Number(g.year) === year && g.period === periodId) ||
      goals.find((g) => g.personId === pid && Number(g.year) === year && g.period === "year");

    const rows = people.map((p) => {
      const pLeads = leads.filter((l) => l.ownerId === p.id && inPeriod(l.createdAt, periodId, year));
      const pOpps = opps.filter((o) => o.ownerId === p.id && inPeriod(o.closedAt || o.lastFollowAt || o.createdAt, periodId, year));
      const pCts = cts.filter((c) => {
        if (c.statusId === "void") return false;
        if (c.signerId !== p.id && c.signerName !== p.name) return false;
        return inPeriod(c.signDate || c.startDate, periodId, year);
      });
      const isRenew = (c) => !!(c.renewFrom || c.countedRenew);
      const signCts = pCts.filter((c) => !isRenew(c) && (c.statusId === "signed" || c.statusId === "expired" || c.statusId === "pending"));
      const renewCts = pCts.filter(isRenew);
      const signWan = yuanToWan(signCts.reduce((s, c) => s + Number(c.amountYuan || 0), 0));
      const renewWan = yuanToWan(renewCts.reduce((s, c) => s + Number(c.amountYuan || 0), 0));
      const pCust = customers.filter((c) => c.ownerId === p.id && c.statusId === "deal" && inPeriod(c.createdAt, periodId, year));
      const g = goalOf(p.id);
      const targetWan = Number((g && g.signTarget) || 0) + Number((g && g.renewTarget) || 0);
      const totalWan = round2(signWan + renewWan);
      return {
        personId: p.id,
        name: p.name,
        deptId: p.deptId,
        deptName: (dept(p.deptId) || {}).name || "—",
        leadCount: pLeads.length,
        customerCount: pCust.length,
        oppCount: pOpps.length,
        signWan: round2(signWan),
        contractCount: pCts.length,
        renewWan: round2(renewWan),
        totalWan,
        targetWan: round2(targetWan),
        rate: targetWan ? totalWan / targetWan : 0,
        mixRate: g ? rowRate(g) : 0
      };
    }).sort((a, b) => b.totalWan - a.totalWan || b.rate - a.rate);

    const sum = (key) => rows.reduce((s, r) => s + Number(r[key] || 0), 0);
    const signWan = round2(sum("signWan"));
    const renewWan = round2(sum("renewWan"));
    const totalWan = round2(sum("totalWan"));
    const targetWan = round2(sum("targetWan"));
    const curM = periodId === "month" || periodId === "year" || periodId === "quarter" ? (year === 2026 ? 8 : 1) : 8;
    const prevDate = new Date(year, curM - 2, 1);
    const prevY = prevDate.getFullYear();
    const prevM = prevDate.getMonth() + 1;
    const monthSign = (y, m) => yuanToWan(cts.filter((c) => {
      if (c.renewFrom || c.countedRenew || c.statusId === "void" || c.statusId === "draft") return false;
      if (personId && c.signerId !== personId) return false;
      const pe = person(c.signerId);
      if (deptId && (!pe || pe.deptId !== deptId)) return false;
      return inYearMonth(c.signDate || c.startDate, y, m);
    }).reduce((s, c) => s + Number(c.amountYuan || 0), 0));
    const curSignM = monthSign(year, curM);
    const prevSignM = monthSign(prevY, prevM);
    const mom = prevSignM ? (curSignM - prevSignM) / prevSignM : (curSignM ? 1 : 0);
    const monthCust = customers.filter((c) => {
      if (c.statusId !== "deal") return false;
      if (personId && c.ownerId !== personId) return false;
      const pe = person(c.ownerId);
      if (deptId && (!pe || pe.deptId !== deptId)) return false;
      return inYearMonth(c.createdAt, year, curM);
    }).length;
    const mixRates = rows.map((r) => r.mixRate).filter((x) => x > 0);
    const mixRate = mixRates.length ? mixRates.reduce((s, x) => s + x, 0) / mixRates.length : (targetWan ? totalWan / targetWan : 0);

    return {
      rows,
      kpis: {
        totalWan,
        targetWan,
        totalRate: targetWan ? totalWan / targetWan : 0,
        signWan,
        mom,
        renewWan,
        renewRate: totalWan ? renewWan / totalWan : 0,
        custCount: sum("customerCount"),
        monthCust,
        mixRate,
        mixActual: totalWan,
        mixTarget: targetWan
      }
    };
  };

  const reportLineOf = (ct) => {
    const t = ct.typeId || productToType((ct.productIds || [])[0]);
    if (t === "book") return "book";
    if (t === "addon") return "addon";
    if (t === "addr") return "reg";
    if (t === "tax") return "plan";
    return "taxadv";
  };

  const businessReport = (filter) => {
    const year = Number(filter.year || 2026);
    const periodId = filter.period || "year";
    const deptId = filter.deptId || "";
    const personId = filter.personId || "";
    const park = filter.park || "";
    const lineId = filter.lineId || "";
    const ctsAll = loadContracts();
    const customers = loadCustomers();
    const reimbs = loadReimbs();
    const eastHint = /杭州|上海|苏州|深圳|南京|浦东/;
    const westHint = /宁波|嘉兴|无锡|温州|绍兴|金华|台州|常州/;
    const parkOf = (c) => {
      const cu = customers.find((x) => x.name === c.customerName);
      const text = (cu && cu.region) || c.customerName || "";
      return eastHint.test(text) ? "east" : (westHint.test(text) ? "west" : "east");
    };
    const matchWho = (pid) => {
      if (personId) return pid === personId;
      if (!deptId) return true;
      const pe = person(pid);
      return !!(pe && pe.deptId === deptId);
    };
    const parkMatchCust = (c) => {
      if (!park) return true;
      const text = c.region || "";
      if (park === "east") return eastHint.test(text);
      if (park === "west") return westHint.test(text);
      return true;
    };
    const cts = ctsAll.filter((c) => !park || parkOf(c) === park);
    const reimbCostDate = (r) => {
      const name = (r.customerName || "").trim();
      if (name) {
        const hit = ctsAll
          .filter((c) => c.customerName === name && c.statusId !== "void" && c.statusId !== "draft")
          .sort((a, b) => String(b.signDate || b.startDate || "").localeCompare(String(a.signDate || a.startDate || "")))[0];
        if (hit) return hit.signDate || hit.startDate;
      }
      return r.applyAt;
    };
    const monthSlice = (y, m) => {
      const pCts = cts.filter((c) => {
        if (c.statusId === "void" || c.statusId === "draft") return false;
        if (!matchWho(c.signerId)) return false;
        if (lineId && reportLineOf(c) !== lineId) return false;
        return inYearMonth(c.signDate || c.startDate, y, m);
      });
      const isRenew = (c) => !!(c.renewFrom || c.countedRenew);
      const signCts = pCts.filter((c) => !isRenew(c) && (c.statusId === "signed" || c.statusId === "expired" || c.statusId === "pending"));
      const renewCts = pCts.filter(isRenew);
      const signWan = yuanToWan(signCts.reduce((s, c) => s + Number(c.amountYuan || 0), 0));
      const renewWan = yuanToWan(renewCts.reduce((s, c) => s + Number(c.amountYuan || 0), 0));
      const revenue = round2(signWan * 0.86 + renewWan * 0.55);
      const reimbYuan = reimbs.filter((r) => {
        if (r.statusId !== "pass") return false;
        if (!inYearMonth(reimbCostDate(r), y, m)) return false;
        if (!matchWho(r.applicantId)) return false;
        return true;
      }).reduce((s, r) => s + Number(r.amount || 0), 0);
      const cost = round2(yuanToWan(reimbYuan) + signWan * 0.38 + renewWan * 0.22);
      const profit = round2(revenue - cost);
      const rate = revenue ? profit / revenue : 0;
      const custNew = customers.filter((c) => c.statusId === "deal" && inYearMonth(c.createdAt, y, m) && matchWho(c.ownerId) && parkMatchCust(c)).length;
      const lines = dicts.reportLines.map((ln) => {
        const lc = pCts.filter((c) => reportLineOf(c) === ln.id);
        const ls = lc.filter((c) => !isRenew(c));
        const lr = lc.filter(isRenew);
        const lSign = yuanToWan(ls.reduce((s, c) => s + Number(c.amountYuan || 0), 0));
        const lRenew = yuanToWan(lr.reduce((s, c) => s + Number(c.amountYuan || 0), 0));
        const lRev = round2(lSign * 0.86 + lRenew * 0.55);
        const share = revenue ? lRev / revenue : 0;
        const lCost = round2(cost * share);
        const lProfit = round2(lRev - lCost);
        const lCust = Math.round(custNew * share);
        return {
          id: ln.id,
          name: ln.name,
          revenue: lRev,
          cost: lCost,
          profit: lProfit,
          rate: lRev ? lProfit / lRev : 0,
          custNew: lCust,
          signWan: round2(lSign),
          renewWan: round2(lRenew)
        };
      });
      return { y, m, signWan: round2(signWan), renewWan: round2(renewWan), revenue, cost, profit, rate, custNew, lines };
    };
    const trend = (now, prev) => {
      if (!now && !prev) return 0;
      if (!prev) return now > 0 ? 1 : now < 0 ? -1 : 0;
      return (now - prev) / Math.abs(prev);
    };
    let startM = 1;
    let endM = year === 2026 ? 8 : 12;
    if (periodId === "quarter") {
      const q = year === 2026 ? 3 : 1;
      startM = (q - 1) * 3 + 1;
      endM = Math.min(q * 3, endM);
    }
    if (periodId === "month") startM = endM = year === 2026 ? 8 : 1;
    const rows = [];
    for (let m = startM; m <= endM; m++) {
      const cur = monthSlice(year, m);
      const prevM = m === 1 ? 12 : m - 1;
      const prevY = m === 1 ? year - 1 : year;
      const prev = monthSlice(prevY, prevM);
      const lastY = monthSlice(year - 1, m);
      rows.push({
        ...cur,
        label: `${year}年${m}月`,
        ym: `${year}-${String(m).padStart(2, "0")}`,
        mom: trend(cur.revenue, prev.revenue),
        yoy: trend(cur.revenue, lastY.revenue),
        costMom: trend(cur.cost, prev.cost),
        profitMom: trend(cur.profit, prev.profit),
        rateYoy: trend(cur.rate, lastY.rate)
      });
    }
    const sum = (k) => round2(rows.reduce((s, r) => s + Number(r[k] || 0), 0));
    const revenue = sum("revenue");
    const cost = sum("cost");
    const profit = sum("profit");
    const lastRows = rows.map((r) => monthSlice(year, r.m === 1 ? 12 : r.m - 1));
    const prevRev = round2(lastRows.reduce((s, r) => s + r.revenue, 0));
    const curM = year === 2026 ? 8 : 1;
    const monthCust = (rows.find((r) => r.m === curM) || {}).custNew || 0;
    const custCount = customers.filter((c) => c.statusId === "deal" && matchWho(c.ownerId) && parkMatchCust(c)).length;
    return {
      rows,
      kpis: {
        revenue,
        cost,
        profit,
        rate: revenue ? profit / revenue : 0,
        mom: trend(revenue, prevRev),
        costMom: trend(cost, lastRows.reduce((s, r) => s + r.cost, 0)),
        profitMom: trend(profit, lastRows.reduce((s, r) => s + r.profit, 0)),
        rateYoy: rows.length ? rows[rows.length - 1].rateYoy : 0,
        custCount,
        monthCust
      }
    };
  };

  const STAFF_KEY = "crm-staff-v2";
  const HR_ASOF = "2026-08-31";
  const daysBetween = (a, b) => {
    const da = new Date(String(a || "") + "T00:00:00");
    const db = new Date(String(b || "") + "T00:00:00");
    if (Number.isNaN(da.getTime()) || Number.isNaN(db.getTime())) return 9999;
    return Math.round((da - db) / 86400000);
  };
  const maskPhone = (p) => {
    const s = String(p || "").replace(/\s/g, "");
    if (s.length < 7) return s || "—";
    return s.slice(0, 3) + "****" + s.slice(-4);
  };
  const maskIdNo = (p) => {
    const s = String(p || "");
    if (s.length < 8) return s || "—";
    return s.slice(0, 3) + "************" + s.slice(-4);
  };
  const refreshStaffStatus = (row) => {
    if (!row || row.statusId === "left") return row;
    if (row.statusId === "probation") return row;
    const left = daysBetween(row.contractEnd, HR_ASOF);
    row.statusId = left <= 90 && left >= -0 ? "expiring" : "active";
    return row;
  };
  const postOfDept = (deptId, i) => {
    if (deptId === "fin") return i % 2 ? "acct" : "acct_mgr";
    if (deptId === "adm") return "admin";
    if (deptId === "mkt") return "mkt";
    if (deptId === "w1") return i % 3 ? "wx" : "wx_mgr";
    if (deptId === "c1") return "cs";
    if (deptId === "cs") return i % 2 ? "sale" : "sale_mgr";
    return i % 4 ? "sale" : "sale_mgr";
  };
  const staffSeed = () => {
    const core = [
      ["zhangming", "EMP001", "张明", "s1", "sale_mgr", "2022-03-15", "2022-06-15", "2026-09-14", "13800008001", "bachelor", "m", "330102199003151234", "张父", "13800000001", "杭州市余杭区仓前街道"],
      ["lifang", "EMP002", "李芳", "mkt", "mkt", "2021-08-02", "2021-11-02", "2027-08-01", "13900008002", "bachelor", "f", "330102199108021234", "李母", "13900000002", "杭州市西湖区文三路"],
      ["chenhai", "EMP003", "陈海", "s1", "sale_mgr", "2020-05-10", "2020-08-10", "2026-10-20", "13700008003", "college", "m", "330102199205101234", "陈父", "13700000003", "杭州市余杭区"],
      ["licheng", "EMP004", "李承", "s1", "sale", "2023-01-09", "2023-04-09", "2027-01-08", "13600008004", "bachelor", "m", "330102199401091234", "李父", "13600000004", "苏州市工业园区"],
      ["wangqian", "EMP005", "王倩", "s2", "sale", "2022-11-01", "2023-02-01", "2026-11-10", "13500008005", "college", "f", "330102199411011234", "王母", "13500000005", "上海市浦东新区"],
      ["chenchen", "EMP006", "陈晨", "s2", "sale_mgr", "2021-04-18", "2021-07-18", "2027-04-17", "13400008006", "bachelor", "f", "330102199304181234", "陈母", "13400000006", "宁波市海曙区"],
      ["wufang", "EMP007", "吴芳", "cs", "sale_mgr", "2019-09-01", "2019-12-01", "2026-09-20", "13300008007", "college", "f", "320582199209011234", "吴父", "13300000007", "常熟市虞山街道"],
      ["yangting", "EMP008", "杨婷", "w1", "wx_mgr", "2022-06-20", "2022-09-20", "2027-06-19", "13200008008", "bachelor", "f", "330102199406201234", "杨母", "13200000008", "杭州市西湖区"],
      ["yangwen", "EMP009", "杨文", "c1", "cs", "2021-02-15", "2021-05-15", "2026-09-25", "13100008009", "college", "m", "330102199302151234", "杨父", "13100000009", "杭州市拱墅区"],
      ["zhaosiyuan", "EMP010", "赵思源", "c1", "cs", "2023-03-06", "2023-06-06", "2027-03-05", "15900008010", "bachelor", "m", "330102199503061234", "赵父", "15900000010", "嘉兴市南湖区"],
      ["zhu", "EMP011", "朱总", "fin", "acct_mgr", "2016-01-08", "2016-04-08", "2028-01-07", "15800008011", "master", "m", "330102198501081234", "朱夫人", "15800000011", "上海市静安区"],
      ["lqh", "EMP012", "lqh", "s1", "sale", "2024-08-12", "2024-11-12", "2027-08-11", "15700008012", "college", "m", "330102199808121234", "家长", "15700000012", "杭州市滨江区"],
      ["dwj", "EMP013", "dwj", "s1", "sale", "2025-02-18", "2025-05-18", "2027-02-17", "15600008013", "bachelor", "m", "330102199902181234", "家长", "15600000013", "杭州市萧山区"]
    ].map((r) => ({
      id: r[0],
      no: r[1],
      name: r[2],
      deptId: r[3],
      postId: r[4],
      entryAt: r[5],
      convertAt: r[6],
      contractEnd: r[7],
      phone: r[8],
      eduId: r[9],
      genderId: r[10],
      idNo: r[11],
      emergName: r[12],
      emergPhone: r[13],
      address: r[14],
      remark: "",
      statusId: "active",
      leftAt: "",
      logs: [{ at: r[5] + " 09:00", title: "入职", text: "办理入职" }]
    }));
    const extras = [];
    const names = ["周强", "孙悦", "钱进", "何丽", "罗斌", "刘洋", "郑毅", "赵敏", "吴磊", "黄婷", "徐杰", "高圆", "马超", "林娜", "胡斌", "蒋雪", "蔡伟", "邓芳", "冯军", "韩梅", "曹阳", "彭静", "董浩", "袁丽", "萧峰", "苏晴", "吕明", "丁燕", "任杰", "沈悦", "姚辉", "潘婷", "夏雨", "钟强", "谭芳", "陆斌", "梁静", "崔伟", "汪洋", "叶婷", "范磊", "石娜", "金鑫"];
    const deptsCycle = dicts.depts.map((d) => d.id);
    for (let i = 0; i < 43; i++) {
      const deptId = deptsCycle[i % deptsCycle.length];
      let entryAt = `${2021 + (i % 5)}-${pad((i % 12) + 1)}-${pad((i % 27) + 1)}`;
      let convertAt = addYMD(entryAt, 0, 3, 0);
      let contractEnd = "2028-08-31";
      let statusId = "active";
      if (i < 5) {
        statusId = "probation";
        entryAt = i < 2 ? `2026-08-${pad(10 + i)}` : `2026-04-${pad(8 + i)}`;
        convertAt = "";
        contractEnd = "2027-08-31";
      } else if (i < 8) {
        contractEnd = ["2026-10-15", "2026-11-01", "2026-11-20"][i - 5];
      }
      extras.push({
        id: "st-x" + i,
        no: "EMP" + pad(14 + i),
        name: names[i] + (i > 32 ? String(i) : ""),
        deptId,
        postId: i < 5 ? "intern" : postOfDept(deptId, i),
        entryAt,
        convertAt,
        contractEnd,
        phone: "13" + String(800000014 + i).slice(-9),
        eduId: ["bachelor", "college", "master", "college"][i % 4],
        genderId: i % 2 ? "f" : "m",
        idNo: "330102199" + String(1000000 + i).slice(-6) + "12" + String(i % 10) + "4",
        emergName: "紧急联系人",
        emergPhone: "1390000" + pad(20 + i),
        address: ["杭州市余杭区", "杭州市西湖区", "苏州市工业园区", "上海市浦东新区", "宁波市海曙区"][i % 5],
        remark: "",
        statusId,
        leftAt: "",
        logs: [{ at: entryAt + " 09:00", title: "入职", text: "办理入职" }]
      });
    }
    const leavers = [
      ["st-l0", "EMP057", "顾远", "s2", "sale", "2023-04-01", "2023-07-01", "2026-08-20", "2026-08-18"],
      ["st-l1", "EMP058", "宋琪", "w1", "wx", "2022-09-01", "2022-12-01", "2026-03-01", "2026-03-12"],
      ["st-l2", "EMP059", "白露", "adm", "admin", "2021-06-01", "2021-09-01", "2026-05-01", "2026-05-20"],
      ["st-l3", "EMP060", "江城", "c1", "cs", "2020-11-01", "2021-02-01", "2026-01-15", "2026-01-28"]
    ].map((r) => ({
      id: r[0],
      no: r[1],
      name: r[2],
      deptId: r[3],
      postId: r[4],
      entryAt: r[5],
      convertAt: r[6],
      contractEnd: r[7],
      phone: "1500000" + r[1].slice(-4),
      eduId: "college",
      genderId: "m",
      idNo: "33010219900101123X",
      emergName: "家属",
      emergPhone: "15000000000",
      address: "杭州市",
      remark: "已办离职手续",
      statusId: "left",
      leftAt: r[8],
      logs: [
        { at: r[5] + " 09:00", title: "入职", text: "办理入职" },
        { at: r[8] + " 18:00", title: "离职", text: "办理离职" }
      ]
    }));
    return [...core, ...extras, ...leavers].map((row) => refreshStaffStatus(row));
  };
  const syncPeopleFromStaff = (list) => {
    const live = (list || []).filter((s) => s.statusId !== "left");
    const liveIds = new Set(live.map((s) => s.id));
    live.forEach((s) => {
      const hit = dicts.people.find((p) => p.id === s.id);
      if (hit) {
        hit.name = s.name;
        hit.deptId = s.deptId;
      } else {
        dicts.people.push({ id: s.id, name: s.name, deptId: s.deptId });
      }
    });
    for (let i = dicts.people.length - 1; i >= 0; i--) {
      if (!liveIds.has(dicts.people[i].id)) dicts.people.splice(i, 1);
    }
  };
  const postToSysRole = {
    sale_mgr: "role-sale-mgr",
    sale: "role-sale",
    wx_mgr: "role-wx-mgr",
    wx: "role-sale",
    cs: "role-cs",
    acct_mgr: "role-fin",
    acct: "role-fin",
    mkt: "role-sale",
    admin: "role-admin",
    intern: "role-intern"
  };
  const ensureStaffAccount = (s) => {
    if (!s) return s;
    const n = String(s.no || "").replace(/\D/g, "").slice(-3) || "000";
    if (!s.jobNo) s.jobNo = "YD" + n;
    if (!s.roleId) s.roleId = s.postId || "sale";
    if (s.sysRoleId == null) s.sysRoleId = s.id === "zhu" ? "role-super" : (postToSysRole[s.postId] || "role-sale");
    if (s.password == null || s.password === "") s.password = "123456";
    return s;
  };
  const ensurePersonGoal = (staff) => {
    const sales = { s1: 1, s2: 1, w1: 1, c1: 1, cs: 1 };
    if (!staff || staff.statusId === "left" || !sales[staff.deptId]) return;
    const list = load();
    if (list.some((g) => g.personId === staff.id && Number(g.year) === 2026 && g.period === "year")) return;
    list.push({
      id: "g-" + staff.id,
      period: "year",
      year: 2026,
      deptId: staff.deptId,
      personId: staff.id,
      productId: "book",
      leadTarget: 40,
      leadActual: 0,
      customerTarget: 8,
      customerActual: 0,
      oppTarget: 10,
      oppActual: 0,
      signTarget: 40,
      signActual: 0,
      renewTarget: 15,
      renewActual: 0
    });
    save(list);
  };
  let onStaffSaved = () => {};
  const applyStaffBiz = (prev, next) => {
    if (!next) return;
    if (!prev) ensurePersonGoal(next);
    if (prev && prev.name !== next.name) {
      const cts = loadContracts();
      cts.forEach((c) => {
        if (c.signerId === next.id) c.signerName = next.name;
      });
      saveContracts(cts);
    }
    if (prev && (prev.deptId !== next.deptId || prev.name !== next.name)) {
      const reimbs = loadReimbs();
      let dirty = false;
      reimbs.forEach((r) => {
        if (r.applicantId !== next.id) return;
        if (r.deptId !== next.deptId) { r.deptId = next.deptId; dirty = true; }
      });
      if (dirty) saveReimbs(reimbs);
    }
    if (prev && prev.deptId !== next.deptId && next.statusId !== "left") ensurePersonGoal(next);
  };
  const loadStaff = () => {
    let list = [];
    try {
      const raw = localStorage.getItem(STAFF_KEY);
      if (raw) list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch (e) {
      list = [];
    }
    staffSeed().forEach((s) => {
      if (!list.some((a) => a.id === s.id || a.no === s.no)) list.push(s);
    });
    list.forEach((s) => { ensureStaffAccount(s); refreshStaffStatus(s); });
    localStorage.setItem(STAFF_KEY, JSON.stringify(list));
    syncPeopleFromStaff(list);
    return list;
  };
  const saveStaff = (list) => {
    (list || []).forEach((s) => { ensureStaffAccount(s); refreshStaffStatus(s); });
    localStorage.setItem(STAFF_KEY, JSON.stringify(list));
    syncPeopleFromStaff(list);
    onStaffSaved();
  };
  const nextEmpNo = (list) => {
    let max = 0;
    (list || loadStaff()).forEach((s) => {
      const n = Number(String(s.no || "").replace(/\D/g, "").slice(-3));
      if (n) max = Math.max(max, n);
    });
    return "EMP" + String(max + 1).padStart(3, "0");
  };
  const nextJobNo = (list) => {
    let max = 0;
    (list || loadStaff()).forEach((s) => {
      const n = Number(String(s.jobNo || s.no || "").replace(/\D/g, "").slice(-3));
      if (n) max = Math.max(max, n);
    });
    return "YD" + String(max + 1).padStart(3, "0");
  };
  const empLive = (s) => s && s.statusId !== "left";
  const staffStats = (list) => {
    const rows = list || loadStaff();
    const live = rows.filter((s) => s.statusId !== "left");
    const probation = rows.filter((s) => s.statusId === "probation");
    const waitConvert = probation.filter((s) => !s.convertAt && daysBetween(HR_ASOF, addYMD(s.entryAt || HR_ASOF, 0, 3, 0)) >= 0);
    const expiring = live.filter((s) => {
      const d = daysBetween(s.contractEnd, HR_ASOF);
      return d >= 0 && d <= 90;
    });
    const in30 = live.filter((s) => {
      const d = daysBetween(s.contractEnd, HR_ASOF);
      return d >= 0 && d <= 30;
    });
    const monthIn = live.filter((s) => String(s.entryAt || "").startsWith("2026-08")).length;
    const monthLeft = rows.filter((s) => s.statusId === "left" && String(s.leftAt || "").startsWith("2026-08")).length;
    const yearLeft = rows.filter((s) => s.statusId === "left" && String(s.leftAt || "").startsWith("2026")).length;
    return {
      live: live.length,
      monthIn,
      probation: probation.length,
      waitConvert: waitConvert.length,
      expiring: expiring.length,
      in30: in30.length,
      monthLeft,
      yearLeft
    };
  };
  loadStaff();

  const SALARY_KEY = "crm-salary-v2";
  const SALARY_MONTHS = ["2026-08", "2026-07"];
  const postBase = {
    sale_mgr: 8000,
    sale: 6200,
    wx_mgr: 7500,
    wx: 5800,
    cs: 6500,
    acct_mgr: 7500,
    acct: 6000,
    mkt: 7000,
    admin: 5000,
    intern: 3500
  };
  const salesDepts = { s1: 1, s2: 1, w1: 1, c1: 1, cs: 1 };
  const incomeTax = (taxable) => {
    const n = Number(taxable || 0);
    if (n <= 0) return 0;
    if (n <= 3000) return Math.round(n * 0.03);
    if (n <= 12000) return Math.round(n * 0.1 - 210);
    return Math.max(0, Math.round(n * 0.2 - 1410));
  };
  const hashN = (s) => String(s || "").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const calcSalaryParts = (staff, month, perfMap) => {
    const base = staff.id === "zhu" ? 15000 : (postBase[staff.postId] || 5500);
    const isSales = !!salesDepts[staff.deptId];
    const perf = staff.postId === "intern" ? 400 : Math.round(base * (isSales ? 0.38 : 0.28));
    const p = perfMap[staff.id];
    let commission = 0;
    if (isSales && staff.postId !== "intern") {
      commission = Math.round(Number((p && p.totalWan) || 0) * 80);
      if (commission < 400) commission = 600 + (hashN(staff.id) % 4200);
    }
    if (month === "2026-07") {
      return scaleSalary({ base, perf, commission, allowance: staff.postId === "intern" ? 200 : 500 }, 0.95);
    }
    const allowance = staff.postId === "intern" ? 200 : 500;
    return finishSalary({ base, perf, commission, allowance });
  };
  const finishSalary = (p) => {
    const ss = Math.round(p.base * 0.08);
    const fund = Math.round(p.base * 0.12);
    const gross = p.base + p.perf + p.commission + p.allowance;
    const tax = incomeTax(gross - ss - fund - 5000);
    const net = gross - ss - fund - tax;
    return { ...p, ss, fund, tax, gross, net };
  };
  const scaleSalary = (p, k) => finishSalary({
    base: Math.round(p.base * k),
    perf: Math.round(p.perf * k),
    commission: Math.round(p.commission * k),
    allowance: Math.round(p.allowance * k)
  });
  const salaryNo = (month, i) => "SAL" + String(month || "2026-08").slice(5, 7) + String(i).padStart(2, "0");
  const loadSalaryRaw = () => {
    try {
      const raw = localStorage.getItem(SALARY_KEY);
      const list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  };
  const saveSalary = (list) => localStorage.setItem(SALARY_KEY, JSON.stringify(list));
  const ensureSalaryMonth = (month) => {
    const ym = month || "2026-08";
    const staff = loadStaff();
    const perfMap = {};
    salesPerformance({ year: 2026, period: "year" }).rows.forEach((r) => { perfMap[r.personId] = r; });
    let all = loadSalaryRaw();
    const exist = all.filter((x) => x.month === ym);
    const byStaff = {};
    exist.forEach((x) => { byStaff[x.staffId] = x; });
    const live = staff.filter((s) => s.statusId !== "left" || (s.leftAt || "").slice(0, 7) === ym);
    const waitIds = [];
    if (ym === "2026-08") {
      live.forEach((s) => { if (s.statusId === "probation") waitIds.push(s.id); });
      live.forEach((s) => { if (waitIds.length < 8 && s.postId === "admin" && !waitIds.includes(s.id)) waitIds.push(s.id); });
      [...live].reverse().forEach((s) => { if (waitIds.length < 8 && s.statusId !== "left" && !waitIds.includes(s.id)) waitIds.push(s.id); });
    }
    const next = live.map((s, i) => {
      const old = byStaff[s.id];
      const freezePay = old && (old.statusId === "paid" || old.statusId === "stop");
      const parts = freezePay ? old : { ...calcSalaryParts(s, ym, perfMap) };
      let statusId = old ? old.statusId : (waitIds.includes(s.id) ? "wait" : "paid");
      if (s.statusId === "left") statusId = "stop";
      return {
        id: old ? old.id : "sal-" + ym + "-" + s.id,
        no: old ? old.no : salaryNo(ym, i + 1),
        month: ym,
        staffId: s.id,
        empNo: s.no,
        name: s.name,
        deptId: s.deptId,
        postId: s.postId,
        base: parts.base,
        perf: parts.perf,
        commission: parts.commission,
        allowance: parts.allowance,
        ss: parts.ss,
        fund: parts.fund,
        tax: parts.tax,
        gross: parts.gross,
        net: parts.net,
        statusId,
        paidAt: old && old.paidAt ? old.paidAt : (statusId === "paid" ? ym + "-28" : "")
      };
    });
    all = all.filter((x) => x.month !== ym).concat(next);
    saveSalary(all);
    return next;
  };
  const loadSalary = (month) => ensureSalaryMonth(month || "2026-08");
  const paySalaries = (month, ids) => {
    const ym = month || "2026-08";
    const set = new Set(ids || []);
    const all = loadSalaryRaw();
    all.forEach((x) => {
      if (x.month === ym && set.has(x.id) && x.statusId === "wait") {
        x.statusId = "paid";
        x.paidAt = HR_ASOF;
      }
    });
    saveSalary(all);
    return ensureSalaryMonth(ym);
  };
  const salaryStats = (month) => {
    const ym = month || "2026-08";
    const rows = ensureSalaryMonth(ym);
    const sum = (k) => rows.reduce((s, r) => s + Number(r[k] || 0), 0);
    const net = sum("net");
    const base = sum("base");
    const bonus = sum("perf") + sum("commission");
    const prevM = ym === "2026-08" ? "2026-07" : "";
    const prevNet = prevM ? ensureSalaryMonth(prevM).reduce((s, r) => s + Number(r.net || 0), 0) : 0;
    const wait = rows.filter((r) => r.statusId === "wait");
    return {
      net,
      netWan: Math.round(net / 1000) / 10,
      prevNet,
      prevWan: Math.round(prevNet / 1000) / 10,
      base,
      baseWan: Math.round(base / 1000) / 10,
      bonus,
      bonusWan: Math.round(bonus / 1000) / 10,
      baseShare: net ? base / net : 0,
      bonusShare: net ? bonus / net : 0,
      wait,
      waitGross: wait.reduce((s, r) => s + Number(r.gross || 0), 0),
      waitNet: wait.reduce((s, r) => s + Number(r.net || 0), 0)
    };
  };

  onStaffSaved = () => {
    SALARY_MONTHS.forEach((m) => ensureSalaryMonth(m));
  };

  const ROLE_KEY = "crm-roles-v1";
  const ALL_MENUS = [
    "workbench.html", "marketing-goals.html", "leads.html", "opportunities.html",
    "contracts.html", "customers.html", "sales-performance.html", "addresses.html",
    "customer-items.html", "reimbursements.html", "reports.html", "personnel.html",
    "salary.html", "employees.html", "roles.html"
  ];
  const menuTree = [
    { id: "workbench.html", name: "工作台" },
    {
      id: "g-sales", name: "销售中心",
      children: [
        { id: "marketing-goals.html", name: "营销目标" },
        { id: "leads.html", name: "线索管理" },
        { id: "opportunities.html", name: "商机管理" },
        { id: "contracts.html", name: "合同管理" },
        { id: "customers.html", name: "客户管理" },
        { id: "sales-performance.html", name: "销售业绩" }
      ]
    },
    {
      id: "g-cust", name: "客户中心",
      children: [
        { id: "addresses.html", name: "地址管理" },
        { id: "customer-items.html", name: "客户物品" }
      ]
    },
    {
      id: "g-ops", name: "运营中心",
      children: [
        { id: "reimbursements.html", name: "财务报销" },
        { id: "reports.html", name: "经营报表" },
        { id: "personnel.html", name: "人事管理" },
        { id: "salary.html", name: "薪资管理" },
        { id: "employees.html", name: "员工管理" }
      ]
    },
    {
      id: "g-sys", name: "系统管理",
      children: [{ id: "roles.html", name: "角色权限" }]
    }
  ];
  const roleSeed = () => [
    { id: "role-super", no: "ROLE01", name: "超级管理员", desc: "系统最高权限管理", scopeId: "all", statusId: "on", createdAt: "2026-01-08", creator: "系统", menus: ALL_MENUS.slice() },
    { id: "role-sale-mgr", no: "ROLE02", name: "销售经理", desc: "管理销售团队及业绩", scopeId: "dept", statusId: "on", createdAt: "2026-02-12", creator: "朱总", menus: ["workbench.html", "marketing-goals.html", "leads.html", "opportunities.html", "contracts.html", "customers.html", "sales-performance.html", "reports.html"] },
    { id: "role-sale", no: "ROLE03", name: "销售顾问", desc: "跟进线索商机与签约", scopeId: "self", statusId: "on", createdAt: "2026-02-12", creator: "朱总", menus: ["workbench.html", "marketing-goals.html", "leads.html", "opportunities.html", "contracts.html", "customers.html", "sales-performance.html"] },
    { id: "role-cs", no: "ROLE04", name: "客户经理", desc: "维护客户合同与托管物品", scopeId: "dept", statusId: "on", createdAt: "2026-03-01", creator: "朱总", menus: ["workbench.html", "customers.html", "contracts.html", "addresses.html", "customer-items.html", "sales-performance.html"] },
    { id: "role-wx-mgr", no: "ROLE05", name: "网销主管", desc: "管理网销线索与目标", scopeId: "dept", statusId: "on", createdAt: "2026-03-18", creator: "朱总", menus: ["workbench.html", "marketing-goals.html", "leads.html", "opportunities.html", "sales-performance.html"] },
    { id: "role-fin", no: "ROLE06", name: "财务专员", desc: "报销核算与薪资发放", scopeId: "all", statusId: "on", createdAt: "2026-04-06", creator: "系统", menus: ["workbench.html", "reimbursements.html", "reports.html", "salary.html"] },
    { id: "role-admin", no: "ROLE07", name: "行政专员", desc: "人事档案与员工账号", scopeId: "dept", statusId: "on", createdAt: "2026-05-20", creator: "朱总", menus: ["workbench.html", "personnel.html", "employees.html", "reimbursements.html"] },
    { id: "role-intern", no: "ROLE08", name: "实习销售", desc: "试用期跟进协助", scopeId: "self", statusId: "off", createdAt: "2026-08-10", creator: "朱总", menus: ["workbench.html", "leads.html"] }
  ];
  const loadRoles = () => {
    let list = [];
    try {
      const raw = localStorage.getItem(ROLE_KEY);
      if (raw) list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch (e) {
      list = [];
    }
    roleSeed().forEach((s) => {
      if (!list.some((a) => a.id === s.id || a.no === s.no)) list.push(s);
    });
    localStorage.setItem(ROLE_KEY, JSON.stringify(list));
    return list;
  };
  const saveRoles = (list) => localStorage.setItem(ROLE_KEY, JSON.stringify(list));
  const roleName = (id) => {
    const r = loadRoles().find((x) => x.id === id);
    return (r && r.name) || "—";
  };
  const roleUsers = (roleId) => loadStaff().filter((s) => s.sysRoleId === roleId && s.statusId !== "left");
  const bindRoleUser = (roleId, staffId) => {
    const list = loadStaff();
    const s = list.find((x) => x.id === staffId);
    if (!s || s.statusId === "left") return list;
    s.sysRoleId = roleId;
    saveStaff(list);
    return loadStaff();
  };
  const unbindRoleUser = (staffId) => {
    const list = loadStaff();
    const s = list.find((x) => x.id === staffId);
    if (!s) return list;
    s.sysRoleId = "";
    saveStaff(list);
    return loadStaff();
  };
  const currentUser = () => {
    const id = sessionStorage.getItem("crm-auth-v1") || "";
    const name = sessionStorage.getItem("crm-auth-v1-name") || "用户";
    if (!id || id === "admin") return { id: "admin", name, sysRoleId: "role-super", isAdmin: true };
    const s = loadStaff().find((x) => x.id === id);
    if (!s) return { id, name, sysRoleId: "role-super", isAdmin: true };
    return { id: s.id, name: s.name, sysRoleId: s.sysRoleId, deptId: s.deptId, isAdmin: false };
  };
  const canOpen = (file) => {
    const f = String(file || "").split("/").pop().toLowerCase();
    if (!f || f === "index.html" || f === "login.html") return true;
    const u = currentUser();
    if (u.isAdmin) return true;
    const role = loadRoles().find((r) => r.id === u.sysRoleId);
    if (!role || role.statusId === "off") return f === "workbench.html";
    const menus = role.menus || [];
    if (f === "workbench.html") return true;
    return menus.indexOf(f) >= 0;
  };
  const applyRoleNav = () => {
    document.querySelectorAll(".nav a.nav-item[href]").forEach((a) => {
      const href = (a.getAttribute("href") || "").split("?")[0];
      a.style.display = canOpen(href) ? "" : "none";
    });
  };

  return {
    KEY,
    LEAD_KEY,
    CONTRACT_KEY,
    dicts,
    metricKeys,
    load,
    save,
    loadLeads,
    saveLeads,
    loadOpps,
    saveOpps,
    upsertOppFromLead,
    oppFromLead,
    loadContracts,
    saveContracts,
    contractFromOpp,
    nextContractNo,
    applyContractBusiness,
    loadCustomers,
    saveCustomers,
    nextCustomerNo,
    syncCustomerLinks,
    customerOptions,
    wanToYuan,
    yuanToWan,
    productToType,
    typeToProduct,
    endByDuration,
    addYMD,
    person,
    dept,
    product,
    period,
    dictName,
    rowRate,
    uniqueKey,
    bumpMetric,
    salesPerformance,
    businessReport,
    reportLineOf,
    loadAddresses,
    saveAddresses,
    nextAddressNo,
    autoAddrStatus,
    occupyAddress,
    loadItems,
    saveItems,
    nextItemNo,
    depositContractItems,
    depositDealCustomerItems,
    renameCustomerItems,
    recordItemMove,
    loadReimbs,
    saveReimbs,
    nextReimbNo,
    reimbStats,
    recordReimbBiz,
    reimbCustHint,
    loadStaff,
    saveStaff,
    nextEmpNo,
    nextJobNo,
    empLive,
    staffStats,
    applyStaffBiz,
    maskPhone,
    maskIdNo,
    HR_ASOF,
    loadSalary,
    saveSalary,
    paySalaries,
    salaryStats,
    SALARY_MONTHS,
    loadRoles,
    saveRoles,
    roleName,
    roleUsers,
    bindRoleUser,
    unbindRoleUser,
    menuTree,
    currentUser,
    canOpen,
    postToSysRole
  };

  const bootRoleNav = () => {
    try {
      applyRoleNav();
      const f = (location.pathname.split("/").pop() || "").toLowerCase();
      if (f && f !== "index.html" && f !== "login.html" && !canOpen(f)) {
        const wrap = document.getElementById("toasts") || document.body;
        const el = document.createElement("div");
        el.className = "toast";
        el.textContent = "当前角色无权访问该功能";
        wrap.appendChild(el);
        setTimeout(() => { location.href = "workbench.html"; }, 700);
      }
    } catch (e) {}
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bootRoleNav);
  else bootRoleNav();
})();
