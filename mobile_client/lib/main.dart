import 'package:flutter/material.dart';
import 'package:mobile_client/homeAfterLogin.dart';
import 'package:mobile_client/homePage.dart';
import 'package:mobile_client/loginForm.dart';
import './signUpForm.dart';

void main() {
  runApp(MaterialApp(
    initialRoute: "/",
    routes: {
      "/": (context) => HomePage(),
      "/logIn": (context) => LoginForm(),
      "/signUp": (context) => SignUpForm(),
      "/user": (context) => HomeAfterLogin(),
    },
  ));
}

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [Text("Testing Widget")],
      ),
    );
  }
}
