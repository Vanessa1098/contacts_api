require('dotenv/config');

const AWS = require('aws-sdk');
const { DynamoDB } = AWS;
const { DocumentClient } = DynamoDB;

const { ContactSeeder } = require('./contact.seeder');
const contactsData = require('./contacts-test-data.json');
const { CONTACTS_TABLE } = process.env;

const dynamo = new DynamoDB({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const doclient = new DocumentClient({ service: dynamo });
const contactSeeder = new ContactSeeder(dynamo, doclient, CONTACTS_TABLE);

const log = (...mgs) => console.log('>>', ...mgs);

const seedContacts = async () => {
  log(`Checking if 'contacts' table exists`);

  const exists = await contactSeeder.hasTable();

  if (exists) {
    log(`Table 'contacts' exists, deleting`);
    await contactSeeder.deleteTable();
  }

  log(`Creating 'contacts' table`);
  await contactSeeder.createTable();

  log('Seeding data');
  await contactSeeder.seed(contactsData);
};

(async () => {
  try {
    await seedContacts();
  } catch (error) {
    console.error(error);
  }
})();
