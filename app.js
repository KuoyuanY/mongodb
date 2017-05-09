var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, (err, db) => {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  var larry = new member("Larry", "Steele", "Larry Steele", "12345", "0");
  insert(db, larry.Json(), () => {
      db.close();
  });
});
function member(Fname, Lname, name, id, score){//member class
    this.Fname = Fname;
    this.Lname = Lname;
    this.name = name;
    this.id = id;
    this.score = score;

    member.prototype.Json = function Json(){//returns json format of the member
        var json = {
            "First Name" : Fname,
            "Last Name" : Lname,
            "Full Name" : name,
            "id" : id,
            "Score" : score
        };
        return json;
    }
}

function insert(db, object, collection, callback){//insert document
    db.collection(collection).insertOne(object, (err, result) => {
        assert.equal(err, null);
        console.log("Inserted a document into the members collection.");
        callback();
    });
}

function deleteCol(db, collection, callback){//delete a collection
    db.collection(collection).drop((err, response) => {
        console.log(response);
        callback();
    });
}

function deleteDoc(db, object, collection, callback){//delete a document that satisfy the condition(object)
    db.collection(collection).deleteOne(object, (err, results) => {
         console.log(results);
         callback();
    });
}

function deleteMultiDoc(db, object, collection, callback){//delete all documents that satisfy the condition
    db.collection(collection).deleteMany(object, (err, results) => {//object(condition) can be a field for a document
         console.log(results);
         callback();
    });
}

function getAllDoc(db, collection, callback) {//return all documents in a collection
   var cursor = db.collection(collection).find( );
   cursor.each(function(err, doc) {
       assert.equal(err, null);
       if (doc != null) {
           console.dir(doc);
       } else {
           callback();
       }
   });
};

function findDoc(db, object, collection, callback) {//returns the document that satisfy condition
   var cursor =db.collection(collection).find(object);
   cursor.each(function(err, doc) {
       assert.equal(err, null);
       if (doc != null) {
           console.dir(doc);
       } else {
           callback();
       }
   });
};
//Conditions can be specified by operators : $gt, $lt,
//{ <field1>: { <operator1>: <value1> } }
//{ "grades.score": { $gt: 30 }

//logical or : $or
//$or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ]

function updateDoc(db, condition, collection, callback) {
   db.collection(collection).updateOne(
       condition,
       {
           $set: { "FIELD": "NEW VALUE" }, //changes a field
           $currentDate: { "lastModified": true } //changes current date?
       }, function(err, results) {
           console.log(results);
           callback();
       });
};

function updateMultiDoc(db, condition, collection, callback) {
    db.collection(collection).updateMany(
        condition,
        {
            $set: { "FIELD": "NEW VALUE" }, //changes a field
            $currentDate: { "lastModified": true } //changes current date?
        }, function(err, results) {
            console.log(results);
            callback();
    });
};

function replaceDoc(db, condition, newDoc, collection, callback) {//replaces a document
   db.collection(collection).replaceOne(condition, newDoc, function(err, results) {
       console.log(results);
       callback();
   });
};
