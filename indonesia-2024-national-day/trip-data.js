(function () {
  "use strict";

  const trip = {
    slug: "indonesia-2024-national-day",
    title: "国庆巴厘岛 · 科莫多旅行攻略",
    dates: { start: "2024-09-27", end: "2024-10-07" },
    spanDays: 11,
    itineraryDays: 11,
    nights: 10,
    leaveDays: 2,
    modules: {
      flights: true,
      travelerGroups: true,
      calendar: true,
      itinerary: true,
      map: true,
      lodging: true,
      spots: true,
      transit: true,
      safety: true,
      prep: true,
      budget: true
    }
  };

  const tripCalendar = [
    { date: "2024-09-27", month: "9月", day: "27", weekday: "周五", type: "workday", label: "工作日", note: "23:50 启程", inTrip: true },
    { date: "2024-09-28", month: "9月", day: "28", weekday: "周六", type: "weekend", label: "周末", note: "09:50 抵达", badge: "假", badgeTitle: "周末", inTrip: true },
    { date: "2024-09-29", month: "9月", day: "29", weekday: "周日", type: "leave", label: "请假", note: "调休上班日", badge: "请", badgeTitle: "官方调休上班日，主行程需请假", inTrip: true },
    { date: "2024-09-30", month: "9月", day: "30", weekday: "周一", type: "leave", label: "请假", note: "科莫多包船", badge: "请", badgeTitle: "工作日请假", inTrip: true },
    { date: "2024-10-01", month: "10月", day: "1", weekday: "周二", type: "holiday", label: "国庆假期", note: "佩尼达西线", badge: "假", badgeTitle: "国庆节法定假期", inTrip: true },
    { date: "2024-10-02", month: "10月", day: "2", weekday: "周三", type: "holiday", label: "国庆假期", note: "佩尼达东线", badge: "假", badgeTitle: "国庆节假期", inTrip: true },
    { date: "2024-10-03", month: "10月", day: "3", weekday: "周四", type: "holiday", label: "国庆假期", note: "前往乌布", badge: "假", badgeTitle: "国庆节假期", inTrip: true },
    { date: "2024-10-04", month: "10月", day: "4", weekday: "周五", type: "holiday", label: "国庆假期", note: "巴厘岛东部", badge: "假", badgeTitle: "国庆节假期", inTrip: true },
    { date: "2024-10-05", month: "10月", day: "5", weekday: "周六", type: "weekend", label: "周末", note: "国庆假期", badge: "假", badgeTitle: "周末且属于国庆假期", inTrip: true },
    { date: "2024-10-06", month: "10月", day: "6", weekday: "周日", type: "weekend", label: "周末", note: "国庆假期", badge: "假", badgeTitle: "周末且属于国庆假期", inTrip: true },
    { date: "2024-10-07", month: "10月", day: "7", weekday: "周一", type: "holiday", label: "国庆假期", note: "10:50 返程", badge: "假", badgeTitle: "国庆节假期", inTrip: true }
  ];

  const airports = {
    HGH: { name: "杭州萧山国际机场", city: "杭州", lat: 30.230000, lng: 120.433889 },
    SIN: { name: "新加坡樟宜机场", city: "新加坡", lat: 1.359211, lng: 103.989325 },
    DPS: { name: "伍拉·赖国际机场", city: "巴厘岛", lat: -8.748056, lng: 115.167500 },
    LBJ: { name: "科莫多国际机场", city: "Labuan Bajo", lat: -8.486944, lng: 119.888889 },
    CSX: { name: "长沙黄花国际机场", city: "长沙", lat: 28.1892, lng: 113.2196 },
    XMN: { name: "厦门高崎国际机场", city: "厦门", lat: 24.5440, lng: 118.1277 },
    CGK: { name: "苏加诺-哈达国际机场", city: "雅加达", lat: -6.126506, lng: 106.661111 }
  };

  const places = {
    DPS: { name: "巴厘岛登巴萨机场", city: "巴厘岛", lat: airports.DPS.lat, lng: airports.DPS.lng, note: "国际与岛内航班枢纽。", accuracy: "verified", anchor: true },
    LBJ: { name: "科莫多国际机场", city: "Labuan Bajo", lat: airports.LBJ.lat, lng: airports.LBJ.lng, note: "科莫多段机场。", accuracy: "verified", anchor: true },
    gwk: { name: "GWK 神鹰广场", city: "巴厘岛南部", lat: -8.813951, lng: 115.166882, note: "抵达日核心地标；景区范围较大。", accuracy: "verified" },
    singleFin: { name: "Blue Point / Single Fin", city: "乌鲁瓦图", lat: -8.8144, lng: 115.0883, note: "从 Single Fin 一带步行下探悬崖海景。", accuracy: "approximate" },
    greenBowl: { name: "Green Bowl Beach", city: "乌鲁瓦图", lat: -8.8486708, lng: 115.1710301, note: "小众海滩，需上下台阶。", accuracy: "verified" },
    karangBoma: { name: "Karang Boma Cliff", city: "乌鲁瓦图", lat: -8.8345366, lng: 115.0877251, note: "悬崖日落点，注意临崖安全。", accuracy: "verified" },
    malini: { name: "Malini Uluwatu", city: "乌鲁瓦图", lat: -8.8322231, lng: 115.0870260, note: "悬崖餐厅，原文建议提前预约。", accuracy: "verified" },
    uluwatu: { name: "乌鲁瓦图寺", city: "乌鲁瓦图", lat: -8.829388, lng: 115.084518, note: "海景悬崖与 Kecak 火舞。", accuracy: "verified" },
    daraHouse: { name: "Dara House", city: "巴厘岛南部", lat: -8.7386228, lng: 115.1654452, note: "9/28 主线住宿点。", accuracy: "verified", anchor: true },
    labuanBajo: { name: "Labuan Bajo", city: "弗洛勒斯", lat: -8.496400, lng: 119.887700, note: "科莫多船游门户城市。", accuracy: "approximate", anchor: true },
    padar: { name: "Padar Island 三湾观景台", city: "科莫多国家公园", lat: -8.6824011, lng: 119.5571884, note: "登高看三湾；落点为公开观景区域近似位置。", accuracy: "approximate" },
    komodo: { name: "Loh Liang 科莫多龙观赏区", city: "科莫多国家公园", lat: -8.574667, lng: 119.504417, note: "龙活动位置不固定，以护林员带领为准。", accuracy: "approximate" },
    pinkBeach: { name: "Pink Beach · Pantai Merah", city: "科莫多国家公园", lat: -8.601161, lng: 119.519767, note: "科莫多岛东岸粉色沙滩。", accuracy: "verified" },
    takaMakassar: { name: "Taka Makassar", city: "科莫多国家公园", lat: -8.547243, lng: 119.588308, note: "潮汐沙洲，边界随潮位变化。", accuracy: "approximate" },
    mantaKomodo: { name: "Manta Point · Komodo", city: "科莫多国家公园", lat: -8.563370, lng: 119.577940, note: "实际下水点取决于海况、洋流和船长判断。", accuracy: "approximate" },
    kanawa: { name: "Kanawa Island", city: "Labuan Bajo 外海", lat: -8.495725, lng: 119.758181, note: "果冻海与珊瑚体验。", accuracy: "verified" },
    kelor: { name: "Pulau Kelor", city: "Labuan Bajo 外海", lat: -8.547219, lng: 119.814719, note: "短程徒步观景。", accuracy: "verified" },
    kalong: { name: "Pulau Kalong", city: "北林卡", lat: -8.603333, lng: 119.770833, note: "日落看蝙蝠的系泊区域近似点。", accuracy: "approximate" },
    sanurHarbor: { name: "Sanur 快艇港", city: "巴厘岛", lat: -8.6756, lng: 115.2636, note: "前往佩尼达岛的常用港口；具体码头待票面确认。", accuracy: "approximate", anchor: true },
    banjarNyuh: { name: "Banjar Nyuh 港区", city: "佩尼达岛", lat: -8.6742, lng: 115.4893, note: "西部港区近似点，具体上下船点待船票确认。", accuracy: "approximate", anchor: true },
    angelsBillabong: { name: "Angel's Billabong", city: "佩尼达岛西线", lat: -8.7335003, lng: 115.4489788, note: "天然海蚀池景观，浪况危险时不要下水。", accuracy: "verified" },
    brokenBeach: { name: "Broken Beach", city: "佩尼达岛西线", lat: -8.7327938, lng: 115.4508319, note: "海蚀拱门景观。", accuracy: "verified" },
    kelingking: { name: "Kelingking Beach", city: "佩尼达岛西线", lat: -8.7513325, lng: 115.4732086, note: "经典悬崖视角；原文提醒不宜游泳、防中暑和猴子。", accuracy: "verified" },
    paluang: { name: "Paluang Cliff", city: "佩尼达岛西线", lat: -8.7536584, lng: 115.4769013, note: "Kelingking 附近另一处悬崖机位。", accuracy: "verified" },
    crystalBay: { name: "Crystal Bay Beach", city: "佩尼达岛西线", lat: -8.7156148, lng: 115.4592001, note: "西线收尾休息点。", accuracy: "verified" },
    treeHouse: { name: "Rumah Pohon Tree House", city: "佩尼达岛东线", lat: -8.778751, lng: 115.616954, note: "与 Thousand Islands 相邻但不是同一点。", accuracy: "verified" },
    thousandIslands: { name: "Thousand Islands Viewpoint", city: "佩尼达岛东线", lat: -8.778630, lng: 115.616152, note: "东线海蚀群岛观景点。", accuracy: "verified" },
    diamondBeach: { name: "Diamond Beach", city: "佩尼达岛东线", lat: -8.7751348, lng: 115.6202282, note: "下行台阶暴晒，量力而行。", accuracy: "verified" },
    atuhBeach: { name: "Atuh Beach", city: "佩尼达岛东线", lat: -8.773200, lng: 115.621681, note: "悬崖下的海湾与离岸礁。", accuracy: "verified" },
    teletubbies: { name: "Teletubbies Hill", city: "佩尼达岛东线", lat: -8.772600, lng: 115.581350, note: "丘陵区域坐标为近似中心。", accuracy: "approximate" },
    mantaPenida: { name: "Manta Point · Penida", city: "佩尼达岛南岸", lat: -8.8068, lng: 115.5314, note: "原文仅列景点名；海上点位与是否下水均需现场确认。", accuracy: "approximate" },
    kusamba: { name: "Kusamba 港区", city: "巴厘岛东部", lat: -8.5658, lng: 115.4520, note: "佩尼达回巴厘岛的候选港口。", accuracy: "approximate", anchor: true },
    ubud: { name: "Ubud 乌布", city: "巴厘岛", lat: -8.506900, lng: 115.262300, note: "乌布街区与后续采购落脚点。", accuracy: "approximate", anchor: true },
    sayanHouse: { name: "The Sayan House", city: "乌布", lat: -8.4986293, lng: 115.2442719, note: "丛林日落餐厅，原文建议预约。", accuracy: "verified" },
    campuhanSouth: { name: "Campuhan Ridge Walk · Ibah 入口", city: "乌布", lat: -8.5046466, lng: 115.2557290, note: "轻徒步南端入口。", accuracy: "verified" },
    campuhanNorth: { name: "Campuhan Ridge Walk · Karsa 端", city: "乌布", lat: -8.4899325, lng: 115.2582697, note: "地图链接指向 Karsa；日程文字写 Mamoo，终点待确认。", accuracy: "verified" },
    tukadCepung: { name: "Tukad Cepung Waterfall", city: "邦利", lat: -8.4410173, lng: 115.3868079, note: "涉水与步行约 30 分钟，穿防滑鞋。", accuracy: "verified" },
    ritatkala: { name: "Ritatkala Cafe · 火山观景备选", city: "金塔马尼", lat: -8.2564831, lng: 115.3365631, note: "原文“view point resto”无法唯一识别；此点仅为同文明确坐标的备选。", accuracy: "verified" },
    baliCliff: { name: "Bali Cliff Glamping", city: "巴厘岛东部", lat: -8.4564265, lng: 115.6442618, note: "东部两晚主要住宿点。", accuracy: "verified", anchor: true },
    lahangan: { name: "Lahangan Sweet", city: "卡朗阿森", lat: -8.3721589, lng: 115.6371092, note: "火山与海景高地，原文提示约 30 分钟登山。", accuracy: "verified" },
    beachwalk: { name: "Beachwalk Shopping Center", city: "库塔", lat: -8.7156, lng: 115.1687, note: "10/6 购物主锚点。", accuracy: "approximate" },
    seminyak: { name: "Seminyak / Petitenget", city: "巴厘岛南部", lat: -8.689900, lng: 115.166800, note: "服饰、咖啡和日落餐饮集中区域。", accuracy: "approximate", anchor: true },
    kuta: { name: "Kuta", city: "巴厘岛南部", lat: -8.726400, lng: 115.177800, note: "夜生活与返程前收尾区域。", accuracy: "approximate", anchor: true }
  };

  const travelerGroups = [
    {
      id: "main-route",
      label: "主线行程",
      origin: "杭州 · 新加坡转机",
      note: "全程角色化展示，不公开同行人姓名与私人票务资料。",
      pendingItems: ["国际段航班号、航站楼与返程抵达时间待补"]
    },
    {
      id: "elder-route",
      label: "长者同行参考",
      origin: "长沙 · 厦门 · 雅加达",
      note: "涉及厦门 T4→T3、雅加达 T3→T1 两次换楼。",
      pendingItems: ["行李是否直挂、具体 T1A/T1B、轮椅协助和夜间接驳待确认"]
    }
  ];

  const flights = [
    {
      id: "main-outbound",
      groupId: "main-route",
      direction: "去程",
      date: "9 月 27 日—28 日",
      from: { code: "HGH", city: "杭州", terminal: "待补", time: "23:50", date: "9 月 27 日" },
      via: { code: "SIN", city: "新加坡" },
      to: { code: "DPS", city: "巴厘岛", terminal: "待补", time: "09:50", date: "9 月 28 日" },
      flightNo: "航班号待补",
      meta: "新加坡转机",
      note: "原文只明确启程与抵达时间，不补猜航司、航班号或航站楼。"
    },
    {
      id: "komodo-outbound",
      groupId: "main-route",
      direction: "岛内去程",
      date: "9 月 29 日",
      from: { code: "DPS", city: "巴厘岛", terminal: "待补", time: "07:10", date: "9 月 29 日" },
      to: { code: "LBJ", city: "Labuan Bajo", terminal: "待补", time: "08:20", date: "9 月 29 日" },
      flightNo: "航班号待补 · 已购票",
      meta: "约 1 小时 10 分",
      note: "下午 14:00 日落船游为可选活动。"
    },
    {
      id: "komodo-return",
      groupId: "main-route",
      direction: "岛内返程",
      date: "10 月 1 日",
      from: { code: "LBJ", city: "Labuan Bajo", terminal: "待补", time: "08:50", date: "10 月 1 日" },
      to: { code: "DPS", city: "巴厘岛", terminal: "待补", time: "10:10", date: "10 月 1 日" },
      flightNo: "航班号待补 · 已购票",
      meta: "约 1 小时 20 分",
      note: "落地后还需衔接快艇去佩尼达岛，需重新核对缓冲。"
    },
    {
      id: "main-return",
      groupId: "main-route",
      direction: "返程",
      date: "10 月 7 日",
      from: { code: "DPS", city: "巴厘岛", terminal: "待补", time: "10:50", date: "10 月 7 日" },
      via: { code: "SIN", city: "新加坡" },
      to: { code: "HGH", city: "杭州", terminal: "待补", time: "待补", date: "待补" },
      flightNo: "航班号待补",
      meta: "新加坡转机",
      note: "原文只明确 10:50 从登巴萨机场启程。"
    },
    {
      id: "elder-outbound",
      groupId: "elder-route",
      direction: "多段去程",
      date: "9 月 27 日",
      from: { code: "CSX", city: "长沙 T1", terminal: "T1", time: "09:55", date: "9 月 27 日" },
      via: { code: "XMN", city: "厦门 · T4 到达 / T3 出发" },
      to: { code: "CGK", city: "雅加达", terminal: "T3", time: "待补", date: "待补" },
      flightNo: "航班号待补",
      meta: "厦门换楼 · 雅加达过夜",
      note: "到雅加达后入住 T3 内 Digital Airport Hotel，再为次日早班机换到 T1。"
    },
    {
      id: "elder-to-bali",
      groupId: "elder-route",
      direction: "接续航班",
      date: "9 月 28 日",
      from: { code: "CGK", city: "雅加达", terminal: "T1 待确认分区", time: "06:20", date: "9 月 28 日" },
      to: { code: "DPS", city: "巴厘岛", terminal: "待补", time: "待补", date: "9 月 28 日" },
      flightNo: "航班号待补",
      meta: "早班机",
      note: "免费接驳位置、运行时间和 T1A/T1B 必须以当日机场信息为准。"
    }
  ];

  const routePhases = [
    { title: "南部落地", dates: "9/27—9/28", place: "杭州 → 巴厘岛南部", note: "到达日景点过密，优先神鹰广场、海滩与一个日落点。", color: "#0f7976" },
    { title: "科莫多出海", dates: "9/29—9/30", place: "Labuan Bajo · 8 点船线", note: "包船 + 日落蝙蝠；逐站顺序、门票与安全配置待船司确认。", color: "#e76f51" },
    { title: "佩尼达东西线", dates: "10/01—10/03", place: "西线 → 东线 → 乌布", note: "路况颠簸，连续悬崖步行；东线方向在原账目中有冲突。", color: "#408bb5" },
    { title: "火山海岸收尾", dates: "10/04—10/07", place: "乌布 → 东部 → 南部", note: "瀑布、火山观景与 Lahangan 后，回南部购物并靠近机场。", color: "#356448" }
  ];

  const decisions = [
    { icon: "◒", title: "9/28 做减法", note: "Pura Geger、Pandawa 与 Oneeighty 都是可放弃项。保留 3—4 个点，才能从容看日落与火舞。", status: "行程优化", tone: "confirmed" },
    { icon: "≋", title: "科莫多先问船", note: "确认准确接送、逐站时间、船型容量、厕所、救生装备、向导数、门票和海况取消规则。", status: "资料待补", tone: "urgent" },
    { icon: "↝", title: "10/1 核对衔接", note: "10:10 飞抵 DPS 后还要换快艇去佩尼达。先按真实行李与码头车程重算缓冲，不要照搬旧班次。", status: "高优先复核", tone: "review" },
    { icon: "+", title: "长者先做支援链", note: "把常用药、过敏、保险救援、轮椅协助、行李直挂、集合点和失联方案写成一页离线卡。", status: "出发前完成", tone: "confirmed" }
  ];

  const days = [
    {
      id: "d0927", date: "9 月 27 日", day: "27", month: "SEP", weekday: "周五", title: "杭州启程 · 夜航转机", routeLabel: "杭州 → 新加坡", mode: "航班", color: "#476e7e",
      activities: ["原文记录 23:50 启程", "证件、签证页与次日包车凭证放入随身包", "国际漫游与离线地图在起飞前测试"],
      optional: [], warnings: ["国际航班号、航站楼和行李额在正文中缺失，均保持待补。"], stay: "机上 / 转机", focus: ["HGH", "SIN", "DPS"], mapSegments: []
    },
    {
      id: "d0928", date: "9 月 28 日", day: "28", month: "SEP", weekday: "周六", title: "抵达巴厘岛 · 乌鲁瓦图日落", routeLabel: "DPS → 南部海岸", mode: "包车", color: "#0f7976",
      activities: ["09:50 抵达 DPS，已预订包车", "核心：GWK 神鹰广场、Green Bowl Beach", "日落三选一：Karang Boma / Malini / 乌鲁瓦图寺火舞", "Blue Point / Single Fin 视体力插入"],
      optional: ["Pura Geger Dalem Pemutih", "Pandawa Beach", "Oneeighty Dayclub（偏贵）"], warnings: ["到达日原计划过密；只保留一个日落主场。", "乌鲁瓦图猴子会抢眼镜和随身物品。"], stay: "Dara House", focus: ["DPS", "gwk", "greenBowl", "karangBoma", "uluwatu", "daraHouse"],
      mapSegments: [{ mode: "road", route: ["DPS", "gwk", "greenBowl", "karangBoma", "malini", "uluwatu", "daraHouse"] }]
    },
    {
      id: "d0929", date: "9 月 29 日", day: "29", month: "SEP", weekday: "周日", title: "飞抵 Labuan Bajo · 留出恢复", routeLabel: "DPS → LBJ", mode: "航班", color: "#d85f46",
      activities: ["07:10—08:20 巴厘岛飞科莫多（已购票）", "入住 Golo Hilltop Hotel", "14:00 日落船游仅为可选；优先为次日早起留体力"],
      optional: ["下午日落一日游"], warnings: ["今天是官方调休上班日；主行程按请假计算。"], stay: "Golo Hilltop Hotel", focus: ["DPS", "LBJ", "labuanBajo"], mapSegments: []
    },
    {
      id: "d0930", date: "9 月 30 日", day: "30", month: "SEP", weekday: "周一", title: "科莫多包船 · 日落蝙蝠", routeLabel: "8 个海上候选点", mode: "包船", color: "#e76f51",
      activities: ["06:00 计划出发", "Padar → 科莫多龙 → Pink Beach", "Taka Makassar → Manta Point → Kanawa → Kelor", "Kalong 日落蝙蝠后返航"],
      optional: [], warnings: ["详细顺序原在图片中；实际路线以船长、海况和国家公园管理为准。", "不会游泳、自由泳不达标或身体不适者不要贸然下水。"], stay: "Golo Hilltop Hotel", focus: ["labuanBajo", "padar", "komodo", "pinkBeach", "takaMakassar", "mantaKomodo", "kanawa", "kelor", "kalong"],
      mapSegments: [{ mode: "boat", route: ["labuanBajo", "padar", "komodo", "pinkBeach", "takaMakassar", "mantaKomodo", "kanawa", "kelor", "kalong", "labuanBajo"] }]
    },
    {
      id: "d1001", date: "10 月 1 日", day: "01", month: "OCT", weekday: "周二", title: "飞回巴厘岛 · 佩尼达西线", routeLabel: "LBJ → DPS → 西线", mode: "航班 + 快艇 + 包车", color: "#327fa7",
      activities: ["08:50—10:10 LBJ 飞 DPS（已购票）", "转快艇前往佩尼达岛", "Angel's Billabong、Broken Beach", "Kelingking、Paluang Cliff、Crystal Bay"],
      optional: [], warnings: ["落地、取行李、前往码头与快艇之间的真实缓冲待重算。", "岛内路颠簸；Kelingking 不宜游泳，防中暑和猴子。"], stay: "佩尼达西部分组住宿", focus: ["LBJ", "DPS", "sanurHarbor", "banjarNyuh", "angelsBillabong", "brokenBeach", "kelingking", "paluang", "crystalBay"],
      mapSegments: [{ mode: "ferry", route: ["sanurHarbor", "banjarNyuh"] }, { mode: "road", route: ["banjarNyuh", "angelsBillabong", "brokenBeach", "kelingking", "paluang", "crystalBay"] }]
    },
    {
      id: "d1002", date: "10 月 2 日", day: "02", month: "OCT", weekday: "周三", title: "佩尼达东线 · 悬崖与海湾", routeLabel: "东线环游", mode: "包车", color: "#408bb5",
      activities: ["上午休息，中午出发", "Tree House 与 Thousand Islands Viewpoint", "Diamond Beach、Atuh Beach", "Teletubbies Hill、The Manta Point"],
      optional: [], warnings: ["支出表把当日包车写成“东线去西线”，与日程冲突，方向待核。", "Diamond 下行暴晒且坡陡，长者可留在观景台。"], stay: "Aloka Penida / kaje 分组住宿", focus: ["treeHouse", "thousandIslands", "diamondBeach", "atuhBeach", "teletubbies", "mantaPenida"],
      mapSegments: [{ mode: "road", route: ["treeHouse", "thousandIslands", "diamondBeach", "atuhBeach", "teletubbies", "mantaPenida"] }]
    },
    {
      id: "d1003", date: "10 月 3 日", day: "03", month: "OCT", weekday: "周四", title: "佩尼达回巴厘岛 · 乌布慢走", routeLabel: "港口 → 乌布", mode: "快艇 + 包车 + 徒步", color: "#4e8468",
      activities: ["上午休息，中午离岛", "Sayan House", "Ibah / Campuhan Ridge 轻徒步", "提前购买后续两天的酒水和食物"],
      optional: [], warnings: ["徒步终点：文字写 Mamoo Cafe，地图链接实际指 Karsa Cafe，保持待确认。", "船票可能到 Padang Bai 或 Kusamba，以票面为准。"], stay: "乌布分组住宿", focus: ["banjarNyuh", "kusamba", "ubud", "sayanHouse", "campuhanSouth", "campuhanNorth"],
      mapSegments: [{ mode: "ferry", route: ["banjarNyuh", "kusamba"] }, { mode: "road", route: ["kusamba", "ubud", "sayanHouse", "campuhanSouth"] }, { mode: "walk", route: ["campuhanSouth", "campuhanNorth"] }]
    },
    {
      id: "d1004", date: "10 月 4 日", day: "04", month: "OCT", weekday: "周五", title: "乌布 → 巴厘岛东部", routeLabel: "瀑布 → 火山景观", mode: "包车", color: "#356448",
      activities: ["Tukad Cepung Waterfall", "金塔马尼火山景观餐厅", "入住巴厘岛东部"],
      optional: ["Ritatkala Cafe 仅作同文明确坐标的火山观景备选"], warnings: ["原文只写“view point resto”，无法唯一识别具体餐厅。", "瀑布需涉水并步行，穿防滑鞋。"], stay: "Bali Cliff Glamping / Seraya Shores", focus: ["ubud", "tukadCepung", "ritatkala", "baliCliff"],
      mapSegments: [{ mode: "road", route: ["ubud", "tukadCepung", "ritatkala", "baliCliff"] }]
    },
    {
      id: "d1005", date: "10 月 5 日", day: "05", month: "OCT", weekday: "周六", title: "巴厘岛东部 · 慢下来", routeLabel: "Lahangan Sweet", mode: "短途包车", color: "#5c7543",
      activities: ["Lahangan Sweet 火山与海景高地", "回住宿休息", "短住成员可单独返回库塔，不套用到全员"],
      optional: [], warnings: ["原文提示约 30 分钟登山；长者按体力决定是否登顶。"], stay: "Bali Cliff Glamping", focus: ["baliCliff", "lahangan"],
      mapSegments: [{ mode: "road", route: ["baliCliff", "lahangan", "baliCliff"] }]
    },
    {
      id: "d1006", date: "10 月 6 日", day: "06", month: "OCT", weekday: "周日", title: "南部购物、咖啡与日落", routeLabel: "东部 → Seminyak / Kuta", mode: "包车", color: "#b46c42",
      activities: ["Beachwalk Shopping Center", "Petitenget / Berawa：睡衣、女装、泳装", "Shelter Cafe Seminyak", "Sky Garden / Sol Rooftop / Breeze 选一处收尾"],
      optional: ["Niconico Mare", "Bamboo Blonde", "Thaikila", "Sol Rooftop", "Breeze at The Samaya"], warnings: ["夜生活与次日早班返程冲突，建议只选一个点。"], stay: "Ara Inn · 机场附近", focus: ["baliCliff", "beachwalk", "seminyak", "kuta", "DPS"],
      mapSegments: [{ mode: "road", route: ["baliCliff", "seminyak", "beachwalk", "kuta", "DPS"] }]
    },
    {
      id: "d1007", date: "10 月 7 日", day: "07", month: "OCT", weekday: "周一", title: "巴厘岛返程", routeLabel: "DPS → 新加坡 → 杭州", mode: "航班", color: "#476e7e",
      activities: ["10:50 从登巴萨机场出发", "新加坡转机", "另一匿名路线经新加坡、泉州回长沙，时间待补"],
      optional: [], warnings: ["只按航班订单的最新值机时间安排离店，不沿用 2024 旧提醒。"], stay: "返程", focus: ["DPS", "SIN", "HGH"], mapSegments: []
    }
  ];

  const lodgings = [
    { id: "dara", name: "Dara House", city: "巴厘岛南部", dates: "9 月 28 日；个别成员 9 月 30 日", nights: "主线 1 晚", lat: -8.7386228, lng: 115.1654452, approximate: false, note: "抵达日落脚点；9/30 的另一笔只属于未赴科莫多的分组。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Google Maps", url: "https://www.google.com/maps/place/Dara+House/@-8.7386228,115.1654452,17z" }] },
    { id: "golo", name: "Golo Hilltop Hotel", city: "Labuan Bajo", dates: "9 月 29 日—10 月 1 日", nights: "2 晚", lat: -8.4938, lng: 119.8789, approximate: true, note: "衔接 9/30 包船；集合时间与酒店接送顺序待船司确认。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Google Maps", url: "https://www.google.com/maps?cid=9821679900466351879" }] },
    { id: "vns", name: "VnS Beachfront Guesthouse", city: "佩尼达岛西部", dates: "10 月 1 日—2 日", nights: "1 晚 · 分组", lat: -8.6746, lng: 115.4920, approximate: true, note: "西线分组住宿之一；以各自确认单为准。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Booking.com", url: "https://www.booking.com/hotel/id/v-amp-s-beachfront-guesthouse.html" }] },
    { id: "rijet", name: "Rijet Villa Beach & Restaurant", city: "佩尼达岛西部", dates: "10 月 1 日—2 日", nights: "1 晚 · 分组", lat: -8.6763, lng: 115.4933, approximate: true, note: "西线分组住宿之一。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Agoda", url: "https://www.agoda.com/rijet-villa-inn/hotel/bali-id.html" }] },
    { id: "kulkul", name: "Kulkul Bungalow", city: "佩尼达岛西部", dates: "10 月 1 日—2 日", nights: "1 晚 · 分组", lat: -8.6778, lng: 115.4946, approximate: true, note: "西线分组住宿之一。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Booking.com", url: "https://www.booking.com/hotel/id/kulkul-bungalow.html" }] },
    { id: "aloka", name: "Aloka Penida", city: "佩尼达岛东部", dates: "10 月 2 日—3 日", nights: "1 晚 · 分组", lat: -8.7662, lng: 115.5888, approximate: true, note: "划掉的 10/3 额外预订未纳入。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Booking.com", url: "https://www.booking.com/hotel/id/aloka-penida.html" }] },
    { id: "kaje", name: "kaje cottage & restaurant", city: "佩尼达岛东部", dates: "10 月 2 日—3 日", nights: "1 晚 · 分组", lat: -8.7681, lng: 115.5903, approximate: true, note: "展示名与底层酒店链接名称不一致，物业名需复核，因此不放预订链接。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [] },
    { id: "wayan", name: "Wayan Guest House", city: "乌布", dates: "10 月 3 日—4 日", nights: "1 晚 · 分组", lat: -8.5078, lng: 115.2611, approximate: true, note: "乌布分组住宿之一。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Booking.com", url: "https://www.booking.com/hotel/id/wayan-guest-house.html" }] },
    { id: "dipa", name: "Dipa Home Stay", city: "乌布", dates: "10 月 3 日—4 日", nights: "1 晚 · 分组", lat: -8.5092, lng: 115.2626, approximate: true, note: "乌布分组住宿之一。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Booking.com", url: "https://www.booking.com/hotel/id/dipa-home-stay.html" }] },
    { id: "inn-between", name: "Inn Between", city: "乌布", dates: "10 月 3 日—4 日", nights: "1 晚 · 分组", lat: -8.5106, lng: 115.2641, approximate: true, note: "乌布分组住宿之一。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Agoda", url: "https://www.agoda.com/inn-between/hotel/bali-id.html" }] },
    { id: "bali-cliff", name: "Bali Cliff Glamping", city: "巴厘岛东部", dates: "10 月 4 日—6 日", nights: "主体 2 晚", lat: -8.4564265, lng: 115.6442618, approximate: false, note: "主体东部住宿；另有一笔只住 10/4 的独立分组安排。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Booking.com", url: "https://www.booking.com/hotel/id/bali-cliff-glamping.html" }, { provider: "Agoda", url: "https://www.agoda.com/bali-cliff-glamping-h36232030/hotel/bali-id.html" }] },
    { id: "seraya", name: "Seraya Shores Bali", city: "巴厘岛东部", dates: "10 月 4 日—5 日", nights: "1 晚 · 分组", lat: -8.4822, lng: 115.6761, approximate: true, note: "东部分组住宿之一。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Booking.com", url: "https://www.booking.com/hotel/id/seraya-shores.html" }] },
    { id: "ara", name: "Ara Inn Bed And Breakfast by ecommerceloka", city: "机场附近", dates: "10 月 6 日—7 日", nights: "1 晚", lat: -8.7465, lng: 115.1714, approximate: true, note: "返程前一晚靠近 DPS，按 10:50 航班倒推离店。", price: { status: "booked", amount: null, basis: "订单总价待补" }, bookingLinks: [{ provider: "Booking.com", url: "https://www.booking.com/hotel/id/oyo-393-ara-inn-bed-and-breakfast.html" }] }
  ];

  const spots = [
    { name: "GWK 神鹰广场", region: "south", regionLabel: "巴厘南部", place: "gwk", date: "9/28", tag: "文化地标", note: "抵达日的核心停靠点；景区较大，预留步行时间。" },
    { name: "Blue Point / Single Fin", region: "south", regionLabel: "巴厘南部", place: "singleFin", date: "9/28", tag: "悬崖海景", note: "以 Single Fin 为导航锚点，再按现场通道步行。" },
    { name: "Green Bowl Beach", region: "south", regionLabel: "巴厘南部", place: "greenBowl", date: "9/28", tag: "小众海滩", note: "下到海滩需走台阶；返程体力要算进去。" },
    { name: "Karang Boma Cliff", region: "south", regionLabel: "巴厘南部", place: "karangBoma", date: "9/28", tag: "日落", note: "悬崖视野开阔；不要靠近无护栏边缘。" },
    { name: "Malini Uluwatu", region: "south", regionLabel: "巴厘南部", place: "malini", date: "9/28", tag: "餐厅 · 日落", note: "优势是海景，原文对餐食评价一般；好位置建议预约。" },
    { name: "乌鲁瓦图寺与 Kecak", region: "south", regionLabel: "巴厘南部", place: "uluwatu", date: "9/28", tag: "寺庙 · 火舞", note: "与 Karang Boma / Malini 三选一做日落主场更从容。" },
    { name: "Padar Island", region: "komodo", regionLabel: "科莫多", place: "padar", date: "9/30", tag: "登高观景", note: "三湾视角；观景台坐标为公开近似落点。" },
    { name: "Komodo dragon", region: "komodo", regionLabel: "科莫多", place: "komodo", date: "9/30", tag: "国家公园", note: "只在护林员带领下活动，龙的位置不固定。" },
    { name: "Pink Beach", region: "komodo", regionLabel: "科莫多", place: "pinkBeach", date: "9/30", tag: "粉色沙滩", note: "科莫多岛东岸 Pantai Merah；当地有多处同名沙滩。" },
    { name: "Taka Makassar", region: "komodo", regionLabel: "科莫多", place: "takaMakassar", date: "9/30", tag: "潮汐沙洲", note: "月牙沙洲形态与可登陆范围随潮汐变化。" },
    { name: "Manta Point · Komodo", region: "komodo", regionLabel: "科莫多", place: "mantaKomodo", date: "9/30", tag: "浮潜", note: "海上点位随洋流与船长判断变化；不会游泳不要勉强下水。" },
    { name: "Kanawa Island", region: "komodo", regionLabel: "科莫多", place: "kanawa", date: "9/30", tag: "珊瑚海", note: "原文描述为果冻海和珊瑚群。" },
    { name: "Kelor Island", region: "komodo", regionLabel: "科莫多", place: "kelor", date: "9/30", tag: "短徒步", note: "短程登高看海，量力安排。" },
    { name: "Kalong Island", region: "komodo", regionLabel: "科莫多", place: "kalong", date: "9/30", tag: "日落蝙蝠", note: "采用北林卡系泊区域近似坐标，避免误用同名岛。" },
    { name: "Angel's Billabong", region: "penida-west", regionLabel: "佩尼达西线", place: "angelsBillabong", date: "10/1", tag: "海蚀池", note: "巨浪时不要进入天然池。" },
    { name: "Broken Beach", region: "penida-west", regionLabel: "佩尼达西线", place: "brokenBeach", date: "10/1", tag: "海蚀拱门", note: "与 Angel's Billabong 相邻，可组合步行。" },
    { name: "Kelingking Beach", region: "penida-west", regionLabel: "佩尼达西线", place: "kelingking", date: "10/1", tag: "经典悬崖", note: "观景为主，不宜游泳；防中暑并看好随身物品。" },
    { name: "Paluang Cliff", region: "penida-west", regionLabel: "佩尼达西线", place: "paluang", date: "10/1", tag: "小众机位", note: "Kelingking 附近的另一处悬崖视角。" },
    { name: "Crystal Bay", region: "penida-west", regionLabel: "佩尼达西线", place: "crystalBay", date: "10/1", tag: "海滩休息", note: "西线收尾；是否下水仍看当天海况。" },
    { name: "Rumah Pohon Tree House", region: "penida-east", regionLabel: "佩尼达东线", place: "treeHouse", date: "10/2", tag: "拍照", note: "与 Thousand Islands 相邻但不是同一点。" },
    { name: "Thousand Islands Viewpoint", region: "penida-east", regionLabel: "佩尼达东线", place: "thousandIslands", date: "10/2", tag: "群岛观景", note: "东线海蚀群岛视角。" },
    { name: "Diamond Beach", region: "penida-east", regionLabel: "佩尼达东线", place: "diamondBeach", date: "10/2", tag: "悬崖海滩", note: "下行台阶陡、暴晒；可只在上方观景。" },
    { name: "Atuh Beach", region: "penida-east", regionLabel: "佩尼达东线", place: "atuhBeach", date: "10/2", tag: "海湾", note: "悬崖下海湾与离岸礁。" },
    { name: "Teletubbies Hill", region: "penida-east", regionLabel: "佩尼达东线", place: "teletubbies", date: "10/2", tag: "热带丘陵", note: "景区是一片丘陵，地图点为区域近似中心。" },
    { name: "Manta Point · Penida", region: "penida-east", regionLabel: "佩尼达东线", place: "mantaPenida", date: "10/2", tag: "海上观景", note: "原文只有名称；位置与是否下水都需现场确认。" },
    { name: "The Sayan House", region: "ubud-east", regionLabel: "乌布与东部", place: "sayanHouse", date: "10/3", tag: "丛林餐厅", note: "热门日落位，建议预约。" },
    { name: "Campuhan Ridge Walk", region: "ubud-east", regionLabel: "乌布与东部", place: "campuhanSouth", date: "10/3", tag: "轻徒步", note: "地图指向 Karsa 端，文字写 Mamoo，终点待确认。" },
    { name: "Tukad Cepung Waterfall", region: "ubud-east", regionLabel: "乌布与东部", place: "tukadCepung", date: "10/4", tag: "瀑布", note: "需涉水和步行，穿可湿、防滑的鞋。" },
    { name: "Ritatkala Cafe", region: "ubud-east", regionLabel: "乌布与东部", place: "ritatkala", date: "10/4", tag: "火山观景备选", note: "仅为同文有明确坐标的备选，不等同于未识别的 view point resto。" },
    { name: "Lahangan Sweet", region: "ubud-east", regionLabel: "乌布与东部", place: "lahangan", date: "10/5", tag: "火山海景", note: "原文提示约 30 分钟登山，长者量力。" },
    { name: "Beachwalk Shopping Center", region: "south-life", regionLabel: "购物与夜生活", place: "beachwalk", date: "10/6", tag: "购物", note: "10/6 南部购物主锚点。" },
    { name: "Seminyak / Petitenget", region: "south-life", regionLabel: "购物与夜生活", place: "seminyak", date: "10/6", tag: "服饰 · 咖啡", note: "Niconico Mare、Bamboo Blonde、Thaikila 与 Shelter Cafe 集中在南部片区。" },
    { name: "Kuta 日落与夜生活", region: "south-life", regionLabel: "购物与夜生活", place: "kuta", date: "10/6", tag: "收尾", note: "Sky Garden、Sol Rooftop 或 Breeze 选一，避免影响次日航班。" }
  ];

  const budget = {
    confirmed: [],
    quote: {
      label: "9/30 科莫多包船",
      amount: 19000000,
      currency: "IDR",
      basis: "14 人 / 船",
      perPerson: 19000000 / 14,
      status: "reference",
      note: "原文是最终方案报价，不足以证明已付款。"
    },
    plannedDeposit: { amount: 1000000, feeRate: 0.025, currency: "IDR", status: "planned" },
    assumptions: ["报价按 14 人均摊", "定金与 2.5% 手续费是计划项，不计入已支付", "国家公园门票及船上包含项待船司再次确认"],
    exclusions: ["国际与岛内机票", "全部住宿订单总价", "快艇、包车、餐饮与保险", "个人购物与夜生活"]
  };

  const transit = {
    hotel: {
      title: "Digital Airport Hotel · T3",
      label: "国际到达 → 机场内过夜",
      steps: ["入境、取行李后位于 G 层", "留在航站楼内，搭直梯到 2 层出发层", "背对值机柜台、面向大门，向左走到底", "寻找 6 号门附近酒店指示，向下一层到酒店"],
      note: "来源称酒店实际在 1 层，但建议从 2 层按标识下行；楼层、门号和深夜入住政策都要重新核验。",
      link: "https://www.agoda.com/digital-airport-hotel-terminal-3/hotel/jakarta-id.html"
    },
    shuttle: {
      title: "CGK T3 → T1",
      label: "免费航站楼接驳",
      steps: ["T3 国际到达完成入境与取行李", "搭电梯到 Departures / 出发层", "到 3 号门外候车区", "认准白色车身、明显标有 FREE 的免费接驳车", "按航班确认，在 T1A 或 T1B 正确下车"],
      note: "2024 来源称约 10—15 分钟一班，实际可能更久；运行时间、门号与站点均可能调整。"
    },
    cash: {
      title: "银联 ATM 通用操作",
      intro: "优先找带银联标识的正规银行 ATM。BCA 免当地手续费、统一张数上限与国内银行费率都是 2024 个案，不当作通用结论。",
      steps: ["输入密码并切换 English", "选择 Other Amount", "输入金额后选择 Correct", "储蓄卡选 Saving；信用卡选 Credit Card", "如需凭条选择 Yes", "等待交易完成、先收卡再清点现金"],
      warning: "机器菜单、单笔/单日限额和手续费因 ATM 与发卡行而异；不要让陌生人代刷或代操作。"
    }
  };

  const safetyCards = [
    { icon: "≈", title: "海上安全", note: "科莫多船游在出发前确认救生衣、船型容量、厕所、向导数、海况阈值和取消规则。", items: ["不会游泳不要勉强下水", "提前服用适合自己的晕船药", "听船长与向导的下水决定", "长者优先留船或浅水活动"] },
    { icon: "+", title: "长者资料卡", note: "原文只有护照、签证、海关与健康申报索引；医疗和照护链需要补齐。", items: ["常用药、英文药名与过敏信息", "保单救援方式与就近医院", "轮椅/特殊协助与行李直挂", "集合点、照护分工和失联方案"] },
    { icon: "△", title: "陆地风险", note: "佩尼达路况与连续悬崖步行是全程最考验体力的一段。", items: ["防晒、防中暑、足量饮水", "防晕车并减少颠簸时长", "猴区收好眼镜和食物", "瀑布与登山穿防滑鞋"] }
  ];

  const contacts = [
    { category: "INDONESIA", title: "印尼综合紧急呼叫", number: "112", phone: "112", note: "警方 110 · 急救 118/119 · 消防 113 · SAR 115。覆盖和语言支持可能因地区而异。", source: "https://indonesia.go.id/assets/upload/mediapublik/jpg2pdf_-_2022-01-23T120341_557.pdf" },
    { category: "CHINESE CONSULAR", title: "外交部 12308", number: "+86 10 6561 2308", phone: "+861065612308", note: "领事保护与服务；也可使用中国领事 App、12308 小程序网络电话。", source: "https://www.mfa.gov.cn/wjbzwfwpt/kzx/tzgg/202412/t20241220_11511540.html" },
    { category: "DENPASAR", title: "驻登巴萨总领馆", number: "+62 361 239902", phone: "+62361239902", note: "领事应急联络；出发前到总领馆官方渠道复核号码。", source: "http://denpasar.china-consulate.gov.cn/" },
    { category: "INSURANCE", title: "个人保单救援", number: "以本人保单为准", phone: null, note: "原文列出的保险热线可能只适用于特定产品，页面不把它当作全员通用号码。", source: null }
  ];

  const prepGroups = [
    { id: "documents", icon: "▤", title: "证件与入境", items: [
      { text: "护照与签证页离线备份", note: "个人 PDF 与号码不放入公开网页" },
      { text: "保险保单与救援方式", note: "确认承保海上、浮潜与长者需求" },
      { text: "重新核验入境、海关与健康申报", note: "原文的“提前 4 天”是 2024 规则" },
      { text: "巴厘岛旅游相关费用与支付状态", note: "按出发年份官网核验" }
    ] },
    { id: "connectivity", icon: "⌁", title: "通信与支付", items: [
      { text: "国际漫游已开通并实测", note: "长者手机也要逐台确认" },
      { text: "离线地图、酒店地址与集合点截图", note: "不依赖机场网络" },
      { text: "银行卡境外取现与手续费规则", note: "向自己的发卡行确认" },
      { text: "准备少量印尼盾小额现金", note: "不使用非正规代刷方式" }
    ] },
    { id: "sea", icon: "≈", title: "海岛装备", items: [
      { text: "晕车 / 晕船药", note: "按个人健康情况使用" },
      { text: "泳衣、速干毛巾与防水袋" },
      { text: "高倍防晒、墨镜与遮阳帽" },
      { text: "防滑涉水鞋或抓地力好的凉鞋" }
    ] },
    { id: "health", icon: "+", title: "健康与长者", items: [
      { text: "常用药、过敏与既往病史卡", note: "补英文通用名" },
      { text: "胃药、感冒药、创可贴与驱蚊用品" },
      { text: "机场轮椅或特殊协助已申请" },
      { text: "每天的照护人和撤退方案已约定" }
    ] },
    { id: "power", icon: "⌁", title: "数码与电源", items: [
      { text: "合规充电宝与充电线" },
      { text: "国际转换插头" },
      { text: "运动相机与防水配件" },
      { text: "所有票据只保存于私人离线目录" }
    ] },
    { id: "confirm", icon: "✓", title: "最后 48 小时", items: [
      { text: "航班与航站楼重新确认" },
      { text: "快艇码头、班次与行李政策确认" },
      { text: "科莫多逐站路线、门票与接送确认" },
      { text: "天气、海况与日落时间确认" }
    ] }
  ];

  const visualCards = [
    { className: "uluwatu", kicker: "SEP 28", title: "乌鲁瓦图悬崖日落" },
    { className: "komodo", kicker: "SEP 30", title: "科莫多群岛船线" },
    { className: "penida", kicker: "OCT 01—02", title: "佩尼达东西线" },
    { className: "east", kicker: "OCT 04—05", title: "巴厘岛东部瀑布" }
  ];

  window.BALI_GUIDE_DATA = {
    trip,
    tripCalendar,
    airports,
    places,
    travelerGroups,
    flights,
    routePhases,
    decisions,
    days,
    lodgings,
    spots,
    budget,
    transit,
    safetyCards,
    contacts,
    prepGroups,
    visualCards
  };
})();
