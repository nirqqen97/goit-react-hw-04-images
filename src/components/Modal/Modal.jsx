import { useEffect } from "react"
import { createPortal } from "react-dom"
import PropTypes from "prop-types";
import { Mod, Overlay } from "./Modal.styled"

const modalRoot = document.querySelector('#modal-root')


export const Modal = ({onClose, children}) =>{

    useEffect(() => {
        const handleKeyDown =  e => {
            console.log("object");
             if (e.code === "Escape") {
             onClose()
             }    
         } 
        window.addEventListener('keydown',handleKeyDown)
        return () =>{
            window.removeEventListener('keydown',handleKeyDown)
        }
    }, [onClose]);


    const onOverlayClick = (e) =>{
        if (e.currentTarget === e.target) {
              onClose()
        }
    }
    return createPortal(
        <Overlay onClick={onOverlayClick}>
    <Mod>{children}</Mod>
</Overlay>,
    modalRoot,
    )
}
Modal.propTypes = {
    onClose: PropTypes.func 
}