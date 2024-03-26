import { number, object, string } from "zod";

export const landSchema = object({
  body: object({
    FolioNo: number({
      required_error: "Email is required",
    })
    .int()
    .positive()
    .refine((value) => value !== 0, { message: 'FolioNo must be a positive integer.' })
    .required(),
    VolumeNo: number({
      required_error: "Password is required",
    })
    .int()
    .positive()
    .refine((value) => value !== 0, { message: 'FolioNo must be a positive integer.' })
    .required(),
  }),
});