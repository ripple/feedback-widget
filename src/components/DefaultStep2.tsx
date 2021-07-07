import React, { FC } from 'react';

// ########################## //
//                            //
//                            //
//  Default Step Two
//  "Thank you for your feedback!"
//                            //
//                            //
// ########################## //
const DefaultStepTwo : FC = ( props:any ) => {
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

export default DefaultStepTwo;
