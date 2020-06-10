// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var searchFormList = {
  bing: {
    action: "https://www.bing.com",
    name: "q"
  },
  google: {
    action: "https://www.google.com/search",
    name: "q"
  },
  baidu: {
    action: "https://www.baidu.com/s",
    name: "wd"
  }
};
var searchEngineColor = {
  bing: '#008383',
  google: '#008AF2',
  baidu: '#0047DE'
};
var $siteList = $('.siteList');
var localStored = localStorage.getItem('localStored');
var localStoredObject = JSON.parse(localStored);
var localStoredHashMap = localStoredObject || [{
  favicon: "https://favicon.link/google.com",
  url: "https://www.google.com"
}, {
  favicon: "https://favicon.link/acwifi.net",
  url: "https://www.acwifi.net"
}, {
  favicon: "https://favicon.link/v2ex.com",
  url: "https://v2ex.com"
}, {
  favicon: "https://favicon.link/github.com",
  url: "https://github.com"
}, {
  favicon: "https://favicon.link/bing.com",
  url: "https://bing.com"
}, {
  favicon: "https://favicon.link/baidu.com",
  url: "https://baidu.com"
}, {
  favicon: "https://favicon.link/bilibili.com",
  url: "https://bilibili.com"
}, {
  favicon: "https://favicon.link/acfun.cn",
  url: "https://acfun.cn"
}, {
  favicon: "https://favicon.link/jd.com",
  url: "http://www.jd.com/"
}, {
  favicon: "https://favicon.link/vol.moe",
  url: "https://vol.moe"
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); // 删除 / 开头的内容
};

var domainName = function domainName(url) {
  // 待完善
  return simplifyUrl(url).replace('.com', '').replace('.net', '');
};

var render = function render() {
  $siteList.find('li').remove();
  localStoredHashMap.forEach(function (node, index) {
    var $li = $("<li>\n                <div class=\"site\">\n                    <div class=\"logo\"><img src=".concat(node.favicon, " alt=\"\"></div>\n                    <div class=\"siteName\">").concat(domainName(node.url), "</div>\n                    <div class=\"close\">\n                        <svg class=\"icon\" aria-hidden=\"true\">\n                        <use xlink:href=\"#icon-remove\"></use>\n                        </svg>\n                    </div>\n                </div>\n            </li>"));
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      localStoredHashMap.splice(index, 1);
      render();
    });
    $siteList.append($li);
  });
};

render();
var $searchFrom = $('.searchForm');
var $searchInput = $('.searchInput');
var currentSearchEngine = localStorage.getItem('currentEngine') || 'bing';

function changeSearchEngine(eventOrButtonName) {
  var buttonName;

  if (eventOrButtonName instanceof Object) {
    var currentClassName = eventOrButtonName.currentTarget.className;
    buttonName = currentClassName.replace('Btn', "");
  } else if (typeof eventOrButtonName === "string") {
    buttonName = eventOrButtonName;
  } // setting searchButton background


  $('.searchButton').css({
    'background': searchEngineColor[buttonName]
  }); // change searchFrom

  $searchFrom.attr('action', searchFormList[buttonName].action);
  $searchInput.attr('name', searchFormList[buttonName].name);
  currentSearchEngine = buttonName;
} // Setting localEngine by page Loaded


changeSearchEngine(currentSearchEngine);
$('.searchEngine').on('click', 'div', function (e) {
  changeSearchEngine(e);
});

function faviconUrl(url) {
  var faviconAPI = 'https://favicon.link/';
  var baseURl = simplifyUrl(url);
  return faviconAPI + baseURl;
}

$('.addButton').on('click', function () {
  var url = window.prompt('请输入需要添加的网址：');

  if (!url) {
    return;
  }

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  localStoredHashMap.push({
    favicon: faviconUrl(url),
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var hashMapString = JSON.stringify(localStoredHashMap);
  localStorage.setItem('localStored', hashMapString);
  localStorage.setItem('currentEngine', currentSearchEngine);
};

$(document).ready(function () {
  $('.searchInput').val("");
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.e36f8654.js.map