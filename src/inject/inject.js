var docElement = (document.head||document.documentElement);
var s2 = document.createElement("script");
s2.src = chrome.extension.getURL("js/canvasHandler.js");
docElement.insertBefore(s2, docElement.firstChild);