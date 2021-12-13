

import DatePicker from "react-widgets/DatePicker";

export const renderInputField = ({input, type, label, meta: {touched, error} }:any) => (
    <div className="form-group">
        <div className="form-group text-light">
            <label htmlFor={input.name} className="form-label mt-4 mr-4 float-start">{label}</label>
            <input {...input} required type={ type } id={input.name} className="form-control rounded" placeholder={label}/>
            {touched && error &&
            <small className='error'>{error}</small>}
        </div>
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
export const renderSwitchField = ({input, type, label, meta: {touched, error}, defaultValue }:any) => (
    <div className="form-check form-switch mt-4 text-light">
        <input {...input} className="form-check-input "  type={type} id={input.name} defaultValue={defaultValue} name='isNotified' />
        <label className="form-check-label float-start ml-5" htmlFor={input.name} >{label}</label>
    </div>
);

export const renderHiddenField = ({input, type, meta: {touched, error} }:any) => (
    <div className="form-group text-light">
        <input {...input} type={ type } id={input.name} className="form-control rounded"/>
        {touched && error &&
        <small className='error'>{error}</small>}
    </div>
);

export const renderDateTimePicker1 = ({ input: { onChange, value }, showTime }) =>
  <DatePicker 
  />



// export const renderDatePicker = ({ input: { onChange, value}, label, showTime }) =>
// <div className="form-group text-light">
//     <input {...input} type={ type } id={input.name} className="form-control rounded"/>{touched && error && <small className='error'>{error}</small>}
//     <label className="form-check-label float-start mt-4 ml-5 mb-2" htmlFor={"wateringDate"} >{label}</label>
//     <DatePicker className="py-2"  defaultValue={new Date()} valueEditFormat={{ dateStyle: "short" }} valueDisplayFormat={{ dateStyle: "medium" }}/>
// </div>





// export const renderDatePicker2 = ({input, placeholder, defaultValue, meta: {touched, error} }) =>
// <div className="form-group text-light">
//    <label className="form-check-label float-start mt-4 ml-5 mb-2" htmlFor={"wateringDate"} /> 
//     <div>
//         <DatePicker {...input} defaultValue={new Date()} dateForm="MM/DD/YYYY" selected={input.value} valueEditFormat={{ dateStyle: "short" }} valueDisplayFormat={{ dateStyle: "medium" }} />
//         {touched && error && <span>{error}</span>}
//     </div>
//   </div>

