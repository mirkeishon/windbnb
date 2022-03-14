import React from 'react'
import { MdGrade } from 'react-icons/md'
const Stay: React.FC<{
    city: string,
    superhost: boolean,
    title: string,
    rating: number,
    type: string,
    beds: number,
    photo: string,
}> = ({city, superhost = false, title, rating, type, beds, photo}) => {
  return (
    <div className="lg:w-[30%] md:w-[40%] min-w-[330px]">
        <img className="rounded-3xl h-60 w-full" src={photo} alt={`${city} apartment photo`} />
        <div className="pt-4">
            <div className={`flex ${superhost || 'py-1'} justify-between items-center pb-4 space-x-2`}>
                {superhost && <p className="p-1 px-4 border border-black rounded-3xl whitespace-nowrap text-xs">SUPER HOST</p>}
                <p className="whitespace-nowrap text-gray-500 text-sm">{type}</p>
                <p className="whitespace-nowrap text-gray-500 text-sm">{beds && `${beds} Beds`}</p>
                <p className="whitespace-nowrap flex items-center text-gray-500 text-sm">{<MdGrade className='mr-2 text-red-500'/>}{rating}</p>
            </div>
            <p>{title}</p>
        </div>
    </div>
  )
}

export default Stay