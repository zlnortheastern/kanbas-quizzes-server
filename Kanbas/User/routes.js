import db from "../Database/index.js";
export default function UserRoutes(app) {
  app.put("/api/users/update/:uid", (req, res) => {
    const { uid } = req.params;
    const userIndex = db.users.findIndex((u) => u._id === uid);
    db.users[userIndex] = {
      ...db.users[userIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });
  app.post("/api/users", (req, res) => {
    const newUser = {
      ...req.body,
      _id: new Date().getTime().toString(),
    };
    const userExist = db.users.find((u) => u.username === newUser.username);
    if (userExist) {
      console.log(userExist);
      return res.status(400).send({ error: "User already exists!" });
    }
    db.users.push(newUser);
    res.send(newUser);
  });
  app.get("/api/users/get/:uid", (req, res) => {
    const { uid } = req.params;
    const user = db.users.filter((u) => u._id === uid);
    res.send(user);
  });
  app.get("/api/users/auth/:username/:password", (req, res) => {
    const { username, password } = req.params;
    const user = db.users.filter((u) => u.username === username);
    if (user.length === 0) {
      return res.status(400).send({ error: "User does not exist!" });
    } else if (user[0].password != password) {
      return res.status(400).send({ error: "Password is not correct!" });
    }
    res.json(user);
  });
}
