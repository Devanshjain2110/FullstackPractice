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

function UnhealthyKidneyCheck() {
  let isUnhealthy = false;

  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) isUnhealthy = true;
  }
  return isUnhealthy;
}
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
  return res.json({
    TotalKidneys: userKidneys,
    TotalUnhealthyKidneys: unHealthyKidneys,
    TotalHealthyKidneys: userHealthyKidneys,
  });
});

app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({ healthy: isHealthy });
  res.json("Kidney Updated");
});

// Making all kidneys healthy
app.put("/", function (req, res) {
  if (UnhealthyKidneyCheck()) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (!users[0].kidneys[i].healthy) users[0].kidneys[i].healthy = true;
    }
    res.json({});
  } else {
    res.status(411).json({ msg: " You have no kidneys" });
  }
});

// Removing all healthy Kidneys
app.delete("/", function (req, res) {
  if (UnhealthyKidneyCheck()) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) newKidneys.push({ healthy: true });
    }
    users[0].kidneys = newKidneys;
    res.json({ msg: "done" });
  } else {
    res.status(411).json({
      msg: "You have no kidneys",
    });
  }
});

app.listen(3000);
