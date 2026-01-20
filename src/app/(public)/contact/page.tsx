'use client' // Action state requires a client component

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendContactEmail } from '@/lib/actions'
import { Mail, CheckCircle2 } from 'lucide-react'

export default function Contact() {
  const [isSent, setIsSent] = useState(false)
  const [isPending, setIsPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    const result = await sendContactEmail(formData)
    setIsPending(false)
    
    if (result.success) {
      setIsSent(true)
    } else {
      alert("Something went wrong. Please try again.")
    }
  }

  if (isSent) {
    return (
      <section className="py-24 px-4 container mx-auto max-w-2xl text-center">
        <div className="bg-white dark:bg-slate-900 p-12 rounded-extra shadow-cute border border-mint-100 flex flex-col items-center">
          <CheckCircle2 className="w-16 h-16 text-mint-500 mb-6 animate-bounce" />
          <h1 className="text-3xl font-bold mb-4">Message Sent!</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Thank you for reaching out. I&apos;ll get back to you as soon as possible.
          </p>
          <Button onClick={() => setIsSent(false)} variant="outline">Send another</Button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 container mx-auto max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <div className="inline-flex p-3 rounded-full bg-mint-50 dark:bg-mint-950/30 text-mint-500 mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h1 className="font-display text-5xl mb-4 bg-gradient-to-r from-mint-500 to-blush-500 bg-clip-text text-transparent">
          Get In Touch
        </h1>
      </div>

      <form action={handleSubmit} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-extra shadow-cute border border-slate-100 dark:border-slate-800">
        <Input name="name" placeholder="Name" required className="rounded-xl border-slate-200" />
        <Input name="email" type="email" placeholder="Email" required className="rounded-xl border-slate-200" />
        <Textarea name="message" placeholder="How can I help?" rows={6} required className="rounded-xl border-slate-200 resize-none" />
        
        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full py-6 text-lg font-semibold rounded-xl shadow-cute disabled:opacity-70"
        >
          {isPending ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </section>
  )
}
