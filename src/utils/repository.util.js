const { ContactRepository } = require('../repositories/contact.repository');
const { withProcessEnv } = require('../dynamodb.factory');

// each of the handlers currently do these two things to create an instance of
// a contact repository

const createRepository = (env) => {
    const docClient = withProcessEnv(env)();

    return (tableName) => new ContactRepository(docClient, tableName || env.CONTACTS_TABLE);
};

module.exports = {
    createRepository
};
