const spawner = require("child_process").spawn;

const dataToPassIn = "send this to python script";

console.log("Data sent to python script: ", dataToPassIn);

const pythonProcess = spawner("python3", ["python.py", dataToPassIn]);

pythonProcess.stdout.on("data", (data) => {
  console.log("Data received from python script: ", data.toString());
});
