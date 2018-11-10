var puzzles = {
    name: "b-colabo.space",
    description: "Colabo.space ecosystem - backend",
    sudo: {
        "offer": false,
        "install": false,
        "build": false,
        "symlinks": false
    },
    dependencies: {
        "@colabo-utils/i-config": {},
        "@audio-commons/mediator-access": {}
    },
    offers: {}
}

exports.puzzles = puzzles;