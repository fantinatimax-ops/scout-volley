/*
 * serveScout.js
 * Volleyball Serve Scout
 */

function ServeScout() {

    this.events = [];
    var saved = localStorage.getItem(  "serveScoutEvents");

    if(saved){
        this.events = JSON.parse(saved);

    }

    this.currentPlayer = null;
    this.currentRotation = null;
    this.currentZone = null;

    this.init();
    this.refreshEvents();
    this.refreshStats();
}

/* =====================================================
 * INIT
 * ===================================================== */

ServeScout.prototype.init = function () {

    if (document.getElementById("serveScoutModal")) {
        return;
    }

    this.createModal();
};

/* =====================================================
 * MODAL
 * ===================================================== */

ServeScout.prototype.createModal = function () {

    var modal = document.createElement("div");

    modal.id = "serveScoutModal";

    modal.style.position = "fixed";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.background = "rgba(0,0,0,0.6)";
    modal.style.display = "none";
    modal.style.zIndex = "99999";

    modal.innerHTML = `

        <div
            style="
                width:95vw;
                max-width:1000px;
                height:92vh;
                margin:2vh auto;
                background:#ffffff;
                border-radius:10px;
                padding:15px;
                font-family:Verdana;
                overflow-y:auto;
                display:flex;
                flex-direction:column;
            "
        >

            <h2>Scout Battuta</h2>

            <div id="serveScoutInfo"
                 style="
                    margin-bottom:20px;
                    font-size:16px;
                 ">
            </div>

            <div
                id="serveScoutCourt"
                style="
                    width:100%;
                    max-width:700px;
                    margin:auto;
                    display:grid;
                    grid-template-columns:repeat(3,1fr);
                    grid-template-rows:repeat(3,140px);
                    gap:4px;
                "
            >
                        </div>

            <div
                style="
                    text-align:center;
                    margin-top:20px;
                "
            >

                <button id="serveBtnAce">
                    ACE
                </button>

                <button id="serveBtnGood">
                    BUONA
                </button>

                <button id="serveBtnError">
                    ERRORE
                </button>

                <button id="serveBtnClose">
                    CHIUDI
                </button>
                <button id="serveBtnExportJSON">
                    EXPORT JSON
                </button>

                <button id="serveBtnExportCSV">
                    EXPORT CSV
                </button>

                <button id="serveBtnUndo">
                    ANNULLA ULTIMA
                </button>

                <button id="serveBtnReset">
                    RESET TUTTO
                </button>
            </div>
            <hr>

            <h3>Ultimi eventi</h3>

            <div
                id="serveScoutEvents"
                style="
                    max-height:250px;
                    overflow-y:auto;
                    border:1px solid #cccccc;
                    margin-bottom:20px;
                "
            ></div>

            <hr>

            <h3>Statistiche Battuta</h3>

            <div id="serveScoutStats"></div>


        </div>

    `;

    document.body.appendChild(modal);

    var style = document.createElement("style");

        style.innerHTML = `

        #serveScoutModal button{

            min-width:140px;
            min-height:60px;

            font-size:20px;
            font-weight:bold;

            margin:5px;

            border-radius:8px;

            cursor:pointer;
        }

        `;

    document.head.appendChild(style);
    
    this.buildCourt();

    var self = this;

    document.getElementById("serveBtnAce").onclick = function () {
        self.saveServe("ACE");};

    document.getElementById("serveBtnGood").onclick = function () {
        self.saveServe("BUONA");};

    document.getElementById("serveBtnError").onclick = function () {
        self.saveServe("ERRORE");};

    document.getElementById("serveBtnClose").onclick = function () {
        self.close();};
    
    document.getElementById("serveBtnExportJSON").onclick = function(){
        self.downloadJSON();};

    document.getElementById("serveBtnExportCSV").onclick = function(){
        self.downloadCSV();};
    
    
    document.getElementById("serveBtnUndo").onclick = function(){
    self.undoLastEvent();};
    
    document.getElementById("serveBtnReset").onclick = function(){
    if(
        confirm("Cancellare tutte le battute registrate?")
    ){
        self.clear();
    }

};
    
};

/* =====================================================
 * COURT 3x3
 * ===================================================== */

ServeScout.prototype.buildCourt = function () {

    var court =
        document.getElementById(
            "serveScoutCourt"
        );

    court.innerHTML = "";

    /*
      Campo avversario ruotato 180°

      1 6 5
      2 3 4
      9 8 7
    */

    var zones = [

        { id: 1, color: "#ffd966" },
        { id: 6, color: "#ffd966" },
        { id: 5, color: "#ffd966" },

        { id: 2, color: "#f4cccc" },
        { id: 3, color: "#f4cccc" },
        { id: 4, color: "#f4cccc" },

        { id: 9, color: "#cfe2f3" },
        { id: 8, color: "#cfe2f3" },
        { id: 7, color: "#cfe2f3" }

    ];

    var self = this;

    zones.forEach(function(z){

        var cell =
            document.createElement(
                "div"
            );

        cell.className = "serveScoutZone";
        cell.dataset.zone = z.id;
        cell.style.height = "150px";
        cell.style.border = "3px solid white";
        cell.style.display = "flex";

        cell.style.alignItems = "center";
        cell.style.justifyContent = "center";
        cell.style.fontSize = "42px";
        cell.style.fontWeight = "bold";
        cell.style.cursor = "pointer";

        cell.style.background = z.color;
        cell.dataset.originalColor = z.color;

        cell.style.color = "#333";

        cell.innerHTML = z.id;

        cell.onclick = function(){

            self.selectZone(
                z.id
            );

        };

        court.appendChild(
            cell
        );

    });

};

/* =====================================================
 * ZONE
 * ===================================================== */

ServeScout.prototype.selectZone = function(zone){

    this.currentZone = zone;

    document
    .querySelectorAll(".serveScoutZone")
    .forEach(function(z){

        z.style.backgroundColor =
            z.dataset.originalColor;

        z.style.border =
            "3px solid white";

        z.style.color =
            "#333";
        z.style.boxShadow = "none";

    });

    var selected =
        document.querySelector(
            '[data-zone="' + zone + '"]'
        );

    selected.style.backgroundColor =
        "#ff4d4d";

    selected.style.color =
        "white";

    selected.style.border =
    "3px solid white";

    selected.style.boxShadow =
    "inset 0 0 0 4px #990000";
};

/* =====================================================
 * OPEN
 * ===================================================== */

ServeScout.prototype.open = function (playerName,rotation) {

    this.currentPlayer = playerName;
    this.currentRotation = rotation;
    this.currentZone = null;

    document.getElementById(
        "serveScoutInfo"
    ).innerHTML =

        "<b>Giocatore:</b> "
        + playerName
        + " | <b>Rotazione:</b> P"
        + rotation;
        +"<br><b>Avversario:</b> " +
        localStorage.getItem(
            "opponentName");

    var zones = document.querySelectorAll(".serveScoutZone");

    zones.forEach(function (z) { 
        z.style.backgroundColor =
        z.dataset.originalColor;

        z.style.border =
        "3px solid white";
    });

    document.getElementById(
        "serveScoutModal"
    ).style.display =
        "block";
};

/* =====================================================
 * CLOSE
 * ===================================================== */

ServeScout.prototype.close =function () {

    document.getElementById(
        "serveScoutModal"
    ).style.display =
        "none";
};

/* =====================================================
 * SAVE
 * ===================================================== */

ServeScout.prototype.saveServe =function (result) {

    if(
        result !== "ERRORE" &&
        this.currentZone === null
    ){

        alert("Seleziona una zona.");

        return;

    }

    var event = {

        id: Date.now(),
        opponent:localStorage.getItem("opponentName"),
        player: this.currentPlayer,
        rotation: this.currentRotation,
        
        zone: 
            result === "ERRORE"
                ? null
                : this.currentZone,
        
        result: result,
        timestamp: new Date().toISOString()

    };

    this.events.push(event);

    localStorage.setItem("serveScoutEvents",
    JSON.stringify(this.events));
    
    this.refreshEvents();
    this.refreshStats();

//    console.log(
//        "SERVE EVENT SAVED",
//        event
//    );
//    console.log("SALVO",event.player);

    this.close();
};

/* =====================================================
 * EVENTS TABLE
 * ===================================================== */

ServeScout.prototype.refreshEvents = function () {

    var div =
        document.getElementById(
            "serveScoutEvents"
        );

    if (
        this.events.length === 0
    ) {

        div.innerHTML =
            "Nessun evento";

        return;
    }

    var html = `

    <div
        style="
            max-height:250px;
            overflow-y:auto;
            border:1px solid #cccccc;
        "
    >

    <table
        style="
            width:100%;
            border-collapse:collapse;
        "
    >

    `;
//    var html =
//        "<table border='1' width='100%'>";

//    html += `
//        <tr>
//            <th>Giocatrice</th>
//            <th>Rotazione</th>
//            <th>Zona</th>
//            <th>Esito</th>
//        </tr>
//    `;

    html += `
    <thead>

    <tr>

        <th style="
            position:sticky;
            top:0;
            background:#4f81bd;
            color:white;
            padding:5px;
            z-index:1;
        ">
            Giocatrice
        </th>

        <th style="
            position:sticky;
            top:0;
            background:#4f81bd;
            color:white;
            padding:5px;
            z-index:1;
        ">
            Rot.
        </th>

        <th style="
            position:sticky;
            top:0;
            background:#4f81bd;
            color:white;
            padding:5px;
            z-index:1;
        ">
            Zona
        </th>

        <th style="
            position:sticky;
            top:0;
            background:#4f81bd;
            color:white;
            padding:5px;
            z-index:1;
        ">
            Esito
        </th>

    </tr>

    </thead>

    <tbody>
    `;
    
    this.events
        .slice()
        .reverse()
        .forEach(function (e) {

            html += `
            <tr>
                <td>${e.player}</td>
                <td>P${e.rotation}</td>
                <td>${e.zone}</td>
                <td>${e.result}</td>
            </tr>
            `;

        });

//    html += "</table>";
    html += `
    </tbody>
    </table>
    </div>
    `;

    div.innerHTML =
        html;
};


ServeScout.prototype.downloadCSV =function(){

    if(
        this.events.length === 0
    ){
        alert(
            "Nessuna battuta registrata"
        );
        return;
    }

    var csv =
        "Opponent,Player,Rotation,Zone,Result,Timestamp\n";

    this.events.forEach(function(e){

        csv +=

            '"' + e.opponent + '",' +
            '"' + e.player + '",' +

            e.rotation + "," +

            e.zone + "," +

            '"' + e.result + '",' +

            '"' + e.timestamp + '"' +

            "\n";

    });

    var blob =
        new Blob(

            [csv],

            {
                type:"text/csv;charset=utf-8;"
            }

        );

    var url =
        URL.createObjectURL(
            blob
        );

    var a =
        document.createElement(
            "a"
        );

    a.href = url;

    a.download =
        "serveScout.csv";

    a.click();

    URL.revokeObjectURL(
        url
    );
};

ServeScout.prototype.downloadJSON =function(){

    var data =
        JSON.stringify(
            this.events,
            null,
            4
        );

    var blob =
        new Blob(
            [data],
            {
                type:"application/json"
            }
        );

    var url =
        URL.createObjectURL(
            blob
        );

    var a =
        document.createElement(
            "a"
        );

    a.href = url;

    a.download =
        "serveScout.json";

    a.click();

    URL.revokeObjectURL(
        url
    );
};

/* =====================================================
 * STATISTICHE
 * ===================================================== */

ServeScout.prototype.getStats = function () {

    var stats = {};

    this.events.forEach(
        function (e) {

            if (
                !stats[e.player]
            ) {

                stats[e.player] = {

                    total: 0,
                    ace: 0,
                    good: 0,
                    error: 0,

                    zones: {

                        1:{ace:0,good:0,error:0},
                        2:{ace:0,good:0,error:0},
                        3:{ace:0,good:0,error:0},
                        4:{ace:0,good:0,error:0},
                        5:{ace:0,good:0,error:0},
                        6:{ace:0,good:0,error:0},
                        7:{ace:0,good:0,error:0},
                        8:{ace:0,good:0,error:0},
                        9:{ace:0,good:0,error:0}

                    }

                };

            }

            stats[e.player]
                .total++;

            if(e.result === "ACE"){

            stats[e.player].ace++;

            stats[e.player]
                .zones[e.zone]
                .ace++;

            }

            if(e.result === "BUONA"){

                stats[e.player].good++;

                stats[e.player]
                    .zones[e.zone]
                    .good++;

            }

            if(e.result === "ERRORE"){

                stats[e.player].error++;

                if(e.zone !== null){

                    stats[e.player]
                        .zones[e.zone]
                        .error++;

                }

            }

        }
    );

    return stats;
};

/* =====================================================
 * JSON EXPORT
 * ===================================================== */

ServeScout.prototype.exportJSON = function () {

    return JSON.stringify(
        this.events,
        null,
        4
    );
};

/* =====================================================
 * RESET
 * ===================================================== */

ServeScout.prototype.clear = function(){

    this.events = [];

    localStorage.removeItem(
        "serveScoutEvents"
    );

    localStorage.removeItem(
        "receiveScoutEvents"
    );

    localStorage.removeItem(
        "opponentName"
    );

    location.reload();

};
ServeScout.prototype.undoLastEvent = function(){

    if(
        this.events.length === 0
    ){
        return;
    }

    var last =
        this.events[
            this.events.length - 1
        ];

    if(
        !confirm(
            "Eliminare l'ultima battuta di "
            + last.player +
            "?"
        )
    ){
        return;
    }

    this.events.pop();

    localStorage.setItem(
        "serveScoutEvents",
        JSON.stringify(
            this.events
        )
    );

    this.refreshEvents();
    this.refreshStats();

};

ServeScout.prototype.refreshStats = function(){

    var stats =
        this.getStats();

    var div =
        document.getElementById(
            "serveScoutStats"
        );

    if(!div){
        return;
    }

    var html = "";
    
    var opponent =
        localStorage.getItem(
            "opponentName"
        ) || "Sconosciuta";

    html += `

    <div style="
        background:#4f81bd;
        color:white;
        padding:10px;
        border-radius:8px;
        margin-bottom:10px;
        font-size:18px;
        font-weight:bold;
    ">
        <div>
                Avversario:
                ${opponent}
            </div>

            <div>
                ${new Date()
                    .toLocaleDateString("it-IT")}
            </div>

        </div>

    `;

    for(var player in stats){

        var s = stats[player];

        var acePerc = 0;

        if(s.total > 0){

            acePerc = (
                s.ace * 100 /
                s.total
            ).toFixed(1);

        }

        html += `

        <div style="
            border:1px solid #ccc;
            border-radius:8px;
            padding:10px;
            margin-bottom:8px;
            background:#f8f8f8;
        ">

            <div style="
                font-size:20px;
                font-weight:bold;
                color:#4f81bd;
                margin-bottom:8px;
            ">
                ${player}
            </div>

            <div>Totali: ${s.total}</div>
            <div>Ace: ${s.ace}</div>
            <div>Buone: ${s.good}</div>
            <div>Errori: ${s.error}</div>
            <div>% Ace: ${acePerc}%</div>
            <div style="
                display:grid;
                grid-template-columns:repeat(3,1fr);
                gap:4px;
                margin-top:10px;
            ">

                ${buildZone(1,s)}
                ${buildZone(6,s)}
                ${buildZone(5,s)}

                ${buildZone(2,s)}
                ${buildZone(3,s)}
                ${buildZone(4,s)}

                ${buildZone(9,s)}
                ${buildZone(8,s)}
                ${buildZone(7,s)}

            </div>

        </div>

        `;
    }

    if(html === ""){
        html = "Nessuna statistica disponibile";
    }

    div.innerHTML = html;

};

function buildZone(zone,s){

    var z = s.zones[zone] || {
        ace:0,
        good:0,
        error:0
    };

    return `
    <div style="
        border:1px solid #cccccc;
        border-radius:4px;
        padding:4px;
        font-size:12px;
        text-align:center;
        background:white;
    ">

        <b>${zone}</b><br>

        A:${z.ace}<br>

        B:${z.good}<br>

        E:${z.error}

    </div>
    `;
}