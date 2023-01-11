/*
Settings
*/
const INTERVAL = 1000;
const KINDLE_HOST = "read.amazon.com";

let setTimer = 60 * 30; // 30 minutes
let timerOn = false;
let isRunning = false;
let isHold = false;
/*
Utils
*/
function runEverySecInBackground(tab) {
  // update timer every second
  isRunning = true;
  setInterval(() => {
    setTimer--;
    chrome.action.setBadgeText({
      tabId: tab.id,
      text: setTimer.toString(),
    });
  }, INTERVAL);
}
/*
Chrome APIs
*/
/*
 run on installed
*/
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  chrome.action.setBadgeText({
    text: "0",
  });
});
/*
 run on updated
 if url is kindle url, then start count time
*/
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.log("tab updated", setTimer);
  let host = new URL(tab.url).host;
  console.log("host", host, "KINDLE_HOST", KINDLE_HOST);
  if (host != KINDLE_HOST && isRunning) {
    isRunning = false;
  }
  if (host == KINDLE_HOST && !isRunning) {
    runEverySecInBackground(tab);
  }
});
/*
  run on extension icon clicked
  reset the timer
*/
chrome.action.onClicked.addListener(async (tab) => {
  console.log("Extension clicked");
  setTimer = 60 * 30;
  chrome.action.setBadgeText({
    tabId: tab.id,
    text: setTimer.toString(),
  });
});
