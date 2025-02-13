window.onload = function () {
  let protocol = location.protocol !== "https:" ? "http" : "https";
  const languages = ["en", "es", "da", "th", "ru"];
  const domains = [
    "127.0.0.1",
    "en.translate.local",
    "de.translate.local",
    "es.translate.local",
    "da.translate.local",
    "th.translate.local",
    "ru.translate.local",
  ];
  set_links(languages, domains, protocol);

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
      includedLanguages: "en,es,da,th,ru",
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

function set_links(languages, domains, protocol) {
  const host = get_host();

  let ulc = document.querySelector("#cookie_list");
  if (ulc) {
    for (let x = 0; x <= languages.length - 1; x++) {
      let li = document.createElement("LI");
      let a = document.createElement("A");
      let link =
        protocol + "://" + host + "#googtrans(de|" + languages[x] + ")";
      a.setAttribute("href", link);
      a.innerHTML = link;
      a.setAttribute("target", "_blank");
      li.appendChild(a);
      ulc.appendChild(li);
    }
  }

  let ul = document.querySelector("#domain_list");
  if (ul) {
    if (domains.includes(host)) {
      for (let x = 0; x <= domains.length - 1; x++) {
        let li = document.createElement("LI");
        let a = document.createElement("A");
        let link = protocol + "://" + domains[x];
        a.setAttribute("href", link);
        a.innerHTML = link;
        li.appendChild(a);
        ul.appendChild(li);
      }
    }
  }

  let m = document.querySelector("#main_page");
  if (m) {
    let a = document.createElement("A");
    let link = protocol + "://" + host;
    a.setAttribute("href", link);
    a.innerHTML = link;
    m.appendChild(a);
  }
}
