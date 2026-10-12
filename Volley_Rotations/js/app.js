import { PLAYERS } from "./data/players.js";

import Team from "./models/Team.js";

import FormationPanel
from "./ui/FormationPanel.js";

import RosterPanel
from "./ui/RosterPanel.js";

const team =
    new Team(
        PLAYERS
    );

const formationPanel =
    new FormationPanel(
        team.players
    );

formationPanel.render();

const rosterPanel =
    new RosterPanel(
        team.players
    );

rosterPanel.render();