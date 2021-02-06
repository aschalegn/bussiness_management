import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class LoginForm extends StatefulWidget {
  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  String _email;
  String _password;

  Widget _buildEmail() {
    return TextFormField(
      decoration: InputDecoration(labelText: "אי-מייל"),
      keyboardType: TextInputType.emailAddress,
      validator: (value) {
        if (value.isEmpty) {
          return "זהו שדה חובה";
        }
        return null;
      },
      onSaved: (value) {
        _email = value;
      },
    );
  }

  Widget _buildPassword() {
    return TextFormField(
      textDirection: TextDirection.rtl,
      decoration: InputDecoration(labelText: "סיסמה"),
      keyboardType: TextInputType.visiblePassword,
      validator: (value) {
        if (value.isEmpty) {
          return "זהו שדה חובה";
        }
        return null;
      },
      onSaved: (value) {
        _password = value;
      },
    );
  }

  String uri = "10.8.1.75";
  void validateFormAndSendData() async {
    if (!_formKey.currentState.validate()) {
      return;
    }
    _formKey.currentState.save();
    print({_email, _password});

    var res = await http.get(
        "http://$uri:1000/api/business/login?email=$_email&password=$_password",
        headers: {'content-type': 'application/json'});
    print(res.statusCode);
    print(res.body);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("form"),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
                margin: EdgeInsets.fromLTRB(0, 5, 0, 5),
                child: Text("ברוים הבאים ל- AppointU",
                    textDirection: TextDirection.rtl,
                    style: TextStyle(fontSize: 18, color: Colors.black87))),
            Form(
                key: _formKey,
                child: Directionality(
                  textDirection: TextDirection.rtl,
                  child: Column(
                    children: [
                      _buildEmail(),
                      _buildPassword(),
                      RaisedButton.icon(
                        onPressed: () => validateFormAndSendData(),
                        icon: Icon(Icons.check),
                        color: Colors.blue,
                        label: Text("הרשמה"),
                      )
                    ],
                  ),
                )),
          ],
        ));
  }
}
