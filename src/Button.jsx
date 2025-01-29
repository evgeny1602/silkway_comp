export function Button({ children, variant='primary', onClick }) {
    const baseClasses = 'transition-all duration-200 text-silkway-dark-chocolate rounded px-[8px] py-[5px] items-center border whitespace-nowrap flex flex-nowrap font-sans text-base font-medium justify-center w-[136px]'

    const variantClasses = {
        'primary': 'bg-silkway-orange hover:bg-silkway-light-orange border-silkway-dark-orange shadow-inner shadow-white/45',
        'ghost': 'bg-transparent hover:bg-silkway-light-gray border-silkway-light-gray'
    }

    const classes = [baseClasses, variantClasses[variant]].join(' ')

    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    )
}