const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const data = await fsPromises.readFile(filePath, "utf8");
    response.writeHead(200, { "Content-Type": contentType });
    response.end(data);
  } catch (err) {
    console.error(err);
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(__dirname, req.url, req.method);

  let extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "public", "pages", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "public", "pages", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "public", "pages", req.url)
      : contentType === "text/css"
      ? path.join(__dirname, "..", "dist", "output.css")
      : contentType === "text/javascript"
      ? path.join(__dirname, "public", "JS-pages", req.url)
      : path.join(__dirname, req.url);

  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    serveFile(filePath, contentType, res);
    console.log(filePath);
  } else {
    serveFile(
      path.join(__dirname, "public", "pages", "404.html"),
      "text/html",
      res
    );
    console.log(`file path doesnt exist ${filePath}`);
  }
});

server.listen(PORT, () => {
  console.log(`listening on port${PORT}`);
});
