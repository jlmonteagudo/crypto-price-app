const fs = require("fs-extra");
const concat = require("concat");

const DIST_DIR = "./dist/crypto-price";
const WEB_COMPONENTS_DIR = `${DIST_DIR}/web-components`;

(async function () {
  const jsFiles = fs
    .readdirSync(DIST_DIR)
    .filter((file) => file.match("js"))
    .map((file) => `${DIST_DIR}/${file}`);

  console.log("Starting concat script");

  const exists = fs.existsSync(WEB_COMPONENTS_DIR);

  if (exists) {
    console.log("Removing existing web components folder");
    fs.removeSync(WEB_COMPONENTS_DIR);
  }

  await fs.ensureDirSync(WEB_COMPONENTS_DIR);
  console.log("Created new web components folder");

  await concat(jsFiles, `${WEB_COMPONENTS_DIR}/crypto-price.js`);
  console.log("Concat files into a single file");

  const cssFiles = fs
    .readdirSync(DIST_DIR)
    .filter((file) => file.match("css"))
    .map((file) => `${DIST_DIR}/${file}`);

  await fs.copyFile(cssFiles[0], `${WEB_COMPONENTS_DIR}/crypto-price.css`);
  console.log("Copying styles");
})();
