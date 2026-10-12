export default class FormationPanel {

    constructor(players) {

        this.players = players;

    }

    render() {

        const container =
            document.getElementById(
                "formation-panel"
            );

        container.innerHTML = `

        <h2>Formazione</h2>

        <label>Palleggiatore</label>
        <select id="setter"></select>

        <label>Opposto</label>
        <select id="opposite"></select>

        <label>Centrale 1</label>
        <select id="middle1"></select>

        <label>Centrale 2</label>
        <select id="middle2"></select>

        <label>Schiacciatore 1</label>
        <select id="outside1"></select>

        <label>Schiacciatore 2</label>
        <select id="outside2"></select>

        `;

        const selects =
            container.querySelectorAll(
                "select"
            );

        selects.forEach(select => {

            this.players.forEach(player => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    player.id;

                option.textContent =
                    player.name;

                select.appendChild(
                    option
                );

            });

        });

    }

}