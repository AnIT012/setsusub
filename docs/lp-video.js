// 開き直した時に、前に見ていた位置（一番下など）へ飛ばない。いつも一番上から
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
if (!location.hash) { window.scrollTo(0, 0); }
// 画面の録画：見えている間だけ流す。動きを減らす設定の人には止めた1枚（poster）と再生ボタンを出す
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var videos = Array.prototype.slice.call(document.querySelectorAll('video[data-auto]'));
  videos.forEach(function (v) {
    v.muted = true; v.loop = true; v.playsInline = true;
    v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    if (reduce) { v.controls = true; v.removeAttribute('autoplay'); v.pause(); }
  });
  if (reduce) return;
  if (!('IntersectionObserver' in window)) { videos.forEach(function (v) { v.play().catch(function () {}); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { v.play().catch(function () {}); } else { v.pause(); }
    });
  }, { threshold: 0.25 });
  videos.forEach(function (v) { io.observe(v); });
})();
