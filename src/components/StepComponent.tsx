import React from 'react';
//import React, { Component, useEffect, useState } from 'react';

// ======================== //
//                          //
//  Step: Interface
//                          //
// ======================== //
interface StepInterface {
  themeValues?: any;
    analytics?: any;
    currentPath?: string;
    handleClose?: () => void;
    onSubmit?: (params: {
      eventName: string;
      payload: any;
    }) => void;
  stepData?: any,
  next:any
}

// ======================== //
//                          //
//  Step: React Component
//                          //
// ======================== //
const StepComponent = ({
  stepData,
  ...props
}: StepInterface) => {

  console.log('StepComponent props: ', props)

  const s = stepData.component;

  console.log('s: ', s)

  return (
    <h1>Step Component</h1>
  )
}

export default StepComponent;