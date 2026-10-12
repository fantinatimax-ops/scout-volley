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
    /*
    * fase corrente:
    * base
    * switch
    * serve
    * receive
    * set
    * hit
    */
  this.currentPhase = "base";
  this.liberoAttivo = true;

  this.roster = roster;

  this.opponentName =localStorage.getItem( "opponentName" );
    if(
        !this.opponentName
    ){
        this.opponentName =
            prompt(
                "Nome della squadra avversaria"
            );

        if(
            !this.opponentName
        ){
            this.opponentName =
                "Sconosciuta";
        }

        localStorage.setItem(
            "opponentName",
            this.opponentName
        );

    }
    
  this.serveScout = new ServeScout();
  this.receiveScout = new ReceiveScout();
    
  this.playerAssignments = {
        s: roster[0],
        o: roster[1],
        m1: roster[2],
        m2: roster[3],
        h1: roster[4],
        h2: roster[5],
        l: roster[9]
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
    
  function getDisplayedName(role){

    const libero = _this.playerAssignments.l;

    // C1
    if(role === "m1"){

        // P3 e P4 sempre libero
        if(
            _this.setterAt === 3 ||
            _this.setterAt === 4
        ){
            return libero.name;
        }

        // P5 libero tranne quando serve
        if(_this.setterAt === 5){

            if(_this.currentPhase === "serve"){
                return _this.playerAssignments.m1.name;
            }

            return libero.name;
        }

        return _this.playerAssignments.m1.name;
    }

    // C2
    if(role === "m2"){

        // P1 e P6 sempre libero
        if(
            _this.setterAt === 1 ||
            _this.setterAt === 6
        ){
            return libero.name;
        }

        // P2 libero tranne quando serve
        if(_this.setterAt === 2){

            if(_this.currentPhase === "serve"){
                return _this.playerAssignments.m2.name;
            }

            return libero.name;
        }

        return _this.playerAssignments.m2.name;
    }

    return _this.playerAssignments[role].name;
}
    
  function getWidth(options) {
    return 740
  }

  function getHeight(options) {
    return 650;
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

  function refreshNames(){

    
    _this.setterName.attr({text:getDisplayedName("s")});
    _this.oppoName.attr({text:getDisplayedName("o")});
    _this.m1Name.attr({text:getDisplayedName("m1")});
    _this.m2Name.attr({text:getDisplayedName("m2")});
    _this.h1Name.attr({text:getDisplayedName("h1")});
    _this.h2Name.attr({text:getDisplayedName("h2")});

//         console.log(
//        "Rotazione",
//        _this.setterAt,
//        "M1",
//        _this.playerAssignments.m1.name,
//        "M2",
//        _this.playerAssignments.m2.name,
//        "Visualizzati",
//        getDisplayedName("m1"),
//        getDisplayedName("m2")
//    );    
    
    
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
        stroke: '#00cc00',
        strokeWidth: 4,
        fill: _this.playerColour
    });

    _this.setterName = _this.sroot.text(75,50,_this.playerAssignments.s.name);
    _this.setterName.attr(playerNameStyle);
    _this.setter = _this.sroot.group(setterCircle,_this.setterName);
    _this.setter.attr({cursor: 'pointer'});

    var m1Circle = _this.sroot.circle(75,50,27);

    m1Circle.attr({
        stroke: '#000000',
        strokeWidth:4,
        fill:_this.playerColour
    });

    _this.m1Name = _this.sroot.text(75,50,_this.playerAssignments.m1.name);

    _this.m1Name.attr(playerNameStyle);
    _this.m1 = _this.sroot.group(m1Circle,_this.m1Name);
      
      
    var h1Circle = _this.sroot.circle(75,50,27);

    h1Circle.attr({
        stroke:'#4da6ff',
        strokeWidth:4,
        fill:_this.playerColour
    });

    _this.h1Name = _this.sroot.text(75,50,_this.playerAssignments.h1.name);
      
    _this.h1Name.attr(playerNameStyle);
    _this.h1 = _this.sroot.group(h1Circle, _this.h1Name);
    
      
    var oppoCircle = _this.sroot.circle(75,50,27);

    oppoCircle.attr({
        stroke:'#ffff00',
        strokeWidth:4,
        fill:_this.playerColour
    });

    _this.oppoName = _this.sroot.text(75,50, _this.playerAssignments.o.name);

    _this.oppoName.attr(playerNameStyle);
    _this.oppo = _this.sroot.group(oppoCircle, _this.oppoName);

    var m2Circle = _this.sroot.circle(75,50,27);

    m2Circle.attr({
        stroke:'#000000',
        strokeWidth:4,
        fill:_this.playerColour
    });

    _this.m2Name = _this.sroot.text(75,50,_this.playerAssignments.m2.name);
      
    _this.m2Name.attr(playerNameStyle);
    _this.m2 = _this.sroot.group( m2Circle, _this.m2Name);

    var h2Circle = _this.sroot.circle(75,50,27);

    h2Circle.attr({
        stroke:'#4da6ff',
        strokeWidth:4,
        fill:_this.playerColour
    });

    _this.h2Name = _this.sroot.text(75,50,_this.playerAssignments.h2.name);

    _this.h2Name.attr(playerNameStyle);
    _this.h2 = _this.sroot.group( h2Circle, _this.h2Name);

    _this.setter.click(function() {
        handlePlayerClick("s",setterCircle);
    });

    _this.oppo.click(function() {
        handlePlayerClick("o",oppoCircle);
    });

    _this.h1.click(function() {
        handlePlayerClick("h1",h1Circle);
    });

    _this.h2.click(function() {
        handlePlayerClick("h2",h2Circle);
    });

    _this.m1.click(function() {
        handlePlayerClick("m1",m1Circle);
    });

    _this.m2.click(function() {
        handlePlayerClick("m2",m2Circle);
    });
  }

  function getServerRole(){

    switch(_this.setterAt){

        case 1:
            return "s";

        case 2:
            return "m2";

        case 3:
            return "h2";

        case 4:
            return "o";

        case 5:
            return "m1";

        case 6:
            return "h1";

        default:
            return null;
    }
}
    
  function drawRotationControl() {

        var panel = _this.sroot.rect(
            0,
            0,
            140,
            500
        );
      
        var opponentTitle =
            _this.sroot.text(
                70,
                450,
                "AVVERSARIO"
            );

            opponentTitle.attr({

                fill:"white",
                stroke:"white",
                strokeWidth:1,
                "text-anchor":"middle",
                "font-family":"Verdana",
                "font-size":"12"

            });

            var opponentName =
                _this.sroot.text(
                    70,
                    470,
                    localStorage.getItem(
                        "opponentName"
                    ) || "Sconosciuta"
                );

            opponentName.attr({

                fill:"#000000",
                stroke:"000000",
                strokeWidth:1,
                "text-anchor":"middle",
                "font-family":"Verdana",
                "font-size":"11"
            });    

      

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
            title2,
            opponentTitle,
            opponentName
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

        _this.setterAt = position;

        refreshNames();

        for(var i = 1; i <= 6; i++){

            _this["controlP" + i].attr({
                fill:_this.rotationControlBackgroundColourB
            });

        }

        _this["controlP" + position].attr({
            fill:_this.rotationControlColour
        });

    }
        
  function drawActionControl() {

    var style = {
        fill: _this.rotationControlColour,
        stroke: 'none',
        'text-anchor':'start',
        'font-family':'Verdana',
        'font-size':'18'
    };

    _this.sroot.text(120,525,'Base').attr(style);
    _this.sroot.text(120,555,'Cambio').attr(style);
    _this.sroot.text(120,585,'Servizio').attr(style);
    _this.sroot.text(250,525,'Ricezione').attr(style);
    _this.sroot.text(250,555,'Alzata').attr(style);
    _this.sroot.text(250,585,'Attacco').attr(style);


    _this.controlServeBase =     _this.sroot.circle(100,520,_this.rotationControlCirleRadius);
    _this.controlServeSwitch =   _this.sroot.circle(100,550,_this.rotationControlCirleRadius);
    _this.controlServeServe =     _this.sroot.circle(100,580,_this.rotationControlCirleRadius);
    _this.controlReceiveReceive = _this.sroot.circle(230,520,_this.rotationControlCirleRadius);
    _this.controlReceiveSet =     _this.sroot.circle(230,550,_this.rotationControlCirleRadius);
    _this.controlReceiveHit =     _this.sroot.circle(230,580,_this.rotationControlCirleRadius);

      
    [
        _this.controlServeBase,
        _this.controlServeSwitch,
        _this.controlServeServe,
        _this.controlReceiveReceive,
        _this.controlReceiveSet,
        _this.controlReceiveHit

    ].forEach(function(c){

        c.attr({
            stroke:_this.rotationControlColour,
            strokeWidth:2,
            fill:_this.rotationControlBackgroundColourA,
            cursor:'pointer'
        });

    });      
      
        _this.controlServeServe.click(function() {
            _this.currentPhase = "serve";
            _this.liberoAttivo = false;
            if (
                move(_this.playerOffsetsServeServe[_this.setterAt],500)
            ) {
                refreshNames();
                actionSelect(_this.controlServeServe);
            }

        });
      
//    _this.controlServeBase.click(function() {
//        if (move(_this.playerOffsetsBase[_this.setterAt], 500)) {actionSelect(_this.controlServeBase);}});

    _this.controlServeBase.click(function() {
        _this.currentPhase = "base";
        if (
            move(_this.playerOffsetsBase[_this.setterAt],500)
        ) {
            refreshNames();
            actionSelect(_this.controlServeBase);
        }

    });
      
//    _this.controlServeServe.click(function() {
//        if (move(_this.playerOffsetsServeServe[_this.setterAt], 500)) {actionSelect(_this.controlServeServe);}});
    _this.controlServeSwitch.click(function() {
        _this.currentPhase = "switch";
        if (
            move(_this.playerOffsetsSwitchServe[_this.setterAt],500)
        ) {
            refreshNames();
            actionSelect(_this.controlServeSwitch);
        }

    });
      
//    _this.controlServeSwitch.click(function() {
//        if (move(_this.playerOffsetsSwitchServe[_this.setterAt], 500)) {actionSelect(_this.controlServeSwitch);}});

    _this.controlReceiveReceive.click(function() {
        _this.currentPhase = "receive";
        _this.liberoAttivo = true;
        if (
            move(_this.playerOffsetsReceiveReceive[_this.setterAt],500)
        ) {
            refreshNames();
            actionSelect( _this.controlReceiveReceive);
        }

    }); 
      
//    _this.controlReceiveReceive.click(function() {
//       if(move(_this.playerOffsetsReceiveReceive[_this.setterAt], 500)) {actionSelect(_this.controlReceiveReceive);}});
      
//    _this.controlReceiveSet.click(function() {
//        if (move(_this.playerOffsetsReceiveSet[_this.setterAt], 500)) {actionSelect(_this.controlReceiveSet);}});

     _this.controlReceiveSet.click(function() {
        _this.currentPhase = "set";
        _this.liberoAttivo = true; 
        if (
            move(_this.playerOffsetsReceiveSet[_this.setterAt],500)
        ) {
            refreshNames();
            actionSelect(_this.controlReceiveSet);
        }

    });     
      
//    _this.controlReceiveHit.click(function() {
//        if (move(_this.playerOffsetsReceiveHit[_this.setterAt], 500)) {actionSelect(_this.controlReceiveHit);}});
    _this.controlReceiveHit.click(function() {
        _this.currentPhase = "hit";
        _this.liberoAttivo = true;
        if (
            move(_this.playerOffsetsReceiveHit[_this.setterAt],500)
        ) {
            refreshNames();
            actionSelect(_this.controlReceiveHit);
        }

    });
  }

  function createSVGDocRoot(width, height) {

        _this.moving = false;

        var svgRoot =
            document.createElementNS(
                _this.NS,
                "svg"
            );

        svgRoot.setAttribute(
            "id",
            "vbsvg"
        );

        svgRoot.setAttribute(
            "width",
            width
        );

        svgRoot.setAttribute(
            "height",
            height
        );

        svgRoot.setAttribute(
            "viewBox",
            "0 0 740 650"
        );

        svgRoot.style.display =
            "block";

        return svgRoot;
    }

  function createSVGDoc(options) {

    _this.width = getWidth(options);
    _this.height = getHeight(options);
    var svgRoot = createSVGDocRoot(_this.width, _this.height);

    return svgRoot;
  }

  function createRosterPanel() {

    var panel =
        document.createElement("div");

    panel.id = "rosterPanel";

    panel.style.background =
        "#ffffff";

    panel.style.border =
        "1px solid #cccccc";

    panel.style.padding =
        "10px";

    panel.innerHTML = `

        <h3>Formazione</h3>

        <table style="width:100%">

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

            <tr>
                <td><b>L</b></td>
                <td><select id="player-l"></select></td>
            </tr>

        </table>

    `;

    document
        .getElementById(
            "rosterContainer"
        )
        .appendChild(panel);

    initialiseSelectors();
}
    
  function initialiseSelectors() {

        var roles = [
            "s",
            "o",
            "m1",
            "m2",
            "h1",
            "h2",
            "l"
        ];

        var allowedRoles = {

            s:  ["P"],
            o:  ["O"],
            m1: ["C"],
            m2: ["C"],
            h1: ["S"],
            h2: ["S"],
            l:  ["L"]

        };

        roles.forEach(function(role){

            var select =
                document.getElementById(
                    "player-" + role
                );

            select.innerHTML = "";

            _this.roster.forEach(function(player){

             var playerRoles =
                player.roles ||
                [player.role];

            if(

                playerRoles.some(function(r){
                    return allowedRoles[role]
                        .includes(r);
                })

            ){

                    var option =
                        document.createElement(
                            "option"
                        );

                    option.value =
                        player.name;

                    option.textContent =
                        player.name;

                    select.appendChild(
                        option
                    );

                }

            });

            select.value =
                _this.playerAssignments[
                    role
                ].name;

            select.addEventListener(
                "change",
                function(){

                    var selectedPlayer =
                        _this.roster.find(
                            function(player){

                                return (
                                    player.name ===
                                    select.value
                                );

                            }
                        );

                    _this.playerAssignments[
                        role
                    ] = selectedPlayer;

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

        [
            _this.controlServeBase,
            _this.controlServeSwitch,
            _this.controlServeServe,
            _this.controlReceiveReceive,
            _this.controlReceiveSet,
            _this.controlReceiveHit

        ].forEach(function(c){

            c.attr({
                fill:_this.rotationControlBackgroundColourA
            });

        });

        action.attr({
            fill:'#ffff00'
        });

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

  function handlePlayerClick(role,circle){

        if(
            _this.currentPhase === "serve" &&
            getServerRole() === role
        ){

            _this.serveScout.open(
                getDisplayedName(role),
                _this.setterAt
            );

            return;
        }

        if(
            _this.currentPhase === "receive"
        ){

            _this.receiveScout.open(
                getDisplayedName(role),
                _this.setterAt
            );

            return;
        }

        toggleHighlightPlayer(circle);
    }

  this.createSVG = function(options) {
    return createSVGDoc.call(this, options);
  };

  this.draw = function() {
    return draw.call(this);
  };

//function handleReceiveScout(role,circle){
//
//    if(
//        _this.currentPhase === "receive"
//    ){
//
//        _this.receiveScout.open(
//            getDisplayedName(role),
//            _this.setterAt
//        );
//
//        return;
//    }
//
//    toggleHighlightPlayer(
//        circle
//    );
//
//}
}