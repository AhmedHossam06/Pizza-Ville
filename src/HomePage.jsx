import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroImg from './assets/Home_Back.jpg';
import AboutImg from './assets/Home_Image2.jpg';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
    const heroTextRef = useRef(null);
    const heroBtnRef = useRef(null);
    const aboutImgRef = useRef(null);
    const aboutTextRef = useRef(null);

    useEffect(() => {
        // Hero animations
        gsap.fromTo(heroTextRef.current,
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
        );

        gsap.fromTo(heroBtnRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
        );

        // About section - ScrollTrigger
        gsap.fromTo(aboutImgRef.current,
            { opacity: 0, x: -100 },
            {
                opacity: 1, x: 0, duration: 1, ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutImgRef.current,
                    start: 'top 80%',
                }
            }
        );

        gsap.fromTo(aboutTextRef.current,
            { opacity: 0, x: 100 },
            {
                opacity: 1, x: 0, duration: 1, ease: 'power3.out',
                scrollTrigger: {
                    trigger: aboutTextRef.current,
                    start: 'top 80%',
                }
            }
        );

        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, []);

    return (
        <div>
            {/* Hero Section */}
            <div style={{backgroundImage: `url(${HeroImg})`}} className='relative h-screen w-full bg-cover bg-center'>
                <div className='absolute inset-0 bg-black/50'></div>
                <div className='relative flex flex-col gap-8 h-full justify-center px-4 sm:px-8 md:px-18'>
                <p ref={heroTextRef} className='text-white text-3xl sm:text-4xl md:text-6xl font-bold leading-snug' style={{opacity: 0}}>
    Life is a <br /> combination of <br /> magic and pizza
</p>
                    <div ref={heroBtnRef} style={{opacity: 0}}>
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
            </div>

            {/* About Section */}
            <div className='bg-zinc-900 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 p-8 md:p-20'>
                <img ref={aboutImgRef} src={AboutImg} 
                    className='w-72 h-72 md:w-96 md:h-96 object-cover rounded-lg' 
                    style={{opacity: 0}}
                    alt='about' />
                <div ref={aboutTextRef} className='flex flex-col gap-6' style={{opacity: 0}}>
                    <p className='text-white uppercase tracking-widest'>WELCOME TO</p>
                    <h2 className='text-3xl md:text-5xl font-bold text-white'>Pizza Ville</h2>
                    <p className='text-white text-base md:text-xl leading-relaxed max-w-xl'>
                        We are specialized in authentic Neapolitan pizza, baked hot and fast 
                        in a brick oven to achieve a not-too-thick, not-to-thin chewy, smoky 
                        crust, made from a recipe that's been handed down through five 
                        generations of pizzaioli (pizza makers).
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