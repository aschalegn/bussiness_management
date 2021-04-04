class Business {
  String name;
  String about;
  List<String> times;
  List<String> appointments = [];
  List<String> clients = [];
  List<String> workers = [];

  Business(this.workers);
  factory Business.fromjson(dynamic json) {
    return Business.fromjson(
      json['workers'] as List,
    );
  }
}
