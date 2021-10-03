import jsonData from "../datas/package.json";

export function manipulateJson(
  projectName,
  author,
  email,
  description,
  name,
  repo
) {
  name = name === "" ? "YOUR_GITHUB_USERNAME" : name;
  repo = repo === "" ? "YOUR_GITHUB_REPO" : repo;
  email = email === "" ? "YOUR_EMAIL@DOMAIN.COM" : email;
  author = author === "" ? "AUTHOR_NAME" : author;
  jsonData.name = projectName;
  jsonData.description = description;
  jsonData.homepage = `https://github.com/${name}/${repo}`;
  jsonData.bugs.url = `https://github.com/${name}/${repo}/issues`;
  jsonData.bugs.email = email;
  jsonData.repository.url = `https://github.com/${name}/${repo}.git`;
  jsonData.author = author;

  var updatePackJson = JSON.stringify(jsonData, undefined, 4);

  return updatePackJson;
}
