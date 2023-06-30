// const execa = import("execa");
const fs = import("fs");
import {execa} from 'execa';

async function run() {
  const  stdout  = await execa("echo", ["Hello, Execa!"]);
  console.log( 'ithis system : ' +  JSON.stringify(stdout));
}
run();
// const branch = await $`git branch --show-current`;
(async () => {
    // const my_repostory="mha-init-tutorial"
    // const { execa } = import('execa');
  try {
    console.log("Start ls out...");
    await execa('ls');
    console.log("Start checking out...");
    await execa("git", ["checkout", "--orphan", "mha-init-tutorial"]);
    console.log("Building...");
    await execa("npm", ["run", "build"]);
    // Understand if it's dist or build folder
    const folderName = fs.existsSync("dist") ? "dist" : "build";
    await execa("git", ["--work-tree", folderName, "add", "--all"]);
    await execa("git", ["--work-tree", folderName, "commit", "-m", "mha-init-tutorial"]);
    console.log("Pushing to gh-pages...");
    await execa("git", ["push", "origin", "HEAD:mha-init-tutorial", "--force"]);
    await execa("rm", ["-r", folderName]);
    await execa("git", ["checkout", "-f", "master"]);
    await execa("git", ["branch", "-D", "gh-pages"]);
    console.log("Successfully deployed");
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
})();