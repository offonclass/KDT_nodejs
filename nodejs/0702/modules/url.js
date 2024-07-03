const myURL = new URL("http://localhost.com:8000/users?query=001#hash");

// 속성
console.log('herf: ',myURL.href);
console.log('hostname: ',myURL.hostname);
console.log('pathname: ',myURL.pathname);
console.log('search1: ',myURL.search);
console.log('serchParams.get("query"): ',myURL.searchParams.get('query'));
myURL.searchParams.append('newParam','kdt');
console.log('search2: ',myURL.search);
// 매서드
console.log('toString(): ',myURL.toString());
const query = myURL.search;
const param = new URLSearchParams(query);
console.log('param.get("newParam"): ',param.get('newParam'));
param.set("hello","world");
console.log('param.toString()_set: ',param.toString());
param.delete("hello","world");
console.log('param.toString()_delete: ',param.toString());

