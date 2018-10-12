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
        "@audio-commons/mediator-express": {}
    },
    offers: {
        "@audio-commons/mediator-access": {
            npm: "@audio-commons/mediator-access",
            path: "dev_puzzles/mediator/access"
        },
        "@audio-commons/mediator-express": {
            npm: "@audio-commons/mediator-express",
            path: "dev_puzzles/mediator/express"
        }
    }
}

exports.puzzles = puzzles;