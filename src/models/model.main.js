import Libro from './model.libro.js';
import Autor from './model.autor.js';
import Usuario from './model.usuario.js';
import Review from './model.review.js';
import Voto from './model.voto.js';

Libro.belongsTo(Autor, { foreignKey: 'id_autor' });

Usuario.hasMany(Review, { foreignKey: 'id_usuario' });
Libro.hasMany(Review, { foreignKey: 'id_libro' });
Review.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Review.belongsTo(Libro, { foreignKey: 'id_libro' });

Usuario.hasMany(Voto, { foreignKey: 'id_usuario' });
Libro.hasMany(Voto, { foreignKey: 'id_libro' });
Voto.belongsTo(Usuario, { foreignKey: 'id_usuario' });
Voto.belongsTo(Libro, { foreignKey: 'id_libro' });

export { Libro, Autor, Usuario, Review, Voto };
