import { toTypedSchema } from "@vee-validate/zod";
import { credentialsBase, userCoreSchemaOptional } from "@/schemas/user";
import { z } from "zod";

export const profileGeneralsSchema = userCoreSchemaOptional;
export const profilePasswordSchema = credentialsBase;

export type ProfileGeneralsValues = z.infer<typeof profileGeneralsSchema>;
export const ProfileGeneralsTypedSchema = toTypedSchema(profileGeneralsSchema);
