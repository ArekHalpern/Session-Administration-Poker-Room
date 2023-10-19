'use strict';

const {
  db,
  models: { User, Player, Table, Seat, Waitlist, Session },
} = require('../server/db');

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'admin', password: '123' }),
  ]);

  // Creating Players
  const players = await Promise.all([
    Player.create({ name: 'John Doe' }),
    Player.create({ name: 'Jane Smith' }),
    // ... more players as needed
  ]);

  // Creating Tables
  const tables = await Promise.all([
    Table.create({ number: '1' }),  // Updated 'name' to 'number'
    Table.create({ number: '2' }),  // Updated 'name' to 'number'
    // ... more tables as needed
  ]);

  // Creating Waitlist entries
  const waitlistEntries = await Promise.all([
    Waitlist.create({ playerId: players[0].id, tableId: tables[0].id, notes: 'Prefers window seat' }),
    Waitlist.create({ playerId: players[1].id, tableId: tables[1].id, notes: 'Allergic to nuts' }),
    // ... more waitlist entries as needed
  ]);

  // Creating Sessions
  const sessions = await Promise.all([
    Session.create({ playerId: players[0].id, tableId: tables[0].id }),
    Session.create({ playerId: players[1].id, tableId: tables[0].id }),
    // ... more sessions as needed
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${players.length} players`);
  console.log(`seeded ${tables.length} tables`);
  console.log(`seeded ${waitlistEntries.length} waitlist entries`);
  console.log(`seeded ${sessions.length} sessions`);
  console.log('seeded successfully');

  return {
    users: {
      admin: users[0],
    },
    players,
    tables,
    waitlistEntries,
    sessions
  };
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
