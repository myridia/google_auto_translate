function gtranslate_init() {
  let translate = new google.translate.TranslateElement(
    {
      pageLanguage: "de",
      includedLanguages: "en,es,da,th",
      autoDisplay: false,
      multilanguagePage: true,
    },
    "google_translate_element",
  );

  const _lang = getCookie("googtrans");
  let c = document.querySelector("#cookie");
  c.textContent = _lang;
  if (!_lang) {
    console.log(_lang);
    //    document.location.href = document.location.href + "#googtrans(de|en)";
  }
  //let s = document.querySelector("#google_translate_element select");
  //s.value = "th";
  //s.dispatchEvent(new Event("change", { bubbles: true }));
  //  setCookie("googtrans", "/de/en", 1);
}

/*
function setCookie(key, value, expiry) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
  document.cookie = key + "=" + value + ";expires=" + expires.toUTCString();
}
  */

function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}
