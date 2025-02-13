window.onload = function () {
  document.querySelector("#reset_cookie").addEventListener(
    "click",
    function () {
      console.log("...reset cookie");
      set_cookie("googtrans", "/de/de", 1);
    },
    false,
  );
};

/*
  Function what get called by googles translator file request
  It will initiate the Google Language via the 'google.translate.TranslateElement' class
*/
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

  const _lang = get_cookie("googtrans");
  let c = document.querySelector("#cookie");
  c.textContent = _lang;

  if (_lang === "") {
    console.log("...cookie is not set ");
    const host = get_host();
    if (host) {
      let lang = host.split(".")[0];
      if (lang === "dk") {
        lang = "da";
      }
      //document.location.href =
      //document.location.href + "#googtrans(de|" + lang + ")";
      console.log("...reload page to set cookie");
      set_cookie("googtrans", "/de/" + lang, 1);

      let x = setTimeout(() => {
        if (get_cookie("googtrans")) {
          console.log("...reload page to set cookie");
          window.location.reload();
        }
      }, 4 * 1000);
    }
  }
}

/*
  Function to look up for a browser cookie.
  It takes a cookie name and give back its value 
*/
function get_cookie(c_name) {
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

function set_cookie(c_name, c_value, exp_days) {
  let date = new Date();
  date.setTime(date.getTime() + exp_days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = c_name + "=" + c_value + "; " + expires + "; path=/";
  document.cookie =
    c_name +
    "=" +
    c_value +
    "; " +
    expires +
    "; path=/" +
    "; domain = translate.local" +
    ";";
}

function get_host(ext = "html") {
  let u = String(location).split("/");
  for (let i = 1; i < u.length; i++) {
    if (u[i].indexOf(".") > 0 && u[i].indexOf(ext) < 0) {
      return u[i];
    }
  }
  return "";
}
