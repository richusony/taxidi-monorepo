export const ROLE_REDIRECT: Record<string, string> = {
  CUSTOMER: process.env.NEXT_PUBLIC_CUSTOMER_URL!,
  PARTNER: process.env.NEXT_PUBLIC_PARTNER_URL!,
  ADMIN: process.env.NEXT_PUBLIC_ADMIN_URL!,
};