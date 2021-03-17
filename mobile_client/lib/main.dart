import 'package:flutter/material.dart';
import 'package:mobile_client/Pages/Client/signin.dart';
import 'Pages/Client/login.dart';
import 'Pages/Client/signUp.dart';
import 'Pages/Client/homeAfterLogin.dart';

void main() {
  runApp(MaterialApp(
     initialRoute: "/",
    routes: {
      "/": (context) => Signin(),
      "/signUp": (context) => SignUp(),
      "/user": (context) => HomeAfterLogin(),
    },
  ));
}





