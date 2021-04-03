class Worker {
  String id, name, phone, role, password, email, profile;
  List<String> times;
  List<String> availableTimes = [];
  List<String> skills = [];

  Worker(this.id, this.name, this.phone, this.email, this.role, this.profile);

  factory Worker.fromJson(dynamic data) {
    return Worker(data['_id'], data['name'], data['phone'], data['email'],
        data['role'], data['profile']);
  }
  Map<Object, dynamic> toJson(data) {
    print(data);
    return {
      id: "_id",
      name: "name",
      phone: "phone",
      role: "role",
      password: "password",
      email: "email",
      profile: "priofile",
    };
  }
}
