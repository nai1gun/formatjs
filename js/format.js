/**
 * format.js v0.0.1
 * String format utility
 * @author Alexander Korvyakov <alexander@korvyakov.com>
 * Copyright (c) 2013 Alexander Korvyakov - released under MIT License
 * https://github.com/nai1gun/formatjs
 */
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}(\[[^\[\]]*\](\([^\(\)]*\))?)?/g, function(match, number) {
            var arg = args[number];
            if (typeof arg != 'undefined') {
                if (match.match(/{(\d+)}\[.*\](\(.*\))?/g)) {
                    // array formatter: {0}[...]
                    // array formatter with delimiter: {0}[...](...)
                    var itemContents = /{\d+}\[(.*)\]/g.exec(match)[1];
                    var delimiterExec = /{\d+}\[(.*)\]\((.*)\)/g.exec(match);
                    var delimiter = (delimiterExec && delimiterExec.length == 3)?
                        delimiterExec[2]: "";
                    if (!(arg instanceof Array)) {
                        arg = [arg];
                    }
                    var ret = "";
                    for (var i = 0; i < arg.length; i++) {
                        var argItem = arg[i];
                        // wildcard formatter: {0}[...{*}...]
                        var newItemContents = itemContents.replace(/{\*}?/g, argItem);
                        // named formatters: {0}[...{name}...]
                        var attrs = newItemContents.match(/{[a-zA-Z]+[a-zA-Z0-9]*}/g);
                        if (attrs) {
                            for (var j = 0; j < attrs.length; j++) {
                                var attr = attrs[j];
                                var attrNoBraces = attr.replace(/[{}]/g, "");
                                newItemContents = newItemContents.replace(
                                    attr, argItem[attrNoBraces]);
                            }
                        }
                        // Numbered formatter inside array formatter: {0}[...{1}...]
                        var numbers = newItemContents.match(/{[0-9]+}/g);
                        if (numbers) {
                            for (var k = 0; k < numbers.length; k++) {
                                var num = numbers[k];
                                var numNoBraces = num.replace(/[{}]/g, "");
                                newItemContents = newItemContents.replace(
                                    num, args[numNoBraces]);
                            }
                        }
                        ret += newItemContents;
                        if (i < arg.length-1) {
                            ret += delimiter;
                        }
                    }
                    return ret;
                } else {
                    // numbered formatter: {0}
                    return arg;
                }
            } else {
                // nothing
                return match;
            }
        });
    };
}