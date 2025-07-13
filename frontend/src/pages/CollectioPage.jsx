import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/product/FilterSidebar";
import ProductGrid from "../components/product/ProductGrid";
import SortOptions from "../components/product/SortOptions";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import { useSelector } from "react-redux";

const CollectionPage = () => {
  const { collection } = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch products based on collection and query params
    dispatch(
      fetchProductsByFilters({
        collection,
        ...queryParams,
      })
    );
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    // close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    // Add Event Listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    // clean event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row pt-[80px]">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>
      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 
  lg:fixed lg:top-[100px] lg:h-[calc(100vh-100px)] lg:translate-x-0 lg:z-30`}
      >
        <FilterSideBar />
      </div>
      <div className="flex-grow p-4 lg:ml-64">
        <h2 className=" text-2xl uppercase mb-4"> All Collections</h2>
        {/* Sort options */}
        <SortOptions />
        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
