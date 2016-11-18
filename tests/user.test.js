var should = require('should');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var Account = require('../models/account.js');
var db;

describe('Account', function() {
  before(function(done) {
    mongoose.Promise = bluebird;
    db = mongoose.connect('mongodb://localhost/test');
    done();
  });

  after(function(done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function(done) {
    var account = new Account({
      username: '12345',
      password: 'testy'
    });

    account.save(function(error) {
      if (error) {
        console.log('error' + error.message);
      }
      done();
    });
  });

  it('find a user by username', function(done) {
    Account.findOne({ username: '12345' }, function(err, account) {
      account.username.should.eql('12345');
      done();
    });
  });

  afterEach(function(done) {
    Account.remove({}, function() {
      done();
    });
  });
});