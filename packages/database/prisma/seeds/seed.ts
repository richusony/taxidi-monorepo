import { seedUsers } from "./user.seed";
import { seedVehicles } from "./vehicle.seed";

async function main() {
  await seedUsers();
  await seedVehicles();
}

main()
  .then(() => {
    console.log("✅ All seeds done");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });