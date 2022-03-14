import axios from 'axios'
import React, { SetStateAction, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { MdOutlineSearch, MdPlace } from 'react-icons/md'
import { FaMinus, FaPlus } from 'react-icons/fa'
const cities = [
    'Helsinki',
    'Turku',
    'Oulu',
    'Vaasa'
  ]



const Header: React.FC<{
    country:string,
    guests: number,
    setCountry: React.Dispatch<React.SetStateAction<string>>,
    setGuests: React.Dispatch<React.SetStateAction<number>>,
    setLoading: React.Dispatch<SetStateAction<boolean>>,
    setStays: React.Dispatch<SetStateAction<never[]>>
    }> = ({
        country, 
        guests, 
        setCountry, 
        setGuests,
        setLoading,
        setStays}) => {
    
    const [open, setOpen] = useState(false)
    const inputLocation = useRef<HTMLDivElement>(null)
    const inputGuest = useRef<HTMLDivElement>(null)
    const [error, setError] = useState(false)
    const [list, setList] = useState('')
    const [adultCount, setAdultCount] = useState(0)
    const [childCount, setChildCount] = useState(0)

    useEffect(()=>{
        setGuests(adultCount + childCount)
    },[adultCount, childCount])
    
    const inputClick = (input:any) => {
        if(input === 'guest'){
            if(null !== inputGuest.current){
            inputGuest.current.style.outline = '2px solid black'
            setList('guest')
            }
        }else if(input === 'location'){
            if(null !== inputLocation.current){
                inputLocation.current.style.outline = '2px solid black'
                setList('location')
            }
        }
        
    }
    const getLocation = async (e: React.SyntheticEvent) => {
        
        setLoading(true)
        try {
            setOpen(false)
            const location = country
            const guest = guests
            const {data} = await axios.post('api/stays', {
                location,
                guest
            })
            setStays(data)
            setLoading(false)
            setError(false)
            
        } catch (error) {
            setError(true)
            setLoading(false)
            setOpen(true)
        }  
    }
    
    return (
    <header onClick={(e)=>{
        if(e.target === e.currentTarget){
           setOpen(false) 
        }
        
        }} className={` ${open && " h-screen bg-black bg-opacity-50 fixed"}  right-0 left-0 top-0`}>
        <div className={`flex flex-wrap px-4 space-y-5 sm:space-y-0 justify-between max-w-6xl m-auto pt-4 transition-all ${open ? 'pt-10 max-w-none h-max bg-white': 'h-max'}`}>
            <div className={`flex items-center ${open && "hidden"}`}>
               <img className='sm:min-w-max min-w-max' src="logo.png" alt="" /> 
            </div>         
            <div className={` justify-center transition-all bg-white ${open ? "w-full max-w-6xl mx-auto": ' w-min rounded-xl h-min'} `}>
                <form 
                onSubmit={(e) => {
                    e.preventDefault()
                    getLocation(e)
                }}
                className={`inline-flex items-center border-gray-200 rounded-xl ${open ? 'w-full flex-col md:flex-row border-0 shadow-inner md:border-2': 'border-2'}`}>
                    <div className={`relative  border-gray-300 ${open ? 'md:border-r w-full md:w-1/3': ' max-w-[9rem] sm:w-36 w-32 border-r'} `}>
                        <div ref={inputLocation} className={`rounded-2xl ${open ? ' py-2 px-8': 'p-3'}`}>
                        {open && <label htmlFor='location' className='font-Mulish text-[9px] font-bold'>location</label>}
                            <input id='location' className={` font-Mulish text-sm outline-none w-full ${open && 'rounded-none'}`}
                            type="text" 
                            placeholder='Add location'
                            onChange={(e)=>{
                                setCountry(e.target.value)
                            }}
                            value={country}
                            onFocus={()=>{
                                setOpen(true)
                                inputClick('location')}}
                            onBlur={()=>{
                                if(inputLocation.current !== null){
                                    inputLocation.current.style.outline = "none"  
                                }
                            }}
                            />
                        </div>   
                    </div>
                    <div className={`relative border-gray-300 ${open ? 'md:border-r w-full md:w-1/3': 'max-w-[9rem] sm:w-36 w-24 border-r'}`}>
                        <div ref={inputGuest} className={` rounded-2xl ${open ? 'py-2 px-8': 'p-3'}`}>
                        {open && <label htmlFor='guest' className='font-Mulish text-[9px] font-bold'>guests</label>}
                            <input id='guest' className={`font-Mulish text-sm outline-none w-full ${open && 'rounded-none'}`}
                            placeholder='Add guest' 
                            type="text"
                            readOnly
                            onChange={(e)=>{setGuests(parseInt(e.target.value))}}
                            value={guests ? `${guests} guests`: ''}
                            onFocus={()=>{
                                setOpen(true)
                                inputClick('guest')}}
                            onBlur={()=>{
                                if(inputGuest.current !== null){
                                    inputGuest.current.style.outline = "none"
                                }
                            }}
                            />
                        </div>   
                    </div>
                    
                    <div className={`text-xl text-red-500 ${open && 'md:w-1/3 text-white pt-10 md:py-px'}`}>
                        <button type='submit' className={`flex items-center text-sm font-Mulish font-bold p-3 ${open && 'bg-red-500 rounded-2xl mx-auto px-10'}`}>
                            <MdOutlineSearch className=' text-2xl'/>
                            {open && 'Search'}
                        </button> 
                    </div>      
                </form>
                <div className={`flex md:justify-start justify-center ${list === 'guest' && 'md:justify-center'}`}>
                {list === 'location' && open && 
                <div className='w-max md:w-1/3 py-5 px-8 h-56'>
                    {cities.map((city,index)=>{
                       return <p 
                        onClick={(e:React.SyntheticEvent)=>{
                            const target = e.target as typeof e.target & {
                                innerText: SetStateAction<string>,
                            }
                            const text = target.innerText;
                            setCountry(text)
                        }}
                        key={`${city}${index}`} 
                        className='cursor-pointer py-2 flex items-center text-sm font-Mulish'>
                            <MdPlace className='text-gray-600 text-2xl mr-2'/>{city}, Finland
                            </p>
                    })}
                </div>}
                {list === 'guest' && open && 
                    <div className='w-max md:w-1/3 py-5 px-8 h-56'>
                        <div className='mb-8'>
                            <p className='font-Mulish text-sm text-gray-800 font-bold'>Adults</p>
                            <p className='font-Mulish text-sm text-gray-400'>Ages 13 or above</p>
                            <div className='flex mt-2'>
                                <button className=' w-7 border border-gray-400 rounded'
                                onClick={()=>{
                                    if(adultCount < 1){
                                    }else{
                                       setAdultCount(adultCount - 1)
                                       } 
                                    }
                                }>
                                    <FaMinus className='m-auto text-gray-400'/>
                                </button>
                                <p className='mx-3 w-4 h-7 text-center text-sm font-Mulish font-bold flex items-center justify-center'>{adultCount}</p>
                                <button className=' w-7 border border-gray-400 rounded'
                                onClick={()=>{
                                    setAdultCount(adultCount + 1)}
                                }>
                                    <FaPlus className='m-auto text-gray-400'/>
                                </button>
                            </div>
                        </div>
                        <div>
                            <p className='font-Mulish text-sm text-gray-800 font-bold'>Children</p>
                            <p className='font-Mulish text-sm text-gray-400'>Ages 2 - 12</p>
                            <div className='flex mt-2'>
                                <button className=' w-7 border border-gray-400 rounded'
                                onClick={()=>{
                                    if(childCount < 1){

                                    }else{
                                       setChildCount(childCount - 1)} 
                                    }
                                }>
                                    <FaMinus className='m-auto text-gray-400'/>
                                </button>
                                <p className='mx-3 w-4 h-7 text-center text-sm font-Mulish font-bold flex items-center justify-center'>{childCount}</p>
                                <button className=' w-7 border border-gray-400 rounded'
                                onClick={()=>{setChildCount(childCount + 1)}
                                }>
                                    <FaPlus className='m-auto text-gray-400'/>
                                </button>
                            </div>
                        </div>
                    </div>}
                    </div>
                {error && open ? <div className='flex justify-center items-center h-28'>
                    <p className='text-2xl text-red-500 font-bold'>Can not find Country :C</p>
                </div>: <div></div>}
            </div>
        </div>
    </header>
  )
}

export default Header