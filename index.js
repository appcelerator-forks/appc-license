#!/usr/bin/env node
var checker = require('license-checker');
var path = require('path');
var mkdirp = require('mkdirp');
var fs = require('fs');
var program = require('commander');
var _ = require('underscore');

var main = function() {
    program
        .version('1.0.2')
        .option('-i, --in <filename>', 'merge <filename> json in the final output')
        .option('-s, --setjson', 'sets output as JSON')
        .parse(process.argv);

    var args = {
        color: false,
        start: path.dirname('.'),
        customFormat: {
          "licenses": "",
          "repository": "",
          "licenseFile": "",
          "codeType": "JS",
          "modified": "N",
          "natureOfModifications": "",
          "libraryLinked": "static",
          "passThru": "N",
          "notesUse": ""
        }
    };
    checker.init(args, function(json, err) {
        if (err) {
            console.log('Error! There is no `package.json`.');
            process.exit(1);
        } else {
            var formattedOutput = '';
            var mergedJson;

            if (program.in) {
                var tempJson;
                try {
                    tempJson = JSON.parse(fs.readFileSync((program.in), 'utf8'));
                } catch (err) {
                    console.log('Error in JSON input file!!');
                    process.exit(1);
                }
                mergedJson = _.extend(json, tempJson);

            }
            if (!program.setjson) {
                formattedOutput = asCSV(mergedJson || json);
            } else {
                formattedOutput = JSON.stringify(mergedJson || json, null, 4);
            }

            console.log(formattedOutput);

        }
    });

}();

var asCSV = function(data) {
    var text = [ ];

    text.push(['Code Type',
    'Code Module',
    'License',
    '"Source of Code (URL, company, etc)"',
    'Modified(Y or N)',
    'Nature of Modifications',
    'Library Linked(dynamic or Static) Or Command Line Interface?',
    'Pass Thru (Y or N)',
    'Notes/Use of Code in'
    ].join(','));

    var codeType = 'JS',
    modified = 'N',
    natureofModifications = '',
    libraryLinked = 'static',
    passThru = 'N',
    notesUse = '';

    Object.keys(data).forEach(function(key) {
        var module = data[key],
        line = '';

        line = [
            '"' + (module.codeType || codeType) + '"',
            '"' + key + '"',
            '"' + (module.licenses || '') + '"',
            '"' + (module.repository || '') + '"',
            '"' + (module.modified || modified) + '"',
            '"' + (module.natureofModifications || natureofModifications) + '"',
            '"' + (module.libraryLinked || libraryLinked) + '"',
            '"' + (module.passThru || passThru) + '"',
            '"' + (module.notesUse || notesUse) + '"'
        ].join(',');

        text.push(line);
    });

    return text.join('\n');
};

module.exports = main;
