// test/auth.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index'); // Import the Express app
const expect = chai.expect;
const User = require('../models/User'); // Import the User model

chai.use(chaiHttp);

describe('Authentication API', () => {
  before(async () => {
    await User.deleteMany({}); // Clear the user database before tests
  });

  it('should register a new user', (done) => {
    chai
      .request(app)
      .post('/auth/register')
      .send({ name: 'testuser', email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        // console.log('checking body',res.body)
        expect(res.body.user).to.have.property('name').equal('testuser');
        done();
      });
  });

  it('should log in an existing user', (done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password123' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should fail to log in with incorrect password', (done) => {
    chai
      .request(app)
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});
