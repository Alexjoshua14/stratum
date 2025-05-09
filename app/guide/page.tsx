import { GuideCard } from "@/components/guide/guide-card"

export default function GuidePage() {


  return (
    <div className="w-dvw h-dvh flex flex-col items-center p-10">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-3xl font-bold mb-6 text-primary">Guide Page</h1>
        <div className="flex gap-4 pb-10">
          {/* Construction emoji */}
          <span role="img" aria-label="construction" className="text-2xl">🚧</span>
          <h2>
            Under Construction
          </h2>
          <span role="img" aria-label="construction" className="text-2xl">🚧</span>
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-center gap-8">
        {
          // In a real application, we would fetch the guide data based on the ID
          // Sample guide data
          Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="flex flex-col gap-4">
              <GuideCard />
            </div>
          ))
        }
      </div>
    </div>
  )


}