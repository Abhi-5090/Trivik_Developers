// When built with VITE_PREVIEW=true (the shareable static build), there is no
// live backend, so forms show a friendly preview message instead of submitting.
export const IS_PREVIEW = import.meta.env.VITE_PREVIEW === 'true'

export const PREVIEW_MESSAGE =
  'Thanks for your interest! This is a preview build for review — enquiries are not submitted here. The live site will capture your details.'
