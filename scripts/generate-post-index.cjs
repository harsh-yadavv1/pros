const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "..", "public", "posts");
const indexPath = path.join(postsDir, "index.json");

function generateIndex() {
  const files = fs.readdirSync(postsDir);

  const slugs = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.basename(file, ".md"));

  fs.writeFileSync(indexPath, JSON.stringify(slugs, null, 2));
}

generateIndex();
