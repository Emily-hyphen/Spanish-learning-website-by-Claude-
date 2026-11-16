(async function () {
  var root = document.body.dataset.root || '';
  var lessons;
  try {
    var res = await fetch(root + 'data/lessons.json');
    lessons = await res.json();
  } catch (e) {
    var t = document.getElementById('toc') || document.getElementById('lesson-nav');
    if (t) t.textContent = '無法載入課程清單。請用 GitHub Pages 或本機伺服器（python3 -m http.server）開啟。';
    return;
  }
  var toc = document.getElementById('toc');
  if (toc) {
    var levels = { A1: 'A1 · 入門 Principiante', A2: 'A2 · 初級 Elemental', B1: 'B1 · 中級 Intermedio' };
    Object.keys(levels).forEach(function (lv) {
      var sec = document.createElement('section');
      sec.innerHTML = '<h2>' + levels[lv] + '</h2><div class="grid"></div>';
      var grid = sec.querySelector('.grid');
      lessons.filter(function (x) { return x.level === lv; }).forEach(function (x) {
        var el = document.createElement(x.ready ? 'a' : 'div');
        el.className = 'card' + (x.ready ? '' : ' soon');
        if (x.ready) el.href = 'lessons/' + x.file;
        el.innerHTML = '<strong>' + lv + '-' + x.num + ' ' + x.zh + '</strong><small>' + x.en + (x.ready ? '' : '（即將推出）') + '</small>';
        grid.appendChild(el);
      });
      toc.appendChild(sec);
    });
  }
  var nav = document.getElementById('lesson-nav');
  if (nav) {
    var ready = lessons.filter(function (x) { return x.ready; });
    var i = ready.findIndex(function (x) { return x.file.replace('.html', '') === document.body.dataset.lesson; });
    var prev = ready[i - 1], next = ready[i + 1];
    nav.innerHTML = (prev ? '<a href="' + prev.file + '">← ' + prev.zh + '</a>' : '<span></span>') +
      (next ? '<a href="' + next.file + '">' + next.zh + ' →</a>' : '<span></span>');
  }
})();
