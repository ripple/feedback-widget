import React from 'react';
import WidgetClass from '../classes/WidgetClass';

// ########################## //
//                            //
//                            //
//  Default Step One
//                            //
//                            //
// ########################## //
const DefaultStepOne = (props) => {
  // -------------------------- //
  //  Vars
  // -------------------------- //
  const { themeValues } = props;

  // -------------------------- //
  //  Functions
  // -------------------------- //
  // ----- Track ----- //
  const track = (yesNo) => {
    if (!props.analytics) {
      console.error('You must pass analytics options to track user responses.'); // TODO: Include a link to the documentation here
    } else {
      const eventName = 'Step 1: Was page helpful?';
      const eventValue = yesNo;
      WidgetClass.track(props.analytics, eventName, eventValue);
      console.log(`%cTracking event: ${eventName} : ${eventValue}`, 'color:yellow;');
    }
    props.next();
  };

  // -------------------------- //
  //  Events
  // -------------------------- //
  const clickYes = () => track('Yes');
  const clickNo = () => track('No');

  // -------------------------- //
  //  JSX
  // -------------------------- //
  return (
    <div className="widget-helpful form-group">
      <div style={themeValues.step1header} className="widget-header">
        <div className="widget-header-title">Was this page helpful?</div>
        <button type="button" style={themeValues.yesIcon} className="widget-header-icon icon-yes" onClick={() => clickYes()}> </button>
        <button type="button" style={themeValues.noIcon} className="widget-header-icon icon-no" onClick={() => clickNo()}> </button>
      </div>
    </div>
  );
};

// ########################## //
//                            //
//                            //
//  Default Step Two
//                            //
//                            //
// ########################## //
const DefaultStepTwo = (props) => {
  // -------------------------- //
  //  Vars
  // -------------------------- //
  const { themeValues } = props;

  // -------------------------- //
  //  JSX
  // -------------------------- //
  return (
    <div className="widget-helpful form-group">
      <div style={themeValues.step1header} className="widget-header">
        <div className="widget-header-title">Thank you for your feedback!</div>
      </div>
    </div>
  );
};

export {
  DefaultStepOne,
  DefaultStepTwo,
};
