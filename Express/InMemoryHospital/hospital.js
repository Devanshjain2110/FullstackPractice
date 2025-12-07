const express = require("express");
const app = express();

const users = [
  {
    name: "Devansh",
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

app.use(express.json());

app.get("/", function (req, res) {
  const userName = req.query.UserName;
  if (!userName) return;
  const user = users.filter((userVal) => {
    return (userVal.name = userName);
  });
  const userKidneys = user[0].kidneys.length;
  let userHealthyKidneys = 0;
  for (let i = 0; i < userKidneys; i++) {
    if (user[0].kidneys[i].healthy) userHealthyKidneys++;
  }
  const unHealthyKidneys = userKidneys - userHealthyKidneys;
  return res.json([userKidneys, unHealthyKidneys, userHealthyKidneys]);
});

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({ healthy: isHealthy });
  res.json("Kidney Updated");
});

// Making all kidneys healthy
app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) users[0].kidneys[i].healthy = true;
  }
  res.json({});
});

// Removing all healthy Kidneys
app.delete("/", function (req, res) {
  const newKidneys = [];
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) newKidneys.push({ healthy: true });
  }
  users[0].kidneys = newKidneys;
  res.json({ msg: "done" });
});

app.listen(3000);
