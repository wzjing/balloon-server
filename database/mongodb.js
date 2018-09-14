const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
const userDb = 'balloon';
const userCollection = 'users';

let mongo;

function db(cb) {
    if (mongo) {
        cb()
    } else {
        MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
            if (err) {
                console.error(`Unable to connect to mongoDb: ${err}`)
            }
            console.log('Connected successfully to server');

            mongo = client;

            cb()
        })
    }
}

function closeDb() {
    if (mongo) {
        mongo.close();
        mongo = null
    }
}

function query(dbName, collectionName, query, callback) {
    db(() => {
        const db = mongo.db(dbName);
        const collection = db.collection(collectionName);
        collection.find(query).toArray((err, docs) => {
            callback(err, docs)
        });
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
    db(() => {
        const db = mongo.db(userDb);
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
    });
}

function getUser(username, callback) {
    db(() => {
        const db = mongo.db(userDb);
        const collection = db.collection(userCollection);
        collection.find({username: username}).toArray((err, docs) => {
            if (docs.length === 0) {
                console.error(`no user of username: ${username}`);
                callback(INVALID_USER, null)
            } else {
                callback(null, docs[0])
            }
        });
    });
}

function updateUser(username, info) {
    db(() => {
        const db = mongo.db(userDb);
        const collection = db.collection(userCollection);
        collection.update({username: username}, {$set: info}, (err, result) => {
            assert.equal(err, null);
            assert.equal(result.result.n, 1);
            console.log(`Update ${username} to ${info}`)
        });
    });
}

module.exports = {
    db,
    closeDb,
    query,
    verifyUser,
    getUser,
    updateUser,
    LOGIN_SUCCESS: LOGIN_SUCCESS,
    INVALID_USER: INVALID_USER,
    WRONG_PASSWORD: WRONG_PASSWORD
};