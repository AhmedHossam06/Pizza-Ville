import { Link } from 'react-router-dom';
import HeroImg from './assets/Home_Back.jpg';
import AboutImg from './assets/Home_Image2.jpg';

function HomePage(){
    return(
        <div>
            {/* Hero Section */}
            <div style={{backgroundImage: `url(${HeroImg})`}} className='relative h-screen w-full bg-cover bg-center'>
                <div className='absolute inset-0 bg-black/50'></div>
                <div className='relative flex flex-col gap-8 h-full justify-center px-8 md:px-18'>
                    <p className='text-white text-4xl md:text-6xl'>Life is a <br /> combination of <br /> magic and pizza</p>
                    <Link to="/menu" className='w-fit'>
                        <button 
                            className='h-15 w-50 rounded-full text-white font-bold cursor-pointer border-2 border-white transition-all duration-300 hover:-translate-y-1'
                            style={{backgroundColor: 'transparent'}}
                            onMouseEnter={e => e.target.style.backgroundColor = 'rgb(141, 15, 15)'}
                            onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
                            <span className='tracking-widest uppercase drop-shadow-lg'>View Menu</span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* About Section */}
            <div className='bg-zinc-900 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-8 md:p-20'>
                <img src={AboutImg} className='w-72 h-72 md:w-96 md:h-96 object-cover rounded-lg' alt='about' />
                <div className='flex flex-col gap-6'>
                    <p className='text-white uppercase tracking-widest'>WELCOME TO</p>
                    <h2 className='text-3xl md:text-5xl font-bold text-white'>Pizza Ville</h2>
                    <p className='text-white text-base md:text-2xl'>
                        We are specialized in authentic Neapolitan pizza, baked <br /> hot and fast 
                        in a brick oven to achieve a not-too-thick, <br /> not-to-thin chewy, smoky 
                        crust, made from a recipe <br /> that's been handed down through five 
                        generations of <br /> pizzaioli (pizza makers).
                    </p>
                    <ul>
                        <li><span className='text-[rgb(141,15,15)] font-bold text-xl'>•</span> <span className='text-white text-xl'>Tasty, fresh daily</span></li>
                        <li><span className='text-[rgb(141,15,15)] font-bold text-xl'>•</span> <span className='text-white text-xl'>Best pizza in NYC</span></li>
                    </ul>
                    <Link to="/menu">
                        <button 
                            className='h-15 w-50 rounded-full text-white font-bold cursor-pointer border-2 border-white transition-all duration-300 hover:-translate-y-1'
                            style={{backgroundColor: 'transparent'}}
                            onMouseEnter={e => e.target.style.backgroundColor = 'rgb(141, 15, 15)'}
                            onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
                            <span className='tracking-widest uppercase drop-shadow-lg'>See Our Menu</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default HomePage;