
var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
  include: "*",
  contentScriptFile: [self.data.url("jquery-2.1.4.min.js"), self.data.url("script.js")],
  contentStyleFile: require("sdk/self").data.url("styles.css")
});

