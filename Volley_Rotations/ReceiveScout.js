/*
 * ReceiveScout.js
 * Volleyball Receive Scout
 */

function ReceiveScout() {

    this.events = [];
    var saved = localStorage.getItem(  "receiveScoutEvents");

    if(saved){
        this.events = JSON.parse(saved);

    }

    this.currentPlayer = null;
    this.currentRotation = null;
    

    this.init();

}

ReceiveScout.prototype.init = function () {

    if (document.getElementById("receiveScoutModal")) {
        return;
    }

    this.createModal();
};

ReceiveScout.prototype.createModal = function () {

    var modal = document.createElement("div");

    modal.id = "receiveScoutModal";

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
                width:500px;
                max-width:95vw;
                margin:10vh auto;
                background:#ffffff;
                border-radius:10px;
                padding:20px;
                font-family:Verdana;
                text-align:center;
            "
        >

            <h2>Scout Ricezione</h2>

            <div
                id="receiveScoutInfo"
                style="
                    margin-bottom:20px;
                    font-size:18px;
                "
            ></div>

            <div
                style="
                    display:grid;
                    grid-template-columns:1fr 1fr;
                    gap:10px;
                    margin-bottom:20px;
                "
            >

                <button id="receivePerfect">
                    PERFETTA
                </button>

                <button id="receivePositive">
                    POSITIVA
                </button>

                <button id="receiveNegative">
                    NEGATIVA
                </button>

                <button id="receiveError">
                    ERRORE
                </button>

            </div>

            <div>
                <button id="receiveBtnStats">
                    STATISTICHE
                </button>

                <button id="receiveBtnClose">
                    CHIUDI
                </button>
            </div>

        </div>

        `;

    document.body.appendChild(modal);

    var style = document.createElement("style");

        style.innerHTML = `

        #receiveScoutModal button{

            min-width:140px;
            min-height:70px;

            font-size:20px;
            font-weight:bold;

            border-radius:8px;

            cursor:pointer;

        }

        `;

    document.head.appendChild(style);    
   
    var self = this;

    document.getElementById("receivePerfect").onclick = function(){
        self.saveReceive("PERFETTA");};

    document.getElementById("receivePositive").onclick = function(){
        self.saveReceive("POSITIVA");};

    document.getElementById("receiveNegative").onclick = function(){
        self.saveReceive("NEGATIVA");};

    document.getElementById("receiveError").onclick = function(){
        self.saveReceive("ERRORE");};

    document.getElementById("receiveBtnClose").onclick = function () {
        self.close();};

    document.getElementById("receiveBtnStats").onclick = function(){
        self.showStats();};

};    

ReceiveScout.prototype.open = function(playerName,rotation){

    this.currentPlayer = playerName;
    this.currentRotation = rotation;

    document.getElementById(
        "receiveScoutInfo"
    ).innerHTML =

        "<b>" +
        playerName +
        "</b><br>" +

        "Rotazione P" +
        rotation;

    document.getElementById(
        "receiveScoutModal"
    ).style.display =
        "block";

};

ReceiveScout.prototype.close = function(){

    document.getElementById(
        "receiveScoutModal"
    ).style.display = "none";

};

ReceiveScout.prototype.saveReceive = function(result){

    var event = {

        id: Date.now(),
        
        opponent: localStorage.getItem("opponentName"),

        player: this.currentPlayer,

        rotation: this.currentRotation,

        result: result,

        timestamp:
            new Date()
            .toISOString()

    };

    this.events.push(event);

    localStorage.setItem(
        "receiveScoutEvents",
        JSON.stringify(this.events)
    );

    this.close();

};

ReceiveScout.prototype.clear = function(){

    this.events = [];

    localStorage.removeItem(
        "receiveScoutEvents"
    );

};

ReceiveScout.prototype.getStats = function(){

    var stats = {};

    this.events.forEach(function(e){

        if(!stats[e.player]){

            stats[e.player] = {

                total:0,
                perfect:0,
                positive:0,
                negative:0,
                error:0

            };

        }

        stats[e.player].total++;

        if(e.result === "PERFETTA"){
            stats[e.player].perfect++;
        }

        if(e.result === "POSITIVA"){
            stats[e.player].positive++;
        }

        if(e.result === "NEGATIVA"){
            stats[e.player].negative++;
        }

        if(e.result === "ERRORE"){
            stats[e.player].error++;
        }

    });

    return stats;

};

ReceiveScout.prototype.showStats = function(){

    var stats =
        this.getStats();

    var opponent =
        localStorage.getItem(
            "opponentName"
        ) || "Sconosciuta";

    var html = `

    <h2>Statistiche Ricezione</h2>

    <div style="
        background:#4f81bd;
        color:white;
        padding:10px;
        border-radius:8px;
        margin-bottom:15px;
    ">
        Avversario: ${opponent}
    </div>

    `;

    for(var player in stats){

        var s = stats[player];

        var perfectPerc = 0;

        if(s.total > 0){

            perfectPerc = (
                s.perfect * 100 /
                s.total
            ).toFixed(1);

        }

        html += `

        <div style="
            border:1px solid #cccccc;
            border-radius:8px;
            padding:10px;
            margin-bottom:10px;
        ">

            <div style="
                font-size:18px;
                font-weight:bold;
                color:#4f81bd;
            ">
                ${player}
            </div>

            <div>Ricezioni: ${s.total}</div>
            <div>Perfette: ${s.perfect}</div>
            <div>Positive: ${s.positive}</div>
            <div>Negative: ${s.negative}</div>
            <div>Errori: ${s.error}</div>
            <div>% Perfette: ${perfectPerc}%</div>

        </div>

        `;

    }

    var popup =
        window.open(
            "",
            "receiveStats",
            "width=700,height=800"
        );

    popup.document.write(`
        <html>
        <head>
            <title>
                Statistiche Ricezione
            </title>
        </head>
        <body style="
            font-family:Verdana;
            padding:20px;
        ">
            ${html}
        </body>
        </html>
    `);

};