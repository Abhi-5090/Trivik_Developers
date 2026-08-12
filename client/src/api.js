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

// Same behaviour as the original: after a successful enquiry, pull the e-brochure.
export function downloadBrochure() {
  const link = document.createElement('a')
  link.href = '/api/brochure'
  link.download = 'Trivik Courtyard.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
