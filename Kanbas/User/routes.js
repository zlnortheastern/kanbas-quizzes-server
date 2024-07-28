import * as dao from "./dao.js";
export default function UserRoutes(app) {
  app.put("/api/users/update/:uid", async (req, res) => {
    const status = await dao.updateUser(req.params.uid, req.body);
    res.json(status);
  });
  app.post("/api/users/signup", async (req, res) => {
    const userExist = await dao.findUserByUsername(req.body.username);
    if (userExist) {
      return res.status(400).send({ error: "User already exists!" });
    }
    const newUser = dao.createUser(req.body);
    res.send(newUser);
  });
  app.get("/api/users/get/:uid", async (req, res) => {
    const user = await dao.findUserById(req.params.uid);
    res.json(user);
  });

  app.post("/api/users/signin", async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (!user) {
      return res.status(400).send({ error: "User does not exist!" });
    } else if (user.password != password) {
      return res.status(400).send({ error: "Password is not correct!" });
    }
    req.session["currentUser"] = user;
    res.json(user);
  });

  app.get("/api/users", async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
  });

  app.get("/api/users/:userId", async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  });
}
