import '../App.css'
import React, { useState } from 'react';
import { Box, Tabs, Tab} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`property-tabpanel-${index}`}
      aria-labelledby={`property-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

export default function PropertyDetails({ property, onBack }) {
    const [value, setValue] = useState(0);
    const [currentImage, setCurrentImage] = useState(property.picture);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="property-details-header">
                <button variant="contained" onClick={onBack} className="back-button">
                    <KeyboardBackspaceIcon/> <p> Return to all Properties </p>
                </button>
            </div>
            <div className='ImgGallery'>
                {/* Large Image Section */}
                <img 
                    src={currentImage} 
                    alt={property.type} 
                    className='coverImgGallery' 
                />

                {/* Thumbnails Section */}
                <div className='allImgs'>
                    {property.images && property.images.map((img, index) => (
                        <div>
                            <img 
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className='allImage'
                                onClick={() => setCurrentImage(img)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <Tabs value={value} onChange={handleTabChange} aria-label="property details tabs">
                            <Tab label="Description"/>
                            <Tab label="Floor Plan"/>
                            <Tab label="Location Map"/>
                        </Tabs>
                    </div>
                    <CustomTabPanel value={value} index={0}>
                        <h5> {property.shortDescription} </h5>
                        <p> {property.description} </p>
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={1}>
                        <img src={property.floorPlan} alt="Floor Plan" style={{ maxWidth: '100%', height: 'auto' }} />
                    </CustomTabPanel>

                    <CustomTabPanel value={value} index={2}>
                        <p> {property.location} </p>
                        <iframe className='mapLocation' src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}>
                        </iframe>
                    </CustomTabPanel>
                </div>
            </div>
        </>
    );
}