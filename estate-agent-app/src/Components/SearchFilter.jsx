import '../App.css'

// MUI Imports
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Slider,
    Autocomplete
} from '@mui/material'

// Date Picker Imports
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

function PropertyType({ type, setType }) {
    return (
        <FormControl className="TypeForm">
            <InputLabel>Type</InputLabel>
            <Select
                value={type}
                label="Type"
                onChange={(e) => setType(e.target.value)}
            >
                <MenuItem value="Any">Any</MenuItem>
                <MenuItem value="House">House</MenuItem>
                <MenuItem value="Flat">Flat</MenuItem>
            </Select>
        </FormControl>
    )
}

function PropertyPostCode({ postcode, setPostcode }) {
    return (
        <TextField
            label="Postcode (e.g. BR1)"
            variant="outlined"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
        />
    )
}

function PropertyDateAdded({ dateAdded, setDateAdded }) {
    return (
        <DatePicker
            label="Added After"
            value={dateAdded}
            onChange={(newValue) => setDateAdded(newValue)}
        />
    )
}

function PropertyPriceRange({ priceRange, setPriceRange }) {
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];

    const handleMinChange = (event) => {
        const newMin = Number(event.target.value);
        setPriceRange([newMin, Math.max(newMin, maxPrice)]);
    };

    const handleMaxChange = (event) => {
        const newMax = Number(event.target.value);
        setPriceRange([Math.min(minPrice, newMax), newMax]);
    };

    const prices = [];
    for (let i = 0; i <= 9000000; i += 50000) {
        prices.push(i);
    }

    return (
        <div style={{ display: 'flex', gap: '10px', padding: '10px' }}>
            <FormControl fullWidth>
                <InputLabel>Min Price</InputLabel>
                <Select
                    value={minPrice}
                    label="Min Price"
                    onChange={handleMinChange}
                >
                    {prices.map((price) => (
                        <MenuItem key={price} value={price}>
                            £{price.toLocaleString()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel>Max Price</InputLabel>
                <Select
                    value={maxPrice}
                    label="Max Price"
                    onChange={handleMaxChange}
                >
                    {prices.map((price) => (
                        <MenuItem key={price} value={price}>
                            £{price.toLocaleString()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

function PropertyBedroomRange({ bedroomRange, setBedroomRange }) {
    return (
        <Slider
            value={bedroomRange}
            onChange={(e, newValue) => setBedroomRange(newValue)}
            valueLabelDisplay="auto"
            shiftStep={1}
            step={1}
            marks
            min={0}
            max={10}
            sx={{
                '& .MuiSlider-thumb': {
                    color: 'black',
                    height: 20,
                    width: 20,
                    backgroundColor: '#fff',
                    border: '2px solid currentColor',
                },
                '& .MuiSlider-track': {
                    borderRadius: 4,
                    color: 'black',
                },
            }}
        />
    )
}

function FilterPanel({ type, setType, priceRange, setPriceRange, bedroomRange, setBedroomRange, dateAdded, setDateAdded, postcode, setPostcode }) {
    return (
        <nav className='Filter'>
            <PropertyType type={type} setType={setType} />
            <PropertyPostCode postcode={postcode} setPostcode={setPostcode} />
            <PropertyDateAdded dateAdded={dateAdded} setDateAdded={setDateAdded} />
            <div className="Range">
                <p style={{marginBottom: '4px',}}> Price Range (£)</p>
                <PropertyPriceRange priceRange={priceRange} setPriceRange={setPriceRange} className="pr"/>
            </div>
            <div className="Range">
                <p> Bedroom Range </p>
                <PropertyBedroomRange bedroomRange={bedroomRange} setBedroomRange={setBedroomRange} />
            </div>
        </nav>
    );
}

export { FilterPanel}