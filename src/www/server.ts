import app from "../mod.ts";

app.listen({
  secure: true,
  port: 8000,
  certFile: "./resources/deno-wa.labs/cert.pem",
  keyFile: "./resources/deno-wa.labs/key.pem",
  hostname: "0.0.0.0",
});
