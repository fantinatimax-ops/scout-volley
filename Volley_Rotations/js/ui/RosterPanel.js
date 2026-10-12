export default class RosterPanel {

    constructor(players) {

        this.players = players;

    }

    render() {

        const panel =
            document.getElementById(
                "roster-panel"
            );

        panel.innerHTML =
            "<h2>Rosa</h2>";

        this.players.forEach(player => {

            const div =
                document.createElement(
                    "div"
                );

            div.textContent =
                player.number +
                " - " +
                player.name;

            panel.appendChild(div);

        });

    }

}