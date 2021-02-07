import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SignUpForm extends StatefulWidget {
  @override
  _SignUpFormState createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final _formKey = GlobalKey<FormState>();
  String _name;
  String _phone;
  String _email;
  String _password;

  Widget _buildName() {
    return Container(
        height: 30,
        margin: EdgeInsets.fromLTRB(20, 20, 0, 20),
        child: TextFormField(
          style: TextStyle(fontSize: 16),
          decoration: InputDecoration(labelText: "שם העסק"),
          cursorWidth: 3,
          validator: (value) {
            if (value.isEmpty) {
              return "זהו שדה חובה";
            }
            return null;
          },
          onSaved: (value) {
            _name = value;
          },
        ));
  }

  Widget _buildPhone() {
    return Container(
        height: 30,
        margin: EdgeInsets.fromLTRB(20, 20, 0, 20),
        child: TextFormField(
          style: TextStyle(fontSize: 16),
          decoration: InputDecoration(labelText: "טלפון"),
          cursorWidth: 3,
          keyboardType: TextInputType.phone,
          validator: (value) {
            if (value.isEmpty) {
              return "זהו שדה חובה";
            }
            return null;
          },
          onSaved: (value) {
            _phone = value;
          },
        ));
  }

  Widget _buildEmail() {
    return Container(
        height: 30,
        margin: EdgeInsets.fromLTRB(20, 20, 0, 20),
        child: TextFormField(
          style: TextStyle(fontSize: 16),
          decoration: InputDecoration(labelText: "אי-מייל"),
          cursorWidth: 3,
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
        ));
  }

  Widget _buildPassword() {
    return Container(
        height: 30,
        margin: EdgeInsets.fromLTRB(20, 20, 0, 20),
        child: TextFormField(
          style: TextStyle(fontSize: 16),
          textDirection: TextDirection.rtl,
          decoration: InputDecoration(labelText: "סיסמה"),
          cursorWidth: 3,
          keyboardType: TextInputType.visiblePassword,
          validator: (value) {
            if (value.isEmpty) {
              return "זהו שדה חובה";
            }
            if (value.length < 8) {
              return "חייב להיות לפחות 8 תווים";
            }
            return null;
          },
          onSaved: (value) {
            _password = value;
          },
        ));
  }

  String uri = "10.8.1.75";
  void validateFormAndSendData() async {
    if (!_formKey.currentState.validate()) {
      return;
    }
    _formKey.currentState.save();
    print({_name, _phone, _email, _password});

    var body = {
      "name": _name,
      "phone": _phone,
      "email": _email,
      "password": _password
    };

    var res = await http.post("http://$uri:1000/api/business",
        headers: {'content-type': 'application/json'}, body: jsonEncode(body));
    print(res.body);
    Navigator.pushNamed(context, "/user");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("הרשם")),
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
                      _buildName(),
                      _buildPhone(),
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
