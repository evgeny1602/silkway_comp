import loaderAnimation from '../assets/loader.gif'

export function SearchResultsLoader() {
  return (
    <div className="w-full h-full flex justify-center items-center absolute top-0 left-0 z-10 ">
      <img
        className="opacity-75"
        src={loaderAnimation}
      />
    </div>
  )
}
