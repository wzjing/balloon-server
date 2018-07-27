const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
const userDb = 'balloon';
const userCollection = 'users';

function query(dbName, collectionName, query, callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        assert.equal(null, err);
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find(query).toArray((err, docs) => {
            callback(err, docs)
        });

        client.close();
    });
}


const LOGIN_SUCCESS = 0;
const INVALID_USER = 1;
const WRONG_PASSWORD = 2;

/**
 * Verify user.
 * @see LOGIN_SUCCESS   : 0
 * @see INVALID_USER    : 1
 * @see WRONG_PASSWORD  : 2
 *
 * @param username  username
 * @param password  password
 * @param callback  callback(error, resultUser)
 */
function verifyUser(username, password, callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        assert.equal(null, err);
        console.log('Connected successfully to server');

        const db = client.db(userDb);
        const collection = db.collection(userCollection);
        collection.find({username: username}).toArray((err, docs) => {
            if (docs.length === 0) {
                console.warn(`no user named: ${username}`);
                callback(INVALID_USER, docs[0])
            } else {
                if (docs[0].password === password) {
                    console.log(`${username} login`);
                    callback(LOGIN_SUCCESS, docs[0])
                } else {
                    console.warn(`wrong password for ${username}`);
                    callback(WRONG_PASSWORD, docs[0])
                }
            }
        });

        client.close();
    });
}

module.exports = {
    query: query,
    verifyUser: verifyUser,
    LOGIN_SUCCESS: LOGIN_SUCCESS,
    INVALID_USER: INVALID_USER,
    WRONG_PASSWORD: WRONG_PASSWORD
};