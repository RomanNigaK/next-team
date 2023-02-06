import type { NextApiRequest, NextApiResponse } from "next";
const path = require("path");
const fs = require("fs");

// Read users.json file

type Data = {
  author?: string;
  text?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    fs.readFile("./pages/api/messages.json", function (err: any, data: any) {
      if (err) throw err;
      let msg = JSON.parse(data);
      msg.push(req.body);

      fs.writeFile(
        "./pages/api/messages.json",
        JSON.stringify(msg),
        function (error: any) {
          if (error) throw error; // ошибка чтения файла, если есть
          console.log("Данные успешно записаны записать файл");
        }
      );
    });
    res.status(200).send({ status: "ok" });
  } else {
    let msg;
    fs.readFile("./pages/api/messages.json", function (err: any, data: any) {
      if (err) throw err;
      msg = JSON.parse(data);
      res.status(200).send(msg);
    });
  }
}
