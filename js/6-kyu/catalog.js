// Catalog
// https://www.codewars.com/kata/59d9d8cb27ee005972000045

function catalog(s, article) {
  const reg = /<prod><name>(.*?)<\/name><prx>(.*?)<\/prx><qty>(.*?)<\/qty><\/prod>/g
  let m;
  const r = []
  while(m = reg.exec(s) ) {
    if (m[1].indexOf(article) > -1) r.push(`${m[1]} > prx: $${m[2]} qty: ${m[3]}`)
  }
  return r.length ? r.join("\r\n") : 'Nothing'
}