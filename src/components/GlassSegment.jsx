/**
 * GlassSegment - Reusable Glassmorphism component with Retrotech styling
 * Applies semi-transparent background, blur effect, and CRT glow border
 */
const GlassSegment = ({
    children,
    className = '',
    hover = false,
    glow = 'default'
}) => {
    const glowStyles = {
        default: 'shadow-glow-sm',
        medium: 'shadow-glow',
        large: 'shadow-glow-lg',
        none: ''
    };

    const hoverStyles = hover
        ? 'transition-all duration-300 hover:shadow-glow hover:border-cyber-cyan/30 hover:-translate-y-1'
        : '';

    return (
        <div
            className={`
        bg-glass-dark
        backdrop-blur-glass
        border border-glass-border
        rounded-lg
        ${glowStyles[glow]}
        ${hoverStyles}
        ${className}
      `}
            style={{
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
            }}
        >
            {children}
        </div>
    );
};

export default GlassSegment;
