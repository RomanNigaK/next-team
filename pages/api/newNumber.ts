import type { NextApiRequest, NextApiResponse } from "next";
const fs = require("fs");

let numbers: Array<{
  currentNumber: number;
  lastNumber: number;
  currentAverage: number;
}> = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | Array<{
        currentNumber: number;
        lastNumber: number;
        currentAverage: number;
      }>
    | {
        currentNumber: number;
        lastNumber: number;
        currentAverage: number;
      }
  >
) {
  console.log(req.body);

  if (req.method === "POST") {
    fs.readFile("./pages/api/numbers.json", function (err: any, data: any) {
      if (err) throw err;
      let numbers = JSON.parse(data);
      let currentNumber = Number(req.body);
      let currentAverage: number;
      let lastNumber: number;
      if (numbers.length === 0) {
        lastNumber = 0;
      } else {
        lastNumber = numbers[numbers.length - 1].currentNumber;
      }

      currentAverage = (lastNumber + currentNumber) / 2;
      numbers.push({
        currentNumber,
        lastNumber,
        currentAverage,
      });

      fs.writeFile(
        "./pages/api/numbers.json",
        JSON.stringify(numbers),
        function (error: any) {
          if (error) throw error; // ошибка чтения файла, если есть
          console.log("Данные успешно записаны записать файл");
          res.status(200).send({ currentNumber, lastNumber, currentAverage });
        }
      );
    });

    // numbers.push({
    //   currentNumber,
    //   lastNumber,
    //   currentAverage,
    // });
    // console.log(numbers);
    // console.log({
    //   currentNumber,
    //   lastNumber,
    //   currentAverage,
    // });
  }
  if (req.method === "GET") {
    fs.readFile("./pages/api/numbers.json", function (err: any, data: any) {
      if (err) throw err;
      let numbers = JSON.parse(data);
      res.status(200).send(numbers);
    });
  }
}
