import 'dart:async';

import 'package:downloadcenter/components/titlefade_components.dart';
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    var screenSize = MediaQuery.of(context).size;

    return Scaffold(
      appBar: screenSize.width > 700
          ? PreferredSize(
              preferredSize: Size(screenSize.width, 65),
              child: Container(
                padding:
                    const EdgeInsets.all(10).copyWith(left: 100, right: 100),
                color: Theme.of(context).canvasColor,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 22,
                          backgroundImage: NetworkImage(
                            "https://avatars.githubusercontent.com/u/49829986?s=300&v=4",
                          ),
                        ),
                        SizedBox(width: 10),
                        Text(
                          "AOSPK",
                          style: TextStyle(
                              fontSize: 22,
                              color: Theme.of(context).primaryColor,
                              fontWeight: FontWeight.w500),
                        ),
                      ],
                    ),
                    Container(
                      width: 350,
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          InkWell(
                            onTap: () {},
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Icon(
                                  Icons.home,
                                  size: 22,
                                  color: Theme.of(context).primaryColor,
                                ),
                                Text(
                                  "Home",
                                  style: TextStyle(
                                      fontSize: 13,
                                      color: Theme.of(context).primaryColor),
                                ),
                              ],
                            ),
                          ),
                          InkWell(
                            onTap: () {},
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Icon(Icons.file_download,
                                    size: 22, color: Colors.white60),
                                Text(
                                  "Downloads",
                                  style: TextStyle(
                                      fontSize: 13, color: Colors.white60),
                                ),
                              ],
                            ),
                          ),
                          InkWell(
                            onTap: () {},
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                              children: [
                                Icon(Icons.info,
                                    size: 22, color: Colors.white60),
                                Text(
                                  "About",
                                  style: TextStyle(
                                      fontSize: 13, color: Colors.white60),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            )
          : null,
      body: ListView(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0).copyWith(top: 30, bottom: 30),
            child: Center(child: TitleFadeComponent()),
          ),
          Center(
            child: CircleAvatar(
              radius: 60,
              backgroundImage: NetworkImage(
                "https://avatars.githubusercontent.com/u/49829986?s=300&v=4",
              ),
            ),
          )
        ],
      ),
      bottomNavigationBar: screenSize.width <= 700
          ? BottomNavigationBar(
              items: [
                BottomNavigationBarItem(
                  icon: Icon(Icons.home),
                  label: "Home",
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.file_download),
                  label: "Downloads",
                ),
                BottomNavigationBarItem(
                  icon: Icon(Icons.info),
                  label: "About",
                )
              ],
            )
          : null,
    );
  }
}
