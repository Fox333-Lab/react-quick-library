import fs from "fs";
import path from "path";
import { promisify } from "util";
import { manipulateJson } from "./jsonManipulate";
import pEachSeries from "p-each-series";
const chalk = require("chalk");
var ncp = require("ncp").ncp;
const Listr = require("listr");
const execa = require("execa");

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

async function npmInstallDep(options) {
  const dest = options.targetDirectory;

  const commands = [
    {
      cmd: "npm",
      args: ["install"],
      cwd: dest,
    },
  ];

  return await pEachSeries(commands, async ({ cmd, args, cwd }) => {
    return await execa(cmd, args, { cwd });
  });
}

export async function createProject(options) {
  console.log("\nCreating Package : ");
  const tarDir = `${process.cwd()}/${options.projectName}`;
  const projectName = options.projectName;
  const author = options.author;
  const email = options.email;
  const description = options.description;
  const gitUsername = options.gitUser;
  const gitRepository = options.gitRepo;

  !fs.existsSync(`${tarDir}`) && fs.mkdirSync(`${tarDir}`, { recursive: true });

  options = {
    ...options,
    targetDirectory: options.targetDirectory || tarDir,
  };

  const packTemp = "package-template";
  const fullPathName = new URL(import.meta.url).pathname;
  const templateDir = path.resolve(
    fullPathName.substr(fullPathName.indexOf("/") + 1),
    "../../templates",
    packTemp
  );

  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: "Copy template",
      task: () => copyTemplateFiles(options),
    },
    {
      title: `Install dependencies ${chalk.grey("(may take few minutes)")}`,
      task: () => npmInstallDep(options),
      skip: () =>
        !options.runInstall
          ? "npm install to automatically install dependencies"
          : undefined,
    },
  ]);

  await tasks.run();
  var updatedPack = manipulateJson(
    projectName,
    author,
    email,
    description,
    gitUsername,
    gitRepository
  );
  const jp = path.resolve(options.targetDirectory, "package.json");

  fs.writeFileSync(jp, updatedPack);

  console.log("\n%s - Package Created", chalk.green.bold("DONE"));

  console.log(`
  Start With :

  ${chalk.rgb(255, 133, 51)("cd")} ${options.projectName}
  ${chalk.rgb(255, 133, 51)("npm run")} storybook
  `);

  return true;
}
