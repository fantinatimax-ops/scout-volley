export default class RotationEngine {

    constructor(
        renderer,
        positions
    ) {

        this.renderer =
            renderer;

        this.positions =
            positions;

    }

    rotate(position) {

        return this.positions[
            position
        ];

    }

}