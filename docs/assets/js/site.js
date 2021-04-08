function show_email_link(text) {
  let a = '<a href=\"mai';
  let b = 'ugene';
  let c = '\" class=\"content\">';
  a += 'lto:';
  b += '@';
  let e = '</a>';
  let f = '';
  b += 'unipro.ru';
  let g = '<img src=\"';
  let h = '';
  i = '\" alt="Email us." border="0">';

  if (f) {
    d = f;
  } else if (h) {
    d = g + h + i;
  } else {
    d = b;
  }
  const result = a + b + c + (text || d) + e;
  document.write(result);
}

function show_support_email_link(text) {
  let a = '<a href=\"mai';
  let b = 'ugene-support';
  let c = '\" class=\"content\">';
  a += 'lto:';
  b += '@';
  let e = '</a>';
  let f = '';
  b += 'unipro.ru';
  let g = '<img src=\"';
  let h = '';
  let i = '\" alt="Email us." border="0">';
  let j = '?';
  let o = 'body=Hello%20UGENE%20Team,';
  let k = 'subj';
  let n = '&';
  let l = 'ect=Support%20request';

  m = j + k + l;
  p = m + n + o;

  if (f) {
    d = f;
  } else if (h) d = g + h + i;
  else {
    d = b;
  }
  result = a + b + p + c + (text || d) + e;
  document.write(result);
}

