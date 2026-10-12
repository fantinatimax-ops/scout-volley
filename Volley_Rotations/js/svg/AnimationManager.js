export default class AnimationManager {

    move(player, x, y) {

        player.animate(
            {
                transform:
                    `translate(${x},${y})`
            },

            500
        );

    }

}