export default class Team {

    constructor(players) {

        this.players = players;

    }

    getPlayer(id) {

        return this.players.find(
            p => p.id === id
        );

    }

}