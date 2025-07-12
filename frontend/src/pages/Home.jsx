
import Hero from '../components/layout/Hero';
import GenderCollectionSection from '../components/product/GenderCollectionSection';    
import NewArrivals from '../components/product/NewArrivals';
import ProductDetails from '../components/product/ProductDetails';
import ProductGrid from '../components/product/ProductGrid';
import FeaturedCollection from '../components/product/FeaturedCollection';
import FeaturesSection from '../components/product/FeaturesSection';
import { useDispatch , useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';



const Home = () => {
    const dispatch = useDispatch();
    const { products ,loading , error } = useSelector((state) => state.products);
    const [bestSellerProduct, setBestSellerProducts] = useState(null);
    
    useEffect(() => {
        // Fetch products for a specific collection
        dispatch(fetchProductsByFilters({
            gender : "Women",
            category : "Bottom Wear",
            limit:8,
        })
       );
       //fretch best seller products
       const fetchBestSeller = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
            setBestSellerProducts(response.data);
        } catch (error) {
            console.error( error);
        }
       };
         fetchBestSeller();
    } , [dispatch]);     
      


  return (<div>
    <Hero/>
    <GenderCollectionSection/>
    <NewArrivals/>

    {/* Best Seller */}
    <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
    { bestSellerProduct ? (<ProductDetails productId = {bestSellerProduct._id}/>) : (
        <p className="text-center">Loading best Seller Product...</p>
    )}
    

    <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Top Wears for Women</h2>
        <ProductGrid products={products} loading = {loading} error = {error}  />
    </div>
    <FeaturedCollection/>
    <FeaturesSection/>
  </div>
  );
};

export default Home;