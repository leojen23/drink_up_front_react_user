
export const renderInputField = ({input,type, label, meta: {touched, error} }:any) => (
    <div className="form-group text-light">
        <label htmlFor={input.name} className="form-label mt-4 mr-4 float-start">{label}</label>
        <input {...input} type={ type } id={input.name} className="form-control rounded" placeholder={label}/>
        {touched && error &&
        <small className='error'>{error}</small>}
    </div>
);
export const renderSelectField = ({input, type, label, children, meta: {touched, error} }:any) => (
    <div className="form-group field text-light">
        <label htmlFor={input.name} className="form-label mt-4 float-start">{label}</label>
        <select {...input} className='form-select rounded'>
            {children}
        </select>
        {touched && (error && <small className="help is-danger">{error}</small>)}
    </div>
);
export const renderSwitchField = ({input, type, label, children, meta: {touched, error}, defaultValue }:any) => (
    <div className="form-check form-switch mt-4 text-light">
        <input {...input} className="form-check-input "  type={type} id={input.name} defaultValue={defaultValue} name='isNotified' />
        <label className="form-check-label float-start ml-5" htmlFor={input.name} >{label}</label>
    </div>
);