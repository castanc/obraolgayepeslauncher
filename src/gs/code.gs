var version = "1.1.0L"; 
var app = "ObraOlgaYepes";
var landingLink = "https://sites.google.com/view/kryptifystage/home";
var linkGetIP = "https://api.ipify.org?format=json";
var linkApp = ""; 
var linkApp = "";
var ppTOSChanged = "Y";
var softwareID = "Obra Olga Yerpes"; 
var language = "en";
var environment = "Test QA";
var linkApp = "https://script.google.com/macros/s/AKfycbyP-mSAQIkPjEtL65zp52JtQyYcUagaX38aQlYCTFYx3YwwUkCcH6KEtUluRjyL5vsw/exec";
var linkVentas = "https://script.google.com/macros/s/AKfycbxP90ek13QOqkMZd315D3KjMw0xryRVjPclQqF5f82tOpgJps0RSDrHho4dXgvnl95FYA/exec"
;
 

             
              

function getLinkApp()
{
  Logger.log("linkApp:"+linkApp);
  return linkApp;
}

function getAdminApp()
{
  return linkVentas;
}



function getLinkIP(){
  return linkGetIP;
}

function getEnvironment(){
  return environment;
}




function getUser() {
  let user = Session.getActiveUser().getEmail(); 
  Logger.log("getUser():" + user);
  return user;
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





