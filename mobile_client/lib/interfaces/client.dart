import 'dart:ffi';

import 'package:mobile_client/interfaces/bussiness.dart';

class Body {
  String id, fullName, phone;
 Business businesses;
  Body(this.id, this.fullName, this.phone, this.businesses);

  factory Body.fromJson(dynamic json) {
    return Body(json['_id'] as String, json['fullName'] as String,
        json['phone'] as String, json['businesses']);
  }
}

class User {
  Body body;

  User(this.body);

  factory User.fromJson(dynamic json) {
    // print(data);
    return User(Body.fromJson(json['body']));
  }

  Map<Object, dynamic> toJson(data) {
    print(data);
    return {
      body: "body",
    };
  }
}
