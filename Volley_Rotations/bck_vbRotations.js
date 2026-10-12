var monkeysppp = monkeysppp || { vbRotations: {} };

monkeysppp.vbRotations.SVGMaker = function() {
  var _this = this;

  this.NS = 'http://www.w3.org/2000/svg';
  this.sroot = null;
  this.width = null;
  this.height = null;

  this.backgroundColour      = '#85d6ff';
  this.courtColour           = '#ffb591';
  this.lineColour            = 'white';
  this.playerColour          = '#efa581';
  this.playerColourHighlight = '#66dd66';
  this.rotationControlColour = 'white';
  this.rotationControlHighlightColour = '#dddddd';
  this.rotationControlBackgroundColourA = '#65b6df';
  this.rotationControlBackgroundColourB = '#4596bf';
  this.rotationControlCirleRadius = 12;


  // Player objects
  this.setter = null;
  this.oppo = null;
  this.m1 = null;
  this.m2 = null;
  this.h1 = null;
  this.h2 = null;
  this.setterName = null;
  this.oppoName = null;
  this.m1Name = null;
  this.m2Name = null;
  this.h1Name = null;
  this.h2Name = null;

  this.rotationControls = null;
  this.highlightedPlayer = 0;

  // Action locks;
  this.moving = null;

  this.setterAt = 2;

  this.roster = [

      "Sabry",
      "Gloria",
      "Auro",
      "Sara",
      "Anna",
      "Alessia",
      "Martina",
      "Giulia",
      "Chiara",
      "Noemi",
      "Alice",
      "Beatrice"

    ];

  this.playerAssignments = {

    s: "Sabry",
    o: "Sara",
    m1: "Gloria",
    m2: "Anna",
    h1: "Auro",
    h2: "Alessia"

  };
    
    

  this.controlTwoRcv = null;
  this.controlTwoSrv = null;
  this.controlThreeRcv = null;
  this.controlThreeSrv = null;
  this.controlFourRcv = null;
  this.controlFourSrv = null;
  this.controlFiveRcv = null;
  this.controlFiveSrv = null;
  this.controlSixRcv = null;
  this.controlSixSrv = null;
  this.controlOneRcv = null;
  this.controlOneSrv = null;

  this.playerOffsetsBase = {
    1: {
        s:  { x: 350, y: 300 },
        h1: { x: 350, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 100, y: 50 },
        h2: { x: 100, y: 300 },
        m2: { x: 225, y: 350 },
      },
    2: {
        m2: { x: 350, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 225, y: 50 },
        m1: { x: 100, y: 50 },
        o:  { x: 100, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 300 },
        m2: { x: 350, y: 50 },
        s:  { x: 225, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 225, y: 350 },
      },
    4: {
        o:  { x: 350, y: 300 },
        h2: { x: 350, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 100, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 225, y: 350 },
      },
    5: {
        m1: { x: 350, y: 300 },
        o:  { x: 350, y: 50 },
        h2: { x: 225, y: 50 },
        m2: { x: 100, y: 50 },
        s:  { x: 100, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 300 },
        m1: { x: 350, y: 50 },
        o:  { x: 225, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 225, y: 350 },
      },
  };

  this.playerOffsetsServeServe = {
    1: {
        s:  { x: 350, y: 475 },
        h1: { x: 290, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 160, y: 50 },
        h2: { x: 100, y: 300 },
        m2: { x: 225, y: 350 },
      },
    2: {
        m2: { x: 350, y: 475 },
        s:  { x: 290, y: 50 },
        h1: { x: 225, y: 50 },
        m1: { x: 160, y: 50 },
        o:  { x: 100, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 475 },
        m2: { x: 290, y: 50 },
        s:  { x: 225, y: 50 },
        h1: { x: 160, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 225, y: 350 },
      },
    4: {
        o:  { x: 350, y: 475 },
        h2: { x: 290, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 160, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 225, y: 350 },
      },
    5: {
        m1: { x: 350, y: 475 },
        o:  { x: 290, y: 50 },
        h2: { x: 225, y: 50 },
        m2: { x: 160, y: 50 },
        s:  { x: 100, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 475 },
        m1: { x: 290, y: 50 },
        o:  { x: 225, y: 50 },
        h2: { x: 160, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 225, y: 350 },
      },
  };

  this.playerOffsetsSwitchServe = {
    1: {
        s:  { x: 350, y: 300 },
        h1: { x: 100, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 50 },
        h2: { x: 225, y: 350 },
        m2: { x: 100, y: 300 },
      },
    2: {
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 225, y: 350 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 300 },
      },
    4: {
        o:  { x: 350, y: 300 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 225, y: 350 },
        m1: { x: 100, y: 300 },
      },
    5: {
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 225, y: 350 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 300 },
      },
  };

  this.playerOffsetsSwitchReceive = {
    1: {
        s:  { x: 350, y: 300 },
        h1: { x: 350, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 100, y: 50 },
        h2: { x: 225, y: 350 },
        m2: { x: 100, y: 300 },
      },
    2: {
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 300 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 225, y: 350 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 50 },
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 300 },
      },
    4: {
        o:  { x: 350, y: 300 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 50 },
        h1: { x: 225, y: 350 },
        m1: { x: 100, y: 300 },
      },
    5: {
        m1: { x: 100, y: 300 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 350, y: 300 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 225, y: 350 },
        m1: { x: 225, y: 50 },
        o:  { x: 350, y: 50 },
        h2: { x: 100, y: 50 },
        m2: { x: 100, y: 300 },
        s:  { x: 350, y: 300 },
      },
  };

  this.playerOffsetsReceiveReceive = {
    1: {
        s:  { x: 400, y: 385 },
        h1: { x: 370, y: 300 },
        m1: { x: 240, y: 140 },
        o:  { x: 50, y: 150 },
        h2: { x: 100, y: 300 },
        m2: { x: 230, y: 330 },
      },
    2: {
        m2: { x: 350, y: 300 },
        s:  { x: 350, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 20, y: 80 },
        o:  { x: 130, y: 380 },
        h2: { x: 225, y: 350 },
      },
    3: {
        h2: { x: 350, y: 300 },
        m2: { x: 370, y: 100 },
        s:  { x: 300, y: 50 },
        h1: { x: 100, y: 300 },
        m1: { x: 225, y: 350 },
        o:  { x: 300, y: 380 },
      },
    4: {
        o:  { x: 380, y: 380 },
        h2: { x: 100, y: 300 },
        m2: { x: 70, y: 70 },
        s:  { x: 30, y: 30 },
        h1: { x: 225, y: 350 },
        m1: { x: 350, y: 300 },
      },
    5: {
        m1: { x: 350, y: 300 },
        o:  { x: 420, y: 50 },
        h2: { x: 100, y: 300 },
        m2: { x: 70, y: 50 },
        s:  { x: 120, y: 140 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 350, y: 300 },
        m1: { x: 350, y: 70 },
        o:  { x: 280, y: 30 },
        h2: { x: 100, y: 300 },
        m2: { x: 225, y: 350 },
        s:  { x: 255, y: 85 },
      },
  };

  this.playerOffsetsReceiveSet = {
    1: {
        s:  { x: 300, y: 50 },
        h1: { x: 450, y: 150 },
        m1: { x: 225, y: 150 },
        o:  { x: 0,   y: 150 },
        h2: { x: 225, y: 350 },
        m2: { x: 125, y: 300 },
      },
    2: {
        m2: { x: 100, y: 250 },
        s:  { x: 300, y: 50 },
        h1: { x: 0,   y: 150 },
        m1: { x: 225, y: 150 },
        o:  { x: 400, y: 250 },
        h2: { x: 225, y: 300 },
      },
    3: {
        h2: { x: 225, y: 280 },
        m2: { x: 225, y: 150 },
        s:  { x: 300, y: 50 },
        h1: { x: 0,   y: 150 },
        m1: { x: 125, y: 300 },
        o:  { x: 400, y: 250 },
      },
    4: {
        o:  { x: 400, y: 250 },
        h2: { x: 0,   y: 150 },
        m2: { x: 225, y: 150 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 250 },
        m1: { x: 150, y: 300 },
      },
    5: {
        m1: { x: 100, y: 250 },
        o:  { x: 450, y: 150 },
        h2: { x: 0,   y: 150 },
        m2: { x: 225, y: 150 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 350 },
      },
    6: {
        h1: { x: 225, y: 250 },
        m1: { x: 225, y: 150 },
        o:  { x: 450, y: 150 },
        h2: { x: 0,   y: 150 },
        m2: { x: 150, y: 250 },
        s:  { x: 300, y: 50 },
      },
  };

  this.playerOffsetsReceiveHit = {
    1: {
        s:  { x: 300, y: 50 },
        h1: { x: 400, y: 50 },
        m1: { x: 225, y: 100 },
        o:  { x: 50, y: 50 },
        h2: { x: 225, y: 250 },
        m2: { x: 125, y: 200 },
      },
    2: {
        m2: { x: 100, y: 250 },
        s:  { x: 300, y: 50 },
        h1: { x: 50,  y: 50 },
        m1: { x: 225, y: 50 },
        o:  { x: 420, y: 150 },
        h2: { x: 225, y: 200 },
      },
    3: {
        h2: { x: 225, y: 150 },
        m2: { x: 225,  y: 50 },
        s:  { x: 300, y: 50 },
        h1: { x: 50, y: 50 },
        m1: { x: 125, y: 300 },
        o:  { x: 400, y: 150 },
      },
    4: {
        o:  { x: 400, y: 150 },
        h2: { x: 50, y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 150 },
        m1: { x: 150, y: 300 },
      },
    5: {
        m1: { x: 100, y: 250 },
        o:  { x: 400, y: 50 },
        h2: { x: 50,  y: 50 },
        m2: { x: 225, y: 50 },
        s:  { x: 300, y: 50 },
        h1: { x: 225, y: 200 },
      },
    6: {
        h1: { x: 225, y: 200 },
        m1: { x: 225, y: 50 },
        o:  { x: 400, y: 50 },
        h2: { x: 50,  y: 50 },
        m2: { x: 150, y: 250 },
        s:  { x: 300, y: 50 },
      },
  };

  

  function getWidth(options) {
    return 900;
  }

  function getHeight(options) {
    return 800;
  }

  function drawCourt() {
    // Draw Court Base
    // Background
    var background = _this.sroot.rect(0, 0, getWidth(), getHeight());
    background.attr({
      fill: _this.backgroundColour,
    });

    // Court lines
    var outerLines = _this.sroot.rect(75, 50, 450, 425);
    outerLines.attr({
      fill: _this.courtColour,
      stroke: _this.lineColour,
      strokeWidth: 4,
    });

    // Centre line
    var centreLine = _this.sroot.line(60, 50, 540, 50);
    centreLine.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
    });

    // Attack line and sub lines
    var attackLine = _this.sroot.line(75, 200, 525, 200);
    attackLine.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
    });
    var leftTicks = _this.sroot.line(10, 200, 75, 200);
    leftTicks.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
      'stroke-dasharray': '9, 9',
    });
    var rightTicks = _this.sroot.line(525, 200, 590, 200);
    rightTicks.attr({
      stroke: _this.lineColour,
      strokeWidth: 4,
      'stroke-dasharray': '9, 9',
    });
  }

function refreshNames() {

    _this.setterName.attr({
        text:_this.playerAssignments.s
    });

    _this.oppoName.attr({
        text:_this.playerAssignments.o
    });

    _this.m1Name.attr({
        text:_this.playerAssignments.m1
    });

    _this.m2Name.attr({
        text:_this.playerAssignments.m2
    });

    _this.h1Name.attr({
        text:_this.playerAssignments.h1
    });

    _this.h2Name.attr({
        text:_this.playerAssignments.h2
    });

}



    

  function drawPlayers() {
    // Player markers
      
    var playerNameStyle = {
    fill: '#000000',
    stroke: 'none',
    'text-anchor':'middle',
    'dominant-baseline':'central',
    'font-family':'Verdana',
    'font-size':'12'
    };
      
    var setterCircle = _this.sroot.circle(75, 50, 27);

    setterCircle.attr({
        stroke: '#eeeeee',
        strokeWidth: 4,
        fill: _this.playerColour,
    });

    _this.setterName =
        _this.sroot.text(
            75,
            50,
            _this.playerAssignments.s
        );

    _this.setterName.attr(playerNameStyle);

    _this.setter = _this.sroot.group(
            setterCircle,
            _this.setterName
        );

    _this.setter.attr({
        cursor: 'pointer'
    });

    var m1Circle = _this.sroot.circle(75,50,27);

    m1Circle.attr({
        stroke:'#000000',
        strokeWidth:4,
        fill:_this.playerColour
    });

    _this.m1Name =
        _this.sroot.text(
            75,
            50,
            _this.playerAssignments.m1
        );

    _this.m1Name.attr(playerNameStyle);
    _this.m1 = _this.sroot.group(
            m1Circle,
            _this.m1Name
        );
      
      
    var h1Circle = _this.sroot.circle(75,50,27);

    h1Circle.attr({
        stroke:'#eeeeee',
        strokeWidth:4,
        fill:_this.playerColour
    });

    _this.h1Name =
        _this.sroot.text(
            75,
            50,
            _this.playerAssignments.h1
        );
      
    _this.h1Name.attr(playerNameStyle);
    _this.h1 =  _this.sroot.group(
            h1Circle,
            _this.h1Name
        );
    
      
    var oppoCircle = _this.sroot.circle(75,50,27);

    oppoCircle.attr({
        stroke:'#eeeeee',
        strokeWidth:4,
        fill:_this.playerColour
    });

    _this.oppoName =
        _this.sroot.text(
            75,
            50,
            _this.playerAssignments.o
        );

    _this.oppoName.attr(playerNameStyle);
    _this.oppo = _this.sroot.group(
            oppoCircle,
            _this.oppoName
        );

    var m2Circle = _this.sroot.circle(75,50,27);

    m2Circle.attr({
        stroke:'#eeeeee',
        strokeWidth:4,
        fill:_this.playerColour
    });

    _this.m2Name =
        _this.sroot.text(
            75,
            50,
            _this.playerAssignments.m2
        );
      
    _this.m2Name.attr(playerNameStyle);
    _this.m2 = _this.sroot.group(
            m2Circle,
            _this.m2Name
        );

    var h2Circle = _this.sroot.circle(75,50,27);

    h2Circle.attr({
        stroke:'#eeeeee',
        strokeWidth:4,
        fill:_this.playerColour
    });

    _this.h2Name =
        _this.sroot.text(
            75,
            50,
            _this.playerAssignments.h2
        );

    _this.h2Name.attr(playerNameStyle);
    _this.h2 = _this.sroot.group(
            h2Circle,
            _this.h2Name
        );

    _this.setter.click(function() {toggleHighlightPlayer(setterCircle);});
    _this.oppo.click(function() {toggleHighlightPlayer(oppoCircle);});
    _this.h1.click(function() {toggleHighlightPlayer(h1Circle);});
    _this.h2.click(function() {toggleHighlightPlayer(h2Circle);});
    _this.m1.click(function() {toggleHighlightPlayer(m1Circle);});
    _this.m2.click(function() {toggleHighlightPlayer(m2Circle);});
  }

    function drawRotationControl() {

        var panel = _this.sroot.rect(
            0,
            0,
            140,
            500
        );

        panel.attr({
            fill: _this.rotationControlBackgroundColourA
        });

        var title1 = _this.sroot.text(70,18,"ROTAZIONE");

        var title2 = _this.sroot.text(70,38,"BASE");

        title1.attr({
            fill: "white",
            stroke: "white",
            strokeWidth: 1,
            "text-anchor": "middle",
            "font-family": "Verdana",
            "font-size": "14"
        });

        title2.attr({
            fill: "white",
            stroke: "white",
            strokeWidth: 1,
            "text-anchor": "middle",
            "font-family": "Verdana",
            "font-size": "14"
        });

        var elements = [
            panel,
            title1,
            title2
        ];

        var positions = [

            { num: 1, y: 80  },
            { num: 2, y: 140 },
            { num: 3, y: 200 },
            { num: 4, y: 260 },
            { num: 5, y: 320 },
            { num: 6, y: 380 }

        ];

        positions.forEach(function(pos){

            var circle = _this.sroot.circle(
                40,
                pos.y,
                _this.rotationControlCirleRadius
            );

            circle.attr({

                stroke: "white",
                strokeWidth: 2,
                fill: _this.rotationControlBackgroundColourB,
                cursor: "pointer"

            });

            var label = _this.sroot.text(
                65,
                pos.y + 5,
                "P" + pos.num
            );

            label.attr({

                fill: "white",
                stroke: "white",
                strokeWidth: 1,
                "font-family": "Verdana",
                "font-size": "14"

            });

            circle.click(function(){

                _this.setterAt = pos.num;

                move(
                    _this.playerOffsetsBase[pos.num],
                    500
                );

                highlightRotation(pos.num);

            });

            _this["controlP" + pos.num] = circle;

            elements.push(circle);
            elements.push(label);

        });

        _this.rotationControls =
            _this.sroot.group.apply(
                _this.sroot,
                elements
            );

        _this.rotationControls.transform(
            "t580,25"
        );

    }

    function highlightRotation(position){

        for(var i = 1; i <= 6; i++){

            _this["controlP" + i].attr({
                fill: _this.rotationControlBackgroundColourB
            });

        }

        _this["controlP" + position].attr({
            fill: _this.rotationControlColour
        });

    }
    
    
  function drawActionControl() {
    var serveBox1 = _this.sroot.rect(70, 560, 94, 95);
    serveBox1.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    var serveBox2 = _this.sroot.rect(164, 560, 94, 95);
    serveBox2.attr({
      fill: _this.rotationControlBackgroundColourA
    });
    var serveBox3 = _this.sroot.rect(258, 560, 94, 95);
    serveBox3.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    var serveBox4 = _this.sroot.rect(350, 560, 92, 95);
    serveBox4.attr({
      fill: _this.rotationControlBackgroundColourA
    });
    var serveBox5 = _this.sroot.rect(442, 560, 96, 95);
    serveBox5.attr({
      fill: _this.rotationControlBackgroundColourB
    });

    var receiveBox1 = _this.sroot.rect(70, 655, 94, 100);
    receiveBox1.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    var receiveBox2 = _this.sroot.rect(164, 655, 94, 100);
    receiveBox2.attr({
      fill: _this.rotationControlBackgroundColourA
    });
    var receiveBox3 = _this.sroot.rect(258, 655, 94, 100);
    receiveBox3.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    var receiveBox4 = _this.sroot.rect(350, 655, 92, 100);
    receiveBox4.attr({
      fill: _this.rotationControlBackgroundColourA
    });
    var receiveBox5 = _this.sroot.rect(442, 655, 96, 100);
    receiveBox5.attr({
      fill: _this.rotationControlBackgroundColourB
    });

    var setBar = _this.sroot.rect(538, 590, 142, 20);
    setBar.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    setBar = _this.sroot.rect(660, 535, 20, 75);
    setBar.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    setBar = _this.sroot.rect(538, 690, 242, 20);
    setBar.attr({
      fill: _this.rotationControlBackgroundColourB
    });
    setBar = _this.sroot.rect(760, 535, 20, 175);
    setBar.attr({
      fill: _this.rotationControlBackgroundColourB
    });

    var setLine = _this.sroot.line(115, 600, 670, 600);
    setLine.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': '6, 6'
    });
    setLine = _this.sroot.line(670, 600, 670, 475 + _this.rotationControlCirleRadius);
    setLine.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': '6, 6'
    });
    setLine = _this.sroot.line(115, 700, 770, 700);
    setLine.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': '6, 6'
    });
    setLine = _this.sroot.line(770, 700, 770, 485 + _this.rotationControlCirleRadius);
    setLine.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 1,
      'stroke-dasharray': '6, 6'
    });

    var textHeadingS = _this.sroot.text(105, 578, 'Servizio');
    textHeadingS.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'14'
    });
    var textHeadingR = _this.sroot.text(110, 673, 'Ricezione');
    textHeadingR.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'14'
    });
    var headingLabels = _this.sroot.group(textHeadingS, textHeadingR);

    _this.controlServeBase = _this.sroot.circle(115, 600, _this.rotationControlCirleRadius);
    _this.controlServeBase.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlServeBase.attr({ cursor: 'pointer' });
    _this.controlServeServe = _this.sroot.circle(300, 600, _this.rotationControlCirleRadius);
    _this.controlServeServe.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlServeServe.attr({ cursor: 'pointer' });
    _this.controlServeSwitch = _this.sroot.circle(485, 600, _this.rotationControlCirleRadius);
    _this.controlServeSwitch.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlServeSwitch.attr({ cursor: 'pointer' });

    _this.controlReceiveBase = _this.sroot.circle(115, 700, _this.rotationControlCirleRadius);
    _this.controlReceiveBase.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlReceiveBase.attr({ cursor: 'pointer' });
    _this.controlReceiveReceive = _this.sroot.circle(207, 700, _this.rotationControlCirleRadius);
    _this.controlReceiveReceive.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlReceiveReceive.attr({ cursor: 'pointer' });
    _this.controlReceiveSet = _this.sroot.circle(300, 700, _this.rotationControlCirleRadius);
    _this.controlReceiveSet.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlReceiveSet.attr({ cursor: 'pointer' });
    _this.controlReceiveHit = _this.sroot.circle(393, 700, _this.rotationControlCirleRadius);
    _this.controlReceiveHit.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlReceiveHit.attr({ cursor: 'pointer' });
    _this.controlReceiveSwitch = _this.sroot.circle(485, 700, _this.rotationControlCirleRadius);
    _this.controlReceiveSwitch.attr({
      stroke: _this.rotationControlColour,
      strokeWidth: 2,
      fill: _this.rotationControlBackgroundColourA
    });
    _this.controlReceiveSwitch.attr({ cursor: 'pointer' });

    var textLabel = _this.sroot.text(115, 640, 'Base');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(300, 640, 'Servizio');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(485, 640, 'Cambio');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });

    textLabel = _this.sroot.text(115, 740, 'Base');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(207, 740, 'Ricezione');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(300, 740, 'Alzata');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(393, 740, 'Attacco');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });
    textLabel = _this.sroot.text(485, 740, 'Cambio');
    textLabel.attr({
      fill: _this.rotationControlColour,
      stroke: _this.rotationControlColour,
      strokeWidth: '1',
      'text-anchor':'middle',
      'font-family': 'Verdana',
      'font-size':'22'
    });

    _this.controlServeBase.click(function() {if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeBase);}});
    _this.controlServeServe.click(function() {if (move(_this.playerOffsetsServeServe[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeServe);}});
    _this.controlServeSwitch.click(function() {if (move(_this.playerOffsetsSwitchServe[_this.setterAt], 500)) {controlSelect(_this.setterAt, true, _this.controlServeSwitch);}});
    _this.controlReceiveBase.click(function() {if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveBase);}});
    _this.controlReceiveReceive.click(function() {if (move(_this.playerOffsetsReceiveReceive[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveReceive);}});
    _this.controlReceiveSet.click(function() {if (move(_this.playerOffsetsReceiveSet[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveSet);}});
    _this.controlReceiveHit.click(function() {if (move(_this.playerOffsetsReceiveHit[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveHit);}});
    _this.controlReceiveSwitch.click(function() {if (move(_this.playerOffsetsSwitchReceive[_this.setterAt], 500)) {controlSelect(_this.setterAt, false, _this.controlReceiveSwitch);}});
  }


  function createSVGDocRoot(width, height) {
    _this.moving = false;
    var svgRoot = document.createElementNS(_this.NS, 'svg');
    svgRoot.setAttribute('width', width);
    svgRoot.setAttribute('height', height);
    svgRoot.setAttribute('id', 'vbsvg');
    return svgRoot;
  }

  function createSVGDoc(options) {

    _this.width = getWidth(options);
    _this.height = getHeight(options);
    var svgRoot = createSVGDocRoot(_this.width, _this.height);

    return svgRoot;
  }

function createRosterPanel() {

    var panel = document.createElement("div");

    panel.id = "rosterPanel";

    panel.style.position = "absolute";
    panel.style.left = "930px";
    panel.style.top = "20px";
    panel.style.width = "300px";
    panel.style.background = "#ffffff";
    panel.style.border = "1px solid #cccccc";
    panel.style.padding = "10px";

    panel.innerHTML = `

        <h3>Formazione</h3>

        <table style="width:100%; border-collapse:collapse">

            <tr>
                <td><b>P</b></td>
                <td><select id="player-s"></select></td>
            </tr>

            <tr>
                <td><b>O</b></td>
                <td><select id="player-o"></select></td>
            </tr>

            <tr>
                <td><b>C1</b></td>
                <td><select id="player-m1"></select></td>
            </tr>

            <tr>
                <td><b>C2</b></td>
                <td><select id="player-m2"></select></td>
            </tr>

            <tr>
                <td><b>S1</b></td>
                <td><select id="player-h1"></select></td>
            </tr>

            <tr>
                <td><b>S2</b></td>
                <td><select id="player-h2"></select></td>
            </tr>

        </table>

    `;

    document.body.appendChild(panel);

    initialiseSelectors();
}
    
function initialiseSelectors() {

    var roles = [
        "s",
        "o",
        "m1",
        "m2",
        "h1",
        "h2"
    ];

    roles.forEach(function(role){

        var select =
            document.getElementById(
                "player-" + role
            );

        _this.roster.forEach(function(player){

            var option =
                document.createElement(
                    "option"
                );

            option.value = player;
            option.textContent = player;

            select.appendChild(option);

        });

        select.value =
            _this.playerAssignments[
                role
            ];

        select.addEventListener(
            "change",
            function(){

                _this.playerAssignments[
                    role
                ] = this.value;

                refreshNames();

            }
        );

    });

}
    
function draw() {
    _this.sroot = Snap('#vbsvg');

    drawCourt();

    drawRotationControl();

    drawActionControl();

    drawPlayers();

    createRosterPanel();

    initialisePlayers();
}

function initialisePlayers() {

    _this.setterAt = 2;
    highlightRotation(2);
    move(_this.playerOffsetsBase[2],1);

}
        
  function controlSelect(setterPos, serving, action) {
    _this.controlTwoRcv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlTwoSrv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlOneRcv.attr({fill: _this.rotationControlBackgroundColourB});
    _this.controlOneSrv.attr({fill: _this.rotationControlBackgroundColourB});
    _this.controlSixRcv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlSixSrv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlFiveRcv.attr({fill: _this.rotationControlBackgroundColourB});
    _this.controlFiveSrv.attr({fill: _this.rotationControlBackgroundColourB});
    _this.controlFourRcv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlFourSrv.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlThreeRcv.attr({fill: _this.rotationControlBackgroundColourB});
    _this.controlThreeSrv.attr({fill: _this.rotationControlBackgroundColourB});

    var currentControl;
    if (setterPos === 1) {
      currentControl = serving ? _this.controlOneSrv : _this.controlOneRcv;
    }
    else if (setterPos === 2) {
      currentControl = serving ? _this.controlTwoSrv : _this.controlTwoRcv;
    }
    else if (setterPos === 3) {
      currentControl = serving ? _this.controlThreeSrv : _this.controlThreeRcv;
    }
    else if (setterPos === 4) {
      currentControl = serving ? _this.controlFourSrv : _this.controlFourRcv;
    }
    else if (setterPos === 5) {
      currentControl = serving ? _this.controlFiveSrv : _this.controlFiveRcv;
    }
    else if (setterPos === 6) {
      currentControl = serving ? _this.controlSixSrv : _this.controlSixRcv;
    }

    currentControl.attr({fill: _this.rotationControlColour});
    actionSelect(action);
  }

  function actionSelect(action) {
    _this.controlServeBase.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlServeServe.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlServeSwitch.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlReceiveBase.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlReceiveReceive.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlReceiveSet.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlReceiveHit.attr({fill: _this.rotationControlBackgroundColourA});
    _this.controlReceiveSwitch.attr({fill: _this.rotationControlBackgroundColourA});
    action.attr({fill: _this.rotationControlColour});
  }

  function toggleHighlightPlayer(player) {
    if (_this.highlightedPlayer === 0) {
      _this.highlightedPlayer = player;
      _this.highlightedPlayer.attr({fill: _this.playerColourHighlight});
    }
    else if (_this.highlightedPlayer === player) {
      _this.highlightedPlayer = 0;
      player.attr({fill: _this.playerColour});
    }
    else {
      _this.highlightedPlayer.attr({
        fill: _this.playerColour
      });
      _this.highlightedPlayer = player;
      player.attr({fill: _this.playerColourHighlight});
    }
  }

  function move(players, time) {
    if (_this.moving) {
      return false;
    }
    _this.moving = true;

    _this.setter.animate({ transform:'translate(' + players.s.x + ', ' + players.s.y + ')'}, time, null, donemove);
    _this.oppo.animate({ transform:'translate(' + players.o.x + ', ' + players.o.y + ')'}, time, null, donemove);
    _this.m1.animate({ transform:'translate(' + players.m1.x + ', ' + players.m1.y + ')'}, time, null, donemove);
    _this.m2.animate({ transform:'translate(' + players.m2.x + ', ' + players.m2.y + ')'}, time, null, donemove);
    _this.h1.animate({ transform:'translate(' + players.h1.x + ', ' + players.h1.y + ')'}, time, null, donemove);
    _this.h2.animate({ transform:'translate(' + players.h2.x + ', ' + players.h2.y + ')'}, time, null, donemove);
    return true;
  }
//  function goback() {
//    _this.setter.animate({ transform:'translate(0, 0)'}, 1000, null, donemove);
//  }
  function donemove() {
    _this.moving = false;
  }


  this.createSVG = function(options) {
    return createSVGDoc.call(this, options);
  };

  this.draw = function() {
    return draw.call(this);
  };
}