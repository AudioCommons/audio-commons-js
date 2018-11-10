# Intro

This is a Audio Common NPM package that provides access to the Audio Common ecosistem (through Audio Common Mediator)

It acesses v1 of the AC mediator

```sh

# get all PARENTS of a node in the map
curl -v -H "Content-Type: application/json" -X GET http://127.0.0.1:8001/search/parents/in-map/58068a04a37162160341d402/59d3fb284b077e6c540f758e

# get all CHILDREN nodes in the map
curl -v -H "Content-Type: application/json" -X GET http://127.0.0.1:8001/search/children/in-map/58068a04a37162160341d402/59d3bdcf0d1f92de005c85a9

# get all nodes in the map with matching CONTENT
# TODO
curl -v -H "Content-Type: application/json" -X GET http://127.0.0.1:8001/search/content/in-map/58068a04a37162160341d402/filters=name+content&tekst=Акорди

```

# Development

## Export

```sh
# It will create globaly accessable npm package `@audio-commons/mediator-express`
npm link
```

## Import

```sh
# Imports it in the local node_modules space of the hosting app
npm link @audio-commons/mediator-express
```
