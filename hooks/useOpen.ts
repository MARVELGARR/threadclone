import { useState } from "react";


const useIsOpen = (initialState: boolean) => {
    const [isOpen, setIsOpen] = useState(initialState)
    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }
    return {handleOpen, handleClose, isOpen};
}
 
export default useIsOpen;