const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json()); //MidllEVear
const students = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/students.json`, {
    encoding: "utf-8",
  })
);
app.get("/api/v1/students", (req, res) => {
  if (students) {
    res.status(200).json({
      status: "Success",
      data: {
        students,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
    });
  }
});
app.get("/api/v1/students/:id", (req, res) => {
  const id = +req.params;
  const data = students.find((val) => val.id === id);
  if (data) {
    res.status(200).json({
      status: "success",
      data: {
        data: { data },
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
    });
  }
});
app.post("/api/v1/students", (req, res) => {
  const data = req.body;
  const newId = students[students.length - 1] + 1;
  const complete = Object.assign({ id: newId }, data);
  students.push(complete);
  fs.writeFile(
    `${__dirname}/dev-data/data/students.json`,
    JSON.stringify(students),
    "utf-8",
    (err) => {
      res.status(201).json({
        status: "Success",
        data: {
          students: complete,
        },
      });
    }
  );
});
app.put("/api/v1/students/:id", (req, res) => {
  const id = +req.params;
  const data = students.find((val) => val.id === id);
  if (data) {
    res.status(200).json({
      status: "success",
      data: {
        data: data.id,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
    });
  }
});
app.delete("/api/v1/students/:id", (req, res) => {
  const id = +req.params.id;
  const arr = students.filter((val) => val.id != id);
  fs.writeFile(
    `${__dirname}/dev-data/data/students.json`,
    JSON.stringify(arr),
    "utf-8",
    (err) => {
      res.status(204).json({
        status: "success",
        data: "Ochirildi",
      });
    }
  );
});
const port = 4000;
app.listen(port, "127.0.0.1");
