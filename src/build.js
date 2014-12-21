#!/usr/local/bin/node
/*
Documentation build script for my GitHub Pages website, running on NodeJS.

Requires Jade and JSON5.
*/

var fs = require("fs"),
		jade = require("jade"),
		JSON5 = require("json5");

var pageTemplate = jade.compileFile("templates/main.jade", {pretty: true});
var postTemplate = jade.compileFile("templates/post.jade", {pretty: true});

var files = [
	"dusks-own-serialization-format",
	"animated-tiles-in-dusk",
	"the-answer-to-the-evil-flickering-tile-lines-of-doom",
	"dusk-plus-mte"
]

var indexContent = pageTemplate(
	JSON5.parse(
		fs.readFileSync("data/index.json5", {encoding: "utf8"})
	)
);

fs.writeFile("../index.html", indexContent);

for (var i = 0; i < files.length; i++) {
	var data, content, outFileName;

	data = JSON5.parse(fs.readFileSync("data/posts/" + files[i] + ".json5", {encoding: "utf8"}));

	if (Object.prototype.toString.call(data) === "[object Array]") {
		for (var d = 0; d < data.length; d++) {
			var thisOutFileName = data[d].filename;
			content = postTemplate(data[d]);
			fs.writeFile("../posts/" + thisOutFileName + ".html", content);
		}
	} else {
		content = postTemplate(data);
		if (data.filename)
			fs.writeFile("../posts/" + data.filename, content);
		else
			fs.writeFile("../posts/" + files[i] + ".html", content);
	}
}