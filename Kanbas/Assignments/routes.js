import * as dao from "./dao.js";
export default function AssignmentRoutes(app) {
  app.put("/api/assignments/:aid", async (req, res) => {
    const assignment = await dao.updateAssignment(req.params.aid, req.body);
    res.json(assignment);
  });
  app.delete("/api/assignments/:aid", async (req, res) => {
    const status = await dao.deleteAssignment(req.params.aid);
    res.json(status);
  });
  app.post("/api/courses/:cid/assignments", async (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
    };
    const assignment = await dao.createAssignment(newAssignment);
    res.send(assignment);
  });
  app.get("/api/courses/:cid/assignments", async (req, res) => {
    const assignments = await dao.findAssignments(req.params.cid);
    res.json(assignments);
  });
}
