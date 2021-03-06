import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Input, Label } from 'reactstrap';
import WizardError from './WizardError';
import { AuthWizardContext } from '../../../context/Context';
import Datetime from 'react-datetime';
import classNames from 'classnames';

const WizardInput = ({
  label,
  id,
  name,
  errors,
  tag: Tag = Input,
  type = 'text',
  options = [],
  placeholder,
  className,
  customType,
  ...rest
}) => {
  const { user, handleInputChange } = useContext(AuthWizardContext);

  if (customType === 'datetime') {
    return (
      <FormGroup>
        {!!label && <Label>{label}</Label>}
        <Datetime
          id={id}
          dateFormat="DD/MM/YYYY"
          timeFormat={false}
          defaultValue={user[name]}
          onChange={setStartDate => handleInputChange({ name: name, value: setStartDate })}
          inputProps={{
            name,
            placeholder
          }}
          {...rest}
        />
      </FormGroup>
    );
  }

  if (type === 'checkbox' || type === 'switch' || type === 'radio') {
    return (
      <FormGroup>
        <Tag
          name={name}
          id={id}
          type={type}
          className={className}
          label={
            <Fragment>
              {label}
              <WizardError error={errors[name]?.message} className="fs--1 font-weight-normal d-block" />
            </Fragment>
          }
          {...rest}
        />
      </FormGroup>
    );
  }
  if (type === 'select') {
    return (
      <FormGroup>
        {!!label && <Label for={id}>{label}</Label>}
        <Tag
          name={name}
          id={id}
          defaultValue={user[name]}
          type={type}
          label={label}
          className={classNames(className, { 'border-danger': errors[name]?.message })}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option value={option} key={index}>
              {option}
            </option>
          ))}
        </Tag>
        <WizardError error={errors[name]?.message} className="mt-1" />
      </FormGroup>
    );
  }
  return (
    <FormGroup>
      {!!label && <Label for={id}>{label}</Label>}
      <Tag
        name={name}
        id={id}
        defaultValue={user[name]}
        type={type}
        placeholder={placeholder}
        className={classNames(className, { 'border-danger': errors[name]?.message })}
        {...rest}
      />
      <WizardError error={errors[name]?.message} className="mt-1" />
    </FormGroup>
  );
};

// const WizardInpute = ({ type = 'text', register, label, options = [], placeholder, ...rest }) => {
//   const { user, step, handleInputChange } = useContext(AuthWizardContext);
//   const { name, error } = register;
//   error.touched = user[step]?.[name]?.error?.touched;

//   const inputProps = {
//     type,
//     name,
//     value: user[step]?.[name]?.value || '',
//     onChange: ({ target }) => handleInputChange(target, register),
//     ...rest
//   };

//   if (type === 'select') {
//     return (
//       <FormGroup>
//         {!!label && <Label for={name}>{label}</Label>}
//         <CustomInput {...inputProps}>
//           <option value="">{placeholder}</option>
//           {options.map((option, index) => (
//             <option value={option} key={index}>
//               {option}
//             </option>
//           ))}
//         </CustomInput>
//         {!!error && !user[step]?.[name]?.value && <WizardError error={error} />}
//       </FormGroup>
//     );
//   }

//   if (type === 'checkbox' || type === 'switch' || type === 'radio') {
//     return (
//       <FormGroup>
//         <CustomInput placeholder={placeholder} label={label} {...inputProps} />
//         {!!error && !user[step]?.[name]?.checked && <WizardError error={error} />}
//       </FormGroup>
//     );
//   }

//   return (
//     <FormGroup>
//       {!!label && <Label for={name}>{label}</Label>}
//       <Input placeholder={placeholder} {...inputProps} />
//       {!!error && !user[step]?.[name]?.value && <WizardError error={error} />}
//     </FormGroup>
//   );
// };

WizardInput.propTypes = { label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]) };

WizardInput.defaultProps = { required: false };

export default WizardInput;
