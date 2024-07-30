class Book {
  String libroId = '';
  String titulo = '';
  String descripcion = '';
  String fechaPublicacion = '';
  String autor = '';
  int meGusta;
  int noMeGusta;

  Book({
    required this.libroId,
    required this.titulo,
    required this.descripcion,
    required this.fechaPublicacion,
    required this.autor,
    required this.meGusta,
    required this.noMeGusta,
  });

  factory Book.fromJson(Map<String, dynamic> json) {
    return Book(
      libroId: json['libroId'],
      titulo: json['titulo'],
      descripcion: json['descripcion'],
      fechaPublicacion: json['fechaPublicacion'],
      autor: json['autor'],
      meGusta: json['meGusta'],
      noMeGusta: json['noMeGusta'],
    );
  }
}
