import classes from './Input.module.scss';

function Input ({children, inputClass, ...props}) {
    return (
        <input className={`${inputClass ? inputClass + " " : ""}${classes.input}`} {...props}>
            {children}
        </input>
    );
}

export default Input;