function hide_email_from_robots(text) {
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

function hide_email_from_robots3(text) {
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
  let l = 'ect=Commercial%20support%20request';

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

function hide_email_from_robots3_rus(text) {
  var a, b, c, d, e, f, g, h, i;
  a = '<a href=\"mai';
  b = 'ugene-support';
  c = '\" class=\"content\">';
  a += 'lto:';
  b += '@';
  e = '</a>';
  f = '';
  b += 'unipro.ru';
  g = '<img src=\"';
  h = '';
  i = '\" alt="Email us." border="0">';
  j = '?';
  k = 'subj';
  n = '&';
  l = 'ect=������%20��%20������������%20���������';

  m = j + k + l;
  p = m + n;

  if (f) d = f;
  else if (h) d = g + h + i;
  else d = b;
  let result = a + b + p + c + d + e;
  if (text) {
    result = a + b + p + c + text + e;
  }
  document.write(result);
}
