import { useState, type FormEvent } from 'react'

type State = 'idle' | 'pending' | 'success' | 'error'

export function NewsletterForm() {
  const [state, setState] = useState<State>('idle')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'pending') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) => body.append(key, String(value)))
    setState('pending')
    try {
      const response = await fetch('/newsletter-form.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('Submission failed')
      const isUnprocessedRegistration = /\bdata-netlify\s*=/i.test(await response.text())
      if (isUnprocessedRegistration) throw new Error('Form handling is unavailable')
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <p role="status" className="mt-6 rounded-full bg-cream/10 px-5 py-3 text-sm inline-block">
        You're on the list — cheers! 🥂
      </p>
    )
  }

  return (
    <form
      name="newsletter"
      method="POST"
      action="/newsletter-form.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      onChange={() => {
        if (state === 'error') setState('idle')
      }}
      className="mt-6 max-w-md"
    >
      <input type="hidden" name="form-name" value="newsletter" />
      <p hidden>
        <label>
          Leave empty
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset disabled={state === 'pending'} className="flex gap-2 rounded-full bg-cream/10 p-1.5 focus-within:ring-2 focus-within:ring-blush/60">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="you@example.com"
          className="flex-1 min-w-0 bg-transparent px-4 text-sm placeholder:text-cream/40 outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-paper hover:bg-clay-dark active:scale-95 transition disabled:opacity-60"
        >
          {state === 'pending' ? 'Joining…' : 'Join'}
        </button>
      </fieldset>
      {state === 'error' && (
        <p role="alert" className="mt-3 text-sm text-blush">
          We couldn't confirm your signup. Your email is still here — please try again in a moment.
        </p>
      )}
    </form>
  )
}
