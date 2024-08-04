const Skeleton = () => {
  return (
    <div className="bg-white border-2 rounded-xl grid grid-cols-[128px_1fr] w-full p-2 gap-4 items-center animate-pulse">
      <div className="bg-primaryContainer rounded-xl border-2 flex size-32 animate-border-blink"/>

      <div className="flex flex-col gap-1.5">
        <div className="bg-primaryContainer h-7 w-full animate-border-blink"/>
        <div className="bg-primaryContainer h-6 w-3/5 animate-border-blink"/>
        <div className="bg-primaryContainer h-6 w-3/4 animate-border-blink"/>
        <div className="bg-primaryContainer h-6 w-2/5 animate-border-blink"/>
      </div>
    </div>
  )
}

export default Skeleton;