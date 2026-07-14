import { hashAdminPassword } from "../server/lib/admin_auth";

const password = process.argv[2];

if (!password) {
  console.error('Usage: pnpm exec tsx scripts/hash-admin-password.ts "your-password"');
  process.exit(1);
}

const hash = await hashAdminPassword(password);
console.log("Add this to your environment:");
console.log(`ADMIN_PASSWORD_HASH=${hash}`);
console.log("");
console.log("After verifying login works with the hash, remove ADMIN_PASSWORD from production.");
