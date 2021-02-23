import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class NavBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: (Row(
        children: [
          RaisedButton(
            child: Text("בית"),
            onPressed: () {
              Navigator.pushNamed(context, "/");
            },
          ),
          RaisedButton(
            child: Text("התחברות"),
            onPressed: () {
              Navigator.pushNamed(context, "/logIN");
            },
          ),
          RaisedButton(
            child: Text("הרשמה"),
            onPressed: () {
              Navigator.pushNamed(context, "/signUp");
            },
          )
        ],
      )),
    );
  }
}
