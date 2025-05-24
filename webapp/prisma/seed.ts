import prisma from './prisma';

async function main() {
  // Upsert inventory metadata for welcome chest and key
  await prisma.inventoryMetadata.upsert({
    where: { type: 'WELCOME_CHEST' },
    update: {},
    create: {
      type: 'WELCOME_CHEST',
      name: 'Welcome Chest',
      metadata: { description: 'A welcome chest for connecting Futurepass' },
    },
  });

  await prisma.inventoryMetadata.upsert({
    where: { type: 'KEY' },
    update: {},
    create: {
      type: 'KEY',
      name: 'Aura Key',
      metadata: { description: 'A key to open chest' },
    },
  });

  // Optionally add more items here
}

main()
  .then(() => {
    console.log('Seed completed');
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }); 