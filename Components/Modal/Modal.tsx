import { AnimatePresence, motion } from 'framer-motion'

import useModal from '../customHooks/useModal'
import variants from './animationVariants'

const Modal : React.FC = ({ children }) => {

    const show = useModal()

    return (
        <AnimatePresence>
            {show && (
                <motion.div variants={variants} initial="hidden" animate="visible" exit="hidden">
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Modal