export default class FormationStorage {

    save(data) {

        localStorage.setItem(
            "formation",
            JSON.stringify(data)
        );

    }

    load() {

        return JSON.parse(

            localStorage.getItem(
                "formation"
            )

        );

    }

}