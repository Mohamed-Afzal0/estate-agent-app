import '../App.css'
import favicon from '../../public/Images/Other/like-logo.png'

// Simple ImageCard component to render property details
const ImageCard = ({ product }) => (
    <div className="card">
        <img src={product.picture} alt={product.location} className='Image' />
        <h3>{product.type}</h3>
        <p>{product.bedrooms} Bedrooms</p>
        <p>Price: £{product.price}</p>
        <p>Location: {product.location}</p>
        <div className="card-buttons">
            <button className="PropPage"> View Property </button>
            <button className='favbtn'>
                <img src={favicon} alt="Favorite" className='favicon'/>
                <span> Add to Favourites </span>
            </button>
        </div>
    </div>
);

const Gallery = ({ properties }) => {
    return (
        <div className="container">
            <div className="all-items">
                <h2>Available Properties</h2>
                <div className="gallery">
                    {/* LOOP: This takes each product and turns it into a card */}
                    {properties.map((product) => (
                    <ImageCard key={product.id} product={product} className="card"/>
                    ))}
                </div>
            </div>
        
            {/* SIDEBAR FOR FAVOURITES */}
            <div className="favorites">
                <h2>Favorites</h2>
                {/* We will add the drag-and-drop list here later */}
            </div>
        </div>
    )
}

export default Gallery;