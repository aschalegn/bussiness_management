import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
// import 'dart:convert';

// import 'package:mobile_client/Pages/Services/storage.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _formKey = GlobalKey<FormState>();
  String _phone;

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

  String uri = "10.100.102.15";
  void validateFormAndSendData() async {
    print(_formKey.currentState);
    if (!_formKey.currentState.validate()) {
      print('error');
      return;
    }
    _formKey.currentState.save(); 
    print({_phone});

    var res = await http.get(
        "http://$uri:1000/api/client/signIn/6028e4f2ed8a283230f4bc6c?phone=$_phone",
        headers: {'content-type': 'application/json;charSet=UTF-8'});
    print(res.hashCode);

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
                      _buildPhone(),
                      RaisedButton.icon(
                        onPressed: () => validateFormAndSendData(),
                        icon: Icon(Icons.check),
                        color: Colors.blue,
                        label: Text("כניסה"),
                      ),
                      FlatButton(
                          onPressed: () {
                            Navigator.pushNamed(context, "/signUp");
                          },
                          child: Text("עדיין לא נרשמת ? להרשמה לחץ כאן"))
                    ],
                  ),
                )),
          ],
        ));
  }
}
