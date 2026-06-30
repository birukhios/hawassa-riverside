import { z } from "zod";

export const donationFormSchema = z.object({
  amount: z.number().min(50, "Amount must be at least ETB 50"),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional().or(z.literal("")),
  donorPhone: z.string().optional(),
  message: z.string().optional(),
  isAnonymous: z.boolean().default(false).optional(),
  currency: z.string().default("ETB").optional(),
});

export type DonationFormData = z.infer<typeof donationFormSchema>;

export const validateDonationForm = (data: unknown) => {
  try {
    return donationFormSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Invalid form data" };
  }
};
