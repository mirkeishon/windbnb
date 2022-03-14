import React, { SetStateAction, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Stays from "./components/Stays";

function App() {
  const [country, setCountry] = useState('Helsinki, Finland')
  const [guests, setGuests] : [guests: number, setGuests: React.Dispatch<SetStateAction<number>>] = useState(0)
  const [loading, setLoading] = useState(true)
  const [stays, setStays] = useState([])
  
  return (
    <>
      <Header 
        country={country} 
        guests={guests} 
        setCountry={setCountry} 
        setGuests={setGuests}
        setLoading={setLoading}
        setStays={setStays}
      />
      <Stays loading={loading} stays={stays} 
        setLoading={setLoading} 
        setStays={setStays}
      />
      <Footer/>
    </>
  );
}

export default App;
