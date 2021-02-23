import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class HomeAfterLogin extends StatefulWidget {
  @override
  _HomeAfterLoginState createState() => _HomeAfterLoginState();
}

 String uri = "172.20.10.3";
  void getImgAndLogo() async {

    var res = await http.get(
        "http://$uri:1000/api/client/signIn/6028e4f2ed8a283230f4bc6c",
        headers: {'content-type': 'application/json'});
    print(res.statusCode);
    print(res.body);
  }

class _HomeAfterLoginState extends State<HomeAfterLogin> {
  @override
  void initState() {
    super.initState();
    getImgAndLogo();
  }
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text("Home After Client Login"),
      ),
      body: Column(
        children: [
          Text("Home After Client Login"),

        ],
      ),
    );
  }
}
