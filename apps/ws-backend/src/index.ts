import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", function connection(ws, request) {
  ws.on("error", console.error);
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParam = new URLSearchParams(url.split("?")[1]);

  const token = queryParam.get("token") || "";

  const decode = jwt.verify(token, JWT_SECRET);

  if (typeof decode === "string") {
    ws.close();
    return;
  }
  if (!decode || !decode.userId) {
    ws.close();
    return;
  }

  ws.on("message", function message(data) {
    ws.send("pong");
  });
});
