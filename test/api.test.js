import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../app.js'

chai.use(chaiHttp)
const {expect} = chai

describe('API Tests', () => {
    describe('GET /', () => {
        it('should return a welcome message', async () => {
            const res = await chai.request(app).get('/')
            expect(res).to.have.status(200)
            expect(res.text).to.deep.equal('Welcome to the API!')
        })
    })

    describe('Users API', () => {
        describe('GET /api/users', () => {
            it('should return an array of users', async () => {
                const res = await chai.request(app).get('/api/users')
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
            })
        })

        describe('GET /api/users/:email', () => {
            it('should return a user by email', async () => {
                const res = await chai.request(app).get('/api/users/johndoe@example.com')
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.email).to.equal('johndoe@example.com')
            })
        })

        describe('DELETE /api/users', () => {
            it('should delete a user by email', async () => {
                const res = await chai.request(app).delete('/api/users').send({email: 'johndoe@example.com'})
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                expect(res.body.some(user => user.email === 'johndoe@example.com')).to.be.false
            })
        })

        describe('POST /api/users', () => {
            it('should create a new user', async () => {
                const res = await chai.request(app).post('/api/users').send({
                    email: 'newuser@example.com',
                    password: 'newpassword',
                    firstName: 'New',
                    lastName: 'User',
                    age: 25,
                    address: {
                        street: '123 New St',
                        city: 'Newtown',
                        state: 'NY',
                        zip: '54321',
                        country: 'USA'
                    },
                    tags: ['NewTag']
                })
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body.email).to.equal('newuser@example.com')
            })
        })

        describe('PATCH /api/users', () => {
            it('should update a user by email', async () => {
                const res = await chai.request(app).patch('/api/users').send({
                    email: 'newuser@example.com',
                    password: 'updatedpassword',
                    age: 26,
                    address: {
                        street: '456 Updated St'
                    },
                    tags: ['UpdatedTag']
                })
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.email).to.equal('newuser@example.com')
                expect(res.body.age).to.equal(26)
                expect(res.body.address.street).to.equal('456 Updated St')
                expect(res.body.tags).to.deep.equal(['UpdatedTag'])
            })
        })
    })

    describe('Students API', () => {
        describe('GET /api/students', () => {
            it('should return an array of students', async () => {
                const res = await chai.request(app).get('/api/students')
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
            })
        })

        describe('GET /api/students/worst/:type', () => {
            it('should return a student with the worst score for a given type', async () => {
                const res = await chai.request(app).get('/api/students/worst/exam')
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.be.a('string')
                expect(res.body.score).to.be.a('number')
            })
        })
    })

    describe('Articles API', () => {
        describe('GET /api/articles', () => {
            it('should return an array of articles', async () => {
                const res = await chai.request(app).get('/api/articles')
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
            })
        })

        describe('POST /api/articles', () => {
            it('should create a new article', async () => {
                const res = await chai.request(app).post('/api/articles').send({
                    name: 'New Article',
                    description: 'A new article',
                    type: 'tutorial',
                    tags: ['Tag1', 'Tag2']
                })
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.equal('New Article')
                expect(res.body.description).to.equal('A new article')
                expect(res.body.type).to.equal('tutorial')
                expect(res.body.tags).to.deep.equal(['Tag1', 'Tag2'])
            })
        })

        describe('PATCH /api/articles', () => {
            it('should update article tags', async () => {
                const res = await chai.request(app).patch('/api/articles').send({
                    name: 'New Article',
                    tags: ['UpdatedTag1', 'UpdatedTag2']
                })
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.equal('New Article')
                expect(res.body.tags).to.deep.equal(['UpdatedTag1', 'UpdatedTag2'])
            })
        })
    })

    describe('Error Handling Middleware', () => {
        it('should handle 404 errors for nonexistent routes', async () => {
            const res = await chai.request(app).get('/nonexistent-route')
            expect(res).to.have.status(404)
            expect(res.body).to.deep.equal({error: true, message: 'Not Found - /nonexistent-route'})
        })
    })
})
