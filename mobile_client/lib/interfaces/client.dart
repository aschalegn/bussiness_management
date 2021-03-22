class Body {
  String id, fullName, phone;

  Body(this.id, this.fullName, this.phone);

  factory Body.fromJson(dynamic json) {
    return Body(json['_id'] as String, json['fullName'] as String,
        json['phone'] as String);
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
