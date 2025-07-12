
import { Outlet } from "react-router-dom";  
import Header from "../common/Header";
import Footer from "../common/Footer";
const userlayout = () => {
  return (
    <>
    {/* Header */}
    <Header />
    {/*main content*/}
    <main>
      <Outlet/>
        
    </main> 
      
    {/* footer */}
    <Footer/>
    
    
    </>
  );
};

export default userlayout;
