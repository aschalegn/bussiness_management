import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_client/Pages/Client/appointment.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomeAfterLogin extends StatefulWidget {
  @override
  _HomeAfterLoginState createState() => _HomeAfterLoginState();
}

String uri = "172.20.10.3";
void getImgAndLogo() async {
  var res = await http.get(
      "http://$uri:1000/api/client/signIn/service/1234567890",
      headers: {'content-type': 'application/json'});
  print(res.statusCode);
  print('ndjgfgbkng' + res.body);
}

class _HomeAfterLoginState extends State<HomeAfterLogin> {
  @override
  void initState() {
    super.initState();
    getData();
    getImgAndLogo();
  }

  String displayPhone;

  getData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    setState(() {
      displayPhone = prefs.get('displayPhone');
    });
  }

  display() {
    if (displayPhone != null) {
      return Text("Welcome back $displayPhone!");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Home After Client Login"),
      ),
      body: Column(
        children: [
          Image(
              image: NetworkImage(
                  'https://media.istockphoto.com/photos/everything-should-be-perfect-picture-id522305300?b=1&k=6&m=522305300&s=170667a&w=0&h=s6xDPtJSyFXOhqH9K0K7XLM1_Z3xah8YZD5ND6YOOO8=')),
          Text("Home After Client Login"),
          OutlineButton(
            onPressed: () {
              print('קביעת תורים');
              Navigator.push(context,
                  new MaterialPageRoute(builder: (context) => Appointment()));
            },
            borderSide: BorderSide(width: 2.0, color: Colors.red[900]),
            child: Text('קביעת תורים'),
          ),
          OutlineButton(
              onPressed: () {
                print('היסטוריית תורים');
              },
              borderSide: BorderSide(width: 2.0, color: Colors.red[900]),
              child: Text('היסטוריית תורים')),
          OutlineButton(
            onPressed: () {
              print('תור עתידי');
            },
            borderSide: BorderSide(width: 2.0, color: Colors.red[900]),
            child: Text('תור עתידי'),
          ),
        ],
      ),
    );
  }
}

// class ( {}
