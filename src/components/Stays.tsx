import axios from "axios"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Stay from "./Stay"

const Stays : React.FC<{
    loading: boolean,
    stays: never[],
    setLoading: Dispatch<SetStateAction<boolean>>,
    setStays: Dispatch<SetStateAction<never[]>>
}>= ({loading, stays, setLoading, setStays}) => {

    const getStays = async () => {
        try {
            const { data } = await axios.get('/api/stays');
            setStays(data);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getStays()
    }, [])

    if(loading){
        return <main className=" flex justify-center mt-20">
            <div>
                <h1 className="text-5xl font-semibold">Loading...</h1>
            </div>
        </main>
    }
  return (
    <main className="max-w-6xl m-auto py-4 px-4">
        <div className="flex justify-between py-4">
            <p className=" text-2xl font-bold">Stays in Finland</p>
            <p className="text-sm">{
                stays.length > 10 ? '12+ stays' : `${stays.length} stays` 
            }</p>
        </div>
        <div className="flex flex-wrap justify-center sm:gap-[1%] gap-y-8">
            {stays.map((stay)=>{
                const {id, City, Superhost, Title, Rating, Type, Beds, Photo} = stay;
                //console.log(id, city, superhost, title, rating, type, beds, photo)
                return (
                    <Stay key={id} 
                    city={City} 
                    superhost={Superhost}
                    title={Title}
                    rating={Rating}
                    type={Type}
                    beds={Beds}
                    photo={Photo}/>
                )
            })}
        </div>
    </main>
  )
}

export default Stays