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
    return (
        <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={9000000}
            step={50000}
            color='primary'
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

function PropertyBedroomRange({ bedroomRange, setBedroomRange }) {
    return (
        <Slider
            value={bedroomRange}
            onChange={(e, newValue) => setBedroomRange(newValue)}
            valueLabelDisplay="auto"
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

export { PropertyType, PropertyPostCode, PropertyDateAdded, PropertyPriceRange, PropertyBedroomRange}