import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pizzaImg from '../assets/Gemini_Generated_Image_jsawj6jsawj6jsaw-removebg-preview (1).png';

function Intro({ onComplete }) {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const slicesRef = useRef([]);

    const slices = [
        { clip: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)', tx: 150, ty: -150 },
        { clip: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)', tx: 150, ty: 150 },
        { clip: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%)', tx: -150, ty: 150 },
        { clip: 'polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)', tx: -150, ty: -150 },
    ];

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(slicesRef.current,
            { scale: 0, opacity: 0, rotation: -180 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)', stagger: 0 }
        )
        .to(slicesRef.current, { scale: 1.1, duration: 0.3, ease: 'power2.in' })
        .to(slicesRef.current, {
            opacity: 0,
            scale: 1.5,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            x: (i) => slices[i].tx,
            y: (i) => slices[i].ty,
        })
        .fromTo(
            titleRef.current,
            {
                opacity: 0,
                y: 30,
                letterSpacing: '0px',
            },
            {
                opacity: 1,
                y: 0,
                letterSpacing: window.innerWidth < 640 ? '4px' : '8px',
                duration: 0.8,
                ease: 'power3.out',
            }
        )
        .to(containerRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: 'power3.inOut',
            delay: 0.5,
            onComplete: onComplete,
        });
    }, []);

    return (
        <div
    ref={containerRef}
    className='fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden'
            style={{ backgroundColor: '#09090b' }}>

<div className='relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64'>
                {slices.map((slice, i) => (
                    <img
                        key={i}
                        ref={el => slicesRef.current[i] = el}
                        src={pizzaImg}
                        alt=''
                        className='absolute inset-0 w-full h-full object-cover '
                        style={{
                            clipPath: slice.clip,
                            opacity: 0,
                            filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.8))',
                        }}
                    />
                ))}
            </div>

            <h1
    ref={titleRef}
    className='text-white text-2xl sm:text-4xl md:text-5xl font-bold tracking-[4px] sm:tracking-[6px] md:tracking-widest absolute text-center px-4'
    style={{ opacity: 0 }}
>
                PIZZA VILLE
            </h1>
        </div>
    );
}

export default Intro;