# Appc License Generator #

This is to generate the license in csv format.

## Install
```bash
npm install -g gist:5599af06731ce4636c157855b02e08d4
```

## Uninstall
```bash
npm uninstall -g appc-license
```

## Usage
```bash
Usage: appc-license [options]

Options:

  -h, --help           output usage information
  -V, --version        output the version number
  -i, --in <filename>  merge <filename> json in the final output
  -s, --setjson        sets output as JSON
```

## Example Usage with an input JSON file and normal csv output
```bash
appc-license -i input.json > output.csv
```
Doing this will merge the output with the input file. How it works is it reads
the json file and merges the json to the final output json. For any conflicts,
the input file will have the final say.

## Example Usage with an output of JSON
```bash
appc-license -s > output.json
```
This is the same as above except that the tag `-s` gives the output as JSON.
This is useful to produce an initial JSON file that can be edited that can then
be merged to replace certain default values. The output file can then be used as
an input JSON file as above example usage.

## Headers guide
This is the current header.
```
Code Type,Code Module,License,"Source of Code (URL, company, etc)",Modified(Y or N),Nature of Modifications,Library Linked(dynamic or Static) Or Command Line Interface?,Pass Thru (Y or N),Notes/Use of Code in
```

## Example json file for json input
Format as follows
```javascript
{
  "moduleName@semver": {
      "licenses": "Licenses as a string", // Defaults to ''
      "repository": "Repo Location", // Defaults to ''
      "licenseFile": "License Location", // Defaults to ''
      "codeType": "JS, Java. Any type you want.", // Defaults to 'JS'
      "modified": "Any modifications?", // Defaults to 'N'
      "natureOfModifications": "Nature of modifications?", // Defaults to ''
      "libraryLinked": "static?", // Defaults to 'static'
      "passThru": "Yes or no?", // Defaults to 'N'
      "notesUse": "Any additional notes" // Defaults to ''
  },
  ...
}

```

Please see file `sample.json` for a better example of input.

## Example output
```
Code Type,Code Module,License,"Source of Code (URL, company, etc)",Modified(Y or N),Nature of Modifications,Library Linked(dynamic or Static) Or Command Line Interface?,Pass Thru (Y or N),Notes/Use of Code in
JS,"abbrev@1.0.7","ISC","https://github.com/isaacs/abbrev-js",N,,static,N,
JS,"ansi-regex@0.2.1","MIT","https://github.com/sindresorhus/ansi-regex",N,,static,N,
JS,"ansi-styles@1.1.0","MIT","https://github.com/sindresorhus/ansi-styles",N,,static,N,
JS,"appc-license@1.0.0","Apache-2.0","git+https://gisthub.com/5599af06731ce4636c157855b02e08d4",N,,static,N,
```
