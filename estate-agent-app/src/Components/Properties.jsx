import '../App.css'
import { useState, useEffect } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

const HeartIcon = ({ isFavorite }) => (
    isFavorite ? <FavoriteIcon sx={{ color: 'red' }} /> : <FavoriteBorderIcon />
)

// Simple ImageCard component to render property details
const ImageCard = ({ product, isFavorite, onToggleFavorite, onViewProperty }) => (
    <div 
        className="card"
        draggable
        onDragStart={(e) => e.dataTransfer.setData("text/plain", product.id)}
    >
        <img src={product.picture} alt={product.location} className='Image' />
        <h3>{product.type}</h3>
        <p>{product.bedrooms} Bedrooms</p>
        <p>Price: £{product.price}</p>
        <p>Location: {product.location}</p>
        <div className="card-buttons">
            <button className="PropPage" onClick={() => onViewProperty(product)}> View Property </button>
            <button onClick={() => onToggleFavorite(product)} className='favbtn'>
                <HeartIcon isFavorite={isFavorite} />
                <span> {isFavorite ? "Remove" : "Add to Favourites"} </span>
            </button>
        </div>
    </div>
);

const Gallery = ({ properties, allProperties, onViewProperty }) => {
    // Initialize favorites from localStorage using IDs and the full dataset
    const [favorites, setFavorites] = useState(() => {
        const savedIds = JSON.parse(localStorage.getItem('favorites') || '[]');
        return (allProperties || []).filter(p => savedIds.includes(p.id));
    });

    // Save favorites IDs to localStorage whenever the list changes
    useEffect(() => {
        const ids = favorites.map(f => f.id);
        localStorage.setItem('favorites', JSON.stringify(ids));
    }, [favorites]);

    const handleToggleFavorite = (product) => {
        if (favorites.some(fav => fav.id === product.id)) {
            setFavorites(favorites.filter(fav => fav.id !== product.id))
        } else {
            setFavorites([...favorites, product])
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const productId = e.dataTransfer.getData("text/plain");
        const product = (allProperties || []).find(p => p.id === productId);
        if (product && !favorites.some(fav => fav.id === product.id)) {
            setFavorites([...favorites, product]);
        }
    }

    return (
        <div className="container">
            <div className="all-items">
                <h2>Available Properties</h2>
                {properties.length === 0 ? (
                    <p className='galleryp'>No properties found matching your criteria.</p>
                ) : (
                <div className="gallery">
                    {properties.map((product) => (
                    <ImageCard 
                        key={product.id} 
                        product={product} 
                        isFavorite={favorites.some(fav => fav.id === product.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onViewProperty={onViewProperty}
                    />
                    ))}
                </div>
                )}
            </div>
        
            {/* SIDEBAR FOR FAVOURITES */}
            <div 
                className="favorites"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <h2>Favorites</h2>
                {favorites.length > 0 && (
                    <button onClick={() => setFavorites([])} className='favremove' style={{marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px'}}>
                        <CleaningServicesIcon /> Clear Favorites
                    </button>
                )}
                <div className="favprops">
                    {favorites.length === 0 ? (
                        <p>No favorites selected.</p>
                    ) : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {favorites.map(fav => (
                                <li key={fav.id} className='favcard'>
                                    <strong>{fav.type}</strong> - £{fav.price}
                                    <br />
                                    {fav.bedrooms} Bedrooms
                                    <br />
                                    <small>{fav.location}</small>
                                    <br />
                                    <div>
                                        <button onClick={() => onViewProperty(fav)} className='viewprop2'>
                                            <p> View Property </p>
                                        </button>
                                        <button 
                                            onClick={() => handleToggleFavorite(fav)}
                                            className='favremove'
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Gallery;