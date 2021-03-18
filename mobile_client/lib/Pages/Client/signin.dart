import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:mobile_client/Pages/Client/homeAfterLogin.dart';
import 'package:mobile_client/interfaces/client.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Signin extends StatefulWidget {
  Signin({Key key}) : super(key: key);

  @override
  _SigninState createState() => _SigninState();
}

class _SigninState extends State<Signin> {
  final _formKey = GlobalKey<FormState>();
  String uri = "10.100.102.15";

  @override
  void initState() {
    super.initState();
    _getDataFromStorage();
  }

  _getDataFromStorage() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    final String userId = prefs.getString('username');
    print('sdghdjjyktktk');
    print(userId);
  }

  String _phone;
  bool isLoggedIn = false;
  Object userObj;

  Future<List<User>> save() async {
    List<User> list;
    final res = await http.get(
        "http://$uri:1000/api/client/signIn/6028e4f2ed8a283230f4bc6c?phone=$_phone",
        headers: {'Context-Type': 'application/json;charSet=UTF-8'});

    if (res.statusCode == 200) {
      final decodedResponse = jsonDecode(res.body);
      final myObject = User.fromJson(decodedResponse);
      print(myObject.body.id);
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString('username', myObject.body.id);

      setState(() {
        isLoggedIn = true;
        userObj = myObject.body;
      });
      Navigator.push(
        context,
        MaterialPageRoute(
            builder: (context) => HomeAfterLogin(
                //  userObj: userObj,
                )),
      );
    } else if (res.statusCode == 401 || res.statusCode == 404) {
      print(res.statusCode);
      return list;
    }
    print(userObj);
  }

  @override
  Widget build(BuildContext cnotext) {
    return Scaffold(
        body: Stack(children: [
      Container(
          alignment: Alignment.center,
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text("כניסה"),
                Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: TextFormField(
                      onChanged: (value) {
                        _phone = value;
                      },
                      validator: (value) {
                        if (value.isEmpty) {
                          return 'Enter somthing';
                        } else if (RegExp(r'(^(?:[+0]9)?[0-9]{10,12}$)')
                            .hasMatch(value)) {
                          return null;
                        }
                        return 'Enter valid phone';
                      },
                      decoration: InputDecoration(
                          hintText: 'Enter Phone',
                          enabledBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(16))),
                    )),
                Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Container(
                    height: 50,
                    width: 400,
                    child: FlatButton(
                        onPressed: () {
                          if (_formKey.currentState.validate()) {
                            save();
                            print("ok");
                          } else {
                            print("not ok");
                          }
                        },
                        child: Text("כניסה")),
                  ),
                )
              ],
            ),
          ))
    ]));
  }
}
