// Enable ES module imports in Node.js
require = require('esm')(module);

// Import necessary modules using CommonJS syntax
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Make sure this path is correct to your app.js file

// Configure chai
chai.use(chaiHttp);
const expect = chai.expect;

describe('Auth Controller', () => {
    describe('POST /auth', () => {
        it('should login user with correct credentials', (done) => {
            chai.request("http://localhost:3500")
                .post('/auth')
                .send({ email: 'test@example.com', password: 'password123' }) // Replace with real test data
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object').that.has.property('accessToken');
                    done();
                });
        });

        it('should return 404 if user not found', (done) => {
            chai.request("http://localhost:3500")
                .post('/auth')
                .send({ email: 'nonexistent@example.com', password: 'password123' }) // Non-existent email
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.be.an('object').that.has.property('message', 'User not found');
                    done();
                });
        });

        // Add more tests to cover different cases such as wrong passwords, missing fields, etc.
    });
});
