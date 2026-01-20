'use client'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')  // Reset
        const res = await signIn('credentials', { email, password, redirect: false })
        if (res?.ok) {
            router.push('/admin')
        } else {
            setEmail('')  // Reset fields
            setPassword('')
            setError(res?.error || 'Invalid credentials')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blush-50 to-mint-50">
            <Card className="w-full max-w-md p-8 shadow-cute">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Move the error display HERE inside the form or card */}
                    {error && (
                        <div className="p-3 bg-red-100 text-red-800 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <Input placeholder="admin@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                    <Input type="password" placeholder="admin123" value={password} onChange={e => setPassword(e.target.value)} />
                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </Card>
        </div>
    )
}
