import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class SignUp extends StatefulWidget {
  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {
  final _formKey = GlobalKey<FormState>();
  String _fullName;
  String _phone;

  Widget _buildFullName() {
    return Container(
        height: 30,
        margin: EdgeInsets.fromLTRB(20, 20, 0, 20),
        child: TextFormField(
          style: TextStyle(fontSize: 16),
          decoration: InputDecoration(labelText: "שם מלא"),
          cursorWidth: 3,
          validator: (value) {
            if (value.isEmpty) {
              return "זהו שדה חובה";
            }
            return null;
          },
          onSaved: (value) {
            _fullName = value;
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

  String uri = "172.20.10.3";
  void validateFormAndSendData() async {
    if (!_formKey.currentState.validate()) {
      return;
    }
    _formKey.currentState.save();
    print({_fullName,_phone});

    var body = {
      "phone": _phone,
    };

    var res = await http.post("http://$uri:1000/api/client",
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
                      _buildFullName(),
                      _buildPhone(),
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
