import classes from './Modal.module.scss';

function Modal ({children, visible, setVisible}) {

    const rootClasses = [classes.modal];
    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
            <div className={classes.modalContent} onClick={(ev) => ev.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;