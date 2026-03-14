export function emailBase(content: string, subject: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF7F2;font-family:'DM Sans',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF7F2;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:#C4754A;padding:28px 40px;border-radius:12px 12px 0 0;">
              <p style="margin:0;color:#FDFBF8;font-size:20px;font-weight:600;letter-spacing:-0.02em;">
                Dr. Bhargavi Pidugu
              </p>
              <p style="margin:4px 0 0;color:rgba(253,251,248,0.8);font-size:13px;letter-spacing:0.04em;text-transform:uppercase;">
                MS (Ophthalmology) · MBBS · Paediatric Ophthalmologist
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#FDFBF8;padding:40px;border-radius:0 0 12px 12px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 0;text-align:center;">
              <p style="margin:0;color:#A89E98;font-size:12px;">
                © Dr. Bhargavi Pidugu ·
                <a href="https://drbhargavipidugu.com" style="color:#C4754A;text-decoration:none;">drbhargavipidugu.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const buttonStyle = `display:inline-block;background-color:#C4754A;color:#FDFBF8;text-decoration:none;padding:14px 28px;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:-0.01em;`
export const h1Style = `margin:0 0 16px;color:#2D2420;font-size:22px;font-weight:600;`
export const pStyle = `margin:0 0 16px;color:#3D3530;font-size:15px;line-height:1.75;`
export const labelStyle = `display:block;color:#7A6E68;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;margin-bottom:4px;`
export const valueStyle = `display:block;color:#2D2420;font-size:15px;font-weight:500;margin-bottom:16px;`
