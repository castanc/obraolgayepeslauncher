  //JS START ../common/parameters.js
  const LOCAL_USER = "ooyl";
  var paymentsUrl = "https://script.google.com/macros/s/AKfycbxZbg4szP1gHz7nNcw6GXH5rN5CEEggx96TmGc1FOT_2EJCbmjOUuh4ar6V_gd7gdk2WQ/exec";

  var versionNumber = "5.29";
  var softwareID = "Obra Olga Yepes";
  var environment = "Test";
  var clientId = "AVWcfGdcCdpt2YUV1PHIGxaSDxbPW6Kd5LV3VObh_Rl1c-0VlTR0ZscKZoaeDt2k8jebrs0hBpw4IjK2";
  var registerUrl = "https://script.google.com/macros/s/AKfycbxvK6g57HTBPiWpPKwmRKsTS3y0vjLUK93c8YMlw1lsZkwkWhDCzuhaiqmMIwveAUgf/exec";
  //var landingLink = "https://sites.google.com/view/kryptify/home";
  //var landingLink =  "https://sites.google.com/view/kryptifystage/home";
  var landingLink = "https://sites.google.com/view/safewords/home";
  //var landingLink =  "https://castanc.github.io/statictest/";
  //var textifyLink = "https://script.google.com/macros/s/AKfycbytk_HjrpZti0fcFI8CQkR_VOPqAlwZ2YJNPvFFwZIKpGxiii8p6YPeh9tFkbK8Fnb75g/exec";
  var textifyLink = "https://script.google.com/macros/s/AKfycbxMShQaIySnNjY2fvLjbDY_xUkdh-hiIYCBycztUH1zb5Ln6tmVPz5H9pkEXbckpbUrgQ/exec";
  var statusWarning = `<i class="fas fa-exclamation-triangle"></i>`;
  var statusSuccess = `<i class="fa fa-check"></i>`;
  var statusError = `<i class="fa fa-bomb"></i>`;
  var statusInfo = `<i class="fas fa-info-circle></i>`
  var classWarning = "alert alert-warning";
  var classSuccess = "alert alert-success";
  var classDanger = "alert alert-danger";
  var classInfo = "alert alert-info";
  var statusDanger = `<i class="fa fa-bomb"></i>`;

  var portrait = true;


  //JS END ../common/parameters.js

  //JS START ../common/config.js
  var totals = {};
  var config = {};


  function createConfig() {
      config = {};
      config.FirstUse = new Date();
      config.Version = versionNumber;
      config.LastReportDate = new Date();
      config.showMediaOnOpen = true;
      config.IP = IP;
      config.mobile = mobile;
      config.UserEmail = userEmail;
      config.MinPwdLen = 4;
      config.GenPwdLen = 64;
      config.SendInstructions = true;
      config.ShowLink = true;
      config.ServerId = 0;
      config.UserType = "F";
      config.FreeDays = 1;
      config.ShowHelp = true;
      config.CopyDecrypted = true;
      config.UseGreenKeyboard = mobile;
      config.ed = new Date();
      config.FreeDays = 0;
      config.DeviceId = createGuid();
      config.NewUser = true;
      config.Language = getBrowserLanguage();
  }


  async function createRecordFirstTime() {
      let rec = {};
      rec.IP = IP;
      rec.Width = window.innerWidth;
      rec.StartDate = getTimeStamp(new Date());
      //rec.EndDate = rec.StartDate;
      //rec.userAgent = navigator.userAgent;
      //rec.protocol = location.protocol;
      rec.Height = window.innerHeight;
      rec.UserEmail = userEmail;
      rec.Language = navigator.language;
      if (config.DeviceId.length == 0)
          config.DeviceId = createGuid();
      rec.DeviceId = config.DeviceId;
      if (mobile)
          rec.Mobile = 1;
      else
          rec.Mobile = 0;

      try {
          rec.RAM = navigator.deviceMemory;
      }
      catch (ex) {
          rec.RAM = 0;
      }
      return rec;
  }


  function setSettingsUI() {
      setField("txMinPwdLen", config.MinPwdLen.toString());
      setField("txGenPwdLen", config.GenPwdLen.toString());
      let e = document.getElementById("chbSendInstructions");
      e.checked = config.SendInstructions
      e = document.getElementById("chbSendLink");
      e.checked = config.ShowLink;
      e = document.getElementById("chbShowMedia")
      e.checked = config.showMediaOnOpen;
      e = document.getElementById("chbZoom")
      //TODO: While kb works
      e.checked = false; //config.UseGreenKeyboard;
      e = document.getElementById("chbCopy");
      e.checked = config.CopyDecrypted;
      kbForced = config.UseGreenKeyboard;

      //disableInputs(config.UseGreenKeyboard);
  }


  function createTotals() {
      totals = {};
      //RowId,FileId,ServerId,LastDate,Encryptions,Decryptions
      totals.ServerId = config.ServerId;
      totals.LastDate = new Date();
      totals.te = 0;
      totals.td = 0;
      return totals;
  }

  function updateTotals(enc, dec = 0) {
      totals.te += enc;
      totals.td += dec;
      totals.LastDate = new Date();
      saveTotals();
  }


  function loadTotals() {
      let data1 = localStorage.getItem("totals");
      if (!data1) {
          //recreate totals
          createTotals();
          saveTotals();
      }
      if (data1)
          try {
              totals = JSON.parse(data1);
          }
          catch (ex) {
              createTotals();
              saveTotals();
          }
      else
          createTotals();

  }


  function loadConfig() {
      config = null;
      let ou = btoa(userEmail);
      let d0 = localStorage.getItem(`D0${ou}`);
      let d1 = localStorage.getItem(`D1${ou}`);

      if (!d0 || !d1)
          return config;

      try {

          d1 = atob(d1);
          let p = d1.split(',');

          if (p.length > 0 && p[0] != userEmail)
              return config;

          let md5 = MD5(d0);
          if (md5 != p[2])
              return config;

          d0 = sjcl.decrypt(userEmail, d0);
          config = JSON.parse(d0);

          if (config.DeviceId != p[1])
              return null;

          if (!config.Language || config.Language.length == 0)
              config.Language = getBrowserLanguage();
      }
      catch (ex) {
          config = null;
      }
      return config;
  }


  function setSysInfoData() {

  }


  function initConfig() {
      config = loadConfig();
      if (!config)
          createConfig();

      if (!config.DeviceId || config.DeviceId.length == 0) {
          config.DeviceId = createGuid();
          console.log("recreating DeviceId:" + config.DeviceId);
      }
      if (config.UserType == "D" || location.protocol != "https:") {
          config.FreeDays = 0;
          config.UserType = "D";
          warnMessageT("Welcome. Decrypt only version.")
      }
      registerFirstTime();
      setSettingsUI();

      loadTotals();
      getLanguages();
      console.log("config.js.initConfig()", config);
      getLanguage(config.Language);
      Keyboard.close();
      helpVisible = config.ShowHelp;
  }



  function saveConfig() {
      let ou = btoa(userEmail);
      let result = sjcl.encrypt(userEmail, JSON.stringify(config));
      let md5 = MD5(result);
      localStorage.setItem("data", result);
      localStorage.setItem("data1", btoa(`${userEmail},${config.DeviceId},${md5}`));

      localStorage.setItem(`D0${ou}`, result);
      localStorage.setItem(`D1${ou}`, btoa(`${config.UserEmail},${config.DeviceId},${md5}`));
      //localStorage.setItem(`D1${ou}`, `${config.UserEmail},${config.DeviceId},${md5}`);

      setField("txUserId", userEmail);
  }

  function saveTotals() {
      if (totals.te + totals.td > 0)
          localStorage.setItem("totals", JSON.stringify(totals));
  }

  function getSettingsSave() {
      let result = false;
      if (validateMinPassword() && validateMaxPassword()) {
          let ctl = document.getElementById("chbSendInstructions");
          let val = ctl.checked;
          configChanged = configChanged || config.SendInstructions != val;
          config.SendInstructions = ctl.checked;

          ctl = document.getElementById("chbSendLink");
          val = ctl.checked;
          configChanged = config.ShowLink != val;
          config.ShowLink = val;

          ctl = document.getElementById("chbShowMedia");
          val = ctl.checked;
          configChanged = configChanged || config.showMediaOnOpen != val;
          config.showMediaOnOpen = val;

          // ctl = document.getElementById("chbHelp");
          // val = ctl.checked;
          // configChanged = configChanged || config.ShowHelp != val;
          // config.ShowHelp = val;
          // helpVisiable = config.ShowHelp;

          ctl = document.getElementById("chbCopy");
          val = ctl.checked;
          configChanged = configChanged || config.CopyDecrypted != val;
          config.CopyDecrypted = val;

          ctl = document.getElementById("chbZoom");
          val = ctl.checked;
          configChanged = configChanged || config.UseGreenKeyboard != val;
          config.UseGreenKeyboard = val;
          kbForced = config.UseGreenKeyboard;

          disableInputs(config.UseGreenKeyboard);

          if (configChanged) {
              saveConfig();
              showMessageTranslate("Configuration saved succesfully.");
              configChanged = false;
          }
          result = true;
      }
      return result;
  }


  function validateMinPassword(value) {
      let result = false;
      if (!value)
          value = getField("txMinPwdLen");

      pwdLen = Number(value);
      if (pwdLen >= 4) {
          configChanged = configChanged || config.MinPwdLen != pwdLen;
          config.MinPwdLen = pwdLen;
          result = true;
      }
      else
          showError("Minimum password lenght can not be less than 4 characters.");
      return result;
  }


  function validateMaxPassword(value) {
      let result = false;
      if (!value)
          value = getField("txGenPwdLen");

      let pwdLen = Number(value);
      if (pwdLen >= config.MinPwdLen && pwdLen <= 255) {
          configChanged = configChanged || config.GenPwdLen != pwdLen;;
          config.GenPwdLen = pwdLen;
          result = true;
      }
      else
          showError(`Max generated password length must be between ${config.MinPwdLen} and 255 characters.`);;

      return result;
  }



  function createIPRead() {
      var script = document.createElement("script");
      script.type = "text / javascript";
      script.src = "https://api.ipify.org?format=jsonp&callback=DisplayIP";
      document.getElementsByTagName("head")[0].appendChild(script);
  }


  function getIP(response) {
      document.getElementById("ipaddress").innerHTML = "Your IP Address is " + response.ip;
  }

  //JS END ../common/config.js

  //JS START ../common/translate.js
  var tob = {};    //translateObject
  var translations = [];
  var lastLanguage = "";
  var languages = [];



  function getBrowserLanguage() {
      let l = navigator.language.split("-");
      if (l.length > 0)
          return l[0];
      return "en";
  }

  function translateArray(txs, lang = "") {
      if (!txs || txs.length == 0)
          return txs;

      let result = txs;
      if (lang != "en") {
          txs.forEach(x => {
              let r = translations.filter(x => x[0] == txt);
              if (r.length > 0)
                  result.push(r[0][1]);
          });
      }

      let txt = "";
      result.forEach(x => {
          txt += x;
      });
      return txt;
  }


  function translate(txt, lang = "") {
      if (!txt || txt.length == 0)
          return txt;

      let result = [];
      if (lang != "en") {
          result = translations.filter(x => x[0] == txt);
          if (result.length > 0)
              txt = result[0][1]
          else {
              //console.error(`Translation not found ${lang} ${txt}`);
              console.log("translate NotFound ", txt);
          }
      }
      return txt;
  }


  function translatePage(langCode = "") {


      if (langCode.length == 0)
          if (config)
              langCode = config.Language;
          else
              langCode = getBrowserLanguage();


      transNotFound = langCode + "\n";

      console.log(`translatePage() langCOde:${langCode}`);
      let labels = document.getElementsByTagName("label");

      for (var i = 0; i < labels.length; i++) {
          labels[i].innerText = translate(labels[i].innerText, langCode);
      }

      let buttons = document.getElementsByTagName("button");

      for (var i = 0; i < buttons.length; i++) {
          buttons[i].innerText = translate(buttons[i].innerText, langCode);
      }

      let ctls = document.getElementsByTagName("input");
      for (var i = 0; i < ctls.length; i++) {
          if (ctls[i].placeholder && ctls[i].placeholder.length > 0)
              ctls[i].placeholder = translate(ctls[i].placeholder, langCode);

      }

      ctls = document.getElementsByTagName("textarea");
      for (var i = 0; i < ctls.length; i++) {
          if (ctls[i].placeholder && ctls[i].placeholder.length > 0)
              ctls[i].placeholder = translate(ctls[i].placeholder, langCode);
      }

      // if (transNotFound.length > 0) {
      //     localStorage.setItem("transNotFound", transNotFound);
      //     console.log("NOT FOUND TRANSLATIONS", transNotFound);
      // }
  }

  function failureGetLanguage(error) {
      showSpinner(false);
      console.log("failureGetLanguage() failure");
      showError("Server Error reading Language:" + error);
  }

  function successGetLanguageTable(result) {
      console.log("successGetLanguageTable()", result);
      if (config)
          lastLanguage = config.Language;
      translations = result;  //JSON.parse(result);
      if (config && translations.length > 0 && translations[0].length > 1) {
          localStorage.setItem(`language-${config.Language}`, JSON.stringify(translations));
      }
      translatePage();
  }

  function cleanQuotes(arr) {
      for (let i = 0; i < result.length; i++) {
          arr[i] = arr[i].replace("\"", "");
          arr[i] = arr[i].replace("\"", "");
          arr[i] = arr[i].replace("[", "");
      }
      return arr;
  }

  function successGetLanguages(result) {
      console.log("getLangugages()", result);
      let langs = result;
      languages = langs.split(",");
      //languages = cleanQuotes(languages);
      localStorage.setItem("languages", langs);
      let htmlLang = buildLanguageSelect();
      writeInnerHTML("userLang", htmlLang);
      showWarning(` ${languages.length} ${translate("languages updated.")}`);

  }

  function buildLanguageSelect(id = "", excludeLang = "", defaultLang = "") {
      if (!id || id.length == 0)
          id = "userLang";

      console.log("buildLanguageSelect()", languages);
      if (!defaultLang || defaultLang.length == 0)
          defaultLang = languageCode;

      let html = `<select name="${id}" id="${id}" class="field-size form-control" onchange="languageChanged(this.id,this.value)">`;
      for (let i = 0; i < languages.length; i++) {
          if (languages[i] != excludeLang) {
              let langName = getLanguageName(languages[i]);
              if (languages[i] != defaultLang)
                  html = html + `<option value="${languages[i]}">${langName}</option>`
              else
                  html = html + `<option value="${languages[i]}" selected>${langName}</option>`
          }
      }
      html = html + "</select>";
      return html;
  }

  function getLanguages() {
      let langs = localStorage.getItem("languages");

      if (!langs) {
          if (location.protocol == "https:") {
              google.script.run.withFailureHandler(failureGetLanguage)
                  .withSuccessHandler(successGetLanguages)
                  .getLanguages();
          }
          else {
              let langs = "en,es,pt,fr";
              languages = langs.split(",");
              localStorage.setItem("languages", langs);
          }
      }
      else {
          languages = langs.split(",");
      }
      let htmlLang = buildLanguageSelect();
      writeInnerHTML("userLang", htmlLang);

      return languages;
  }
  function successTranslateText(r) {
      console.log("successTranslateText");
      showSpinner(false);
      if (r.error == 0) {
          let ctl = div = document.getElementById(r.divId);
          if (ctl)
              div.innerHTML = `<p class="corners2 field-size">${r.trans}</p`;
      }
  }

  function successTranslateTexts(r) {
      console.log("successTranslateTexts", r);
      showSpinner(false);
      if (r.error == 0) {
          localStorage.setItem(`language-${r.langCode}`, JSON.stringify(r));
          for (let i = 0; i < r.texts.length; i++) {
              let ctl = div = document.getElementById(r.texts[i].divId);
              if (ctl)
                  div.innerHTML = r.texts[i].text;
          }
      }
  }


  function translateText(txt, langCode, divId) {
      showSpinner();
      console.log("translateText", langCode, divId);
      if (location.protocol == "https:" && langCode != "en") {
          showSpinner();
          google.script.run.withFailureHandler(failureGetLanguage)
              .withSuccessHandler(successTranslateText)
              .translateText(txt, langCode, divId);
      }
      else {
          let ctl = div = document.getElementById(divId);
          if (ctl)
              div.innerHTML = `<p class="field-size corners2">${txt}</p`;
          showSpinner(false);
      }

  }


  function translateTexts() {
      console.log("translateTexts");
      if (location.protocol == "https:" && tob.langCode != "en") {
          showSpinner();
          google.script.run.withFailureHandler(failureGetLanguage)
              .withSuccessHandler(successTranslateTexts)
              .translateTexts(tob);
      }
      // else {
      //     for (let i = 0; i < tob.texts.length; i++) {
      //         let ctl = div = document.getElementById(tob.texts[i].divId);
      //         if (ctl && tob.texts[i].divId != "divLinkApp")
      //             div.innerHTML = `<p class="field-size corners2">${tob.texts[i].text}</p`;

      //     }
      //     showSpinner(false);
      // }

  }


  function getLanguage(langCode = "en") {
      console.log(`getLanguage(${langCode})`);
      let textTranslations = "";
      if (langCode != "en") {
          textTranslations = localStorage.getItem(`language-${langCode}`);
          if (!textTranslations) {
              console.log("getting language from server");
              if (langCode != "en") {
                  if (location.protocol == "https:") {
                      google.script.run.withFailureHandler(failureGetLanguage)
                          .withSuccessHandler(successGetLanguageTable)
                          .getLanguageTable(langCode);
                  }
              }
              else {
                  console.log("reset language to en");
                  if (config) {
                      config.Language = "en";
                      saveConfig();
                  }
              }
          }
          else {
              console.log("build language from localstorage");
              lastLanguage = config.Language;
              translations = JSON.parse(textTranslations);
              translatePage();
          }
      }
      else {
          console.log("reset language to en");
          translations = [];
          if (config) {
              config.Language = langCode;
              saveConfig();
          }
          translatePage();
      }
  }

  //generic functionalioty to get translated very long texts more than 4000 bytes
  function failureGetText(error) {
      showSpinner(false);
      alert("error:" + error);
      console.log("failureGetText() failure");
      showError("Server Error reading PrivacyPolicy" + error);
  }


  function successGetText(result) {
      showSpinner(false);
      console.log("successGetText()", result);
      let text = replaceAll(result.text, "XXXX", softwareID);
      let div = `${result.div}`;
      writeInnerHTML(div, text);
      showControl(`${result.div}`);
      showMessage(result.message);
      localStorage.setItem(`${result.id}-${lang}`, text);
  }



  function getText(divId, textId, successMessage, callBack) {
      console.log(`getText(${divId},${textId},${successMessage}`);

      if (location.protocol == "https:") {
          showSpinner(true);
          callBack(divId, textId, successMessage, lang);
      }

  }




  //JS END ../common/translate.js

  //JS START ../common/utils.js
  function writeInnerHTML(divId, html) {
      let ctl = document.getElementById(divId);
      if (ctl)
          ctl.innerHTML = html;
      else
          console.error("writeInnerHTMKL() ERROR:", divId);
  }


  function testIcons() {

      let icons = [];
      icons.push(`<i class="fas fa-backspace"></i>`);
      icons.push(`<i class="material-icons">backspace</i>`);

      let html = "";
      icons.forEach(x => {
          html += x;
      })

      writeInnerHTML("testIcons", html);
  }

  function writeInnerText(divId, text) {
      let ctl = document.getElementById(divId);
      if (ctl)
          ctl.innerText = text;
      else
          console.error("writeInnerText() ERROR:", divId);
  }

  function clickButton(id) {
      console.log("clickButton " + id);
      let btn = document.getElementById(id);
      if (btn)
          btn.click();
  }

  function extract(text, start, end = "") {
      let word = "";
      try {
          let index = text.indexOf(start);
          let index2 = 0;
          while (index >= 0) {
              index += start.length;
              if (end.length > 0)
                  index2 = text.indexOf(end, index);
              else index2 = text.length;

              if (index2 > index) {
                  word = text.substr(index, index2 - index);
              }
              index = text.indexOf(start, index2 + end.length);
          }
      }
      catch (ex) {
          //return GSLog.handleException(ex, "Utils.replace()");
          //return text;
      }
      return word;
  }

  function setLabel(lblId, visible) {
      if (visible)
          showBlock(lblId);
      else
          hideControl(lblId);
  }


  function shareData(title, text, url) {
      if (navigator.share) {
          showMessage(translate("Sharing") + "...");

          if (shareFile != null) {
              console.log("sharingFile", shareFile);
              showMessage(translate("Sharing File") + "...");
              navigator.share({
                  title: title,
                  file: shareFile,
                  url: url,
              })
                  .then(() => showMessage(translate("Shared succesfully."), statusSuccess))
                  .catch((error) => {

                      showError("Error sharing:" + error);
                  });

          }
          else {
              console.log("sharing TEXT");
              showMessage(translate("Sharing text..."));
              navigator.share({
                  title: title,
                  text: text,
                  url: url,
              })
                  .then(() => showMessage(translate("Shared succesfully."), statusSuccess))
                  .catch((error) => {

                      showError("Error sharing:" + error);
                  });
          }
          canShare = false;
      }
      else {
          showError("Share not supported, use manual paste.");
          canShare = false;
      }

  }


  function verifyLabel(fieldId, lblId) {
      let value = getField(fieldId);
      let visible = value.length > 0;
      if (visible)
          showBlock(lblId);
      else
          hideControl(lblId);
  }


  function showSelected(itemId) {
      let anchor = document.getElementById(`A_${lastSelected}`);
      if (anchor != null)
          anchor.className = "";


      anchor = document.getElementById(`A_${value}`);
      if (anchor != null)
          anchor.className = "active";

      anchor = document.getElementById("A_dynSelect");
      if (anchor != null)
          anchor.click();

  }


  function setFocus(ctlId) {
      let x = document.getElementById(ctlId);
      if (x)
          x.focus();
  }

  function selectMenu(menuId) {
      newMenu = false;

      let menu2 = menus.filter(x => x.Id == menuId);
      if (menu2.length > 0)
          menu = menu2[0];
      else {
          menu = {};
          menu["Id"] = menuId;
          menu["currentIndex"] = 0;
          menu["currentText"] = "";
          menu["enumerator"] = "";
          menu["Options"] = [];
          newMenu = true;
      }

      return newMenu;
  }

  function buildMenuButtons(menuId, actions) {

      let html = "";
      let count = 0;
      let active = "";
      selectMenu(menuId);
      if (actions.length > 0) {
          menu.currentText = actions[0].caption;
          menu.currentIndex = 0;
      }

      actions.forEach(ac => {
          if (!ac.className)
              ac.className = "";

          if (!ac.pars || ac.pars.length == 0)
              ac.pars = `'${menuId}','${ac.id}',${count}`;
          else
              ac.pars = `'${menuId}','${ac.id}',${count},${ac.pars}`;

          if (!ac.kind)
              ac.kind = "";

          if (!ac.separator)
              ac.separator = "";


          ac["Index"] = count;
          count++;


          html = `${html}<button id="${ac.id}" type="button" class="btn ${ac.className} separation-btn" onclick="${ac.method}(${ac.pars})">${ac.caption}</button>${ac.separator}`;
      });

      let m = document.getElementById(menuId);
      m.innerHTML = html;

      menu["Options"] = actions;
      menu["currentText"] = section;
      if (newMenu) {
          menus.push(menu);
          console.log("newMenu:", menus);
      }
      showBlock(menuId);
  }


  function buildMenu(menuId, section, actions, icon, currentSelected = "") {

      selectMenu(menuId);
      menu.currentText = "";
      menu.currentIndex = 0;
      let html = "";
      let active = "";
      let firstOption = "";
      let count = 0;
      actions.forEach((ac) => {
          if (!ac.className)
              ac.className = "";

          if (!ac.pars || ac.pars.length == 0)
              ac.pars = `'${menuId}','${ac.id}',${count}`;
          else
              ac.pars = `'${menuId}','${ac.id}',${count},${ac.pars}`;

          if (!ac.kind)
              ac.kind = "";


          ac["Index"] = count;

          if (currentSelected.length > 0 && ac.caption == currentSelected) {
              active = "active";
              menu.currentText = ac.caption;
              menu.currentText = count;
          }
          else active = "";

          count++;

          html = html + `<a id="${ac.id}" class="${ac.className} ${active}"  href="javascript:void(0);" onclick="${ac.method}(${ac.pars})">${ac.caption}</a>`;
      });

      menu["Options"] = actions;
      if (menu.currentText == "") {
          menu.currentText = menu.Options[0].caption[0];
          menu.currentIndex = 0;
      }

      firstOption = `<a id="A_${menuId}" href="javascript:void(0);" onclick="selectNext('${menuId}')" class="responsive active">${currentSelected}</a>`;

      html = firstOption + html + ` <a id="A_${menuId}" href="javascript:void(0);" class="icon" onclick="changeMenuClass('${menuId}')">
<i class="${icon}"></i>`;

      let m = document.getElementById(menuId);
      if (m)
          m.innerHTML = html;


      if (newMenu) {
          menus.push(menu);
      }
      showBlock(menuId);
  }

  function buildMenuWithButtons(menuId, section, actions, icon, currentSelected = "") {

      selectMenu(menuId);
      menu.currentText = "";
      menu.currentIndex = 0;
      let html = "";
      let active = "";
      let firstOption = "";
      let count = 0;
      actions.forEach((ac) => {
          if (!ac.className)
              ac.className = "";

          if (!ac.pars || ac.pars.length == 0)
              ac.pars = `'${menuId}','${ac.id}',${count}`;
          else
              ac.pars = `'${menuId}','${ac.id}',${count},${ac.pars}`;

          if (!ac.kind)
              ac.kind = "";


          ac["Index"] = count;

          if (currentSelected.length > 0 && ac.caption == currentSelected) {
              active = "active";
              menu.currentText = ac.caption;
              menu.currentText = count;
          }
          else active = "";

          count++;

          html = html + `<button type="button" class="btn btn-primary button-separation form-control" id="${ac.id}" onclick="${ac.method}(${ac.pars})">${ac.caption}</button>`;
      });

      menu["Options"] = actions;
      if (menu.currentText == "") {
          menu.currentText = menu.Options[0].caption[0];
          menu.currentIndex = 0;
      }

      /*
      firstOption = `<a id="A_${menuId}" href="javascript:void(0);" onclick="selectNext('${menuId}')" class="responsive active">${menu.currentSelected}</a>`;
  
      html = firstOption + html + ` <a id="A_${menuId}" href="javascript:void(0);" class="icon" onclick="changeMenuClass('${menuId}')">
      <i class="${icon}"></i>`;
      */

      let m = document.getElementById(menuId);
      if (m)
          m.innerHTML = html;


      if (newMenu) {
          menus.push(menu);
      }
      showBlock(menuId);
  }


  function updateSelectedNav(menuId, text) {
      let x = document.getElementById(`A_${menuId}`);
      if (x) {
          let k2 = Keys.filter(x => !x.Key.includes("Parameter_") && x.Key.toUpperCase().includes(currentKey.toUpperCase()));
          if (k2.length > 0) {
              x.innerText = k2[0].Key;
              x.className = "active";
          }
      }
  }

  function updateSelectedNav2(menuId, text) {
      let x = document.getElementById(`A_${menuId}`);
      if (x) {
          let k2 = Keys.filter(x => !x.Key.includes("Parameter_") && x.Key.toUpperCase().includes(currentKey.toUpperCase()));
          if (k2.length > 0) {
              currentKey = k2[0].Key;
              showMessage(`Key ${currentKey} is selected`);
              x.innerText = k2[0].Key;
              x.className = "active";
          }
      }
  }




  function buildHeader(menuId, section, childDiv, icon, method = "changeMenuClass2") {

      let html = "";
      title = title.replace(" ", "");
      //onclick="enableSection2('${childDiv}')
      if (section.length > 0)
          html = `<a id="A_FIRST" href="javascript:void(0);" class="active">${section}</a>`;

      html = html + ` <a id="A_${menuId}" href="javascript:void(0);" class="icon" onclick="${method}('${menuId}','${childDiv}')">
<i class="${icon}"></i>`;

      let m = document.getElementById(menuId);
      m.innerHTML = html;
      showBlock(menuId);
      menu["Options"] = options;

      console.log("menu", menu);
  }


  function setField(fieldId, value) {
      let ctl = document.getElementById(fieldId);
      if (ctl)
          ctl.value = value;
      else showError(`setField(${fieldId}) invalid field`);
  }


  function setInnerText(divId, text) {
      let ctl = document.getElementById(divId);
      if (ctl)
          ctl.innerText = text;
      else console.error(`Can't find control ${divId}`);
  }

  function setTextArea(fieldId, value) {
      let ctl = document.getElementById(fieldId);
      if (ctl)
          ctl.innerText = value;
      else showError(`setField(${fieldId}) invalid field`);
  }


  function getField(fieldId) {
      let ctl = document.getElementById(fieldId);
      if (ctl)
          return ctl.value;

      return "";
  }




  function setValue(formName, fieldId, value) {
      try {
          var x = document.forms[formName][fieldId];
          if (x != undefined) {
              x.value = value;
          }
          else {
              console.error(`setValue() ${formName},${fieldId}, ${value}`, frm);
              addTrace(`Error ins etValue(): ${formName} ${fieldId} ${value}`);
          }
      }
      catch (ex) {
          console.error(`setValue() EXCEPTION ${formName},${fieldId}, ${value}, ${ex}`);
          addTrace(`EXCEPTION in setValue(): ${formName} ${fieldId} ${value} ${ex.message}`);
      }
  }

  function removeElement(divId) {
      let div = document.getElementById(divId);
      if (div)
          div.remove();
      //else console.log(`removeElemnt() Error removing ${divId}`)
  }


  function resetClass(ctlId, className) {
      let x = document.getElementById(ctlId);
      if (x)
          x.className = className;
  }

  function setClass(elemName, oldClass, newClass) {
      if (document.getElementById(elemName).classList.contains(oldClass))
          document.getElementById(elemName).classList.remove(oldClass);

      document.getElementById(elemName).classList.add(newClass);

  }

  function getChecked(controlName) {

      let result = false;
      let control = document.getElementById(controlName);
      result = (control && control.checked);
      return result;
  }

  function setChecked(controlName, value = true) {

      let control = document.getElementById(controlName);
      if (control)
          control.checked = value;

  }


  //https://stackoverflow.com/questions/24424214/disable-copy-or-paste-action-for-text-box/24424280
  function banKeyboardActions(controlName, restrictions) {
      return;
      //cut copy paste
      let control = document.getElementById(controlName);
      if (control) {
          try {
              control.bind(restrictions, function (e) {
                  e.preventDefault();
              });
          }
          catch (ex) {
              console.log("banKeyboardActions() EXCEPTION", ex);
          }
      }
  }


  //THIS CLOSES THE NAV BAR
  function changeMenuClass(menuId) {

      let x = document.getElementById(menuId);
      if (x) {
          if (x.className === "topnav") {
              x.className += " responsive";
          } else {
              x.className = "topnav";
          }
      }

  }


  //https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
  //not use chars used in file names, json, csv
  function makeid(length) {
      var result = '';
      //var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]-=~`<>,./?><":;' + "'";
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%()_+-=~.';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
              charactersLength));
      }
      return result;
  }


  function makeUserId(length) {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
              charactersLength));
      }
      return result;
  }


  function meetPasswordRules(value) {
      let upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let lowerCawe = 'abcdefghijklmnopqrstuvwxyz';
      let digits = "0123456789";
      let symbols = '!@#$%^&*()_+{}[]-=~`<>,./?><":;' + "'";
      let result = false;

      return result;
  }



  function makeidUpperCase(length) {
      let result = '';
      let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
              charactersLength));
      }
      return result;
  }

  function makeidLowerCase(length) {
      let result = '';
      let characters = 'abcdefghijklmnopqrstuvwxyz';
      let charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
              charactersLength));
      }
      return result;
  }
  function makeidDigits(length) {
      let result = '';
      let characters = '0123456789';
      let charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
              charactersLength));
      }
      return result;
  }

  function makeidSymbol(length) {
      let result = '';
      let characters = '!@#$%^&*()_+{}[]-=~`<>,./?><":;' + "'";
      let charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
              charactersLength));
      }
      return result;
  }




  function getValue(formName, fieldId) {
      let x = document.forms[formName][fieldId];
      if (x == undefined)
          return "";
      else return x.value;
  }



  function showDiv(divId, value) {
      let div = document.getElementById(divId);
      if (div != undefined) {
          if (value)
              div.style.display = "block";
          else
              div.style.display = "none";
      }
      //else console.log(`div ${divId} not found`);
  }

  function forceDark() {
      let inputs = document.querySelectorAll('input');
      inputs.forEach(inp => {
          inp.classList.add("forceDarki");
      })

      let textareas = document.querySelectorAll('textarea');
      textareas.forEach(ta => {
          ta.classList.add("forceDark");
      })
  }

  function disableButtons(state) {
      const buttons = document.querySelectorAll('button');
      for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = state;
      };

  }

  function disableCtl(ctlName, state = false, bg = "black", tx = "white") {
      let ctl = document.getElementById(ctlName);
      if (ctl) {
          ctl.disabled = state;
          if (!state) {
              ctl.style.backgroundColor = bg;
              ctl.style.color = tx;
          }
      }

  }


  async function readJson(url) {
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error("HTTP error " + response.status);
              }
              let data = response.json();
              return data;
          })
          .then(json => {
              return json;
          })
          .catch(function () {
              this.dataError = true;
          })
  }

  function enableCtl(ctlName, state = true) {
      let ctl = document.getElementById(ctlName);
      ctl.disabled = !state;

  }


  function showMessageAt(divId, msg, status = "") {
      let div = document.getElementById(divId);
      if (div) {
          if (msg.length > 0)
              div.innerHTML = `<div class="alert alert-success">
  <strong>${status}</strong> ${msg}
</div>
`;
          else
              div.innerHTML = "";
      }

  }

  function showMessageTranslate(msg, title = "") {
      if (title.length == 0)
          title = statusSuccess;
      msg = translate(msg);
      let div = document.getElementById("result");
      if (msg.length > 0)
          div.innerHTML = `<div class="alert alert-success message-size">
  <strong>${title}</strong> ${msg}
</div>
`;
      else
          div.innerHTML = "";
  }



  function showMessage(msg, title = "") {
      if (title.length == 0)
          title = statusSuccess;
      let div = document.getElementById("result");
      if (msg.length > 0)
          div.innerHTML = `<div class="alert alert-success message-size">
  <strong>${title}</strong> ${msg}
</div>
`;
      else
          div.innerHTML = "";
  }


  function showMessage2(msg, divName = "result", title = "statusSuccess") {

      let div = document.getElementById(divName);
      if (msg.length > 0)
          div.innerHTML = `<div class="alert alert-success message-size">
  <strong>${title}</strong> ${msg}
</div>
`;
      else
          div.innerHTML = "";
  }


  function showInfo(msg, title = "") {
      if (title.length == 0)
          title = `<i class="fas fa-info-circle"></i>`;
      let div = document.getElementById("result");
      if (msg.length > 0) {
          msg = translate(msg);
          div.innerHTML = `<div class="alert alert-info field-size">
  <strong>${title}</strong> ${msg}
</div>
`;
      }
      else
          div.innerHTML = "";


  }


  function showInfoAt(divId, msg, title = "") {
      if (title.length == 0)
          title = `<i class="fas fa-info-circle"></i>`;
      let div = document.getElementById(divId);
      if (div) {
          if (msg.length > 0) {
              msg = translate(msg);
              div.innerHTML = `<div class="icon-size alert alert-info field-size">
  <strong>${title}</strong> ${msg}
</div>
`;
          }
          else
              div.innerHTML = "";
      }
      else console.error(`Invalid div ${divId}`);


  }


  function showError(msg) {
      lastError = msg;
      if (msg.length > 0)
          console.error("ERROR:", msg);

      let div = document.getElementById("result");
      //div.innerHTML = `<h4 class="text-danger text-center footer-size">${msg}</h4`;
      div.innerHTML = `<div class="alert alert-danger field-size">
<strong>${statusError}</strong> ${msg}
</div>`;
  }

  function debugMessage(msg) {
      console.log("debugMessage()", showDebug, msg);
      if (showDebug) {
          let div = document.getElementById("debug");
          if (div)
              div.innerHTML = `<h3 class="text-warning  text-center ">${msg}</h3`;
      }

  }


  function showWarning(msg, title = "", divId = "result") {
      if (title.length == 0)
          title = statusWarning;
      let div = document.getElementById(divId);
      //div.innerHTML = `<h4 class="text-warning text-center footer-size">${msg}</h4`;
      div.innerHTML = `<div class="alert alert-warning">
<strong>${title}</strong>${msg}
</div>`;
  }


  function showMessageIn(divName, msg) {
      let div = document.getElementById(divName);
      if (div)
          div.innerHTML = `<h3 class="row text-info">${msg}</h3>`;
      else
          showError(`Invalid div: [${divName}]`)
      if (msg.length > 0)
          showBlock(divName);
      else
          hideControl(divName);

  }

  async function readTextFile() {

      try {
          fileHandle = await window.showOpenFilePicker();
          const file = await fileHandle[0].getFile();
          data = await file.text();
      }
      catch (ex) {
          console.error("readTextFile() EXCEPTION", ex);
          data = "";
      }

      return data;


  }



  function setText(ctlId, text) {
      let control = document.getElementById(ctlId);
      if (control)
          control.innerText = text;
      else console.error("setText() error:", ctlId, text);
  }



  function saveBlobToDisk(fileName, dataBlob) {
      //    selectNavOption(btnId);
      showError("");

      if (supported && location.protocol == "https:" && !fileHandle) {
          fileHandle = getNewTextFileHandle();
      }

      globalResult = false;
      let anchor = downloadBlob(dataBlob, fileName);

      if (anchor != null) {
          globalResult = false;
          result = false;
          anchor.click();
      }

      if (globalResult)
          showMessage(translate("The data was saved succesfully"));
      else
          showMessage(translate("The data was saved to your Downloads folder"));
  }


  function textToBlob(text) {

      let myblob = new Blob([text], {
          type: 'text/plain'
      });
      return myblob;
  }



  async function openImageFile() {
      clear(false);
      //Keyboard.close();
      hideControl("divHelp");
      showMessage("");
      hideControl("divInfo");
      hideControl("divSetttings");
      hideControl("divView");
      hideControl("divHide");
      hideTitle();
      initialIcons = false;

      if (settingsOpen)
          toggleSettings();

      if (sysInfoOpen)
          toggleSysInfo();

      hideControl("bigFile");
      //hideControl("divInputText");
      fileMode = "Binary";
      manualText = false;
      data = "";


      // let fctl = document.getElementById("files");
      // fctl.click();
      // return;


      //TODO: oldschool way, fileAPI not supported in iframe
      //ONCLICK IS NULL 2ND TIME
      readBase64 = true;
      let fctl = document.getElementById("files");
      fctl.click();
      //todo: new check if required
      if (encryptedFile)
          gotoPage(2);
      return;

      // if (supported) {
      // 	await openImageFileAPI().then(result => {
      // 		//showData();
      // 	})
      // }
      // else {
      // 	readBase64 = true;
      // 	let fctl = document.getElementById("files");
      // 	fctl.click();
      // }
  }





  //pdf messages
  function handleMessage(msg) {
      alert('got message ' + msg);
  }
  function setupHandler() {
      document.getElementById("myPdf").messageHandler = { onMessage: handleMessage };
  }

  function getSizeText(len) {
      let val = len;
      let legend = "bytes.";
      let msg = "";
      if (val > 1024 && val < 1024 * 1024) {
          val = Math.round(val / 1024);
          legend = "KB.";
      }
      else if (val > 1024 * 1024) {
          legend = "MB.";
          val = Math.round(val) / (1024 * 1024);
      }
      let txt = val.toString();
      let ix = txt.indexOf(".");
      if (ix >= 0 && txt.length > ix + 2)
          txt = txt.substr(0, ix + 2);
      msg = `${txt} ${legend}`;
      return msg;
  }

  function isEncryptedData() {
      encryptedFile = data.includes(softwareID) || (data.includes("data:") && data.includes(`data2:`) && data.includes(`data3:`));
      if (!encryptedFile)
          encryptedFile = data.includes(softwareID) || (data.includes(`"data":`) && data.includes(`"data2":`) && data.includes(`"data3":`));

      return encryptedFile;
  }



  function autoClickLink(url) {
      let a = document.createElement("a");
      a.href = url;;
      a.click();

  }

  function getIsDesktop() {
      return !mobile;
  }


  function getIsGoogleVer() {
      isGoogleVer = window.location.href.includes("script.google.com") && location.protocol == "https:"
      return isGoogleVer;
  }

  function confirmDownload() {

      if (!fileName)
          fileName = "download";
      gotoPage(4);
      hideControl("divDownload");
      hideControl("divFileInfo");
      hideControl("divPaste");
      hideControl("divOpenFile");
      showControl("divDownload2");
      setField("txFileName", fileName);
      setCurrentField("txFileName");
      //showMenu();
      addMessageT("Confirm Download/Save!. File will be unencrypted. Dispose properly.", statusDanger, classDanger);
      renderMessages();
  }

  function doDownload() {
      clearMessages();
      let fn = getField("txFileName");
      if (fn.length > 0) {
          if (encryptionDone) {
              fn = fn.toLowerCase().replace(ext2, "");
              if (!fn.toLowerCase().includes(ext1))
                  fn = fn + ext1;
              fn = fn + ext2;
          }
          fileName = fn;
      }

      hideControl("PAGE4");
      if (data.length > 0) {
          //downloadDataFile(data, fileName);
          //todo: not downloading text files
          if (usingFile) {
              if (selFile.type.includes("pdf"))
                  downloadFile();
              else (selFile.type.includes("text"))
              downloadDataFile(data, fileName);
          }
          else {
              downloadDataFile(data, fileName);
          }

          hideControl("divDownload");
          showMessage(`${saveIcon} ${translate("OK. Saved to Downloads folder")}`);
      }
      else showError("No data to download.");
  }


  async function testRemote() {
      let url = "https://drive.google.com/file/d/1DtZwzILQNZwKH-e-kHJ5_pucflS-Anac/view?usp=sharing";
      //await openRemote("https://drive.google.com/file/d/1DtZwzILQNZwKH-e-kHJ5_pucflS-Anac/view?usp=sharing");
      try {
          // GET request
          const response = await fetch(url, {
              method: 'GET',
              mode: 'no-cors'
          })

          if (response.status === 200) {
              const data = await response.json();
              this.listApp = data;
              this.listApp.forEach(app => {
                  if (app.status === "DISCONNECTED") {
                      this.listDecApp.push(app);
                  }
              });
              this.nbr = this.listDecApp.length;
          } else {
              if (response.status === 400) this.errors = ['Invalid app_permissions value. (err.400)'];
              if (response.status === 401) this.errors = ['Acces denied. (err.401)'];
          }
      } catch (error) {
          console.log(error);
          this.errors = ["Une erreur est survenue lors de la récupération des informations sur le serveur."]
      }

  }



  function getFileInstructions() {
      let instructions = "";
      if (usingFile)
          instructions = `
Instructions:
2. Locate file with extension Crypti.txt
1. Go to Link
2. Open file
3. Enter Password.
4. Decrypt.

Link: ${landingLink}\n`;


      return instructions;

  }


  function getInstructions() {
      let instructions = "";
      if (config.SendInstructions)
          if (usingFile)
              instructions = `
Instructions:
1. Go to Link
2. Open this file
3. Enter Password.
4. Decrypt.\n`;
          else
              instructions = `
Instructions:
1. Copy Message in Source
2. Go to Link
3. Paste Message
4. Enter Password
5. Decrypt.\n`;


      return instructions;

  }



  async function openRemote(url) {
      fetch(url)
          .then((response) => {
              return response.json();
          })
          .then((data) => {
              let authors = data;

              authors.map(function (author) {

              });
          })
  }


  function showSpinner(value = true, msg = "Loading...") {
      if (value) {
          hideControl("main");
          showInfo(msg);
          showBlock("spinner");
      }
      else {
          showBlock("main");
          hideControl("spinner");
          showMessage("");
      }
  }







  function handleError(msg) {
      showError(msg);
      if (page == 2)
          nextPage();
  }







  async function openFile(divId) {
      gotoPage(1);
      data = "";
      setField("inputText", "");
      fileMode = "Text";
      readBase64 = false;
      if (supported) {
          await openTextFileAPI2().then(result => {
              // showData();
              // nextPage();
          })
      }
      else
          showBlock(divId);
  }


  async function openEncryptedFile(divId) {
      if (supported) {
          await openTextEncryptedFileAPI2().then(result => {
              showData();
          })
      }
      else
          showBlock(divId);
  }


  //todo: to test with different icons in the same page
  function toggleIcon(statusVar, ctlId, originalStateClass = "fa-eye", toggleClass = "fa-eye-slash") {
      //fa-eye-slash}
      statusVar = !statusVar
      const ctl = document.getElementById(ctlId);

      ctl.addEventListener('click', function (e) {
          // toggle the type attribute
          if (statusVar)
              this.classList.toggle(originalStateClass);
          else
              this.classList.toggle(toggleClass);
      });
  }

  async function openTextFile(divId) {
      fileMode = "Text";
      if (supported) {
          await openTextFileAPI().then(result => {
              showData();
              hideControl("fileSelection");
          })
      }
      else
          showBlock(divId);
  }


  //this only works under https

  function openBinFile(fieldId) {
      var input = document.getElementById(fieldId).files;
      var fileData = new Blob([input[0]]);

      var reader = new FileReader();
      reader.readAsArrayBuffer(fileData);
      reader.onload = function () {
          let arrayBuffer = reader.result
          let bytes = new Uint8Array(arrayBuffer);
          return bytes;
      }
      return [];
  }

  async function getNewTextFileHandle(ext = ".txt") {

      if (!supported)
          return null;

      const options = {
          types: [
              {
                  description: 'Text Files',
                  accept: {
                      'text/plain': [ext],
                  },
              },
          ],
      };
      const handle = await window.showSaveFilePicker(options);
      return handle;
  }

  function doToast(divId, action) {
      let div = document.getElementById(divId);
      if (div)
          div.toast(action);
  }

  function copyToClipboardNew(message, showMsg = false) {
      navigator.clipboard.writeText(message)
          .then(() => {
              canCopy = true;
              // if (showMessage)
              // 	showMessage(`Text copied to clipboard. (${message.length} bytes.)`);
          })
          .catch(err => {
              canCopy = false;
              showError("Error copying to clipboard. " + err);
              // This can happen if the user denies clipboard permissions:
              console.error("Can not copy clipboard via AP", err);
          });
      return canCopy;
  }

  function saveTextToFile(fileName, data) {
      //var blob = new Blob([data], { type: "text/plain;charset=utf-8" });
      let blob = new Blob([data], { type: "text/plain;charset=utf-8" });

      try {
      }
      catch (ex) {
          console.error("Exception saving to file", ex);
          console.log("copied to clipboard");
          copyToClipboardNew(data);
          showError("Can not save to a local file. Data copied to clipboard, save it manually");

      }

  }

  function showResultMessage(r) {
      if (r.result >= 0) {
          showMessage(r.message);
      }
      else
          showError(r.message);
  }


  function showErrorIn(divName, msg) {
      let div = document.getElementById(divName);
      if (div)
          div.innerHTML = `<h6 class="row text-danger">${msg}</h6`;
      else
          showError(`Invalid div: [${divName}]`)

      if (msg.length > 0)
          showBlock(divName);
      else
          hideControl(divName);

  }


  function showLog(text) {
      showInDiv("logs", text);
  }


  function getCurrentText(btn) {
      let currentText = document.querySelector(`#${btn}`).innerHTML;
      return currentText;
  }

  function setCurrentText(btn, text) {
      document.querySelector(`#${btn}`).innerHTML = text;
  }

  function copyToClipboardOld(fieldId) {
      var copyText = document.getElementById(fieldId);
      if (copyText) {
          copyText.select();
          document.execCommand("copy");
      }
  }

  function copyToClipboardInField(formName, fieldId, value) {
      setValue(formName, fieldId, value);
      var copyText = document.getElementById(fieldId);
      if (copyText) {
          copyText.select();
          document.execCommand("copy");
      }
      setValue(formName, fieldId, "");
  }


  function copyToClipboard(formName, text, id = "") {

      if (id.length > 0) {
          var copyText = document.getElementById(id);
          copyText.select();
          document.execCommand("copy");
          setValue(formName, id, "");
      }
      else {
          navigator.clipboard.writeText(text)
              .then(() => {
                  canCopy = true;
              })
              .catch(err => {
                  canCopy = false;
                  // This can happen if the user denies clipboard permissions:
                  console.error("Can not copy clipboard via AP", err);
              });
      }
      return canCopy;
  }

  function copyToClipboardTest(text) {
      // This can happen if the user denies clipboard permissions:

      showBlock("PS2");
      setValue("main", "DP2", text);
      var copyText = document.getElementById("DP2");
      copyText.select();
      document.execCommand("copy");
      setValue("main", "DP2", "");

      //hideControl("PS2");
  }


  function getFormData(formName) {
      //var form = document.getElementById(formName);
      var form = document.forms[formName];
      let inputForm = {};
      var data = new FormData(form);
      for (var [key, value] of data) {
          inputForm[key] = value;
      }
      return inputForm;
  }


  function readFile(input) {
      let file = input.files[0];

      data = "";

      let reader = new FileReader();

      reader.readAsText(file);

      reader.onload = function () {
          data = reader.result;
      };

      reader.onerror = function () {
          console.error(reader.error);
      };

      return text;

  }

  function readRemoteFile(fName) {
      fetch(`file:///${fName}`)
          .then(response => response.arrayBuffer())
          .then(ab => {
              // do stuff with `ArrayBuffer` representation of file
              console.log(ab);
          })
          .catch(err => console.error(err));
  }


  function hideControls(ids) {
      let divIds = ids.split(",");
      divIds.forEach(ctl => {
          let control = document.getElementById(ctl);
          if (control)
              control.style.display = "none";
          else {
              console.log(`hideControl(${ctl}) invalid control`);
              //addTrace(`hideControl(${ctl}) invalid control`);
          }

      });
  }

  function showControls(ids) {
      let divIds = ids.split(",");
      divIds.forEach(ctl => {
          let control = document.getElementById(ctl);
          if (control)
              control.style.display = "block";
          else {
              console.log(`showControls(${ctl}) invalid control`);
              //addTrace(`hideControl(${ctl}) invalid control`);
          }

      });
  }



  function hideControl(ctl) {
      let control = document.getElementById(ctl);
      if (control)
          control.style.display = "none";
      else {
          console.log(`hideControl(${ctl}) invalid control`);
      }

  }
  function hideControl2(ctl) {

      //document.querySelector(`#${ctl}`).style.display = "none";
      let control = document.getElementById(ctl);
      if (control)
          control.style.display = "none";
      else {
          console.log(`hideControl2(${ctl}) invalid control`);
      }
  }


  function showInLine(ctl) {
      document.querySelector(`#${ctl}`).style.display = "inline";
  }

  function showBlocks(ids) {
      let divIds = ids.split(",");
      divIds.forEach(x => {
          let control = document.getElementById(x);
          if (control)
              control.style.display = "block";
          else {
              console.error(`showBlock(${x}) undefined`);
          }

      });
  }

  function showBlock(ctl) {
      let control = document.getElementById(ctl);
      if (control)
          control.style.display = "block";
      else {
          console.error(`showBlock(${ctl}) undefined`);
          //addTrace(`showBlock(${ctl}) undefined`, "ERROR");
      }
  }

  function showBlock0(ctl) {
      let control = document.getElementById(ctl);
      if (control)
          control.style.display = "block";
      else {
          console.error(`showBlock(${ctl}) undefined`);
          //addTrace(`showBlock(${ctl}) undefined`, "ERROR");
      }

      //document.querySelector(`#${ctl}`).style.display = "block";
  }


  function showControl(ctl) {
      let control = document.getElementById(ctl);
      if (control)
          control.style.display = "block";
      else {
          console.error(`showControl(${ctl}) undefined`);
      }
  }


  function showTitle() {
      writeInnerHTML("divTitle", `<label>${softwareID} ${environment}  ${versionNumber}</label>`);
      //successMessage(`${softwareID} ${environment}  ${versionNumber}`);
  }

  function hideTitle() {
      writeInnerHTML("divTitle", "");
  }


  function getTimeStamp(m = null) {
      if (m == null)
          m = new Date();
      return m.toISOString();

      //   var dateString =
      // 	  m.getUTCFullYear() + "/" +
      // 	  ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
      // 	  ("0" + m.getUTCDate()).slice(-2) + " " +
      // 	  ("0" + m.getUTCHours()).slice(-2) + ":" +
      // 	  ("0" + m.getUTCMinutes()).slice(-2) + ":" +
      // 	  ("0" + m.getUTCSeconds()).slice(-2);

      // 	return dateString;

  }


  function getTimeStampString(m) {
      var dateString =
          m.getUTCFullYear() + "/" +
          ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" +
          ("0" + m.getUTCDate()).slice(-2) + " " +
          ("0" + m.getUTCHours()).slice(-2) + ":" +
          ("0" + m.getUTCMinutes()).slice(-2) + ":" +
          ("0" + m.getUTCSeconds()).slice(-2);

      return dateString;

  }


  function addTrace(text, traceType = "MSG") {

      let tx = `${getTimeStamp()}\t${traceType}\t${text}`;
      traces.push(text);
      console.log(text);
      renderTrace();

  }

  function renderTrace(id = "trace") {


      let lines = "";
      traces.forEach(line => {
          lines = `${lines}\n${line}`;
      })
      setField("txTrace", lines);
      if (traceEnabled)
          showBlock("divTrace");

      sessionStorage.setItem("trace", lines);
      clearTrace();
      return;

      let txt = "";
      let html = `<table class="table">`;
      let rows = "";
      for (let i = 0; i < traces.length; i++) {
          txt += `${traces[i]}</br>`;
          console.log("renderTrace()", traces[i]);
          let p = traces[i].split("\t");
          rows = `${rows}
  <tr>
  <td>
  ${p[0]}
  </td>
  <td>
  ${p[1]}
  </td>
  <td>
  ${p[2]}
  </td>
  </tr>`
      }
      html = `${html}</table>${rows}`;
      if (traceEnabled) {
          let traceDiv = document.getElementById(id);
          traceDiv.innerHTML = html;
          showBlock("trace");
      }
      else localStorage.setItem("trace", html);
  }


  function validateEmail(mail) {
      if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
          return true;
      return false;
  }



  function decodeClipBoard(clipText) {
      encryptedText = false;
      if (clipText.length == 0) {
          showWarning(translate("No data in clipboard."));
          return "";
      }
      console.log(`Utils.pasteClipboard() [${clipText}]`);
      let ix = clipText.toLowerCase().indexOf("http");
      if (ix >= 0)
          clipText = clipText.substr(0, ix);


      let parts = clipText.split("|");
      cb = {};
      cb.Hint = "";
      cb.Text = "";
      console.log("parts", parts);

      if (parts.length == 1)
          cb.Text = parts[0];
      else if (parts.length >= 3) {
          cb.Hint = parts[1];
          cb.Text = parts[2].trim();
          encryptedText = true;
      }
      console.log("cb", cb);
      console.log("cb.Text:", cb.Text);

      setField("pwdHint", cb.Hint);
      setField("inputText", cb.Text);
      showBlock("divIputText");
      showMessage(`Text copied from clipboard. (${cb.Text.length} bytes.)`);
      return cb.Text;
  }


  function getExcelColumnLetter(num) {
      let letters = ''
      while (num >= 0) {
          letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters
          num = Math.floor(num / 26) - 1
      }
      return letters
  }

  function getLanguageName(langCode) {
      // try {
      // 	const languageNames = new Intl.DisplayNames([langCode], {
      // 		type: 'language'
      // 	});
      // }
      // catch (ex) {
      // 	showError("Error getting language " + langCode);
      // }
      //return languageNames.of(langCode);
      if (langCode.includes("\"")) {
          console.log(`getlanguageName() invalid lang code:{${langCode}}"`);
          langCode = langCode.replace("\"", "");
          console.log(`fixed lang code:" + {${langCode}}`);
      }

      switch (langCode) {
          case "en":
              return "English";
          case "es":
              return "Espanol";
          case "pt":
              return "Portuguese";
          case "fr":
              return "Francais";
          case "uk":
              return "Ukranian";
          case "ru":
              return "Russian";
          default:
              return langCode;

      }
  }

  function function8() {
      if (xzY1.length > 0) {
          let sc = document.getElementById('xzY1');
          console.log('sc', sc);
          if (sc) {
              let vr = MD5(sc.innerHTML);
              if (vr.toUpperCase() != xzY1) {

                  removeElement('mainContent');
              }
          }
      }
      removeElement('f5');
      removeElement('log');

  }

  function dateDiff(sd, ed) {
      let d1 = new Date(sd);
      let d2 = new Date(ed);
      let ms = d2.getTime() - d1.getTime();
      return ms / (1000 * 3600 * 24);

      // To calculate the no. of days between two dates
      // let secs = ms / 1000;
      // let hours = ms / (1000 * 3600);
      // let days = ms / (1000 * 3600 * 24);
  }

  function createGuid() {
      function S4() {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  }


  function addDays(dt, days) {
      // 	let dt0 = new Date(dt);
      //   return new Date(dt0.getTime() + days*24*60*60*1000);
      var result = new Date(dt);
      result.setDate(result.getDate() + days);
      return result;

  }


  function pasteClipboard() {
      try {
          navigator.clipboard.readText().then(
              clipText => {
                  canPaste = true;
                  if (clipText.length > 0) {
                      clearMessages();
                      dataFromClipboard = true;
                      manualText = false;
                      usingFile = false;
                      data = clipText.replace(landingLink, "");
                      noFocus = true;
                      showData2();
                      //todo: check
                      if (!encryptedFile) {
                          addMessage(`${data.length}` + " " + translate("chars copied from clipboard."), statusSuccess, classSuccess);
                          renderMessages();
                          hideControl("divDecrypt");
                      }
                      else {
                          //setField("inputText",data);
                          //addMessage(fInfoRow,statusSuccess,classSuccess);
                          showControl("divDecrypt");
                          //renderMessages();
                      }
                      return data;
                  }
                  else {
                      showWarning(translate("Clipboard is empty."));
                      return "";
                  }
              }).catch((errorText) => {
                  //showError("Error pasting from clipboard. " + errorText);
                  addMessage(`${translate("Error pasting from clipboard.")} ${translate(errorText)}`, statusDanger, classDanger);
                  canPaste = false;
              }
              );
      }
      catch (ex) {
          showError("Exception reading the clipboard. " + ex.message);
          canPaste = false;
      }
      return "";
  }

  function clearTrace() {
      traces = [];
      hideControl("divTrace");
  }


  function replaceAll(text, searchText, replaceText) {
      let result = text;
      let ix = result.indexOf(searchText);
      while (ix > 0) {
          result = result.replace(searchText, replaceText);
          ix = result.indexOf(searchText);
      }
      return result;
  }

  //JS END ../common/utils.js

  //JS START launcher.js
  var lang = "es";
  var currentUser = "";
  var launcherVersion = "4.0";
  var price = 4.99;
  var softwareID = "Obra Olga Yepes";

  var tob = {};	//translate object
  //var linkApp = "https://script.google.com/macros/s/AKfycbyPKQ89-kQlIOiJACfNM6T9dkG8kBvs10uzqhkX6SvLUQoQs6n-pKDzD-vNqeotM_o/exec";

  var disclaimer = `</br><b>Atencion:</b>
  Esta aplicacion accede a su direccioon de correo electronico de Gmail, para poder controlar las reservas de obras que usted haga en ella.  No se usa para nada mas, ni es compartida con nadie.
`;

  var welcome = `
Bienvenido al catalogo de obras de <b>Olga Yepes.</b></br>

Esta aplicacion le permite adminsitar sus reservas de obras de este catalogo, y establecer contacto con los administradores de la obra para concretar cualquier compra.`;

  function createLink() {
      let html = ` <a 
href="${linkApp}?user=${user}">${softwareID} App</a>
<button type="button" class="btn btn-primary form-control field-size" onclick="submitForm()">
${softwareID}
</button>
`;

      html = `<button type="button" class="btn btn-success form-control" onclick="submitForm()">
${softwareID}
</button>
`;
      let div = document.getElementById("divLinkApp");
      div.innerHTML = html;
  }

  function makeid(length) {
      var result = '';
      //var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]-=~`<>,./?><":;' + "'";
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%()_+-=~.';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
              charactersLength));
      }
      return result;
  }


  function addToTranslate(txt, divId) {
      let o = {};
      o.divId = divId;
      o.text = txt;
      tob.texts.push(o);
  }


  function getChecked(controlName) {

      let result = false;
      let control = document.getElementById(controlName);
      result = (control && control.checked);
      return result;
  }


  function acceptTerms() {
      let accepted = getChecked("chkAccept");
      if (accepted) {
          showBlock("divLinkApp")
          //hideControl("divWelcome");
          localStorage.setItem(currentUser, "1");
      }
      else {
          hideControl("divLinkApp");
          showBlock("divWelcome");
          localStorage.setItem(currentUser, "0");
      }
  }

  function setChecked(controlName, value = true) {

      let control = document.getElementById(controlName);
      if (control)
          control.checked = value;

  }


  function function6() {

      let accepted = true;
      ctl = document.getElementById("userEmail");
       if (ctl)
            ctl.value = user;

      currentUser = user; 
      accepted = = true;  
      
      alert(`currentUserr: ${user}`);
      if (currentUser.toLowerCase().includes("ecastano.lasc@gmail.com")||
      currentUser.toLowerCase().includes("olcas55@gmail.com")||
      currentUser.toLowerCase().includes("ramonabel@yahoo.com")||
      currentUser.toLowerCase().includes("castanc@yahoo.com")||
      currentUser.toLowerCase().includes("obraolgayepes@gmail.com"))
      showControl("divAdmin");

      let r = {};
      tob = {};
      lang = getBrowserLanguage();
      console.log("language", lang);
      tob.langCode = lang;
      tob.texts = [];

      r.langCode = tob.langCode;
      let json = localStorage.getItem(`language-${tob.langCode}`);


      let cached = false;
      if (json) {
          try {
              r = JSON.parse(json);
              cached = true;
          }
          catch (ex) {

          }
      }
      //console.log("cached language",cached,tob.langCode,json);

      if (cached) {
          console.log("getting cached translations");
          successTranslateTexts(r);

      }
      else if (location.protocol == "https:") {
          console.log("getting translation from google");
          addToTranslate(disclaimer, "divDisclaimer");
          addToTranslate(welcome, "divWelcome");
          //addToTranslate("Go to Application", "divLinkApp")
          addToTranslate("Accept Terms:", "lbAcceptTerms");

          addToTranslate("Privacy Policy", "btn_divPrivacyText");
          addToTranslate("Terms of Service", "btn_divTOSText");

          translateTexts();
      }
      writeInnerHTML("divWelcome", welcome);
      writeInnerHTML("divDisclaimer", disclaimer);

      showBlock("divWelcome");
      //createLink();
      accepted = true;
      if (accepted) {
          showBlock("divLinkApp");
          hideControl("divAcceptTerms");
          hideControl("divDisclaimer");
          console.log("Opening app", linkApp);
          let url = `${linkApp}?user=${user}">${softwareID}`;
          //autoClickLink(url);
      }
      console.log("linkApp:", linkApp);



  }

  function showSpinner(value = true, msg = "Loading...") {
      if (value) {
          showBlock("spinner");
      }
      else {
          hideControl("spinner");
      }
  }

  function hideControl(ctl) {

      //document.querySelector(`#${ctl}`).style.display = "none";
      let control = document.getElementById(ctl);
      if (control)
          control.style.display = "none";
  }

  function callBackPP(result) {

  }



  function submitForm() {
      let ts = getTimeStamp(new Date());
      console.log("launcher.js.submitForm()", ts);

      //userEmail = "castanc";
      setField("txUser", user);
      setField("txTS", getTimeStamp(new Date()));
      let frm = document.getElementById("frmRedirect");
      frm.action = linkApp;
      frm.submit();
  }

  function functionXX() {
      let ts = `${user},${getTimeStamp(new Date())}`;
      let encoded = `${makeidUpperCase(5)}${btoa(ts)}${makeidUpperCase(4)}`;
      let url = `${linkApp}?data=encoded`;
      autoClickLink(url);
  }

  function openApp() {
      console.log("linkApp before:", linkApp);
      console.log("user:",user);
      let href = `${linkApp}?user=${user}"`;
      console.log("linkApp before:", linkApp);
      console.log("href:", linkApp);
      //localStorage.setItem(LOCAL_USER,userEmail);
      autoClickLink(href);
  }


  function openAdmin() {
      console.log("linkApp before:", adminApp);
      console.log("user:",user);
      let href = `${adminApp}?user=${user}"`;
      console.log("href:", adminApp);
      localStorage.setItem(LOCAL_USER,userEmail);
      autoClickLink(href);
  }


  function setSysInfoData() {

  }

  window.addEventListener('load', function6);
  //JS END launcher.js

  //JS START privacypolicy.js
  var ppVisible = false;
  var ppLoaded = false;
  var privacyPolicy = "";



  function callbackPP(divId, textId, successMessage, lang) {
      if (location.protocol == "https:") {
          showSpinner(true);
          ppLoaded = true;
          console.log("loading privacy policy from server");
          google.script.run.withFailureHandler(failureGetText)
              .withSuccessHandler(successGetText)
              .getPrivacyPolicy2Text(divId, textId, successMessage, lang);
      }

  }

  function getPrivacyPolicy() {
      console.log("getPrivacyPolicy(). privacy Policy:", ppLoaded, lang, privacyPolicy.length);
      let text = "Privacy Policy not loaded.";


      if (!ppLoaded) {
          text = localStorage.getItem(`pp-${lang}`);
          if (!text || text.length < 10000) {
              console.log("calling getText() to get translated privacy poklicy");
              getText("divPrivacyText", "pp", translate("Privacy policy Updated."), callbackPP);
          }
      }

      // if (!ppLoaded)
      // {
      //   privacyPolicy = replaceAll(text,"XXXX", softwareID);
      //   writeInnerHTML("divPrivacyText", privacyPolicy);
      //   localStorage.setItem("pp-en",privacyPolicy)
      // }

      ppLoaded = true;


  }

  function viewPP() {
      console.log(`viewPP() ${ppLoaded} ${lang}`);

      if (!ppLoaded) {
          privacyPolicy = localStorage.getItem(`pp-${lang}`);
          if (!privacyPolicy || privacyPolicy.length < 100)
              getText("divPrivacyText", "pp", translate("Privacy policy Updated."), callbackPP);
          else {
              console.log("privacy Policy from ls:", privacyPolicy);
              writeInnerHTML("divPrivacyText", privacyPolicy);
          }
      }

      ppVisible = !ppVisible;
      if (ppVisible) {
          hideControl("divWelcome");
          showControl("divPrivacyText");
      }
      else {
          showControl("divWelcome");
          hideControl("divPrivacyText");
      }
  }

  //JS END privacypolicy.js

  //JS START tos.js
  var tosVisible = false;
  var tosLoaded = false;
  var tos = "";



  function callbackTOS(divId, textId, successMessage, lang) {
      if (location.protocol == "https:") {
          showSpinner(true);
          tosLoaded = true;
          console.log("loading tos from server");
          google.script.run.withFailureHandler(failureGetText)
              .withSuccessHandler(successGetText)
              .getTOSText(divId, textId, successMessage, lang);
      }

  }

  function getTOS() {
      console.log("getTOS(). TOS:", tosLoaded, lang, tos.length);
      let text = "Terms of service not loaded.";


      if (!tosLoaded) {
          text = localStorage.getItem(`tos-${lang}`);
          if (!text || text.length < 10000) {
              console.log("calling getText() to get translated tos");
              getText("divTOSText", "tos", translate("Terms of Service Updated."), callbackTOS);
          }
      }

      // if (!ppLoaded)
      // {
      //   privacyPolicy = replaceAll(text,"XXXX", softwareID);
      //   writeInnerHTML("divPrivacyText", privacyPolicy);
      //   localStorage.setItem("pp-en",privacyPolicy)
      // }

      tosLoaded = true;


  }

  function viewTOS() {
      console.log(`viewTOS() ${tosLoaded} ${lang}`);

      if (!tosLoaded) {
          tos = localStorage.getItem(`tos-${lang}`);
          if (!tos || tos.length < 100)
              getText("divTOSText", "tos", translate("Terms of Service Updated."), callbackTOS);
          else {
              console.log("tos ls:", tos);
              writeInnerHTML("divTOSText", tos);
          }
      }

      tosVisible = !tosVisible;
      if (tosVisible) {
          hideControl("divWelcome");
          showControl("divTOSText");
      }
      else {
          showControl("divWelcome");
          hideControl("divTOSText");
      }
  }

//JS END tos.js
