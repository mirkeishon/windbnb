require('dotenv').config()
const Airtable = require('airtable-node')

const cities = [
  'helsinki',
  'turku',
  'vaasa',
  'oulu'
]
const countries = [
  'finland'
]
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('appM2d0lq5rbuZzeE')
  .table('Stays')

exports.handler = async (event, context, cb) => {
  const method = event.httpMethod
  if(method === 'POST'){
    let {location, guest} = JSON.parse(event.body)
    location = location.replace(/ /g, '')
    location = location.toLowerCase()
    location = location.split(',')
    let records;
    let searchFormula;
    if(location[0] === 'finland'){
      if(guest < 1){
        searchFormula = `
        IF({Country} = "Finland",  
          TRUE(), 
          FALSE() 
          )`
        }else{
        searchFormula = `
        IF({Country} = "Finland", 
          IF({MaxGuests} = "${guest}", 
            TRUE(), 
            FALSE()), 
          FALSE())`
        } 
      ({ records } = await airtable.list({
        filterByFormula: searchFormula,
      }))
      const stays = records.map((stay) => {
        const { id } = stay
        const { City, Country, Superhost, Title, Rating, MaxGuests, Type, Beds, Photo } = stay.fields
        return { id, Country, City, Superhost, Title, Rating, MaxGuests, Type, Beds, Photo }
      })
      return {
        statusCode: 200,
        body: JSON.stringify(stays)
      }
    }
    if(countries.includes(location[0]) || countries.includes(location[1]) ){

    }else{
      return {
        statusCode: 404,
        body: 'Country error'
      }
    }    
    if(cities.includes(location[0])){
      if(guest < 1){
        searchFormula = `
        IF({City} = "${location[0]}",  
          TRUE(), 
          FALSE() 
          )`
        }else{
        searchFormula = `
        IF({City} = "${location[0]}", 
          IF({MaxGuests} = "${guest}", 
            TRUE(), 
            FALSE()), 
          FALSE())`
        } 
      ({ records } = await airtable.list({
      filterByFormula: searchFormula,
    }))
    }else if(cities.includes(location[1])){
      if(guest < 1){
        searchFormula = `
        IF({City} = "${location[0]}",  
          TRUE(), 
          FALSE() 
          )`
        }else{
        searchFormula = `
        IF({City} = "${location[0]}", 
          IF({MaxGuests} = "${guest}", 
            TRUE(), 
            FALSE()), 
          FALSE())`
        } 
      ({ records } = await airtable.list({
      filterByFormula: searchFormula
    }))
  }
    const stays = records.map((stay) => {
      const { id } = stay
      const { City, Country, Superhost, Title, Rating, MaxGuests, Type, Beds, Photo } = stay.fields
      return { id, Country, City, Superhost, Title, Rating, MaxGuests, Type, Beds, Photo }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(stays)
    }
  }
  try {
    const { records } = await airtable.list({
      filterByFormula: "SEARCH('helsinki', City)"
    })
    const stays = records.map((stay) => {
      const { id } = stay
      const { City, Country, Superhost, Title, Rating, MaxGuests, Type, Beds, Photo } = stay.fields
      return { id, Country, City, Superhost, Title, Rating, MaxGuests, Type, Beds, Photo }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(stays),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Server Error',
    }
  }
}