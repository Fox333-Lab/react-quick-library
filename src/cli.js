import { createProject } from "./main";
import manifestJson from "../package.json";
const arg = require("arg");
var inquirer = require("inquirer");

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      // "--git": Boolean,
      "--yes": Boolean,
      // "-g": "--git",
      "-y": "--yes",
      // "-i": "--install",
      "--help": Boolean,
      "-h": "--help",
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  return {
    skipPrompts: args["--yes"] || false,
    // git: args["--git"] || false,
    help: args["--help"] || false,
    projectName: args._[0],
    description: "",
    author: "",
    email: "",
    gitUser: "",
    gitRepo: "",
    runInstall: true,
  };
}

async function promptForMissingOptions(options) {
  const defaultProjectName = "My-Package";
  const defaultDescription =
    "A simple react library package using react-quick-library";

  console.log(`
  RQL v${manifestJson.version}
  `);

  if (options.help) {
    console.log(`
    Usage:

    react-quick-library                    This will prompt for few details that needs to be entered
    or
    react-quick-library [project name]     Prompts for details excluding project name
    
    Options:
    
    -y, --yes     Skips prompt and proceeds with default values
    -h, --help    Displays usage and other information
    
    `);

    process.exit(0);
  }

  if (options.skipPrompts) {
    return {
      ...options,
      projectName: options.projectName || defaultProjectName,
      description: options.description || defaultDescription,
      author: options.author || "",
      email: options.email || "",
      gitUser: options.gitUser || "",
      gitRepo: options.gitRepo || "",
    };
  }

  // if (!options.git) {
  //   questions.push({
  //     type: "confirm",
  //     name: "git",
  //     message: "Initialize a git repository?",
  //     default: false,
  //   });
  // }

  const questions = [];

  if (!options.projectName) {
    questions.push({
      type: "input",
      name: "projectName",
      message: "Package Name : ",
      default: defaultProjectName,
    });
  }

  if (!options.description) {
    questions.push({
      type: "input",
      name: "description",
      message: "Package Description : ",
      default: defaultDescription,
    });
  }

  if (!options.author) {
    questions.push({
      type: "input",
      name: "author",
      message: "Author Name : ",
      // default: "",
    });
  }

  if (!options.email) {
    questions.push({
      type: "input",
      name: "email",
      message: "Email ID : ",
      // default: "",
    });
  }

  if (!options.gitUser) {
    questions.push({
      type: "input",
      name: "gitUser",
      message: "GitHub Handle : ",
      // default: "",
    });
  }

  if (!options.gitRepo) {
    questions.push({
      type: "input",
      name: "gitRepo",
      message: "GitHub Repo : ",
      // default: "",
    });
  }

  //console.log("\n");
  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    projectName: options.projectName || answers.projectName,
    // git: options.git || answers.git,
    description: options.description || answers.description,
    author: options.author || answers.author,
    email: options.email || answers.email,
    gitUser: options.gitUser || answers.gitUser,
    gitRepo: options.gitRepo || answers.gitRepo,
    runInstall: true,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options);
}
