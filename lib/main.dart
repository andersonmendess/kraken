import 'package:downloadcenter/pages/home_page.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Download center',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        primaryColor: Color(0xFF06d68d),
        accentColor: Color(0xFF06d68d),
        scaffoldBackgroundColor: Color(0xFF232A33),
        canvasColor: Color(0xFF323c48),
      ),
      home: HomePage(),
    );
  }
}
