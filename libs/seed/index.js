/**
 * Run the seed, used in `npm run seed`
 */
const seed = require('../../test/seed');

seed().then(() => {
  process.exit();
});
