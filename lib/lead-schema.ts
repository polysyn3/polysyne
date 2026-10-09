import { z } from "zod";

export const inquiryTypes = [
  "Opero Early Access",
  "Business Inquiry",
  "Partnership",
  "General Inquiry",
] as const;
export const industryOptions = [
  "Professional services",
  "Appointment-based business",
  "Agency or consulting",
  "Local service provider",
  "Growing SME",
  "Other",
] as const;
export const sizeOptions = [
  "Just me",
  "2–10 people",
  "11–50 people",
  "51–200 people",
  "201+ people",
] as const;

export const leadSchema = z
  .object({
    kind: z.enum(["contact", "early-access"]),
    name: z
      .string()
      .trim()
      .min(2, "Enter your full name (at least 2 characters).")
      .max(100, "Use 100 characters or fewer."),
    email: z.email("Enter a valid email address.").max(254),
    company: z.string().trim().max(150, "Use 150 characters or fewer."),
    inquiryType: z.enum(["", ...inquiryTypes]),
    industry: z.enum(["", ...industryOptions]),
    size: z.enum(["", ...sizeOptions]),
    message: z
      .string()
      .trim()
      .min(10, "Tell us a little more (at least 10 characters).")
      .max(3000, "Use 3,000 characters or fewer."),
    contactPreference: z.enum(["", "Email", "Discuss later"]),
    consent: z
      .boolean()
      .refine(
        (value) => value,
        "Please agree to be contacted about your inquiry.",
      ),
    website: z.string().max(0, "Unable to submit this request."),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.kind === "contact" && !data.inquiryType)
      ctx.addIssue({
        code: "custom",
        path: ["inquiryType"],
        message: "Choose an inquiry type.",
      });
    if (data.kind === "early-access") {
      if (data.company.length < 2)
        ctx.addIssue({
          code: "custom",
          path: ["company"],
          message: "Enter your business name.",
        });
      if (!data.industry)
        ctx.addIssue({
          code: "custom",
          path: ["industry"],
          message: "Choose your industry.",
        });
      if (!data.size)
        ctx.addIssue({
          code: "custom",
          path: ["size"],
          message: "Choose your business size.",
        });
    }
  });
export type LeadInput = z.infer<typeof leadSchema>;
