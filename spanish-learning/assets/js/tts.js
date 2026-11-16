(function () {
  var synth = window.speechSynthesis;
  var voices = [];
  function load() { voices = synth ? synth.getVoices() : []; }
  if (synth) { load(); synth.onvoiceschanged = load; }
  function pick() {
    return voices.find(function (v) { return v.lang === 'es-ES'; }) ||
      voices.find(function (v) { return v.lang === 'es-MX'; }) ||
      voices.find(function (v) { return v.lang.toLowerCase().indexOf('es') === 0; });
  }
  function speak(text, rate) {
    if (!synth) return;
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    var v = pick();
    u.lang = v ? v.lang : 'es-ES';
    if (v) u.voice = v;
    u.rate = rate || 1;
    synth.speak(u);
  }
  // 為每個 .speak 按鈕自動補上慢速 🐢 按鈕（可重複呼叫）
  window.enhanceSpeakButtons = function (root) {
    (root || document).querySelectorAll('button.speak:not(.slow):not([data-enhanced])').forEach(function (b) {
      b.dataset.enhanced = '1';
      var s = document.createElement('button');
      s.className = 'speak slow';
      s.dataset.text = b.dataset.text;
      s.dataset.rate = '0.6';
      s.textContent = '🐢';
      s.title = '慢速重複';
      s.setAttribute('aria-label', '慢速朗讀');
      b.setAttribute('aria-label', '朗讀');
      b.insertAdjacentElement('afterend', s);
    });
  };
  document.addEventListener('click', function (e) {
    var b = e.target.closest('button.speak');
    if (b) speak(b.dataset.text, parseFloat(b.dataset.rate) || 1);
  });
  document.addEventListener('DOMContentLoaded', function () {
    window.enhanceSpeakButtons();
    setTimeout(function () {
      var main = document.querySelector('main');
      if (main && document.querySelector('button.speak') && (!synth || !pick())) {
        var n = document.createElement('div');
        n.className = 'notice';
        n.textContent = '你的瀏覽器可能不支援西班牙文發音（建議使用 Chrome、Edge 或 Safari）。其他功能不受影響。';
        main.insertBefore(n, main.firstChild);
      }
    }, 1200);
  });
})();
