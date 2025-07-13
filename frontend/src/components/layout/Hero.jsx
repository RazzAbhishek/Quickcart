
import heroImg from "../../assets/herosectionnn.png"; 
import { Link } from 'react-router-dom';// Assuming you have a CSS file for styling

const Hero = () => {
  return (
    <section className="relative pt-[90px]">
        <img src={heroImg} alt="Rabbit" 
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"/>

        <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
            <div className="text-center text-white p-6">
                <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                    Vacation <br/> Ready
                </h1>
                <p className="text-sm tracking-tighter text-black md:text-lg mb-6">
                    Explore our vaction-ready outfits with fast worldwide shipping!
                </p>
                <Link to="#" className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg">
                Scroll Down 👇
                     
                </Link>
            </div>

        </div>
    </section>

  );
};

export default Hero;