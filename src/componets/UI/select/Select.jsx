import classes from './Select.module.scss';

function Select ({value, onChange, options, defaultValue, selectClass, ...props}) {
    return (
        <select 
            value={value} 
            onChange={(ev) => onChange(ev.target.value)} 
            className={`${selectClass ? selectClass + " ": ""}${classes.select}`}
            {...props}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default Select;