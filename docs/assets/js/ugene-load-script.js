// this is a function :)
function loadUgeneScript(url, args, callback) {

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.attributes['lang'] = args;

  if (script.readyState) {  //IE
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' ||
          script.readyState === 'complete') {
        script.onreadystatechange = null;
        script.lang = args;
        callback(args);
      }
    };
  } else {  //Others
    script.onload = function () {
      callback(args);
    };
  }

  script.src = url;
  script.lang = args;
  document.head.appendChild(script);
}
