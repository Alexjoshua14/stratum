

const GuideCard = () => {
  return (
    <div className="relative w-44 h-56 hover:brightness-110 transition-all duration-300 ease-in-out">
      {/* Back cover of book */}
      <div className="absolute inset-0 left-0.5 bg-gradient-to-tr from-teal-800 to-slate-900 rounded-md shadow-lg">
      </div>
      {/* Pages on top of book */}
      {/* Spine of book */}
      {/* <div className="z-10 absolute inset-0 right-0.5 bg-gradient-to-bl from-slate-400 to-slate-800 rounded-md shadow-lg"> */}
      <div className="z-30 absolute left-0 h-56 w-4 right-0.5 bg-gradient-to-bl from-slate-600 to-slate-950 rounded-l-md shadow-lg">
      </div>
      {/* Pages on botton of book */}
      <div className="z-5 absolute bottom-1.5 right-0.5 w-[158px] h-4 rounded-b-md bg-gradient-to-t from-slate-500 to-slate-50 shadow-md">
      </div>

      {/* Book cover, on hover open cover to reveal first page */}
      <div className="z-20 absolute right-0 w-40 h-52 flex flex-col gap-6 p-2 bg-gradient-to-tr from-teal-800 to-teal-600 rounded-r-md">
        <h1 className="font-medium text-xl">Guide Title</h1>
        <div className="flex flex-col gap-2">
          <p className="text-sm">
            {/* Guide Description  TODO: Put guide title inside, and animate on hover */}
            Guide Description
          </p>
          <p className="text-sm font-light">Intermediate</p>
        </div>
      </div>
    </div >
  )
}

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
      <div className="flex flex-wrap gap-8">
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