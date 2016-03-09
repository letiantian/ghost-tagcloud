# ghost-tagcloud
Generate tagcloud for [ghost](https://ghost.org/) blog. 

Ghost don't support tagcloud in its template engine yet. Thus the html of generated tagcloud can be written in a static page or themes.

## Usage

At first a json file which contains the all content in blog should be expored from Ghost. In the example below, the file is named `ghost-demo.json`.

```
node index.js  -f ghost-demo.json
node index.js  --list -f ghost-demo.json
```

## License
MIT