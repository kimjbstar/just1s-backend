import { IScaffoldInput } from "./utils/constants";
import { scaffold } from "./utils/scaffold";
import * as fs from "fs";

if (process.argv.length != 3) {
  console.log("usage : npm run scaffold -- <file>");
  process.exit();
}
const definitionPath = process.argv[2];

if (fs.existsSync(definitionPath) == false) {
  console.log("file not exists");
  process.exit();
}
if (definitionPath.endsWith(".json") === false) {
  console.log("not json");
  process.exit();
}
const inputJson = fs.readFileSync(definitionPath).toString();
const input: IScaffoldInput = JSON.parse(inputJson);
scaffold(input);
console.log("DONE!");
