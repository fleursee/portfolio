'use client'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useFadeIn, useSlideInLeft, useSlideInRight, useScaleUp } from '@/hooks/useScrollAnimation'
import { Sparkles, Code, Palette, Zap } from 'lucide-react'

export default function Home() {
  const heroRef = useFadeIn()
  const card1Ref = useSlideInLeft()
  const card2Ref = useSlideInRight()
  const card3Ref = useScaleUp(0.2)
  const demoRef = useFadeIn(0.3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section with GSAP Animation */}
        <section className="relative overflow-hidden bg-gradient-to-br from-mint-50 via-blush-50 to-lavender-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div ref={heroRef} className="text-center space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Design System Demo</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-foreground">
                Welcome to the
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-mint-500 to-blush-500 dark:from-mint-400 dark:to-blush-400">
                  Design System
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                A beautiful, subtle, and cute component library built with Next.js, Tailwind CSS, and GSAP
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button size="lg" variant="default">
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  View Components
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold mb-4">Component Showcase</h2>
              <p className="text-lg text-muted-foreground">Explore our beautiful UI components</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card ref={card1Ref} className="border-2 hover:shadow-soft transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-soft bg-mint-400 dark:bg-mint-500 flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-slate-900 dark:text-white" />
                  </div>
                  <CardTitle>Reusable Components</CardTitle>
                  <CardDescription>
                    Build beautiful interfaces with our carefully crafted component library
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="mint">Button</Badge>
                    <Badge variant="blush">Card</Badge>
                    <Badge variant="lavender">Input</Badge>
                    <Badge variant="peach">Badge</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="mint" className="w-full">Learn More</Button>
                </CardFooter>
              </Card>

              <Card ref={card2Ref} className="border-2 hover:shadow-soft transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-soft bg-blush-400 dark:bg-blush-500 flex items-center justify-center mb-4">
                    <Palette className="h-6 w-6 text-slate-900 dark:text-white" />
                  </div>
                  <CardTitle>Subtle Cute Aesthetic</CardTitle>
                  <CardDescription>
                    Soft pastels, rounded corners, and friendly fonts for a delightful experience
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="blush">Pastels</Badge>
                    <Badge variant="lavender">Rounded</Badge>
                    <Badge variant="peach">Friendly</Badge>
                    <Badge variant="sky">Modern</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="blush" className="w-full">Explore</Button>
                </CardFooter>
              </Card>

              <Card ref={card3Ref} className="border-2 hover:shadow-soft transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-soft bg-lavender-300 dark:bg-lavender-500 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-slate-900 dark:text-white" />
                  </div>
                  <CardTitle>GSAP Animations</CardTitle>
                  <CardDescription>
                    Smooth scroll-triggered animations that bring your content to life
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="lavender">Scroll</Badge>
                    <Badge variant="mint">Fade</Badge>
                    <Badge variant="sky">Slide</Badge>
                    <Badge variant="peach">Scale</Badge>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="lavender" className="w-full">Animate</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section ref={demoRef} className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-display font-bold mb-4">Interactive Demo</h2>
                <p className="text-lg text-muted-foreground">Try out our components</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Button Variants */}
                <Card>
                  <CardHeader>
                    <CardTitle>Button Variants</CardTitle>
                    <CardDescription>Different button styles for various use cases</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <Button variant="default">Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="mint">Mint</Button>
                      <Button variant="blush">Blush</Button>
                      <Button variant="lavender">Lavender</Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Badge Variants */}
                <Card>
                  <CardHeader>
                    <CardTitle>Badge Variants</CardTitle>
                    <CardDescription>Colorful badges for tags and labels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="mint">Mint</Badge>
                      <Badge variant="blush">Blush</Badge>
                      <Badge variant="lavender">Lavender</Badge>
                      <Badge variant="peach">Peach</Badge>
                      <Badge variant="sky">Sky</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Input Demo */}
                <Card>
                  <CardHeader>
                    <CardTitle>Input Fields</CardTitle>
                    <CardDescription>Beautiful form inputs with focus states</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input type="text" placeholder="Enter your name" />
                    <Input type="email" placeholder="your.email@example.com" />
                    <Input type="password" placeholder="Password" />
                  </CardContent>
                </Card>

                {/* Theme Toggle Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Dark Mode</CardTitle>
                    <CardDescription>Toggle between light and dark themes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use the theme toggle button in the header to switch between light and dark modes. 
                      All components automatically adapt to the selected theme.
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="mint">Light Mode</Badge>
                      <Badge variant="lavender">Dark Mode</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
