import 'dart:convert';
import 'package:book_ranking_app/pages/add_book_page.dart';
import 'package:book_ranking_app/styles/app_colors.dart';
import 'package:book_ranking_app/Classes/Books.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class HomePage extends StatefulWidget {
  @override
  HomePageState createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  List<Book> _books = [];
  Map<String, String> userVotes = {};

  @override
  void initState() {
    super.initState();
    _fetchBooks();
  }

  Future<void> _fetchBooks() async {
    final response = await http.get(Uri.parse('http://localhost:4003/libros'));
    if (response.statusCode == 200) {
      final List<dynamic> json = jsonDecode(response.body);
      setState(() {
        _books = json.map((item) => Book.fromJson(item)).toList();
      });
    } else {
      throw Exception('Failed to load books');
    }
  }

  Future<void> _votar(String libroId, bool meGusta) async {
    setState(() {
      if (!userVotes.containsKey(libroId)) {
        if (meGusta) {
          _books.firstWhere((book) => book.libroId == libroId).meGusta += 1;
          userVotes[libroId] = 'meGusta';
        } else {
          _books.firstWhere((book) => book.libroId == libroId).noMeGusta += 1;
          userVotes[libroId] = 'noMeGusta';
        }
      } else if (userVotes[libroId] == 'meGusta' && !meGusta) {
        _books.firstWhere((book) => book.libroId == libroId).meGusta -= 1;
        _books.firstWhere((book) => book.libroId == libroId).noMeGusta += 1;
        userVotes[libroId] = 'noMeGusta';
      } else if (userVotes[libroId] == 'noMeGusta' && meGusta) {
        _books.firstWhere((book) => book.libroId == libroId).noMeGusta -= 1;
        _books.firstWhere((book) => book.libroId == libroId).meGusta += 1;
        userVotes[libroId] = 'meGusta';
      }
    });

    final response = await http.post(
      Uri.parse('http://localhost:4003/votos'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'userId': '1', // Cambia según la lógica de autenticación
        'libroId': libroId,
        'voto': meGusta ? 1 : 2,
      }),
    );

    if (response.statusCode != 200) {
      // Revertir el cambio si la solicitud falla
      setState(() {
        if (userVotes[libroId] == 'meGusta') {
          _books.firstWhere((book) => book.libroId == libroId).meGusta -= 1;
        } else {
          _books.firstWhere((book) => book.libroId == libroId).noMeGusta -= 1;
        }
        userVotes.remove(libroId);
      });
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Failed to submit vote'),
      ));
    }
  }

  void _navigateToAddBookPage() async {
    final newBook = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AddBookPage()),
    );

    if (newBook != null) {
      setState(() {
        _books.add(newBook);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Ranking Books'),
        backgroundColor: AppColors.black,
        foregroundColor: AppColors.white,
        centerTitle: false,
        actions: [
          Padding(
            padding: EdgeInsets.all(10.0),
            child: IconButton(
              icon: Icon(Icons.login_outlined),
              onPressed: () {
                Navigator.of(context).pushReplacementNamed('/login');
              },
            ),
          ),
        ],
      ),
      body: ListView.builder(
        itemCount: _books.length,
        itemBuilder: (BuildContext context, int index) {
          return Card(
            color: AppColors.ligtherBlack,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10.0),
            ),
            child: Padding(
              padding: EdgeInsets.all(10.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _books[index].titulo,
                    style: const TextStyle(
                      color: AppColors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 5),
                  Text(
                    _books[index].descripcion,
                    style: const TextStyle(
                      color: AppColors.white,
                      fontSize: 14,
                    ),
                  ),
                  SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        children: [
                          IconButton(
                            icon: Icon(Icons.thumb_up),
                            color: AppColors.blue,
                            onPressed: () {
                              _votar(_books[index].libroId, true);
                            },
                          ),
                          Text(
                            _books[index].meGusta.toString(),
                            style: TextStyle(
                              color: AppColors.white,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                      Column(
                        children: [
                          IconButton(
                            icon: Icon(Icons.thumb_down),
                            color: AppColors.green,
                            onPressed: () {
                              _votar(_books[index].libroId, false);
                            },
                          ),
                          Text(
                            _books[index].noMeGusta.toString(),
                            style: TextStyle(
                              color: AppColors.white,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _navigateToAddBookPage,
        backgroundColor: AppColors.green,
        child: Icon(Icons.add, color: AppColors.black),
      ),
    );
  }
}
