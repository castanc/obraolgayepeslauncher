var version = "5.29.4L"; 
var app = "SafeWords";
var landingLink = "https://sites.google.com/view/kryptifystage/home";

var linkGetIP = "https://api.ipify.org?format=json";

var linkApp = ""; 


var linkApp = "";
var ppTOSChanged = "Y";
var softwareID = "SafeWords"; 
var language = "en";

var environment = "Test QA";


function getLinkIP(){
  return linkGetIP;
}

function getEnvironment(){
  return environment;
}




function getUser() {
  return Session.getActiveUser().getEmail().replace("@gmail.com",""); 
}

function getLinkApp() {
  linkApp = "https://script.google.com/macros/s/AKfycbwYVWp_9QbXVag1nnfnCGU_8Urx64e-cPZe4lD68avdybicXqtFt7I8JbizxUPUdLBb/exec";
  linkApp = "";
  Logger.log("returning linkApp:" + linkApp);
  return linkApp; 
}




function getPPTOSChanged(){
  return ppTOSChanged;
}


function getPrice() {
  return "4.99";
}

function getVersion(){
  return version;
}


function doGet(e) {

  try
  {
    return HtmlService.createTemplateFromFile('index').evaluate();

  }
  catch(ex)
  {
    Logger.log("exception" + e.message);

  }
  return "";

}


function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
  303;
}

function translateTexts(obj) {
  Logger.log("translateTexts()");
  Logger.log(obj);
  let r = {};
  r.texts = []
  r.error = 0;
  r.langCode = obj.langCode;

  try {
    for (var i = 0; i < obj.texts.length; i++) {
      let o = {};
      let trans = "";
      if ( obj.langCode == "en")
        trans = obj.texts[i];
      else
        trans = LanguageApp.translate(obj.texts[i].text, 'en', obj.langCode);
        
      o.divId = obj.texts[i].divId;
      if (o.divId == "divLinkApp")
      {
        let user = getUser().toLowerCase().replace("@gmail.com","");
        o.text = `<a 
        href="${linkApp}?user="${user}">${trans}</a>`;
      }
      else
        o.text = `<p>${trans}</p`;
      r.texts.push(o);
    }
  }
  catch (ex) {
    r.error = -1;

  }
  return r;
}

function translateText(txt, langCode, divId) {
  let r = {}
  r.divId = divId;
  r.error = 0;
  r.trans = txt;
  try {
    r.trans = LanguageApp.translate(txt, 'en', langCode);
  }
  catch (ex) {
    r.error = -1;
    r.ex = ex;
  }
  Logger.log(r);
  return r;

}





