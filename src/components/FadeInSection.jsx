import { useEffect, useRef, useState } from 'react';

/**
 * FadeInSection - Wrapper component that fades content in/out based on scroll visibility
 * Uses Intersection Observer for performance
 */
const FadeInSection = ({ children, className = '', threshold = 0.1 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Update visibility based on intersection
                    setIsVisible(entry.isIntersecting);
                });
            },
            {
                threshold: threshold, // Trigger when X% of element is visible
                rootMargin: '-50px 0px', // Slight offset for smoother effect
            }
        );

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-700 ease-out ${className}`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            }}
        >
            {children}
        </div>
    );
};

export default FadeInSection;
