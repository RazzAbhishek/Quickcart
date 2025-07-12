
import {Link} from 'react-router-dom';
import { HiOutlineUser,HiOutlineShoppingBag,HiBars3BottomRight} from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../layout/CartDrawer';  
import {useState} from 'react';
import { IoMdClose } from 'react-icons/io';
import {useSelector} from 'react-redux';


const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [NavDrawerOpen, setNavDrawerOpen] = useState(false);
    const {cart} = useSelector((state) => state.cart);
    const {user} = useSelector((state) => state.auth);

    const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

    const toggleNavDrawer= () => {
      setNavDrawerOpen(!NavDrawerOpen);

    };
    
    const toggleCartDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    
  return (
  <>
    <nav className="container mx-auto flex items-center justify-between py-2 px-4">
    {/* left logo */}
        <div> 
            <Link to = "" className="text-2xl font-bold">
            <span className="text-gray-600 hover:text-black">Quick</span>
            <span className="text-blue-600 hover:text-sky-300">cart</span>
            {/* Quickcart */}

            </Link>
        </div>
        {/* center navigation Link */}
         <div className="hidden md:flex space-x-6">
         <Link 
         to="/collections/all?gender=Men"
         className="text-gray-700 hover:text-black text-sm font-medium uppercase"
         >
         Men
         </Link>

         <Link 
         to="/collections/all?gender=Women"
         className="text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
         Women
         </Link>

         <Link 
         to="/collections/all?category=Top wear"
         className="text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
        Top wear
         </Link>

        <Link 
         to="/collections/all?category=Bottom wear"
         className="text-gray-700 hover:text-black text-sm font-medium uppercase"
         >
         Bottom wear
         </Link>
        </div>

        {/* right side icons */}
        <div className="flex items-center space-x-4">
            {user && user.role === "admin" && (
            <Link to = "/admin" className="block bg-green-500 rounded text-sm text-white">Admin</Link>
            )}
            <Link to = "/profile" className="hover:text-black">
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
               
            </Link>
            
            <button onClick={toggleCartDrawer} className="relative hover:text-black">
              <HiOutlineShoppingBag className = "h-6 w-6 text-gray-700"/>
              {/* Cart item count */}
              { cartItemCount > 0 && (<span className="absolute - top-0 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
              {cartItemCount}
              </span>)}
              

            </button>
            {/* search icon  */}
            <div
              className="overflow-hidden">
                <SearchBar/>
            </div>
            
            <button onClick={toggleNavDrawer} className="md:hidden">
              <HiBars3BottomRight className="h-6 w-6 text-gray-700" />

            </button>
        </div>
     </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      {/* Mobile Navigation Drawer */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w1/2 md:w1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50
        ${NavDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex justify-end p-4">
          
          <button onClick={toggleNavDrawer} className="text-gray-600 hover:text-black">
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-smibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link to= "/collections/all?gender=Men" onClick = {toggleNavDrawer} className="block text-gray-600 hover:text-black">
            Men
            </Link>
             <Link to= "/collections/all?gender=Women" onClick = {toggleNavDrawer} className="block text-gray-600 hover:text-black">
            Women
            </Link>
             <Link to= "/collections/all?category=Top wear" onClick = {toggleNavDrawer} className="block text-gray-600 hover:text-black">
            Top wear
            </Link>
             <Link to= "/collections/all?category=Bottom wear" onClick = {toggleNavDrawer} className="block text-gray-600 hover:text-black">
            Bottom wear
            </Link>
          </nav>
        </div>
      </div>
       
      
  </>
  );
};

export default Navbar;
