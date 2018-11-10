var puzzles = {
    name: "audio-commons-js",
    description: "JavaScript set of tools and libraries for accessing Audio Commons Ecosystem",
    sudo: {
        "offer": false,
        "install": false,
        "build": false,
        "symlinks": false
    },
    dependencies: {
        "@colabo-utils/i-config": {},
        "@audio-commons/mediator-access": {},
        "@audio-commons/mediator-express": {},
        "@audio-commons/mediator-search": {},
        "@audio-commons/play-player": {}
    },
    offers: {
        "@audio-commons/mediator-access": {
            npm: "@audio-commons/mediator-access",
            path: "dev_puzzles/mediator/access/v2"
        },
        "@audio-commons/mediator-express": {
            npm: "@audio-commons/mediator-express",
            path: "dev_puzzles/mediator/express/v2"
        },
        "@audio-commons/mediator-search": {
            npm: "@audio-commons/mediator-search",
            path: "dev_puzzles/mediator/search"
        },
        "@audio-commons/play-player": {
            npm: "@audio-commons/play-player",
            path: "dev_puzzles/play/player"
        }
    }
}

exports.puzzles = puzzles;