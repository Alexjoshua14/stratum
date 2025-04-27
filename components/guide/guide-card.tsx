export const GuideCard = () => {
  return (
    <div className="relative w-44 h-56 hover:brightness-110 hover:-translate-x-1 hover:-translate-y-1 transition-all duration-500 ease-in-out cursor-pointer">
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