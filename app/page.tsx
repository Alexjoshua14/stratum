import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-6 text-primary">CS Project Guides</h1>
      <p className="text-xl mb-8 text-center max-w-2xl text-secondary-foreground">
        Generate structured computer science project guides using AI. Simply describe your project, and we'll create a
        comprehensive guide for you.
      </p>
      <Link href="/create">
        <Button size="lg">Create a Guide</Button>
      </Link>
    </div>
  )
}

