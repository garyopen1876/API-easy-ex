const express = require("express");
const cors = require("cors");

// server
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.static(__dirname + "/public"));

//router
server.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"];
  const user_agent = req.headers["user-agent"];

  let browser_name = "不知道的瀏覽器";
  if (user_agent.indexOf("Edge") > -1) browser_name = "Edge";
  else if (user_agent.indexOf("Edg/") > -1) browser_name = "Edge(Chromium)";
  else if (user_agent.indexOf("Opr") > -1) browser_name = "Opera";
  else if (user_agent.indexOf("BRAVE") > -1 || user_agent.indexOf("Brave") > -1)
    browser_name = "Brave";
  else if (user_agent.indexOf("Chrome") > -1) browser_name = "Chrome";
  else if (user_agent.indexOf("Trident") > -1) browser_name = "IE";
  else if (user_agent.indexOf("Firefox") > -1) browser_name = "Firefox";
  else if (user_agent.indexOf("Safari") > -1) browser_name = "Safari";

  let device = "PC";
  let OS_name = "不知道的作業系統";
  if (user_agent.indexOf("Win") > -1) OS_name = "Windows";
  else if (
    user_agent.indexOf("Iphone") > -1 ||
    user_agent.indexOf("iPhone") > -1
  )
    (OS_name = "iOS"), (device = "手機");
  else if (user_agent.indexOf("Android") > -1)
    (OS_name = "Android"), (device = "手機");
  else if (user_agent.indexOf("Mac") > -1) OS_name = "MacOS";
  else if (user_agent.indexOf("X11") > -1) OS_name = "UNIX";
  else if (user_agent.indexOf("Linux") > -1) OS_name = "Linux";

  return res.status(200).json({
    ip: ip,
    user_agent: user_agent,
    device: device,
    browser: browser_name,
    OS: OS_name,
    message:
      "你正在使用 " +
      device +
      " 的 " +
      browser_name +
      " 瀏覽器, 作業系統則是 " +
      OS_name,
  });
});

server.get("/message", (req, res) => {
  const data = [
    {
      title: "RJ世紀演唱會即將開幕，開唱經典歌曲《我的正規表達式》。",
      date: "2022-05-27",
    },
    {
      title: "不寫.env引發資安大危機，賠了客戶500萬。",
      date: "2022-05-28",
    },
    {
      title: "感恩Rosa含辛茹苦打理MONO的大小事，大聲說感謝！",
      date: "2022-06-02",
    },
    {
      title: "我看3遍都不信，Minci的面試秘訣，十家公司上十五家，真的把大家都嚇傻了！",
      date: "2022-06-10",
    },
    {
      title: "Bohan參加黑客大會，透露為了維持實力，每天都要Coding 8小時。",
      date: "2022-06-11",
    },
    {
      title: "「低督低督」絕無僅有的超自然現象，Kyle的神奇摩斯密碼，一聽就讓我充滿希望。",
      date: "2022-07-01",
    },
    {
      title: "Luca教我Git的28種冷門知識，我靠它們上了哈佛資工系！",
      date: "2022-07-05",
    },
    {
      title: "Mei的UI設計學，整整流傳了2個世紀，聽完會讓你大喊WOW！",
      date: "2022-07-05",
    },
    {
      title: "天神降臨！Tilda帶著電梯感應磁扣下凡，解救眾生。",
      date: "2022-07-08",
    },
    {
      title: "我怎麼沒有早點聽到Peter的MQTT課程，學完直接打通我的Coding任督二脈。",
      date: "2022-07-11",
    },
    {
      title: "Mindy的React教學，竟成為全人類的存亡關鍵，Day1真的很實用。",
      date: "2022-07-11",
    },
    {
      title: "驚！《React》分享會失控，Gary教太爛被當眾暴打。",
      date: "2022-07-12",
    },
    {
      title: "讓專家跌破眼鏡，Joe的Tailwind課程，我忍不住一直聽下去...",
      date: "2022-07-13",
    },
    {
      title: "Vue大神《Jane》來臨，學員興奮過度不知所措！有圖有真相！",
      date: "2022-07-13",
    },
  ];
  return res.status(200).json({ data: data });
});
//port
const PORT = process.env.PORT || 3000;

server.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is running on port ${PORT}.`);
});
