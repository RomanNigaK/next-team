import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  author?: string;
  text?: string;
};

let message: Array<Data> = [{ author: "author", text: "text" }];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  if (req.method === "POST") {
    message.push(req.body);
    res.status(200).send({ status: "ok" });
  } else {
    res.status(200).send(message);
  }
}
