import classes from './Input.module.scss';

function Input (props) {
    return (
        <input className={classes.input} {...props}></input>
    );
}

export default Input;