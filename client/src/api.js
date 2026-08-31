// Talks to the Express backend. In dev, Vite proxies /api -> localhost:5000.
export async function submitEnquiry(payload) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Submission failed')
  return data
}

// After a successful enquiry, pull the e-brochure. Served as a static file
// (no leading slash — same convention as image paths — so it resolves under
// the GitHub Pages sub-path in production) rather than through the backend,
// which isn't hosted.
export function downloadBrochure() {
  const link = document.createElement('a')
  link.href = 'trivik-courtyard-brochure.pdf'
  link.download = 'Trivik Courtyard Brochure.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
