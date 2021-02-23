import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HomeAfterLogin extends StatefulWidget {
  @override
  _HomeAfterLoginState createState() => _HomeAfterLoginState();
}

class _HomeAfterLoginState extends State<HomeAfterLogin> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Home After Login"),
      ),
      body: Column(
        children: [
          Text("Home After Login"),
        ],
      ),
    );
  }
}
