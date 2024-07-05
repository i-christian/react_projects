import http from 'http';
import express, { Router } from 'express';
import { HttpError, prisma, config as config$1 } from 'wasp/server';
import auth from 'wasp/core/auth';
import { deserialize, serialize } from 'superjson';
import { handleRejection } from 'wasp/server/utils';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import { throwInvalidCredentialsError, createProviderId, findAuthIdentity, deserializeAndSanitizeProviderData, findAuthWithUserBy, validateAndGetUserFields, sanitizeAndSerializeProviderData, createUser, rethrowPossibleAuthError } from 'wasp/auth/utils';
import { invalidateSession, createSession } from 'wasp/auth/session';
import { verifyPassword } from 'wasp/auth/password';
import { ensureValidUsername, ensurePasswordIsPresent, ensureValidPassword } from 'wasp/auth/validation';
import { webcrypto } from 'node:crypto';

function createOperation(handlerFn) {
  return handleRejection(async (req, res) => {
    const args = req.body && deserialize(req.body) || {};
    const context = {
      user: req.user
    };
    const result = await handlerFn(args, context);
    const serializedResult = serialize(result);
    res.json(serializedResult);
  });
}
function createQuery(handlerFn) {
  return createOperation(handlerFn);
}
function createAction(handlerFn) {
  return createOperation(handlerFn);
}

const createTask$2 = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.Task.create({
    data: {
      description: args.description,
      user: { connect: { id: context.user.id } }
    }
  });
};
const updateTask$2 = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.Task.updateMany({
    where: { id: args.id, user: { id: context.user.id } },
    data: { isDone: args.isDone }
  });
};

async function createTask$1(args, context) {
  return createTask$2(args, {
    ...context,
    entities: {
      Task: prisma.task
    }
  });
}

var createTask = createAction(createTask$1);

async function updateTask$1(args, context) {
  return updateTask$2(args, {
    ...context,
    entities: {
      Task: prisma.task
    }
  });
}

var updateTask = createAction(updateTask$1);

const getTasks$2 = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.Task.findMany({
    where: { user: { id: context.user.id } },
    orderBy: { id: "asc" }
  });
};

async function getTasks$1(args, context) {
  return getTasks$2(args, {
    ...context,
    entities: {
      Task: prisma.task
    }
  });
}

var getTasks = createQuery(getTasks$1);

const router$3 = express.Router();
router$3.post("/create-task", auth, createTask);
router$3.post("/update-task", auth, updateTask);
router$3.post("/get-tasks", auth, getTasks);

const _waspGlobalMiddlewareConfigFn = (mc) => mc;
const defaultGlobalMiddlewareConfig = /* @__PURE__ */ new Map([
  ["helmet", helmet()],
  ["cors", cors({ origin: config$1.allowedCORSOrigins })],
  ["logger", logger("dev")],
  ["express.json", express.json()],
  ["express.urlencoded", express.urlencoded({ extended: false })],
  ["cookieParser", cookieParser()]
]);
const globalMiddlewareConfig = _waspGlobalMiddlewareConfigFn(defaultGlobalMiddlewareConfig);
function globalMiddlewareConfigForExpress(middlewareConfigFn) {
  {
    return Array.from(globalMiddlewareConfig.values());
  }
}

var me = handleRejection(async (req, res) => {
  if (req.user) {
    return res.json(serialize(req.user));
  } else {
    throwInvalidCredentialsError();
  }
});

var logout = handleRejection(async (req, res) => {
  if (req.sessionId) {
    await invalidateSession(req.sessionId);
    return res.json({ success: true });
  } else {
    throwInvalidCredentialsError();
  }
});

var login = handleRejection(async (req, res) => {
  const fields = req.body ?? {};
  ensureValidArgs$1(fields);
  const providerId = createProviderId("username", fields.username);
  const authIdentity = await findAuthIdentity(providerId);
  if (!authIdentity) {
    throwInvalidCredentialsError();
  }
  try {
    const providerData = deserializeAndSanitizeProviderData(authIdentity.providerData);
    await verifyPassword(providerData.hashedPassword, fields.password);
  } catch (e) {
    throwInvalidCredentialsError();
  }
  const auth = await findAuthWithUserBy({
    id: authIdentity.authId
  });
  const session = await createSession(auth.id);
  return res.json({
    sessionId: session.id
  });
});
function ensureValidArgs$1(args) {
  ensureValidUsername(args);
  ensurePasswordIsPresent(args);
}

function getSignupRoute({
  userSignupFields
}) {
  return handleRejection(async function signup(req, res) {
    const fields = req.body ?? {};
    ensureValidArgs(fields);
    const userFields = await validateAndGetUserFields(
      fields,
      userSignupFields
    );
    const providerId = createProviderId("username", fields.username);
    const providerData = await sanitizeAndSerializeProviderData({
      hashedPassword: fields.password
    });
    try {
      await createUser(
        providerId,
        providerData,
        // Using any here because we want to avoid TypeScript errors and
        // rely on Prisma to validate the data.
        userFields
      );
    } catch (e) {
      rethrowPossibleAuthError(e);
    }
    return res.json({ success: true });
  });
}
function ensureValidArgs(args) {
  ensureValidUsername(args);
  ensurePasswordIsPresent(args);
  ensureValidPassword(args);
}

const _waspUserSignupFields = void 0;
const config = {
  id: "username",
  displayName: "Username and password",
  createRouter() {
    const router = Router();
    router.post("/login", login);
    const signupRoute = getSignupRoute({
      userSignupFields: _waspUserSignupFields
    });
    router.post("/signup", signupRoute);
    return router;
  }
};

const providers = [
  config
];
const router$2 = Router();
for (const provider of providers) {
  const { createRouter } = provider;
  const providerRouter = createRouter(provider);
  router$2.use(`/${provider.id}`, providerRouter);
  console.log(`\u{1F680} "${provider.displayName}" auth initialized`);
}

const router$1 = express.Router();
router$1.get("/me", auth, me);
router$1.post("/logout", auth, logout);
router$1.use("/", router$2);

const router = express.Router();
const middleware = globalMiddlewareConfigForExpress();
router.get("/", middleware, function(_req, res, _next) {
  res.json("Hello world");
});
router.use("/auth", middleware, router$1);
router.use("/operations", middleware, router$3);

const app = express();
app.use("/", router);
app.use((err, _req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message, data: err.data });
  }
  return next(err);
});

if (typeof globalThis.crypto === "undefined") {
  globalThis.crypto = webcrypto;
}

const startServer = async () => {
  const port = normalizePort(config$1.port);
  app.set("port", port);
  const server = http.createServer(app);
  server.listen(port);
  server.on("error", (error) => {
    if (error.syscall !== "listen") throw error;
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
      default:
        throw error;
    }
  });
  server.on("listening", () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Server listening on " + bind);
  });
};
startServer().catch((e) => console.error(e));
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}
//# sourceMappingURL=server.js.map
