import 'package:flutter/material.dart';
import 'Pages/Client/login.dart';
import 'Pages/Client/signUp.dart';
import 'Pages/Client/homeAfterLogin.dart';

void main() {
  runApp(MaterialApp(
     initialRoute: "/",
    routes: {
      "/": (context) => Login(),
      "/signUp": (context) => SignUp(),
      "/user": (context) => HomeAfterLogin(),
    },
  ));
}





