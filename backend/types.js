const zod = require("zod");

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateSchema = zod
  .object({
    lastName: zod.string().optional(),
    password: zod.string().optional(),
    firstName: zod.string().optional(),
  })
  .strict();

module.exports = { signupSchema, signinSchema, updateSchema };
