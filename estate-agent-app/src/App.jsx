import './App.css'
import data from '../public/properties.json'
import { useState, useEffect } from 'react'
import { FilterPanel} from './Components/SearchFilter.jsx'
import Gallery from './Components/Properties.jsx'
import PropertyDetails from './Components/PropertyDetails.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import logo from '../public/Images/Others/Logo.jpg'
import homeImage from '../public/Images/Others/Home.jpg'

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

  // URL Hash-based Routing to select a property
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const propertyMatch = hash.match(/^#\/property\/(.+)$/);

      if (propertyMatch) {
        const propertyId = propertyMatch[1];
        const property = properties.find(p => p.id === propertyId);
        setSelectedProperty(property || null);
      } else {
        setSelectedProperty(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check hash on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [properties]);

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

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleViewProperty = (property) => {
    if (property) {
      window.location.hash = `#/property/${property.id}`;
    }
  };

  const handleBack = () => {
    window.location.hash = '#/';
  };

  function Footer() {
    return (
      <footer style={{ backgroundColor: '#fff', padding: '48px 0', marginTop: '32px', borderTop: '1px solid #e0e0e0', textAlign: 'center', color: 'rgba(0, 0, 0, 0.6)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h3 style={{ margin: '0 0 0.35em', fontSize: '1.25rem', fontWeight: 500, color: 'rgba(0, 0, 0, 0.87)' }}>
            SmartMove
          </h3>
          <p style={{ margin: '0 0 16px', fontSize: '1rem' }}>
            Helping you find the perfect place to call home.
          </p>
          <p style={{ margin: 0, fontSize: '0.875rem' }}>
            {'Copyright © '}
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
              SmartMove Estate Agents
            </a>{' '}
            {new Date().getFullYear()}
            {'.'}
          </p>
        </div>
      </footer>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <header className="App-header">
        <div className="logo-title" onClick={handleBack}>
          <img src={logo} alt="SmartMove Logo" className="logo" />
          <h1> SmartMove </h1>
        </div>
        {!selectedProperty && (
          <nav>
            <button onClick={() => handleScroll('filter-section')}>Filter</button>
            <button onClick={() => handleScroll('properties-section')}>All Properties</button>
          </nav>
        )}
      </header>
      <div className='Body'>
        {selectedProperty ? (
          <PropertyDetails property={selectedProperty} onBack={handleBack} />
        ) : (
          <>
            <div id="filter-section" className='top-section'>
              <div className="home-image-container">
                  <img src={homeImage} alt="A modern house" className="home-image"/>
              </div>
              <div className='search-section'>
                <h2>Find your property</h2>
                <FilterPanel type={type} setType={setType} priceRange={priceRange} setPriceRange={setPriceRange} bedroomRange={bedroomRange} setBedroomRange={setBedroomRange} dateAdded={dateAdded} setDateAdded={setDateAdded} postcode={postcode} setPostcode={setPostcode} />
              </div>
            </div>
            <div id="properties-section" className='property-section'>
              <Gallery properties={filteredProperties} allProperties={properties} onViewProperty={handleViewProperty} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </LocalizationProvider>
  )
}

export default App
