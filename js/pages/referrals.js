/* Halaman Referrals */
if (initShell()) {
  function render() {
    var rows = getData().referrals || [];
    setText('st-total', rows.length);
    var active = rows.filter(function (r) { return r.status === 'Active'; }).length;
    setText('st-active', active);
    setText('st-inactive', rows.length - active);

    document.getElementById('tbody').innerHTML = rows.length
      ? rows.map(function (r) {
      return '<tr>' +
        '<td><div class="cell-user">' + avatar(r.owner) + '<div><b>' + escapeHtml(r.owner) + '</b></div></div></td>' +
        '<td class="mono">' + escapeHtml(r.code) + '</td>' +
        '<td>' + (r.joins || 0) + '</td>' +
        '<td>' + money(r.earned || 0) + '</td>' +
        '<td>' + statusBadge(r.status) + '</td>' +
        '<td><div class="row-actions"><button type="button" class="btn btn-outline btn-sm" data-copy="' + escapeHtml(r.code) + '">' + icon('copy') + 'Copy</button></div></td></tr>';
    }).join('')
      : '<tr><td colspan="6"><div class="empty-state">' + icon('inbox') + 'Belum ada data referral</div></td></tr>';
  }

  document.getElementById('tbody').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-copy]');
    if (!btn) return;
    var code = btn.getAttribute('data-copy');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(function () { toast('Kode ' + code + ' disalin', 'ok'); });
    } else {
      toast('Kode: ' + code, 'ok');
    }
  });

  render();
  hydrateIcons();
}
