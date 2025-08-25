import { z } from "zod";
import { credentialsBase, userCoreSchema } from "@/schemas/user";
import { toTypedSchema } from "@vee-validate/zod";

const signUpBase = userCoreSchema.merge(credentialsBase);
export const signUpSchema = signUpBase.superRefine(
  ({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  },
);

export type SignUpFormType = z.infer<typeof signUpSchema>;
export const SignUpTypedSchema = toTypedSchema(signUpSchema);
