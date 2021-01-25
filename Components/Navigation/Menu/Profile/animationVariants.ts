const variants = {
    hidden: {
        transform: 'scaleY(0)',
        transformOrigin: 'center top',
        opacity: 0,
        transition: {
            type: 'tween',
            duration: 0.3,
            ease: 'easeOut'
        }
    },
    visible: {
        transform: 'scaleY(1)',
        transformOrigin: 'center top',
        opacity: 1,
        transition: {
            type: 'tween',
            duration: 0.3,
            ease: 'easeOut'
        }
    }
}

export default variants