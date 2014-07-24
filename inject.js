var s = document.createElement("script");
s.src = chrome.extension.getURL("js/dostuff.js");
(document.head||document.documentElement).appendChild(s);