import classes from './Button.module.scss';

function Button ({children, buttonClass, ...props}) {

  return (
    <button className={`${buttonClass ? buttonClass + " " : ""}${classes.button}`} {...props}>
      {children}
    </button>
  );
}

export default Button;