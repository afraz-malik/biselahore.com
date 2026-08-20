import { hashPassword } from "@/lib/cms/auth/password";

const password = process.argv[2];

if (!password) {
  console.error("Usage: npm run cms:hash-password -- \"your-password\"");
  process.exit(1);
}

console.log(hashPassword(password));
