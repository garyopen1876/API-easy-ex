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

  let browser_name = "";
  if (user_agent.indexOf("Edge") > -1) browser_name = "Edge";
  else if (user_agent.indexOf("Edg/") > -1) browser_name = "Edge(Chromium)";
  else if (user_agent.indexOf("Opr") > -1) browser_name = "Opera";
  else if (user_agent.indexOf("Chrome") > -1) browser_name = "Chrome";
  else if (user_agent.indexOf("Trident") > -1) browser_name = "IE";
  else if (user_agent.indexOf("Firefox") > -1) browser_name = "Firefox";
  else if (user_agent.indexOf("Safari") > -1) browser_name = "Safari";
  else browser_name = "不知道的瀏覽器";

  let OS_name = "";
  if (user_agent.indexOf("Win") > -1) OS_name = "Windows";
  else if (user_agent.indexOf("Mac") > -1) OS_name = "MacOS";
  else if (user_agent.indexOf("X11") > -1) OS_name = "UNIX";
  else if (user_agent.indexOf("Linux") > -1) OS_name = "Linux";
  else OS_name = "不知道的作業系統";

  return res.status(200).json({
    ip: ip,
    user_agent: user_agent,
    browser: browser_name,
    OS: OS_name,
    message:
      "哈哈哈 你是使用" + browser_name + " 瀏覽器, 作業系統則是 " + OS_name,
  });
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
