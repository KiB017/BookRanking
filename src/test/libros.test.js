const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../main.js'); // Ajusta la ruta según tu estructura
const should = chai.should();

chai.use(chaiHttp);

describe('API Endpoints', () => {
  // Prueba para el endpoint de obtener libros
  describe('GET /libros', () => {
    it('Debería obtener todos los libros', (done) => {
      chai.request(server)
        .get('/libros')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  // Prueba para el endpoint de crear un libro
  describe('POST /libros', () => {
    it('Debería crear un libro', (done) => {
      const libro = {
        titulo: 'Libro de prueba',
        descripcion: 'Descripción de prueba',
        fecha_publicacion: '2024-01-01',
        autor_id: 1
      };
      chai.request(server)
        .post('/libros')
        .send(libro)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('titulo').eql('Libro de prueba');
          done();
        });
    });
  });
});
