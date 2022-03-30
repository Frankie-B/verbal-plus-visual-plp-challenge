const userInfo = {
  options: [],
  header: [
    navigator.platform,
    navigator.userAgent,
    navigator.appVersion,
    navigator.vendor, window.opera,
  ],
  dataos: [
    {
      name: 'Windows Phone',
      value: 'Windows Phone',
      version: 'OS',
    },
    {
      name: 'Windows',
      value: 'Win',
      version: 'NT',
    },
    {
      name: 'iPhone',
      value: 'iPhone',
      version: 'OS',
    },
    {
      name: 'iPad',
      value: 'iPad',
      version: 'OS',
    },
    {
      name: 'Kindle',
      value: 'Silk',
      version: 'Silk',
    },
    {
      name: 'Android',
      value: 'Android',
      version: 'Android',
    },
    {
      name: 'PlayBook',
      value: 'PlayBook',
      version: 'OS',
    },
    {
      name: 'BlackBerry',
      value: 'BlackBerry',
      version: '/',
    },
    {
      name: 'Macintosh',
      value: 'Mac',
      version: 'OS X',
    },
    {
      name: 'Linux',
      value: 'Linux',
      version: 'rv',
    },
    {
      name: 'Palm',
      value: 'Palm',
      version: 'PalmOS',
    },
  ],
  databrowser: [
    {
      name: 'Chrome',
      value: 'Chrome',
      version: 'Chrome',
    },
    {
      name: 'Firefox',
      value: 'Firefox',
      version: 'Firefox',
    },
    {
      name: 'Safari',
      value: 'Safari',
      version: 'Version',
    },
    {
      name: 'Internet Explorer',
      value: 'MSIE',
      version: 'MSIE',
    },
    {
      name: 'Opera',
      value: 'Opera',
      version: 'Opera',
    },
    {
      name: 'BlackBerry',
      value: 'CLDC',
      version: 'CLDC',
    },
    {
      name: 'Mozilla',
      value: 'Mozilla',
      version: 'Mozilla',
    },
  ],
  init: () => {
    const agent = this.header.join(' ');
    const os = this.matchItem(agent, this.dataos);
    const browser = this.matchItem(agent, this.databrowser);

    return {
      os,
      browser,
    };
  },
  matchItem: (string, data) => {
    const i = 0;
    const j = 0;
    const html = '';
    let regex;
    let regexv;
    let match;
    let matches;
    let version;

    for (i = 0; i < data.length; i += 1) {
      regex = new RegExp(data[i].value, 'i');
      match = regex.test(string);
      if (match) {
        regexv = new RegExp(`${data[i].version}[- /:;]([\\d._]+)`, 'i');
        matches = string.match(regexv);
        version = '';
        if (matches) {
          if (matches[1]) {
            [matches] = matches;
          }
        }
        if (matches) {
          matches = matches.split(/[._]+/);
          for (let j = 0; j < matches.length; j += 1) {
            if (j === 0) {
              version += `${matches[j]}.`;
            } else {
              version += matches[j];
            }
          }
        } else {
          version = '0';
        }
        return {
          name: data[i].name,
          version: parseFloat(version),
        };
      }
    }
    return {
      name: 'unknown',
      version: 0,
    };
  },
};

// const errorLogProductionUrl = 'https://hooks.slack.com/services/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';
const errorLogDevelopmentUrl = 'https://hooks.slack.com/services/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';

const logMessage = (message) => {
  const req = new XMLHttpRequest();
  req.open('POST', errorLogDevelopmentUrl);
  const body = {
    text: message,
  }
  req.send(JSON.stringify(body));
};


const logCheckoutError = ({
  requestUrl,
  requestBody,
  failedReq,
  currentUserCart,
}) => {
  let items = currentUserCart;
  if (Object.keys(items[0]) < 1) {
    items.shift();
  }
  items = items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    variant_id: item.variant_id,
    product_id: item.product_id,
    url: item.url,
  }));
  const message = `
    *Error Received:*\n
    _Source_: ${window.location.href}\n
    _Request Url_: ${requestUrl}\n
    _Device Information_:
    \`\`\`
    ${JSON.stringify(userInfo.init(), null, 2)}
    \`\`\`
    _Request Body_: 
    \`\`\`
    ${JSON.stringify(requestBody, null, 2)}
    \`\`\`
    _Response_: 
    \`\`\`
    ${JSON.stringify(JSON.parse(failedReq.responseText), null, 2)}
    \`\`\`
    _Cart state before request_: 
    \`\`\`
    ${JSON.stringify(items, null, 2)}
    \`\`\`
  `;
  logMessage(message);
};

export {
  logCheckoutError,
  logMessage,
};
