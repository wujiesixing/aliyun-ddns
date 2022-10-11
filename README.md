# aliyun-ddns


## Getting Started

Install:
```bash
  $ npm install @wjsx/aliyun-ddns
```

With CommonJS:
```js
var ddns = require('aliyun-ddns');

ddns.main({
  accessKeyId: ***
  accessKeySecret: ***
  domainName: ***
  value: ***
})
```

with ES modules:
```js
import ddns from 'aliyun-ddns';

ddns.main({
  accessKeyId: ***
  accessKeySecret: ***
  domainName: ***
  value: ***
})
```

## Commands

```bash
Install:
  $ npm install -g @wjsx/aliyun-ddns

Usage:
  $ aliyun-ddns --accessKeyId=*** --accessKeySecret=*** --domainName=*** --value=***

Options:
  -i, --accessKeyId <accessKeyId>               AccessKey ID，必填
  -s, --accessKeySecret <accessKeySecret>       AccessKey Secret，必填
  -e, --endpoint <endpoint>                     服务地址，默认 dns.aliyuncs.com
  -d, --domainName <domainName>                 域名名称，必填
  -v, --value <value>                           记录值，必填
  -r, --RR <RR>                                 主机记录，默认 *
  -t, --type <type>                             解析记录类型，默认 A
  -l, --line <line>                             解析线路，默认 default
  -ttl, --TTL <TTL>                             解析生效时间，默认 600秒
```