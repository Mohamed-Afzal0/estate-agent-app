import './App.css'
import data from '../public/properties.json'
import { useState, useEffect } from 'react'
import { PropertyType, PropertyPostCode, PropertyDateAdded, PropertyPriceRange, PropertyBedroomRange} from './Components/SearchFilter.jsx'
import Gallery from './Components/Properties.jsx'
import PropertyDetails from './Components/PropertyDetails.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  const [properties, setProperties] = useState(data.properties)
  const [filteredProperties, setFilteredProperties] = useState(data.properties)

  // Filter States
  const [type, setType] = useState('Any')
  const [priceRange, setPriceRange] = useState([0, 9000000])
  const [bedroomRange, setBedroomRange] = useState([0, 10])
  const [dateAdded, setDateAdded] = useState(null)
  const [postcode, setPostcode] = useState('')
  const [selectedProperty, setSelectedProperty] = useState(null)

  // Helper to convert property date object to JS Date
  const getPropertyDate = (added) => {
    const months = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    }
    return new Date(added.year, months[added.month], added.day)
  }

  // Filter Logic
  useEffect(() => {
    const filtered = properties.filter((property) => {
      // Type Logic
      const typeMatch = type === 'Any' || property.type === type

      // Price Logic
      const priceMatch = property.price >= priceRange[0] && property.price <= priceRange[1]

      // Bedroom Logic
      const bedroomMatch = property.bedrooms >= bedroomRange[0] && property.bedrooms <= bedroomRange[1]

      // Postcode Logic (Simple substring match)
      const postcodeMatch = postcode === '' || property.location.toLowerCase().includes(postcode.toLowerCase())

      // Date Added Logic (After or on selected date)
      let dateMatch = true
      if (dateAdded) {
        const propDate = getPropertyDate(property.added)
        // dateAdded from MUI is a dayjs object
        dateMatch = propDate >= dateAdded.toDate()
      }

      return typeMatch && priceMatch && bedroomMatch && postcodeMatch && dateMatch
    })

    setFilteredProperties(filtered)
  }, [type, priceRange, bedroomRange, postcode, dateAdded, properties])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <header className="App-header">
        <h1> SmartMove </h1>
      </header>
      <div className='Body'>
        {selectedProperty ? (
          <PropertyDetails property={selectedProperty} onBack={() => setSelectedProperty(null)} />
        ) : (
          <>
            <div className='search-section'>
              <h2>Find your property</h2>
              <nav className='Filter'>
                <PropertyType type={type} setType={setType} />
                <PropertyPostCode postcode={postcode} setPostcode={setPostcode} />
                <PropertyDateAdded dateAdded={dateAdded} setDateAdded={setDateAdded} />
                <div className="Range">
                  <p> Price Range (£)</p>
                  <PropertyPriceRange priceRange={priceRange} setPriceRange={setPriceRange} className="pr"/>
                </div>
                <div className="Range">
                  <p> Bedroom Range </p>
                  <PropertyBedroomRange bedroomRange={bedroomRange} setBedroomRange={setBedroomRange} />
                </div>
              </nav>
            </div>
            <div className='property-section'>
              <Gallery properties={filteredProperties} allProperties={properties} onViewProperty={setSelectedProperty} />
            </div>
          </>
        )}
      </div>
    </LocalizationProvider>
  )
}

export default App
