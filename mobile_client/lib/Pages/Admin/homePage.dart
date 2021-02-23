import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("home"),
      ),
      body: Row(children: [
        RaisedButton(
          child: Text("הרשמה"),
          onPressed: () {
            Navigator.pushNamed(context, "/signUp");
          },
        ),
        RaisedButton(
          child: Text("התחברות"),
          onPressed: () {
            Navigator.pushNamed(context, "/logIn");
          },
        )
      ]),
    );
  }
}
