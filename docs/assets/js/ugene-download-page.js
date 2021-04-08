;(function () {
  'use strict';

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object. */
  var oldRoot = root;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }


  /*--------------------------------------------------------------------------*/

  var uos = 'UNKNOWN';
  var ubit = 999;
  var fullOsName = '';
  var shortOsName = '';
  var comments = {en: '', ru: ''};

  var lang = 'en';
  if (document.getElementsByTagName('body')[0].lang) {
    lang = document.getElementsByTagName('body')[0].lang;
  } else if (document.currentScript
      && document.currentScript.attributes
      && document.currentScript.attributes.lang) {
    lang = document.currentScript.attributes.lang;
  } else if (document.scripts
      && document.scripts.length
      && document.scripts.length > 0) {
    var scrpt = document.scripts[document.scripts.length - 1];
    if (scrpt
        && scrpt.attributes
        && scrpt.attributes.lang) {
      lang = scrpt.attributes.lang;
    }
  }

  /* testing */
  /*platform.os.family = 'UNKNOWN';
  platform.os.architecture = 64;*/
  /* end testing */

  if (platform.os.family) {
    if (platform.os.family.match(/windows/i)) { /* Windows */
      uos = 'windows';
      shortOsName = 'Windows';
      fullOsName = shortOsName;
      comments['en'] = 'Windows 7 and higher is required';
      comments['ru'] = 'требуется версия Windows 7 или выше';
    } else if (platform.os.family.match(/linux/i)  /* Linux, "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE" */
        || platform.os.family.match(/Ubuntu/i)
        || platform.os.family.match(/Debian/i)
        || platform.os.family.match(/Fedora/i)
        || platform.os.family.match(/Red Hat/i)
        || platform.os.family.match(/SuSE/i)) {
      uos = 'linux';
      shortOsName = 'Linux';
      fullOsName = shortOsName;
      comments['en'] = '';
      comments['ru'] = '';
    } else if (platform.os.family.match(/os x/i)) { /* OS X */
      uos = 'macos';
      shortOsName = 'macOS';
      fullOsName = shortOsName;
      comments['en'] = 'version 10.7 or higher is required';
      comments['ru'] = 'требуется версия 10.7 или выше';
    } else {
      uos = 'UNKNOWN';
      shortOsName = 'UNKNOWN';
      fullOsName = shortOsName;
      comments['en'] = '';
      comments['ru'] = '';
    }

    if (platform.os.architecture === 64) {
      ubit = 64;
      if (fullOsName === 'Windows' || fullOsName === 'Linux') {
        fullOsName = fullOsName + ' 64-bit';
      }
    } else if (platform.os.architecture === 32) {
      ubit = 32;
      if (fullOsName === 'Windows' || fullOsName === 'Linux') {
        fullOsName = fullOsName + ' 32-bit';
      }
    } else {
      ubit = 999;
    }
  }

  var links = {
    bit32: {
      windows: '/downloads/installer_windows_x32.exe',
      linux: '/downloads/installer_linux_x32',
      macos: '/downloads/ugene_installer_mac_x64.html'
    },
    bit64: {
      windows: '/downloads/installer_windows_x64.exe',
      linux: '/downloads/ugene_latest_linux_x11_x86-64_full.html',
      macos: '/downloads/ugene_installer_mac_x64.html'
    },
    all: '/download-all_html',
    release_notes: '/changelist.html'
  };

  var download_body_content = '';


  if (lang === 'ru') {
    /*************************** <!--:ru--> ***************************/
    download_body_content += '<h2>Скачать UGENE</h2>' +
        '<div class="download_page_main">' +
        '  <div style="margin-bottom: 24px;">Текущая версия UGENE: <b>38.1</b> (Март, 2021). См. <a href="'
        + links.release_notes + '">краткое описание новой версии</a>.</div>';

    if (uos !== 'UNKNOWN') {
      download_body_content += '  <div style="margin-bottom: 6px;">Мы определили вашу операционную систему как <span class="emphasize_words">' + fullOsName + '</span>.</div>';
    }

    if (ubit !== 32 && ubit !== 64 && uos === 'linux') {
      download_body_content += 'Выберите пакет для вашей операционной системы:';
      download_body_content += '<ul class="general_content">\n' +
          '<li><a href="' + links['bit64']['linux'] + '"><span>UGENE для Linux (64-бит)</span></a></li>\n' +
          '<li><a href="' + links['bit32']['linux'] + '"><span>UGENE для Linux (32-бит)</span></a></li>\n' +
          '</ul>';
    } else if (uos !== 'UNKNOWN') {
      if (ubit !== 32 && ubit !== 64) {
        ubit = 64;
      }
      download_body_content +=
          '  <div style="margin-bottom: 24px;">Рекомендованная сборка для загрузки <a href="' + links['bit' + ubit][uos] + '" >UGENE для ' + shortOsName + '</a>.</div>';
    } else if (uos === 'UNKNOWN') {
      download_body_content += 'Выберите пакет для вашей операционной системы:';
      download_body_content += '<ul class="general_content">\n' +
          '<li><a href="' + links['bit64']['windows'] + '"><span>UGENE для Windows</span></a></li>\n' +
          '<li><a href="' + links['bit64']['macos'] + '"><span>UGENE для macOS</span></a></li>\n' +
          '<li><a href="' + links['bit64']['linux'] + '"><span>UGENE для Linux (64-бит)</span></a></li>\n' +
          '<li><a href="' + links['bit32']['linux'] + '"><span>UGENE для Linux (32-бит)</span></a></li>\n' +
          '</ul>';
    }

    download_body_content +=
        '  <div style="margin-bottom:42px;">Хотите скачать другой пакет? Перейдите по <a href="/ru/download-all.html">данной ссылке</a>.</div>' +
        '';

    if (ubit !== 32 && ubit !== 64 && uos === 'linux') {
    } else if (uos !== 'UNKNOWN') {
      download_body_content +=
          '  <div class="downloads_button">' +
          '    <a style="text-decoration: none;color: inherit;" href="' + links['bit' + ubit][uos]
          + '"><div class="downloads_button_main">Скачать UGENE для ' + shortOsName + '</div></a>' +
          '    <div class="downloads_button_comment">' + comments['ru'] + '</div>' +
          '  </div>' +
          '</div>' +
          '';
    }
  } else {
    /*************************** <!--:en--> ***************************/
    download_body_content += '<h2>Download UGENE</h2>' +
        '<div class="download_page_main">' +
        '  <div style="margin-bottom: 24px;">Current stable version is <b>38.1</b> (March, 2021). See <a href="'
        + links.release_notes + '">release notes</a>.</div>';

    if (uos !== 'UNKNOWN') {
      download_body_content += '  <div style="margin-bottom: 6px;">We detected your operating system as  <span class="emphasize_words">' + fullOsName + '</span>.</div>';
    }

    if (ubit !== 32 && ubit !== 64 && uos === 'linux') {
      download_body_content += 'Select a package for your operating system:';
      download_body_content += '<ul class="general_content">\n' +
          '<li><a href="' + links['bit64']['linux'] + '"><span>UGENE for Linux 64-bit</span></a></li>\n' +
          '<li><a href="' + links['bit32']['linux'] + '"><span>UGENE for Linux 32-bit</span></a></li>\n' +
          '</ul>';
    } else if (uos !== 'UNKNOWN') {
      if (ubit !== 32 && ubit !== 64) {
        ubit = 64;
      }
      download_body_content +=
          '  <div style="margin-bottom: 24px;">Recommended download is <a href="' + links['bit' + ubit][uos] + '">UGENE for ' + shortOsName + '</a>.</div>';
    } else if (uos === 'UNKNOWN') {
      download_body_content += 'Recommended download is one of the following:';
      download_body_content += '<ul class="general_content">\n' +
          '<li><a href="' + links['bit64']['windows'] + '"><span>UGENE for Windows</span></a></li>\n' +
          '<li><a href="' + links['bit64']['macos'] + '"><span>UGENE for macOS</span></a></li>\n' +
          '<li><a href="' + links['bit64']['linux'] + '"><span>UGENE for Linux 64-bit</span></a></li>\n' +
          '<li><a href="' + links['bit32']['linux'] + '"><span>UGENE for Linux 32-bit</span></a></li>\n' +
          '</ul>';
    }

    download_body_content +=
        '  <div style="margin-bottom:42px;">Need another package? <a href="/download-all.html">View all options</a>.</div>' +
        '';

    if (ubit !== 32 && ubit !== 64 && uos === 'linux') {
    } else if (uos !== 'UNKNOWN') {
      download_body_content +=
          '  <div class="downloads_button">' +
          '    <a style="text-decoration: none;color: inherit;" href="' + links['bit' + ubit][uos]
          + '"><div class="downloads_button_main">Download UGENE for ' + shortOsName + '</div></a>' +
          '    <div class="downloads_button_comment">' + comments['en'] + '</div>' +
          '  </div>' +
          '</div>' +
          '';
    }
  }

  /*--------------------------------------------------------------------------*/

  // Export download_body_content.

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose download_body_content on the global object to prevent errors when download_body_content is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.download_body_content = download_body_content;

    // Define as an anonymous module so download_body_content can be aliased through path mapping.
    define(function () {
      return download_body_content;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for CommonJS support.
    forOwn(download_body_content, function (value, key) {
      freeExports[key] = value;
    });
  } else {
    // Export to the global object.
    root.download_body_content = download_body_content;
  }
}.call(this));
