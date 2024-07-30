class User {
  final String username;
  final String password;

  User({required this.username, required this.password});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(username: json['username'], password: json['password']);
  }

  Map<String, dynamic> toJson() {
    return {'username': username, 'password': password};
  }
}

class UserAuth {
  final List<User> _users = [];

  UserAuth() {
    createUser('testuser', 'password123');
    createUser('flutterdev', 'flutter2024');
  }

  void createUser(String username, String password) {
    _users.add(User(username: username, password: password));
  }

  bool registerUser(String username, String password) {
    for (var user in _users) {
      if (user.username == username) {
        return false;
      }
    }
    createUser(username, password);
    return true;
  }

  bool verifyUser(String username, String password) {
    for (var user in _users) {
      if (user.username == username && user.password == password) {
        return true;
      }
    }
    return false;
  }
}
