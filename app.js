const start = document.getElementById("start");
const reset = document.getElementById("reset");
const pause = document.getElementById("pause");
const sessionBtn1 = document.getElementById("sessionBtn1"); //session time subtract  button
const sessionBtn2 = document.getElementById("sessionBtn2"); //session time add  button
const breakBtn1 = document.getElementById("breakBtn1"); //break time subtract  button
const breakBtn2 = document.getElementById("breakBtn2"); //break time add button

var sessionMin = 20,
  sessionSec = 00,
  breakMin = 5,
  breakSec = 00,
  breakId;
var sessionId,
  sessionNo = 1,
  bS,
  bM,
  sS,
  sM,
  ss,
  sm;
document.getElementById("time").innerText = sessionMin + ":" + sessionSec + "0";

start.addEventListener("click", function () {
  if (sM === undefined && sS === undefined) {
    sS = sessionSec;
    sM = sessionMin;
  }

  sessionBtn1.setAttribute("disabled", "true");
  sessionBtn2.setAttribute("disabled", "true");
  breakBtn1.setAttribute("disabled", "true");
  breakBtn2.setAttribute("disabled", "true");

  start.style.display = "none";
  pause.style.display = "unset";
  if (breakId == undefined) sessionId = setInterval(sessionTime, 1000);
  else breakTime();
});

function breakTime() {
  document.getElementById("time").style.color = "#c23e0e";
  
  breakId = setInterval(function () {
    if (bS == 00) {
      bS = 59;
      bM--;
    } else if (bS <= 59) bS--;

    if (bM == 0 && bS == 0) {
      clearInterval(breakId);
      breakId = undefined;
      sS = sessionSec + 1;
      sM = sessionMin;
      sessionNo++;
      setTimeout(function(){document.getElementById("lower-1").innerText = "Session " + sessionNo;},1000);
      sessionId = setInterval(sessionTime, 1000);
    }

    if (bM < 10) sm = "0" + bM;
    else sm = bM;
    if (bS < 10) ss = "0" + bS;
    else ss = bS;

    document.getElementById("time").innerText = sm + ":" + ss;
  }, 1000);
}

function sessionTime() {
  document.getElementById("time").style.color = "#01A1B1";
  if (sS == 00) {
    sS = 59;
    sM--;
  } else if (sS <= 59) sS--;

  if (sM == 0 && sS == 0) {
    //caling break timer when session time out
    clearInterval(sessionId);
    bS = breakSec + 1;
    bM = breakMin;
    breakTime();
    setTimeout(function(){document.getElementById("lower-1").innerText = "Break!";},1000);
  }

  if (sM < 10) sm = "0" + sM;
  else sm = sM;
  if (sS < 10) ss = "0" + sS;
  else ss = sS;
  if (sm == 0 && ss <= 59)
    document.getElementById("time").style.color = "#c23e0e";
  document.getElementById("time").innerText = sm + ":" + ss;
}

pause.addEventListener("click", function () {
  start.style.display = "unset";
  pause.style.display = "none";

  clearInterval(sessionId);
  clearInterval(breakId);
});

reset.addEventListener("click", function () {
  sessionMin = 20;
  sessionSec = 00;
  breakMin = 5;
  breakSec = 00;
  sessionNo = 1;
  breakId =sM=sS= undefined;

  clearInterval(sessionId);
  clearInterval(breakId);

  sessionBtn1.removeAttribute("disabled");
  sessionBtn2.removeAttribute("disabled");
  breakBtn1.removeAttribute("disabled");
  breakBtn2.removeAttribute("disabled");

  start.style.display = "unset";
  pause.style.display = "none";

  document.getElementById("session-time").innerText = sessionMin + " min";
  document.getElementById("break-time").innerText = breakMin + " min";
  document.getElementById("time").style.color = "#01A1B1";
  document.getElementById("time").innerText =
    sessionMin + ":" + sessionSec + "0";
});

sessionBtn1.addEventListener("click", function () {
  if (sessionMin > 1) {
    sessionMin = sessionMin - 1;
    if (sessionMin < 10) sm = "0" + sessionMin;
    else sm = sessionMin;
    sessionSec = 0;
    document.getElementById("session-time").innerText = sm + " min";
    document.getElementById("time").innerText = sm + ":" + sessionSec + "0";
  }
});

sessionBtn2.addEventListener("click", function () {
  if (sessionMin < 59) {
    sessionMin = sessionMin + 1;
    if (sessionMin < 10) sm = "0" + sessionMin;
    else sm = sessionMin;
    sessionSec = 0;
    document.getElementById("session-time").innerText = sessionMin + " min";
    document.getElementById("time").innerText = sm + ":" + sessionSec + "0";
  }
});

breakBtn1.addEventListener("click", function () {
  if (breakMin > 1) {
    breakMin = breakMin - 1;
    breakSec = 0;
    document.getElementById("break-time").innerText = breakMin + " min";
  }
});

breakBtn2.addEventListener("click", function () {
  if (breakMin < 59) {
    breakMin = breakMin + 1;
    breakSec = 0;
    document.getElementById("break-time").innerText = breakMin + " min";
  }
});
