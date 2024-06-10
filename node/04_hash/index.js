console.log("OK");

const fs = require("fs");
const crypto = require("crypto");
const path = require("path");
const download = require("download");

if (!process.argv[2]) {
  console.error("Не указан путь к файлу");
  process.exit();
}

if (process.argv[2].includes("http://") || process.argv[2].includes("https://")) {
  const file = path.resolve(__dirname, process.argv[2].slice(process.argv[2].lastIndexOf("/") + 1));
  const fileSha = path.resolve(__dirname, process.argv[2].slice(process.argv[2].lastIndexOf("/") + 1) + ".sha256");

  (async () => {
    try {
      fs.writeFileSync(file, await download(process.argv[2].trim()));
    } catch {
      console.error("Не удалось скачать файл");
      process.exit(100);
    }
    try {
      fs.writeFileSync(fileSha, await download(process.argv[2].trim() + ".sha256"));
    } catch {
      console.error("Не удалось скачать Хеш-файл");
      fs.unlinkSync(file);
      process.exit(101);
    }

    fileComparison(file, fileSha, true);
  })();
} else {
  fileComparison(path.resolve(__dirname, process.argv[2]), path.resolve(__dirname, process.argv[2]) + ".sha256", false);
}

function fileComparison(file, fileSha, flag) {
  const isTextFile = /\.(txt|html|md)?$/.test(file.toLocaleLowerCase()) || !/\./.test(file);

  fs.access(file, fs.constants.R_OK, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.error("Файл не найден или нет доступа на чтение");
        process.exit(100);
      }
    } else {
      fs.access(fileSha, fs.constants.R_OK, (err) => {
        if (err) {
          console.error("Не найдень файл с Хеш-суммой или нет доступа на чтение");
          if (flag) fs.unlinkSync(file);
          process.exit(101);
        } else {
          const fileContent = isTextFile
            ? fs.readFileSync(file).toString("utf-8").replace(/\r\n/g, "\n")
            : fs.readFileSync(file);

          const hash = crypto.createHash("sha256").update(fileContent);
          if (hash.digest("hex") === fs.readFileSync(fileSha, "utf-8").trim()) {
            console.log("Файл успешно прошёл проверку");
            if (flag) {
              fs.unlinkSync(file);
              fs.unlinkSync(fileSha);
            }
          } else {
            console.error("Файл не прошел проверку");
            if (flag) {
              fs.unlinkSync(file);
              fs.unlinkSync(fileSha);
            }
            process.exit(102);
          }
        }
      });
    }
  });
}
