const trip={slug:"xiaoxinganling-2026-mid-autumn",title:"中秋小兴安岭",dates:{start:"2026-09-22",end:"2026-09-27"},modules:{flights:true,calendar:true,itinerary:true,map:true,lodging:true,spots:true,driving:true,rentals:true,budget:true,prep:true}};
const places={
  harbinAirport:{name:"哈尔滨太平机场",lat:45.6234,lng:126.2503,type:"airport"}, harbin:{name:"汉庭哈尔滨江北大学城地铁站酒店",lat:45.864,lng:126.548},
  huanlang:{name:"环廊公路",lat:46.45,lng:128.15,note:"林区公路赏秋段，具体入口以当天导航为准。"}, wudai:{name:"乌带公路",lat:46.78,lng:128.82,note:"五花山自驾重点，留意临时停车与林区防火规定。"},
  merganser:{name:"中华秋沙鸭保护区",lat:46.64,lng:128.85,note:"自然观察点，保持距离，不追逐、不投喂野生鸟类。"}, baoyu:{name:"宝宇温泉小镇",lat:46.67,lng:128.98,note:"文档中的秋色停靠点，营业情况出发前复核。"},
  yichun:{name:"伊春",lat:47.7275,lng:128.8405}, yichunSBend:{name:"伊春机场 S 弯",lat:47.754,lng:129.019,note:"公路机位，务必在安全区域停车拍摄。"},
  xishui:{name:"上甘岭溪水国家森林公园",lat:48.143,lng:129.02,note:"鹿苑与溪水森林景观。"}, wuying:{name:"五营红松林海",lat:48.219,lng:129.252,note:"门票参考 ¥75，含观光车；从少奇号附近开始徒步。"},
  tangwang:{name:"汤旺",lat:48.4547,lng:129.5704}, tangwangStone:{name:"汤旺河林海奇石",lat:48.451,lng:129.432,note:"5A 景区，门票参考 ¥90 含观光车；林中可能遇到松鼠。"},
  wuyiling:{name:"乌伊岭湿地公园",lat:48.59,lng:129.44,note:"免费湿地景观，适合短停与野餐，注意无痕离开。"}, jiayin:{name:"嘉荫",lat:48.8917,lng:130.3972}, jiayinPark:{name:"嘉荫江畔公园",lat:48.887,lng:130.41,note:"黑龙江界江景观，可视开放情况乘游船。"},
  g331Luobei:{name:"G331 萝北段",lat:47.83,lng:130.55,note:"界江公路秋色段，以沿途安全停车点为主。"}, jiamusi:{name:"佳木斯",lat:46.7998,lng:130.3189}, jiamusiPark:{name:"佳木斯沿江公园",lat:46.807,lng:130.35,note:"时间允许可看松花江日落。"}, jiamusiAirport:{name:"佳木斯东郊机场",lat:46.8434,lng:130.4654,type:"airport"},
  harbinRental:{name:"一嗨租车 · 哈尔滨太平国际机场店",lat:45.6238,lng:126.252,type:"rental"}, jiamusiRental:{name:"一嗨租车 · 佳木斯东郊机场店",lat:46.8437,lng:130.4664,type:"rental"},
  pvgRental:{name:"一嗨租车 · 上海浦东机场店",lat:31.1448,lng:121.8105,type:"rental"}, hangzhouRental:{name:"一嗨租车 · 杭州未来科技城门店（区域示意）",lat:30.281,lng:120.0095,type:"rental",approximate:true}
};
const flights=[
  {direction:"去程 · 9 月 22 日",flightNo:"GJ8232",from:{code:"HGH",city:"杭州 T3",time:"19:25"},to:{code:"HRB",city:"哈尔滨 T2",time:"22:40"},price:{amount:386,basis:"每人票价"},note:"抵达较晚，当晚只安排入住与休息。"},
  {direction:"回程 · 9 月 26 日",flightNo:"CA8330",from:{code:"JMU",city:"佳木斯",time:"19:25"},to:{code:"PVG",city:"上海浦东 T2",time:"22:30"},price:{amount:740,basis:"每人票价"},note:"落地后转地面交通回杭州；佳木斯还车与值机要留足时间。"}
];
const airports={
  HGH:{name:"杭州萧山国际机场",lat:30.2369,lng:120.4289},
  HRB:{name:"哈尔滨太平国际机场",lat:45.6234,lng:126.2503},
  JMU:{name:"佳木斯东郊机场",lat:46.8434,lng:130.4654},
  PVG:{name:"上海浦东国际机场",lat:31.1443,lng:121.8083}
};
const rentals=[
  {id:"forest-main",role:"东北主线自驾",provider:"一嗨租车",status:"预约成功 · 已支付",vehicle:"丰田卡罗拉",specs:["无级变速","三厢","1.2T–1.5L","5 座"],duration:"3 天 22 小时",pickup:{place:"harbinRental",date:"9 月 22 日",time:"22:30",store:"哈尔滨太平国际机场店",location:"T2 地下停车场负一层 A6 区"},returnTrip:{place:"jiamusiRental",date:"9 月 26 日",time:"20:00",store:"佳木斯东郊机场店",location:"东郊机场停车场"},price:{total:"849",breakdown:[{label:"车辆租赁及门店服务",amount:"629"},{label:"基本保障 · 含小伤免赔",amount:"200"},{label:"车辆整备费",amount:"20"},{label:"异地还车费",amount:"1,059"},{label:"异地还车限时优惠",amount:"-1,059"}]},severity:"urgent",warning:"取车时间比 GJ8232 抵达哈尔滨早 10 分钟；还车时间比 CA8330 起飞晚 35 分钟。必须调整取车时间，并把佳木斯还车提前到值机前。"},
  {id:"home-transfer",role:"浦东返杭接驳",provider:"一嗨租车",status:"预约成功 · 已支付",vehicle:"丰田卡罗拉 · 浙 A 牌",specs:["无级变速","三厢","1.2T–1.5L","5 座","支持自助取还"],duration:"12 小时",pickup:{place:"pvgRental",date:"9 月 26 日",time:"23:00",store:"上海浦东机场店",location:"P4 停车库 C 座 5 楼"},returnTrip:{place:"hangzhouRental",date:"9 月 27 日",time:"11:00",store:"杭州未来科技城门店",location:"乐富海邦园 9 幢 1 号商铺（桃花港路东门）"},price:{total:"262",breakdown:[{label:"车辆租赁及门店服务",amount:"177"},{label:"基本保障 · 含小伤免赔",amount:"50"},{label:"车辆整备费",amount:"35"},{label:"异地还车费",amount:"593"},{label:"异地还车限时优惠",amount:"-593"}]},severity:"warning",warning:"CA8330 计划 22:30 抵达浦东，23:00 取车只留 30 分钟。需计入下机、取行李和前往 P4 的时间，并确认门店迟到保留规则。"}
];
const budget={
  confirmed:[
    {label:"往返机票 · 1 人",amount:1126,note:"去程 ¥386 + 回程 ¥740"},
    {label:"住宿 · 4 晚",amount:807.72,note:"四笔已预订住宿合计"},
    {label:"租车 · 2 单",amount:1111,note:"东北主线 ¥849 + 浦东返杭 ¥262"}
  ],
  confirmedTotal:3044.72,
  estimates:[
    {label:"景区门票",range:"约 ¥165 / 人",note:"五营 ¥75 + 汤旺河 ¥90"},
    {label:"油费、路费与停车",range:"约 ¥900–1,200 / 车",note:"含东北主线与浦东返杭接驳"},
    {label:"餐饮",range:"约 ¥600–900 / 人",note:"按 6 天简餐与正餐混合估算"}
  ],
  scenarios:[
    {label:"1 人出行",range:"约 ¥4,700–5,300",note:"机票、门票与餐饮按 1 人"},
    {label:"2 人同行",range:"约 ¥6,600–7,500",note:"两人同住、共用车辆，机票按每人计"}
  ]
};
const tripCalendar=[
  {date:"22",weekday:"周二",type:"workday",label:"工作日",note:"晚间出发"},
  {date:"23",weekday:"周三",type:"leave",label:"请假",note:"自驾启程",badge:"请",badgeTitle:"需要请假"},
  {date:"24",weekday:"周四",type:"leave",label:"请假",note:"森林景区",badge:"请",badgeTitle:"需要请假"},
  {date:"25",weekday:"周五",type:"holiday",label:"中秋假期",note:"法定假日",badge:"假",badgeTitle:"中秋法定假期"},
  {date:"26",weekday:"周六",type:"weekend",label:"周末",note:"中秋假期",badge:"假",badgeTitle:"周末且属于中秋假期"},
  {date:"27",weekday:"周日",type:"weekend",label:"周末",note:"中秋假期",badge:"假",badgeTitle:"周末且属于中秋假期"}
];
const days=[
  {date:"9/22 周二",title:"杭州 → 哈尔滨",drive:"落地取车",route:["harbinAirport","harbin"],activities:["19:25 杭州 T3 起飞","22:40 抵达哈尔滨 T2；一嗨订单取车时间为 22:30，需调整或确认迟到保留","机场地库取车后入住汉庭哈尔滨江北大学城地铁站酒店，尽快休息"],stay:"汉庭哈尔滨江北大学城地铁站酒店"},
  {date:"9/23 周三",title:"哈尔滨 → 林区公路 → 伊春",drive:"长途日",route:["harbin","huanlang","wudai","merganser","baoyu","yichun"],activities:["早上补给并检查车辆","环廊公路与乌带公路择优赏秋","中华秋沙鸭保护区短停","宝宇温泉小镇视时间停留","日落前后抵达伊春"],stay:"伊春如家艾扉酒店"},
  {date:"9/24 周四",title:"伊春 → 红松林 → 汤旺",drive:"景区日",route:["yichun","yichunSBend","xishui","wuying","tangwang"],activities:["伊春机场 S 弯安全拍照","上甘岭溪水公园看森林与鹿苑","五营红松林海徒步","傍晚前抵达汤旺"],stay:"汤旺县林栖宾馆"},
  {date:"9/25 周五 · 中秋",title:"汤旺 → 湿地 → 嘉荫",drive:"徒步日",route:["tangwang","tangwangStone","wuyiling","jiayin","jiayinPark"],activities:["早进汤旺河林海奇石景区","乌伊岭湿地短停、野餐休息","下午前往嘉荫","江畔公园散步，视情况乘界河游船"],stay:"和悦数智酒店"},
  {date:"9/26 周六",title:"嘉荫 → 佳木斯 → 浦东 → 杭州",drive:"返程 + 接驳租车",route:["jiayin","g331Luobei","jiamusi","jiamusiAirport"],activities:["沿 G331 萝北段向佳木斯，取消非必要停留","CA8330 19:25 起飞，但主订单 20:00 才还车；必须提前修改并预留加油、验车和值机时间","22:30 抵达浦东，23:00 在 P4 取第二辆卡罗拉；30 分钟缓冲偏紧","自驾返回杭州，9/27 11:00 前在未来科技城门店还车"],stay:"杭州"}
];
const lodgings=[
  {name:"汉庭哈尔滨江北大学城地铁站酒店",city:"哈尔滨",dates:"9 月 22 日",nights:"1 晚",place:"harbin",note:"位于江北大学城片区；深夜抵达，次日取车后向伊春出发。",price:{status:"booked",amount:"120.72",basis:"1 晚总价",source:"预订截图"},bookingLinks:[{provider:"Trip.com",url:"https://hk.trip.com/hotels/harbin-hotel-detail-10200726/hanting-hotel/"}]},
  {name:"伊春如家艾扉酒店",city:"伊春",dates:"9 月 23 日",nights:"1 晚",place:"yichun",note:"位于林都大街；第二天向上甘岭、五营方向出发。",price:{status:"booked",amount:"220",basis:"1 晚总价",source:"预订截图"},bookingLinks:[{provider:"Trip.com",url:"https://tw.trip.com/hotels/yichun-1-hotel-detail-121130695/yichun-home-inn-aifei-hotel/"}]},
  {name:"汤旺县林栖宾馆",city:"汤旺",dates:"9 月 24 日",nights:"1 晚",place:"tangwang",note:"汤旺镇内落脚，便于次日早进林海奇石景区。",price:{status:"booked",amount:"251",basis:"1 晚总价",source:"预订截图"},bookingLinks:[{provider:"Trip.com",url:"https://www.trip.com/hotels/tangwang-county-hotel-detail-109729391/linxi-hotel/"}]},
  {name:"和悦数智酒店",city:"嘉荫",dates:"9 月 25 日",nights:"1 晚",place:"jiayin",note:"位于嘉荫县城，靠近江畔；第二天沿 G331 前往佳木斯。",price:{status:"booked",amount:"216",basis:"1 晚总价",source:"预订截图"},bookingLinks:[{provider:"携程",url:"https://m.ctrip.com/html5/hotel/hoteldetail/121994532.html"}]}
];
const spots=[
  {name:"宝宇温泉小镇",tag:"赏秋 · 公路停靠",place:"baoyu",note:"9 月 23 日乌带公路沿线的秋色停靠点。原文参考信息提示可能无需温泉票也能进入外围，但营业与开放情况需在出发前复核。",images:["https://cdn.nlark.com/yuque/0/2026/png/21411456/1786196618750-ae6cfed4-d387-44ad-a7ba-570141fbb4e1.png"]},
  {name:"汤旺河林海奇石景区",tag:"徒步 · 森林 · 5A",place:"tangwangStone",note:"门票参考 ¥90（含观光车）。门口摆渡至商业街，再转车到一线天；把它放在早晨主时段。",images:["https://cdn.nlark.com/yuque/0/2026/png/21411456/1786171289004-9f6f4527-3968-4ba4-a6a7-4f28a0108c4c.png"]},
  {name:"五营红松林海景区",tag:"徒步 · 原始红松林",place:"wuying",note:"门票参考 ¥75（含观光车）。检票中心乘车到少奇号一带后开始步行。",images:["https://cdn.nlark.com/yuque/0/2026/png/21411456/1786175259807-505c180e-9ab7-4d21-a910-030a25ce9d79.png","https://cdn.nlark.com/yuque/0/2026/png/21411456/1786176483374-22cbc17b-5758-403e-9778-7e275caaae25.png"]},
  {name:"乌伊岭湿地公园",tag:"免费 · 湿地 · 野餐",place:"wuyiling",note:"作为汤旺到嘉荫之间的舒缓停靠点；天气合适再野餐，垃圾全部带走。",images:["https://cdn.nlark.com/yuque/0/2026/png/21411456/1786195719614-f81f36fc-a0b7-4154-9be9-cd8b64ca38a5.png"]},
  {name:"上甘岭溪水公园",tag:"鹿苑 · 森林",place:"xishui",note:"适合和五营连成同一天；若五营预计游览时间过长，这里缩短停留。",images:["https://cdn.nlark.com/yuque/0/2026/png/21411456/1786195742194-f4947905-03e7-48ef-bc27-1e44175dd5b3.png","https://cdn.nlark.com/yuque/0/2026/png/21411456/1786195764083-37bc325a-ac4b-41e5-a416-f2e8200b1c0c.png"]},
  {name:"嘉荫江畔",tag:"界江 · 日落",place:"jiayinPark",note:"江畔公园免费；界河游船需要按当日开放和边境管理要求安排。",images:["https://cdn.nlark.com/yuque/0/2026/png/21411456/1786268723422-b352f964-b574-46bf-8ef7-96acfa8fc1f6.png","https://cdn.nlark.com/yuque/0/2026/png/21411456/1786268835058-e8614be2-b7f9-4bc2-baab-39bf8911aac9.png"]}
];
const drivingNotes=[
  {name:"乌带公路 / 环廊公路",tag:"9 月 23 日",note:"当天路线很长，两条路不必全部深度走。优先选择叶色更好、路况更稳的一条，把另一条作为备选。"},
  {name:"伊春机场 S 弯",tag:"9 月 24 日",note:"它是公路拍摄点，不是封闭景区。禁止占用车道或在弯心停车，使用正规停车区域后步行取景。"},
  {name:"G331 萝北段",tag:"9 月 26 日",note:"返程航班是硬截止点。订单中的 20:00 还车时间晚于 19:25 起飞，调整订单后再按新的还车截止时间倒排。"},
  {name:"小众支线：汤旺—乌伊岭—库尔滨—Y001",tag:"备选，不纳入主线",note:"原文收录了延伸至逊克的支线，但本次主行程要去嘉荫，时间不足，不建议临时加入。"}
];
const prep=[
  {group:"交通与车辆",items:["调整哈尔滨 9/22 22:30 取车和佳木斯 9/26 20:00 还车时间","确认两笔订单的异地还车优惠、保障范围和迟到保留规则","取车时检查轮胎、备胎、玻璃水和油量，保存车辆与停车位置照片","下载离线地图，保存每日关键点，准备车充与手机支架","9/26 预留加油、验车、值机、浦东取车和返杭时间"]},
  {group:"北方秋季装备",items:["分层穿衣：速干层、抓绒/薄羽绒、防风防水外层","徒步鞋、防滑鞋底、备用袜子；早晚准备帽子和薄手套","雨具、暖宝宝、保温杯；车内留一套干衣物","防晒、润唇、驱蚊用品和常用药"]},
  {group:"景区与安全",items:["临出发复核五营、汤旺河门票和观光车政策","林区遵守防火规定，不携带火种，不离开开放步道","野生动物只观察不投喂；原笔记中的“带瓜子喂松鼠”不建议执行","公路拍摄不占车道；遇雾、雨、落叶湿滑主动降速"]},
  {group:"待补信息",items:["确认两笔租车订单修改后的取还车时间","核对驾驶人证件、自助取还和门店夜间服务规则","各段预计里程、实时路况与景区开放时间","确认浦东 P4 接驳时间及杭州门店 9/27 还车流程"]}
];
const colors=["#a84631","#c77728","#1f6b55","#35778c","#66558f"];
const flightColors=["#176b9c","#a84631"];
function greatCirclePoints(from,to,steps=72){
  const radians=value=>value*Math.PI/180;
  const degrees=value=>value*180/Math.PI;
  const aLat=radians(from.lat),aLng=radians(from.lng),bLat=radians(to.lat),bLng=radians(to.lng);
  const angularDistance=2*Math.asin(Math.sqrt(Math.sin((bLat-aLat)/2)**2+Math.cos(aLat)*Math.cos(bLat)*Math.sin((bLng-aLng)/2)**2));
  if(!angularDistance)return [[from.lat,from.lng],[to.lat,to.lng]];
  return Array.from({length:steps+1},(_,index)=>{
    const fraction=index/steps;
    const a=Math.sin((1-fraction)*angularDistance)/Math.sin(angularDistance);
    const b=Math.sin(fraction*angularDistance)/Math.sin(angularDistance);
    const x=a*Math.cos(aLat)*Math.cos(aLng)+b*Math.cos(bLat)*Math.cos(bLng);
    const y=a*Math.cos(aLat)*Math.sin(aLng)+b*Math.cos(bLat)*Math.sin(bLng);
    const z=a*Math.sin(aLat)+b*Math.sin(bLat);
    return [degrees(Math.atan2(z,Math.sqrt(x*x+y*y))),degrees(Math.atan2(y,x))];
  });
}
function renderFlights(){document.querySelector("#flightSummary").innerHTML=flights.map(f=>`<article class="flight-card"><div class="flight-top"><p>${f.direction}</p><span class="flight-no">${f.flightNo}</span></div><div class="flight-route"><div class="airport"><strong>${f.from.code}</strong><span>${f.from.city}</span><small>${f.from.time}</small></div><span class="plane">✈</span><div class="airport"><strong>${f.to.code}</strong><span>${f.to.city}</span><small>${f.to.time}</small></div></div><div class="flight-fare"><span>${f.price.basis}</span><strong><small>¥</small>${f.price.amount}</strong></div><small>${f.note}</small></article>`).join("")}
function renderCalendar(){document.querySelector("#tripCalendar").innerHTML=tripCalendar.map(d=>`<article class="calendar-day calendar-day--${d.type}"><div class="calendar-day-top"><span>${d.weekday}</span>${d.badge?`<i class="calendar-badge calendar-badge--${d.type}" title="${d.badgeTitle}">${d.badge}</i>`:""}</div><strong>${d.date}</strong><span class="calendar-day-label">${d.label}</span><small>${d.note}</small></article>`).join("")}
function renderBookingLinks(lodging,compact=false){return `<div class="lodging-booking-links${compact?" lodging-booking-links--compact":""}" aria-label="${lodging.name} 预订平台">${lodging.bookingLinks.map(link=>`<a class="lodging-booking-link trip-provider" href="${link.url}" target="_blank" rel="noopener noreferrer" aria-label="在 ${link.provider} 查看 ${lodging.name}"><span>${link.provider}</span><span aria-hidden="true">↗</span></a>`).join("")}</div>`}
function renderLodgingPrice(lodging,compact=false){const p=lodging.price;const booked=p.status==="booked";return `<div class="lodging-price${compact?" lodging-price--compact":""}"><span class="lodging-price-status ${booked?"is-booked":"is-reference"}">${booked?"已预订":`参考价 · ${lodging.dates}`}</span><strong><small>¥</small>${p.amount}</strong><span class="lodging-price-basis">${p.basis}</span></div>`}
function renderFlow(){document.querySelector("#routeFlow").innerHTML=days.map(d=>`<article class="flow-item"><span class="flow-date">${d.date.split(" ")[0]}</span><div><strong>${d.title}</strong><p>${d.drive} · 住 ${d.stay}</p></div><span class="flow-arrow">→</span></article>`).join("")}
function renderBudget(){document.querySelector("#budgetSummary").innerHTML=`<section class="budget-shell" aria-labelledby="budgetTitle"><header class="budget-heading"><div><p class="budget-kicker">TRIP BUDGET</p><h2 id="budgetTitle">行程费用概算</h2></div><div class="budget-confirmed"><span>已确认支出</span><strong><small>¥</small>${budget.confirmedTotal.toLocaleString("zh-CN",{minimumFractionDigits:2})}</strong><small>按 1 人机票</small></div></header><div class="budget-confirmed-list">${budget.confirmed.map(item=>`<article><span>${item.label}</span><strong>¥${item.amount.toLocaleString("zh-CN",{minimumFractionDigits:Number.isInteger(item.amount)?0:2})}</strong><small>${item.note}</small></article>`).join("")}</div><div class="budget-estimates">${budget.estimates.map(item=>`<article><span>${item.label}</span><strong>${item.range}</strong><small>${item.note}</small></article>`).join("")}</div><div class="budget-scenarios">${budget.scenarios.map(item=>`<article><span>${item.label}</span><strong>${item.range}</strong><small>${item.note}</small></article>`).join("")}</div><p class="budget-note">概算未含其他收费景区、界河游船、购物、车辆改期或临时改签；实际以结算为准。</p></section>`}
function renderDays(){document.querySelector("#dayList").innerHTML=days.map((d,i)=>`<article class="day-card"><div class="card-top"><span class="date-badge">${d.date}</span><span class="date-badge drive-badge">${d.drive}</span></div><h3>${d.title}</h3><ul>${d.activities.map(a=>`<li>${a}</li>`).join("")}</ul><p class="stay">住宿：${d.stay}</p><button class="link-button" data-day="${i}" type="button"><span class="link-button-pin" aria-hidden="true"></span><span>在地图查看当日路线</span><span class="link-button-arrow" aria-hidden="true">→</span></button></article>`).join("")}
function renderLodgings(){document.querySelector("#lodgingList").innerHTML=lodgings.map(l=>`<article class="lodging-card focus-map" data-place="${l.place}"><div class="lodging-meta"><span class="chip">${l.city}</span><span class="chip">${l.dates} · ${l.nights}</span></div><h3>${l.name}</h3>${renderLodgingPrice(l)}<p>${l.note}</p>${renderBookingLinks(l)}</article>`).join("")}
function renderSpots(){document.querySelector("#spotList").innerHTML=spots.map(s=>`<article class="spot-card focus-map" data-place="${s.place}">${s.images.length?`<div class="spot-images">${s.images.map(src=>`<img loading="lazy" referrerpolicy="no-referrer" src="${src}" alt="${s.name}参考图" onerror="this.hidden=true">`).join("")}</div>`:""}<div class="spot-copy"><div class="spot-meta"><span class="chip">${s.tag}</span></div><h3>${s.name}</h3><p>${s.note}</p></div></article>`).join("")}
function renderRentalCard(rental){return `<article class="rental-card" data-rental="${rental.id}"><header class="rental-heading"><div><span class="chip">${rental.role}</span><h3>${rental.vehicle}</h3></div><span class="rental-status">${rental.status}</span></header><div class="rental-specs">${rental.specs.map(spec=>`<span>${spec}</span>`).join("")}<span>${rental.duration}</span></div><div class="rental-schedule"><section><span>取车</span><strong>${rental.pickup.date} · ${rental.pickup.time}</strong><small>${rental.pickup.store}<br>${rental.pickup.location}</small></section><section><span>还车</span><strong>${rental.returnTrip.date} · ${rental.returnTrip.time}</strong><small>${rental.returnTrip.store}<br>${rental.returnTrip.location}</small></section></div><div class="rental-payment"><span>已支付总计</span><strong><small>¥</small>${rental.price.total}</strong></div><div class="rental-breakdown">${rental.price.breakdown.map(item=>`<span>${item.label}<strong>${item.amount.startsWith("-")?"-¥":"¥"}${item.amount.replace("-","")}</strong></span>`).join("")}</div><aside class="rental-alert rental-alert--${rental.severity}"><strong>${rental.severity==="urgent"?"时间冲突":"衔接偏紧"}</strong><p>${rental.warning}</p></aside><button class="link-button" type="button" aria-label="在地图查看${rental.role}取还车点"><span class="link-button-pin" aria-hidden="true"></span><span>在地图查看取还车点</span><span class="link-button-arrow" aria-hidden="true">→</span></button></article>`}
function renderDriving(){document.querySelector("#drivingList").innerHTML=rentals.map(renderRentalCard).join("")+drivingNotes.map(d=>`<article class="driving-card"><span class="chip">${d.tag}</span><h3>${d.name}</h3><p>${d.note}</p></article>`).join("")}
function renderPrep(){document.querySelector("#prepList").innerHTML=prep.map(g=>`<article class="prep-group"><h3>${g.group}</h3><ul>${g.items.map(i=>`<li>${i}</li>`).join("")}</ul></article>`).join("")}
renderFlights();renderCalendar();renderFlow();renderBudget();renderDays();renderLodgings();renderSpots();renderDriving();renderPrep();
const tabButtons=[...document.querySelectorAll(".tab-button")];
function activateTab(button,focus=false){
  tabButtons.forEach(tab=>{const active=tab===button;tab.classList.toggle("active",active);tab.setAttribute("aria-selected",String(active));tab.tabIndex=active?0:-1});
  document.querySelectorAll(".view").forEach(view=>view.classList.toggle("active",view.id===button.dataset.view));
  if(focus)button.focus();
}
tabButtons.forEach(button=>button.addEventListener("click",()=>activateTab(button)));
document.querySelector(".tabs").addEventListener("keydown",event=>{
  if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
  event.preventDefault();
  const current=tabButtons.indexOf(document.activeElement);
  const next=event.key==="Home"?0:event.key==="End"?tabButtons.length-1:event.key==="ArrowRight"?(current+1)%tabButtons.length:(current-1+tabButtons.length)%tabButtons.length;
  activateTab(tabButtons[next],true);
});
const map=L.map("map",{zoomControl:false}).setView([47.55,129.15],7);L.control.zoom({position:"bottomleft"}).addTo(map);L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles © Esri · Route data © OpenStreetMap contributors",maxZoom:17}).addTo(map);
const layers={fallback:L.layerGroup().addTo(map),route:L.layerGroup().addTo(map),labels:L.layerGroup().addTo(map),flights:L.layerGroup().addTo(map),airports:L.layerGroup().addTo(map),rentals:L.layerGroup().addTo(map),spots:L.layerGroup().addTo(map),hotels:L.layerGroup().addTo(map)};const hotelMarkers=new Map(),spotMarkers=new Map(),rentalMarkers=new Map(),fallbackLines=[],flightLines=[];
days.forEach((d,i)=>{const coords=d.route.map(k=>[places[k].lat,places[k].lng]);const line=L.polyline(coords,{color:colors[i],weight:4,opacity:.82,dashArray:"9 9"}).addTo(layers.fallback);fallbackLines.push(line);const mid=coords[Math.floor(coords.length/2)];L.tooltip({permanent:true,direction:"center",className:"map-label"}).setLatLng(mid).setContent(d.date.split(" ")[0]).addTo(layers.labels)});
lodgings.forEach(l=>{const p=places[l.place],icon=L.divIcon({className:"hotel-icon",html:"住",iconSize:[28,28]});hotelMarkers.set(l.place,L.marker([p.lat,p.lng],{icon}).bindPopup(`<strong>${l.name}</strong><br>${l.dates}${renderLodgingPrice(l,true)}<br>${l.note}${renderBookingLinks(l,true)}`).addTo(layers.hotels))});
spots.forEach(s=>{const p=places[s.place],icon=L.divIcon({className:"spot-icon",html:"景",iconSize:[27,27]});spotMarkers.set(s.place,L.marker([p.lat,p.lng],{icon}).bindPopup(`<strong>${s.name}</strong><br>${s.note}`).addTo(layers.spots))});
rentals.forEach(rental=>[["pickup","取"],["returnTrip","还"]].forEach(([key,label])=>{const stop=rental[key],p=places[stop.place],approximate=p.approximate?"<br><small>地图位置为未来科技城区域示意，以订单门店地址为准。</small>":"";const icon=L.divIcon({className:`rental-icon rental-icon--${label==="取"?"pickup":"return"}`,html:label,iconSize:[30,30],iconAnchor:label==="取"?[36,15]:[-6,15]});rentalMarkers.set(`${rental.id}:${key}`,L.marker([p.lat,p.lng],{icon,zIndexOffset:650}).bindPopup(`<strong>${rental.role} · ${label}车</strong><br>${stop.date} ${stop.time}<br>${stop.store}<br>${stop.location}${approximate}<br><b>订单已支付 ¥${rental.price.total}</b><br><small>${rental.warning}</small>`).addTo(layers.rentals))}));
Object.entries(airports).forEach(([code,airport])=>{const icon=L.divIcon({className:"airport-map-icon",html:`<span aria-hidden="true">✈</span><b>${code}</b>`,iconSize:[58,30],iconAnchor:[29,15]});L.marker([airport.lat,airport.lng],{icon,zIndexOffset:700}).bindPopup(`<strong>${code} · ${airport.name}</strong>`).addTo(layers.airports)});
flights.forEach((flight,index)=>{const from=airports[flight.from.code],to=airports[flight.to.code];const line=L.polyline(greatCirclePoints(from,to),{className:"flight-route-line",color:flightColors[index%flightColors.length],weight:4,opacity:.88,dashArray:"11 8"}).bindPopup(`<strong>${flight.flightNo}</strong><br>${flight.direction}<br>${flight.from.code} ${flight.from.time} → ${flight.to.code} ${flight.to.time}<br><small>地图航线为球面示意</small>`).addTo(layers.flights);line.on("click",()=>focusFlight(index));flightLines.push(line)});
const allBounds=L.latLngBounds(days.flatMap(d=>d.route.map(k=>[places[k].lat,places[k].lng])));map.fitBounds(allBounds.pad(.08));
const flightBounds=L.latLngBounds(Object.values(airports).map(airport=>[airport.lat,airport.lng]));
document.querySelector("#mapLegend").innerHTML=`<div class="legend-title">每日自驾</div>${days.map((d,i)=>`<button class="legend-item" data-day="${i}"><span class="legend-swatch" style="background:${colors[i]}"></span><span>${d.date.split(" ")[0]} ${d.title}</span></button>`).join("")}<div class="legend-title legend-title--flights">航班航线 · 示意</div>${flights.map((f,i)=>`<button class="legend-item" data-flight="${i}"><span class="flight-legend-swatch" style="border-color:${flightColors[i%flightColors.length]}">✈</span><span>${f.flightNo} · ${f.from.code} → ${f.to.code}</span></button>`).join("")}`;
function focusDay(i){document.querySelector("#mapLegend").classList.remove("map-legend--flight-focus");fallbackLines.forEach((l,n)=>l.setStyle({weight:n===i?7:3,opacity:n===i?1:.28}));map.fitBounds(fallbackLines[i].getBounds().pad(.25));document.querySelector("#mapStatus").textContent=`已聚焦：${days[i].date} · ${days[i].title}`}
function getFlightFitOptions(maxZoom=6){const wide=map.getSize().x>=620;return wide?{paddingTopLeft:[64,74],paddingBottomRight:[250,58],maxZoom}:{paddingTopLeft:[32,96],paddingBottomRight:[32,48],maxZoom}}
function setFlightLayersVisible(visible){[layers.flights,layers.airports].forEach(layer=>{if(visible&&!map.hasLayer(layer))layer.addTo(map);if(!visible&&map.hasLayer(layer))map.removeLayer(layer)});document.querySelector("#toggleFlightsButton").setAttribute("aria-pressed",String(visible))}
function focusFlight(i){const flight=flights[i],line=flightLines[i];setFlightLayersVisible(true);document.querySelector("#mapLegend").classList.add("map-legend--flight-focus");map.fitBounds(line.getBounds().pad(.2),getFlightFitOptions());line.openPopup(line.getBounds().getCenter());document.querySelector("#mapStatus").textContent=`航班：${flight.flightNo} · ${flight.from.code} → ${flight.to.code} · 球面示意航线`}
document.querySelectorAll("[data-day]").forEach(b=>b.addEventListener("click",()=>focusDay(Number(b.dataset.day))));document.querySelectorAll(".focus-map").forEach(c=>c.addEventListener("click",()=>{const k=c.dataset.place,p=places[k],marker=hotelMarkers.get(k)||spotMarkers.get(k);map.setView([p.lat,p.lng],11);marker?.openPopup();if(innerWidth<=900)document.querySelector("#map").scrollIntoView({behavior:"smooth"})}));document.querySelectorAll("[data-rental]").forEach(card=>card.addEventListener("click",()=>{const rental=rentals.find(item=>item.id===card.dataset.rental),pickup=places[rental.pickup.place],returnPoint=places[rental.returnTrip.place],marker=rentalMarkers.get(`${rental.id}:pickup`);if(!map.hasLayer(layers.rentals)){layers.rentals.addTo(map);document.querySelector("#toggleRentalButton").setAttribute("aria-pressed","true")}map.fitBounds(L.latLngBounds([[pickup.lat,pickup.lng],[returnPoint.lat,returnPoint.lng]]).pad(.45));marker?.openPopup();if(innerWidth<=900)document.querySelector("#map").scrollIntoView({behavior:"smooth"})}));
document.querySelectorAll("[data-flight]").forEach(button=>button.addEventListener("click",()=>focusFlight(Number(button.dataset.flight))));
document.querySelector("#fitRouteButton").addEventListener("click",()=>{document.querySelector("#mapLegend").classList.remove("map-legend--flight-focus");fallbackLines.forEach(l=>l.setStyle({weight:4,opacity:.82}));map.fitBounds(allBounds.pad(.08));document.querySelector("#mapStatus").textContent="显示全程 · 虚线为离线备用路线"});
document.querySelector("#toggleFlightsButton").addEventListener("click",event=>{const visible=map.hasLayer(layers.flights);setFlightLayersVisible(!visible);if(visible){document.querySelector("#mapLegend").classList.remove("map-legend--flight-focus");map.fitBounds(allBounds.pad(.08));document.querySelector("#mapStatus").textContent="已隐藏航班图层 · 当前显示当地自驾路线"}else{document.querySelector("#mapLegend").classList.add("map-legend--flight-focus");map.fitBounds(flightBounds.pad(.08),getFlightFitOptions(5));document.querySelector("#mapStatus").textContent="已显示往返航班 · 航线为球面示意，不代表实时轨迹"}});
function toggleLayer(buttonId,layer){const b=document.querySelector(buttonId);b.addEventListener("click",()=>{const on=map.hasLayer(layer);on?map.removeLayer(layer):map.addLayer(layer);b.setAttribute("aria-pressed",String(!on))})}toggleLayer("#toggleRentalButton",layers.rentals);toggleLayer("#toggleLodgingButton",layers.hotels);toggleLayer("#toggleSpotsButton",layers.spots);
async function loadRoutes(){const btn=document.querySelector("#loadRoutesButton");btn.disabled=true;btn.textContent="路线加载中…";layers.route.clearLayers();let loaded=0;for(let i=0;i<days.length;i++){const coords=days[i].route.map(k=>places[k]);if(coords.length<2)continue;try{const path=coords.map(p=>`${p.lng},${p.lat}`).join(";");const res=await fetch(`https://router.project-osrm.org/route/v1/driving/${path}?overview=full&geometries=geojson&continue_straight=false`);if(!res.ok)throw new Error("route");const data=await res.json();if(!data.routes?.[0])throw new Error("empty");L.geoJSON(data.routes[0].geometry,{style:{color:colors[i],weight:5,opacity:.95}}).addTo(layers.route);loaded++}catch(e){/* dashed fallback remains visible */}}btn.disabled=false;btn.textContent="重新加载路线";document.querySelector("#mapStatus").textContent=loaded===days.length?"已加载全部驾车路线 · OSRM / OpenStreetMap":`已加载 ${loaded}/${days.length} 天；其余保留虚线备用路线`}
document.querySelector("#loadRoutesButton").addEventListener("click",loadRoutes);
