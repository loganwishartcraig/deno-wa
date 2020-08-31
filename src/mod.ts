import {
  Application,
  Router,
  send,
  helpers,
} from "https://deno.land/x/oak/mod.ts";

import userService from "./service/user/mod.ts";
import challengeService from "./service/challenge/mod.ts";
import Config from "./config/mod.ts";

const app = new Application();
const router = new Router();

router
  .get("/", async (context) => {
    await send(context, "/", {
      root: `${Deno.cwd()}/src/views`,
      index: "index.html",
    });
  })
  .get("/api/user/:id", async (context) => {
    const { id } = helpers.getQuery(context, { mergeParams: true });
    const user = await userService.getById(id);

    if (!user) {
      context.response.status = 404;
      context.response.body = "Not Found";
    } else {
      context.response.body = `Hello - ${id}!`;
    }
  })
  .post("/api/user", async (context) => {
    const result = context.request.body({ type: "json" });
    const value = await result.value;
    const user = await userService.getById(value.user.id);

    if (user) {
      context.response.status = 401;
      context.response.body = "Already created";
    } else {
      await userService.create(value.user);
      context.response.status = 201;
    }
  })
  .post("/api/challenge/request", async (context) => {
    const result = context.request.body({ type: "form" });
    const value = await result.value;
    console.log("value", value, value.get("name"));
    const user = await userService.create(
      { name: value.get("name") as string },
    );

    console.log("Got fields", Array.from(value.entries()));

    context.response.body = {
      challenge: await challengeService.newChallenge(user.id),
      rp: {
        name: Config.companyName,
        id: Config.origin,
      },
      user: {
        displayName: user.name,
        name: user.name,
        id: user.id,
      },
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7,
        },
      ],
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "preferred",
      },
      attestation: "direct",
    };
  });

// Route can be used to send the certificate authority for installation on mobile firefox
// .get("/file/cert", async (context) => {
//   console.log("getting file!");
//   const certFile = await Deno.readFile("./resources/minica/minica.pem");

//   context.response.body = certFile;
//   context.response.headers.set("Content-Type", "application/x-x509-ca-cert");
// });

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
