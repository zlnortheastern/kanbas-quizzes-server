import * as dao from "./dao.js";
export default function ModuleRoutes(app) {
  app.put("/api/modules/:mid", async (req, res) => {
    const module = await dao.updateModule(req.params.mid, req.body);
    res.json(module);
  });
  app.delete("/api/modules/:mid", async (req, res) => {
    const status = await dao.deleteModule(req.params.mid);
    res.json(status);
  });
  app.post("/api/courses/:cid/modules", async (req, res) => {
    const { cid } = req.params;
    const newModule = {
      ...req.body,
      course: cid,
    };
    const module = await dao.createModule(newModule);
    res.send(module);
  });
  app.get("/api/courses/:cid/modules", async (req, res) => {
    const modules = await dao.findModules(req.params.cid);
    res.json(modules);
  });
}
