import 'dart:async';

import 'package:flutter/material.dart';

class TitleFadeComponent extends StatefulWidget {
  @override
  _TitleFadeComponentState createState() => _TitleFadeComponentState();
}

class _TitleFadeComponentState extends State<TitleFadeComponent> {
  var crossFadeStatus1 = CrossFadeState.showFirst;

  @override
  void initState() {
    super.initState();

    Future.delayed(Duration(seconds: 7), () {
      setState(() {
        crossFadeStatus1 = crossFadeStatus1 == CrossFadeState.showFirst
            ? CrossFadeState.showSecond
            : CrossFadeState.showFirst;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedCrossFade(
      crossFadeState: crossFadeStatus1,
      firstChild: Text(
        "Welcome to KrakenOS",
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 35,
          color: Theme.of(context).accentColor,
        ),
      ),
      secondChild: Text(
        "The best Android Experience",
        textAlign: TextAlign.center,
        style: TextStyle(
          fontSize: 35,
          color: Theme.of(context).accentColor,
        ),
      ),
      secondCurve: Curves.decelerate,
      firstCurve: Curves.decelerate,
      duration: Duration(milliseconds: 400),
      reverseDuration: Duration(milliseconds: 400),
    );
  }
}
