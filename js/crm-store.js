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
      { id: "c1", name: "常规组" }
    ],
    people: [
      { id: "lqh", name: "lqh", deptId: "s1" },
      { id: "dwj", name: "dwj", deptId: "s1" },
      { id: "chenhai", name: "陈海", deptId: "s1" },
      { id: "licheng", name: "李承", deptId: "s1" },
      { id: "wangqian", name: "王倩", deptId: "s2" },
      { id: "chenchen", name: "陈晨", deptId: "s2" },
      { id: "wufang", name: "吴芳", deptId: "w1" },
      { id: "yangting", name: "杨婷", deptId: "w1" },
      { id: "yangwen", name: "杨文", deptId: "c1" },
      { id: "zhaosiyuan", name: "赵思源", deptId: "c1" }
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
      { id: "jssz", name: "江苏苏州" }
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

  const CONTRACT_KEY = "crm-contracts-v1";
  const wanToYuan = (w) => Math.round(Number(w || 0) * 10000);
  const yuanToWan = (y) => Math.round((Number(y || 0) / 10000) * 100) / 100;
  const productToType = (pid) => (pid === "addon" || pid === "addr" || pid === "book" ? pid : "legal");

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
      const start = `2026-08-${pad((i % 20) + 8)}`;
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
    return [expired, ...extras, ...more];
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
    return ct;
  };

  const CUST_KEY = "crm-customers-v1";
  const regionText = (id) => ({ zj: "浙江-杭州", zjh: "杭州-西湖", sh: "上海-浦东", jssz: "苏州-工业园" }[id] || "");
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
        createdAt: `2026-08-${String((i % 28) + 1).padStart(2, "0")}`,
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
          address: "",
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
    bumpMetric
  };
})();
