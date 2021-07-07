import React, { FC } from 'react';
import WidgetClass from '../classes/WidgetClass';

// ########################## //
//                            //
//                            //
//  Default Step One
//  "Was this page helpful?"
//                            //
//                            //
// ########################## //
const DefaultStepOne : FC = ( props:any ) => {
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

export default DefaultStepOne;
