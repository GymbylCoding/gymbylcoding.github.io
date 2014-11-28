#!/usr/local/bin/node
/*
Documentation build script for my GitHub Pages website, running on NodeJS.

Requires Jade and JSON5.
*/

var fs = require("fs"),
		jade = require("jade"),
		JSON5 = require("json5");

var template = jade.compileFile("templates/main.jade", {pretty: true});

var files = [
	"index"
]

for (var i = 0; i < files.length; i++) {
	var data, content, outFileName;

	data = JSON5.parse(fs.readFileSync("data/" + files[i] + ".json5", {encoding: "utf8"}));

	if (Object.prototype.toString.call(data) === "[object Array]") {
		for (var d = 0; d < data.length; d++) {
			var thisOutFileName = data[d].filename;
			content = template(data[d]);
			fs.writeFileSync("../" + thisOutFileName + ".html", content);
		}
	} else {
		content = template(data);
		if (data.filename)
			fs.writeFileSync("../" + data.filename, content);
		else
			fs.writeFileSync("../" + files[i] + ".html", content);
	}
}