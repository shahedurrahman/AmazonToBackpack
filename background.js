/* global chrome */
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {
                        hostEquals: 'www.amazon.com'
                    }
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.pageAction.onClicked.addListener(function (tab) {
    var amazonUrl = tab.url;
    var asin = amazonUrl.match("/([a-zA-Z0-9]{10})(?:[/?]|$)");
    var backpackUrl = 'https://backpackbang.com/item/' + asin[1];

    chrome.tabs.create({ url: backpackUrl });
});
