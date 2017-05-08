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
function member(Fname, Lname, name, id, score){
    this.Fname = Fname;
    this.Lname = Lname;
    this.name = name;
    this.id = id;
    this.score = score;

    member.prototype.Json = function Json(){
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
function insert(db, object, callback){
    db.collection('members').insertOne(object, (err, result) => {
    assert.equal(err, null);
    console.log("Inserted a document into the members collection.");
    callback();
  });
}
