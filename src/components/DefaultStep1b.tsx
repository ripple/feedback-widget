import React, { FC, useState } from 'react';
import WidgetClass from '../classes/WidgetClass';

// ########################## //
//                            //
//                            //
//  Default Step One B 
//  "Form"
//                            //
//                            //
// ########################## //
const DefaultStepOneB : FC = ( props:any ) => {
  // -------------------------- //
  //  Vars
  // -------------------------- //
  const { themeValues } = props;

  // -------------------------- //
  //  Functions
  // -------------------------- //
  // ----- Track ----- //
  const track = (answer) => {
    if (!props.analytics) {
      console.error('You must pass analytics options to track user responses.'); // TODO: Include a link to the documentation here
    } else {
      const eventName = 'Step 2: Feedback form.';
      const eventValue = answer;
      WidgetClass.track(props.analytics, eventName, eventValue);
    }
    props.next();
  };

  // -------------------------- //
  //  Events
  // -------------------------- //
  const [input, setInput] = useState('');
  const submitEntry = ( answer ) => {
      // TODO: Check user input. Validate and potentially clean.
      //     eventName: convertToDashString(labels.step2Title),
      track(answer);
  };
  // -------------------------- //
  //  JSX
  // -------------------------- //
  return (
    <div className=" widget-form form-group">
      <div className="widget-form-wrapper">
        <div style={themeValues.step2header} className="widget-header-title">
          {props.themeLabels.step2Title}
        </div>
        <div style={themeValues.step2formarea}>
          <textarea style={themeValues.inputForm} onChange={(e) => setInput(e.target.value)} />
          
        </div>
        <div style={themeValues.step2footer} className="widget-form-footer">
          <button
            style={themeValues.formCancelButton}
            type="button"
            className="widget-header-icon cancel"
            onClick={() => {
              if (props.handleClose) {
                props.handleClose();
              }
            }}
          >
            {props.themeLabels.cancelButtonText}
          </button>
          <button
            style={themeValues.formSubmitButton}
            type="button"
            className="widget-header-icon submit"
            onClick={() => {
              submitEntry(input);
            }}
          >
            {props.themeLabels.submitButtonText}
          </button>

        </div>
      </div>
    </div>
  );
};

export default DefaultStepOneB;
