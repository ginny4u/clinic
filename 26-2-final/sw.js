/* 내신 클리닉 트래커: 홈 화면 앱용 서비스 워커.
 * 아무것도 저장해 두지 않음 — 화면은 언제나 인터넷에서 새로 받고, 채점·저장 같은 서버 요청은 건드리지 않음.
 * 인터넷이 끊겼을 때만 안내 문구를 보여 줌. */
var OFFLINE = '<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>연결 안 됨</title></head>' +
  '<body style="margin:0;background:#f3f4f6;font-family:system-ui,-apple-system,sans-serif;color:#17181c"><p style="padding:48px 24px;text-align:center;line-height:1.6">인터넷에 연결되지 않았어요.<br>연결을 확인한 뒤 다시 열어 주세요.</p></body></html>';
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(function () {
    return new Response(OFFLINE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
