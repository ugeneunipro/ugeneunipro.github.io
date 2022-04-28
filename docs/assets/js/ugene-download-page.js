---
---
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
  var comments = {en: '', ru: '', tr: ''};

  const lang = window.location.pathname.startsWith('/ru/') ? 'ru' :
               window.location.pathname.startsWith('/tr/') ? 'tr' : 'en';

  if (platform.os.family) {
    if (platform.os.family.match(/windows/i)) { /* Windows */
      uos = 'windows';
      shortOsName = 'Windows';
      fullOsName = shortOsName;
      comments['en'] = 'Windows 7 and higher is required';
      comments['ru'] = 'требуется версия Windows 7 или выше';
      comments['tr'] = 'Windows 7 veya üstü gerekli';
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
      comments['tr'] = '';
    } else if (platform.os.family.match(/os x/i)) { /* OS X */
      uos = 'macos';
      shortOsName = 'macOS';
      fullOsName = shortOsName;
      comments['en'] = 'version 10.7 or higher is required';
      comments['ru'] = 'требуется версия 10.7 или выше';
      comments['tr'] = '10.7 veya üstü gerekli';
    } else {
      uos = 'UNKNOWN';
      shortOsName = 'UNKNOWN';
      fullOsName = shortOsName;
      comments['en'] = '';
      comments['ru'] = '';
      comments['tr'] = '';
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
      windows: '',
      linux: 'https://archive.ugene.net/downloads/packages/33.0/ugene-33.0-x86-full.tar.gz',
      macos: '{{site.ugene.download_link_ugene_latest_mac_x86_64_portable}}'
    },
    bit64: {
      windows: '{{site.ugene.download_link_ugene_latest_win_x86_64_portable}}',
      linux: '{{site.ugene.download_link_ugene_latest_linux_x86_64_portable}}',
      macos: '{{site.ugene.download_link_ugene_latest_mac_x86_64_portable}}'
    },
  };

  var download_body_content = '';


  if (lang === 'ru') {
    /*************************** <!--:ru--> ***************************/
    download_body_content += '<h2>Скачать UGENE</h2>' +
        '<div class="download_page_main">' +
        '  <div style="margin-bottom: 24px;">Текущая версия UGENE: <b>{{site.ugene.release_version}}</b> ({{site.ugene.release_date_MMM_YYYY_ru}}). См. ' +
        '<a href="/ru/changelist.html">краткое описание новой версии</a>.</div>';

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
  } else if (lang === 'tr') {
    /*************************** <!--:tr--> ***************************/
    download_body_content += '<h2>UGENE\'yi indirin</h2>' +
        '<div class="download_page_main">' +
        '  <div style="margin-bottom: 24px;">UGENE\'nin mevcut kararlı sürümü: <b>{{site.ugene.release_version}}</b> ({{site.ugene.release_date_MMM_YYYY_tr}}). ' +
        '<a href="/changelist.html">Sürüm notlarına</a> bakın.</div>';

    if (uos !== 'UNKNOWN') {
      download_body_content += '  <div style="margin-bottom: 6px;">İşletim sisteminizi şu şekilde tespit ettik: <span class="emphasize_words">' + fullOsName + '</span>.</div>';
    }

    if (ubit !== 32 && ubit !== 64 && uos === 'linux') {
      download_body_content += 'İşletim sisteminiz için bir paket seçin:';
      download_body_content += '<ul class="general_content">\n' +
          '<li><a href="' + links['bit64']['linux'] + '"><span>Linux 64-bit için UGENE</span></a></li>\n' +
          '<li><a href="' + links['bit32']['linux'] + '"><span>Linux 32-bit için UGENE</span></a></li>\n' +
          '</ul>';
    } else if (uos !== 'UNKNOWN') {
      if (ubit !== 32 && ubit !== 64) {
        ubit = 64;
      }
      download_body_content +=
          '  <div style="margin-bottom: 24px;">Önerilen indirme, <a href="' + links['bit' + ubit][uos] + '">' + shortOsName + ' için UGENE\'dir</a>.</div>';
    } else if (uos === 'UNKNOWN') {
      download_body_content += 'İşletim sisteminiz için bir paket seçin:';
      download_body_content += '<ul class="general_content">\n' +
          '<li><a href="' + links['bit64']['windows'] + '"><span>Windows için UGENE</span></a></li>\n' +
          '<li><a href="' + links['bit64']['macos'] + '"><span>macOS için UGENE</span></a></li>\n' +
          '<li><a href="' + links['bit64']['linux'] + '"><span>Linux 64-bit için UGENE</span></a></li>\n' +
          '<li><a href="' + links['bit32']['linux'] + '"><span>Linux 32-bit için UGENE</span></a></li>\n' +
          '</ul>';
    }

    download_body_content +=
        '  <div style="margin-bottom:42px;">Başka bir pakete mi ihtiyacınız var? <a href="/tr/download-all.html">Tüm seçenekleri görüntüleyin</a>.</div>' +
        '';

    if (ubit !== 32 && ubit !== 64 && uos === 'linux') {
    } else if (uos !== 'UNKNOWN') {
      download_body_content +=
          '  <div class="downloads_button">' +
          '    <a style="text-decoration: none;color: inherit;" href="' + links['bit' + ubit][uos]
          + '"><div class="downloads_button_main">' + shortOsName + ' için UGENE\'yi indirin</div></a>' +
          '    <div class="downloads_button_comment">' + comments['tr'] + '</div>' +
          '  </div>' +
          '</div>' +
          '';
    }
  } else {
    /*************************** <!--:en--> ***************************/
    download_body_content += '<h2>Download UGENE</h2>' +
        '<div class="download_page_main">' +
        '  <div style="margin-bottom: 24px;">Current stable version is <b>{{site.ugene.release_version}}</b> ({{site.ugene.release_date_MMM_YYYY_en}}). See ' +
        '<a href="/changelist.html">release notes</a>.</div>';

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
