import { readFile } from "node:fs/promises";
import path from "node:path";

import { prisma } from "../src/index.js";

interface SeedDocument {
  id: number;
  header: string;
  type: string;
  status: string;
  target: string;
  limit: string;
  reviewer: string;
}

const SEED_USER_ID = "seed-user";

async function main() {
  const json = await readFile(
    path.resolve(
      import.meta.dirname,
      "../../../apps/api/src/features/dashboard/data/documents.json",
    ),
    "utf-8",
  );
  const documents = JSON.parse(json) as SeedDocument[];

  const result = await prisma.document.createMany({
    data: documents.map(({ id: _id, ...doc }) => ({
      ...doc,
      userId: SEED_USER_ID,
    })),
    skipDuplicates: true,
  });

  console.log(`Seeded ${String(result.count)} documents`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
