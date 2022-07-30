export const WalletLoad = () => {
    return (
        <div className="flex justify-center">
            <div className="w-full md:w-2/3 flex mt-10 px-4 md:px-10 py-6 flex-col justify-center bg-[#f8fbff] dark:bg-[#1A2024] rounded">
                <div className="flex justify-between">
                    <div className='w-2/5 h-4 animate-pulse bg-gray-300 dark:bg-[#000] rounded'></div>
                    <div className='w-2/5 h-4 animate-pulse bg-gray-300 dark:bg-[#000] rounded'></div>
                </div>
                <div className="flex justify-between mt-6">
                    <div className='w-1/3 h-4 animate-pulse bg-gray-300 dark:bg-[#000] rounded'></div>
                    <div className='w-1/3 h-4 animate-pulse bg-gray-300 dark:bg-[#000] rounded'></div>
                </div>

                <div className="flex flex-col items-center my-20">
                    <div className='w-2/3 h-4 animate-pulse bg-gray-300 dark:bg-[#000] rounded'></div>
                    <div className='w-1/3 h-4 animate-pulse bg-gray-300 dark:bg-[#000] rounded mt-4'></div>
                    <div className='flex justify-between w-1/5 mt-4'>
                        <div className='w-2/5 h-6 animate-pulse bg-gray-300 dark:bg-[#000] rounded mt-4'></div>
                        <div className='w-2/5 h-6 animate-pulse bg-gray-300 dark:bg-[#000] rounded mt-4'></div>
                    </div>
                </div>

                {[1, 2, 3].map((index:number) => (
                    <div key={index} className="my-3 leading-3">
                        <div className="flex justify-between">
                            <div className='w-2/6 h-3 animate-pulse bg-gray-300 dark:bg-[#000] rounded'></div>
                            <div className='w-2/6 h-3 animate-pulse bg-gray-300 dark:bg-[#000] rounded'></div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <div className='w-1/6 h-2 animate-pulse bg-gray-300 dark:bg-[#000] rounded'></div>
                            <div className='w-1/6 h-2 animate-pulse bg-gray-300 dark:bg-[#000] rounded'></div>
                        </div>
                    </div>
                ))}
                
                
            </div>
        </div>
    )
}