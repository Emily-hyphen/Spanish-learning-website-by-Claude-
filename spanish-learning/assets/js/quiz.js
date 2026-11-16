(function () {
  var dataEl = document.getElementById('quiz-data');
  var box = document.getElementById('quiz');
  if (!dataEl || !box) return;
  var data;
  try { data = JSON.parse(dataEl.textContent); }
  catch (e) { box.textContent = '測驗資料讀取失敗。'; return; }

  function render() {
    box.innerHTML = '';
    var score = 0, done = 0;
    var summary = document.createElement('p');
    summary.className = 'score';
    data.forEach(function (q, i) {
      var card = document.createElement('div');
      card.className = 'q';
      var t = document.createElement('p');
      t.className = 'q-title';
      t.textContent = (i + 1) + '. ' + q.q;
      card.appendChild(t);
      if (q.speak) {
        var sp = document.createElement('button');
        sp.className = 'speak';
        sp.dataset.text = q.speak;
        sp.textContent = '🔊';
        card.appendChild(sp);
      }
      var opts = document.createElement('div');
      opts.className = 'opts';
      var fb = document.createElement('p');
      fb.className = 'fb';
      q.options.forEach(function (text, j) {
        var b = document.createElement('button');
        b.className = 'opt';
        b.textContent = text;
        b.addEventListener('click', function () {
          if (card.dataset.done) return;
          card.dataset.done = '1';
          done++;
          var ok = j === q.answer;
          if (ok) score++;
          b.classList.add(ok ? 'right' : 'wrong');
          if (!ok) opts.children[q.answer].classList.add('right');
          fb.textContent = (ok ? '✅ 答對了！' : '❌ 再想想。') + ' ' + (q.explain || '');
          if (done === data.length) {
            summary.textContent = '成績：' + score + ' / ' + data.length;
            var r = document.createElement('button');
            r.className = 'retry';
            r.textContent = '重做一次';
            r.addEventListener('click', render);
            box.appendChild(r);
          }
        });
        opts.appendChild(b);
      });
      card.appendChild(opts);
      card.appendChild(fb);
      box.appendChild(card);
    });
    box.appendChild(summary);
    if (window.enhanceSpeakButtons) window.enhanceSpeakButtons(box);
  }
  render();
})();
