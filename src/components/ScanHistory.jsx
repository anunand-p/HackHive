import React from 'react';

export default function ScanHistory({ history, onClearHistory }) {
  if (!history || history.length === 0) return null;

  const exportCSV = () => {
    const headers = ['Date', 'Crop', 'Disease', 'Confidence', 'Severity', 'Remedy'];
    const escapeCell = (val) => `"${String(val || '').replace(/"/g, '""')}"`;
    const rows = history.map((scan) =>
      [scan.date, scan.crop, scan.disease, scan.confidence, scan.severity, scan.remedy]
        .map(escapeCell)
        .join(',')
    );
    const blob = new Blob([[headers.join(','), ...rows].join('\n')], {
      type: 'text/csv;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agrova-field-history-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const escapeHtml = (s) =>
      String(s || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
    const rowsHtml = history
      .map(
        (scan) => `
        <tr>
          <td>${escapeHtml(scan.date)}</td>
          <td>${escapeHtml(scan.crop)}</td>
          <td>${escapeHtml(scan.disease)}</td>
          <td>${escapeHtml(scan.confidence)}</td>
          <td>${escapeHtml(scan.severity)}</td>
          <td>${escapeHtml(scan.remedy)}</td>
        </tr>`
      )
      .join('');

    const printWin = window.open('', '_blank', 'width=900,height=700');
    if (!printWin) return;
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Agrova Diagnostic Log</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #1a3a1f; }
            h1 { margin-bottom: 4px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #cbdccc; padding: 10px; text-align: left; font-size: 13px; }
            th { background: #e8f5e9; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>🌿 Agrova Diagnostic History Report</h1>
          <p>Exported: ${new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Date</th><th>Crop</th><th>Disease</th><th>Confidence</th><th>Severity</th><th>Remedy</th>
              </tr>
            </thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </body>
      </html>
    `);
    printWin.document.close();
    printWin.focus();
    printWin.print();
  };

  return (
    <section className="section-wrapper" style={{ paddingTop: 0 }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.4rem',
            flexWrap: 'wrap',
            gap: '12px'
          }}
        >
          <h3 style={{ fontSize: '1.3rem', color: 'var(--green-deep)', fontWeight: 800 }}>
            📊 Recent Field Scans ({history.length})
          </h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={exportCSV}
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem', padding: '5px 14px' }}
            >
              ⬇ CSV Export
            </button>
            <button
              onClick={exportPDF}
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem', padding: '5px 14px' }}
            >
              🖨️ PDF Print
            </button>
            <button
              onClick={onClearHistory}
              className="btn btn-secondary"
              style={{ fontSize: '0.78rem', padding: '5px 14px' }}
            >
              ✕ Clear All
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {history.map((scan, idx) => {
            const badgeColor =
              scan.severity === 'high'
                ? '#fee2e2;color:#991b1b'
                : scan.severity === 'medium'
                ? '#fef3c7;color:#92400e'
                : '#dcfce7;color:#166534';

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '12px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.65)',
                  border: '1px solid var(--section-border)'
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: '#e8f0e9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.4rem'
                  }}
                >
                  {scan.image ? (
                    <img src={scan.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    '🌿'
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--green-deep)' }}>
                    {scan.disease}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {scan.crop} · {scan.date} · {scan.confidence}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '2px' }}>
                    Remedy: {scan.remedy}
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: '50px',
                    textTransform: 'uppercase',
                    background: badgeColor.split(';')[0],
                    color: badgeColor.split('color:')[1]
                  }}
                >
                  {scan.severity}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
