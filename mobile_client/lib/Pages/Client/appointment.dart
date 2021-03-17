import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Appointment extends StatefulWidget {
  @override
  AppointmentState createState() => AppointmentState();
}

class AppointmentState extends State<Appointment> {
  @override
  void initState() {
    super.initState();
  }

  String barberChoose, days;
  List listBarbers = ['barber1', 'barber2', 'barber3'];
  List daysS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו'];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("קביעת תורים"),
      ),
      body: Column(
        children: [
          DropdownButton(
            value: barberChoose,
            onChanged: (newValue) {
              setState(() {
                barberChoose = newValue;
              });
            },
            items: listBarbers.map((valueItem) {
              return DropdownMenuItem(value: valueItem, child: Text(valueItem));
            }).toList(),
          ),
          // DataTable(columns: [
          //   DataColumn(
          //       label: daysS.map((day) {
          //         return Text(day);
          //       }),
          //       tooltip: ''),
          // ], rows: null)
        ],
      ),
    );
  }
}
