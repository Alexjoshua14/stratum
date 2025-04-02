import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GuidePage({ params }: { params: { id: string } }) {
  // In a real application, we would fetch the guide data based on the ID
  const sampleGuideData = {
    title: "Building a Simple Web Scraper",
    sections: [
      {
        title: "Introduction",
        content: "In this project, we will build a simple web scraper using Python and the Beautiful Soup library.",
      },
      {
        title: "Prerequisites",
        content: "Basic knowledge of Python, HTML, and HTTP requests.",
      },
      {
        title: "Step 1: Setting up the environment",
        content: "Install Python and the required libraries: requests and beautifulsoup4.",
      },
      // Add more sections as needed
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-primary">{sampleGuideData.title}</h1>
      {sampleGuideData.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-secondary">{section.title}</h2>
          <p className="text-secondary-foreground">{section.content}</p>
        </div>
      ))}
      <Link href="/create">
        <Button>Create Another Guide</Button>
      </Link>
    </div>
  )
}

