const marked = require('marked');
const DomPurify = require('dompurify');
const mark = marked('# marked test');
console.log(mark);
console.log(DomPurify.sanitize('<p>this </p>'))