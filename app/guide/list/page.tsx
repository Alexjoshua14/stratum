import { getUsersGuides } from "@/lib/supabase/guides"

export default async function GuidePage() {
  const guides = await getUsersGuides()

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
        {guides?.map((guide) => (
          <div key={guide.id} className="flex gap-2" >
            <h1>
              {guide.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  )


}