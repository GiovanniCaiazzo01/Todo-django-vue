import { z } from "zod";
import { userCoreSchema, credentialsBase } from "@/schemas/user";
import { toTypedSchema } from "@vee-validate/zod";

const email = userCoreSchema.shape.email;
const password = credentialsBase.shape.password;

export const signInSchema = z.object({
  email,
  password,
});

export type SignInFormType = z.infer<typeof signInSchema>;
export const SignInTypedSchema = toTypedSchema(signInSchema);
