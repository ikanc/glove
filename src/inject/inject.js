var docElement = (document.head||document.documentElement);
var s2 = document.createElement("script");
s2.src = chrome.extension.getURL("js/dostuff.js");
docElement.insertBefore(s2, docElement.firstChild);

var s1 = document.createElement("script");
s1.src = chrome.extension.getURL("js/pix-test.js");
docElement.insertBefore(s1, docElement.firstChild);
