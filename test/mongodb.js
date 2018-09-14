const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
const userDb = 'balloon';
const userCollection = 'users';

let mongo;
let db;

function openDb() {
    MongoClient.connect(url, {userNewUrlParser: true}, (err, client) => {
        assert.equal(null, err);
        console.log('Connected successfully to server');

        mongo = client;
        db = client.db(dbName);
    })
}

function closeDb() {
    mongo.close()
}

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

function verifyUser(username, password, callback) {
    MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
        assert.equal(null, err);
        console.log('Connected successfully to server');

        const db = client.db(userDb);
        const collection = db.collection(userCollection);
        collection.find({username: username}).toArray((err, docs) => {
            if (docs.length === 0) {
                console.warn(`no user named: ${username}`)
            } else {
                if (docs[0].password === password) {
                    console.log(`${username} login`)
                } else {
                    console.warn(`wrong password for ${username}`)
                }
            }
        });

        client.close();
    });
}

function updateAvatar(username) {

}