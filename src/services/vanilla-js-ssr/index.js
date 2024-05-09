import * as fs from "fs";
import express from "express";
// import fetch from "node-fetch";
import { createRequire } from "module";
import serverless from "serverless-http";
import dotenv from "dotenv";

dotenv.config();

// Variables
let base = process.env.BASE || "/";
let port = process.env.PORT || 3000;
let BUCKET_URL = process.env.BUCKET_URL;
// let BUCKET_URL = "https://bronifty-test-bucket-123.s3.us-east-1.amazonaws.com";
let templateHtml, ssrManifest, serverEntry;

async function loadRemoteModule(url, fileName) {
  const response = await fetch(url);
  const responseText = await response.text();
  fs.writeFileSync(fileName, responseText);
  return fs.readFileSync(fileName, "utf-8");
}
(async () => {
  // Cached production assets
  templateHtml = await loadRemoteModule(
    `${BUCKET_URL}/dist/client/index.html`,
    "./index.html"
  );
  ssrManifest = await loadRemoteModule(
    `${BUCKET_URL}/dist/client/.vite/ssr-manifest.json`,
    "./ssr-manifest.json"
  );
  serverEntry = await loadRemoteModule(
    `${BUCKET_URL}/dist/server/entry-server.js`,
    "./entry-server.js"
  );
})();

// Create http server
const app = express();
// Serve HTML
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;

    template = templateHtml;
    render = (await import(`./entry-server.js`)).render;
    // render = (await import(`${serverEntry}`)).render;

    const rendered = await render(url, ssrManifest);

    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? "")
      .replace(`<!--app-html-->`, rendered.html ?? "");

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export const handler = serverless(app);
