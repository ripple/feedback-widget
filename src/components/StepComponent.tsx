import React from 'react';
import { AutoForm } from 'uniforms-unstyled';
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema';
import { schemaValidator } from '../utils/schemaValidator';
import WidgetClass from '../classes/WidgetClass';

// ########################## //
//                            //
//                            //
//  Step Component Types
//                            //
//                            //
// ########################## //
type StepComponentProps = {
  analytics: any,
  current: any,
  handleClose: any,
  isLast: any,
  next: any,
  onSubmit: any,
  stepData: any
  setIsOpen: boolean,
  setOpenAnimation: boolean
}

// ########################## //
//                            //
//                            //
//  Step Component
//                            //
//                            //
// ########################## //
const StepComponent = ({
  setIsOpen,
  setOpenAnimation,
  ...props
} : StepComponentProps) => {
  // -------------------------- //
  //  Vars
  // -------------------------- //
  const { stepData } = props;
  const form = stepData?.form;
  const component = stepData?.component;

  // -------------------------- //
  //  Error Check
  // -------------------------- //
  if (!stepData) {
    throw new Error('Step data is required for every step.');
  }

  // --------------------------------- //
  //  Return Component or Uniform
  // --------------------------------- //
  // #1. If component is passed for the step, just return it as React Component
  if (component) {
    return <>{React.createElement(component, props)}</>;
  }

  // #2. Else if a Uniform form is passed, format and return it
  if (form) {
    const validatedSchema = schemaValidator(form);
    return (
      <AutoForm
        schema={new JSONSchemaBridge(form, validatedSchema)}
        onSubmit={(formData) => {
          // ----- Custom User-Defined onSubmit ----- //
          if (props.onSubmit) {
            props.onSubmit(props);
          }

          // ----- Track ----- //
          if (props.analytics) {
            const formDataArray = Object.entries(formData);
            formDataArray.forEach(([key, value]) => {
              const eventName = `Step ${props.current}: ${key}`;
              const eventValue = JSON.stringify(value);
              WidgetClass.track(props.analytics, eventName, eventValue);
              console.log(`%cTracking event: ${eventName} : ${eventValue}`, 'color:yellow;');
            });
          }

          // ----- Next Step / Close ----- //
          if (props.isLast()) props.handleClose();
          else props.next();
        }}
      />
    );
  }

  // #3. Else: Vanilla JS
  return (
    <>
      <h1>Under Development</h1>
      <p>Please use React Components or Uniform only. (for now) Check the README.md file for other implementations.</p>
    </>
  );
};

export default StepComponent;
