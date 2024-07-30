import 'package:book_ranking_app/Classes/Books.dart';
import 'package:book_ranking_app/styles/app_colors.dart';
import 'package:flutter/material.dart';

class AddBookPage extends StatefulWidget {
  @override
  AddBookPageState createState() => AddBookPageState();
}

class AddBookPageState extends State<AddBookPage> {
  final formKey = GlobalKey<FormState>();
  final tituloController = TextEditingController();
  final descripcionController = TextEditingController();
  final fechaPublicacionController = TextEditingController();
  final autorController = TextEditingController();

  void _saveBook() {
    if (formKey.currentState!.validate()) {
      final newBook = Book(
        libroId: DateTime.now().toString(),
        titulo: tituloController.text,
        descripcion: descripcionController.text,
        fechaPublicacion: fechaPublicacionController.text,
        autor: autorController.text,
        meGusta: 0,
        noMeGusta: 0,
      );

      Navigator.pop(context, newBook);
    }
  }

  @override
  void dispose() {
    tituloController.dispose();
    descripcionController.dispose();
    fechaPublicacionController.dispose();
    autorController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Agregar Nuevo Libro'),
        backgroundColor: AppColors.blue,
        foregroundColor: AppColors.black,
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: formKey,
          child: Column(
            children: [
              TextFormField(
                controller: tituloController,
                decoration: InputDecoration(
                  hintText: 'Título',
                  hintStyle: TextStyle(color: AppColors.black),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(12),
                    ),
                  ),
                  filled: true,
                  fillColor: AppColors.blue,
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingrese el título';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: descripcionController,
                decoration: InputDecoration(
                  hintText: 'Descripción',
                  hintStyle: TextStyle(color: AppColors.black),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(12),
                    ),
                  ),
                  filled: true,
                  fillColor: AppColors.blue,
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingrese la descripción';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: fechaPublicacionController,
                decoration: InputDecoration(
                  hintText: 'Fecha de Publicación',
                  hintStyle: TextStyle(color: AppColors.black),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(12),
                    ),
                  ),
                  filled: true,
                  fillColor: AppColors.blue,
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingrese la fecha de publicación';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                controller: autorController,
                decoration: InputDecoration(
                  hintText: 'Autor',
                  hintStyle: TextStyle(color: AppColors.black),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.all(
                      Radius.circular(12),
                    ),
                  ),
                  filled: true,
                  fillColor: AppColors.blue,
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Por favor ingrese el autor';
                  }
                  return null;
                },
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: _saveBook,
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.green,
                  foregroundColor: AppColors.black,
                ),
                child: Text('Agregar Libro'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
