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
  let browserName = "";
  if (user_agent.match(/chrome|chromium|crios/i)) {
    browserName = "chrome";
  } else if (user_agent.match(/firefox|fxios/i)) {
    browserName = "firefox";
  } else if (user_agent.match(/safari/i)) {
    browserName = "safari";
  } else if (user_agent.match(/opr\//i)) {
    browserName = "opera";
  } else if (user_agent.match(/edg/i)) {
    browserName = "edge";
  } else {
    browserName = "No browser detection";
  }
  console.log(browserName);
  return res
    .status(200)
    .json({
      ip: ip,
      user_agent: user_agent,
      message: "哈哈哈 你是使用" + browserName + "瀏覽器",
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
