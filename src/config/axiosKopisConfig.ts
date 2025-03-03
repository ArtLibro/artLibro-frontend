import axios from 'axios'

const parser = new DOMParser();

const KopisApi = axios.create({
  baseURL: 'http://www.kopis.or.kr/openApi/restful',
  timeout: 4000,
  headers : {
    Accept : 'application/xml',
  }
})

KopisApi.interceptors.response.use(function (response) {
  const xmlDoc = parser.parseFromString(response.data, "text/xml");
  const object = xmlToObject(xmlDoc.documentElement);
  response.data = object;
  return response;
  }, function (error) {
  return Promise.reject(error)
}
)

function xmlToObject(xml) {
  let obj = {};

  if (xml.nodeType == 1) {
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType == 3) {
    // text
    obj = xml.nodeValue;
  }

  var textNodes = [].slice.call(xml.childNodes).filter(function(node) {
    return node.nodeType === 3;
  });
  if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
    obj = [].slice.call(xml.childNodes).reduce(function(text, node) {
      return text + node.nodeValue;
    }, "");
  } else if (xml.hasChildNodes()) {
    for (var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof obj[nodeName] == "undefined") {
        obj[nodeName] = xmlToObject(item);
      } else {
        if (typeof obj[nodeName].push == "undefined") {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToObject(item));
      }
    }
  }
  return obj;
}

export default KopisApi
