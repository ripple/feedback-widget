import React, { FC, useEffect, useState } from 'react';
import { Steps, Step } from 'react-step-builder';
import config from '../styles/theme.styles';
import StepComponent from './StepComponent';
import defaultWidgetProps from '../data/defaultWidgetProps';
import { DefaultStepOne, DefaultStepTwo } from './DefaultSteps';
import WidgetClass from '../classes/WidgetClass';
import '../styles/widget.scss';

// ------------------------------ //
//  Widget Types
// ------------------------------ //
// TODO: expand on this
type WidgetProps = {
  widgetProps: any,
  theme: any,
}

// ########################## //
//                            //
//                            //
//  Widget Component
//                            //
//                            //
// ########################## //
const Widget = (widgetProps : WidgetProps) => {
  // ===================== // 
  //  State
  // ===================== //
  const [props, setProps] = useState({ ...defaultWidgetProps, ...widgetProps });
  const [ready, setReady] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [openAnimation, setOpenAnimation] = useState('entering');
  const [themeName, setThemeName] = useState(widgetProps?.theme);
  const [themeValues, setThemeValues] = useState(config.themes[themeName].styles)

  // ===================== //
  //  Events
  // ===================== //
  const clickOnClose = () => {
    setOpenAnimation('exiting');
    setIsOpen(false);
  };

  // - - - - - - - - - - - - - - - - //
  //  fn: Init
  // - - - - - - - - - - - - - - - - //
  const init = function init() {
    
    // TODO: NEAL THIS PROBABLY IS IRRELEVANT NOW. but double check...
    // setProps((prevState) => {
    //   const newState = prevState;
    //   newState.themeValues = themeValues;
    //   return newState;
    // });

    // ----- Insert Default Step ----- //
    if (!props.steps || props.steps.length <= 0) {
      const defaultSteps = [
        { component: DefaultStepOne },
        { component: DefaultStepTwo },
      ];

      setProps((prevState) => {
        const newState = prevState;
        newState.steps = defaultSteps as any;
        return newState;
      });
    }

    // ----- Connect Analytics ----- //
    if (props.analyticsConfig) {
      setAnalytics(WidgetClass.connectAnalytics(props.analyticsConfig, props.analyticsName) as any);
    }

    // ----- Set Ready State ----- //
    setReady(true);
  }

  // - - - - - - - - - - - - - - - - //
  //  fn: Update Theme
  // - - - - - - - - - - - - - - - - //
  const updateTheme = function updateTheme() {
    setThemeName(widgetProps.theme);
    setThemeValues(config.themes[widgetProps.theme].styles);
  }

  // ===================== //
  //  Hooks
  // ===================== //
  useEffect(init, []);
  useEffect(updateTheme, [widgetProps])

  // ===================== //
  //  JSX
  // ===================== //
  return (
    <>
      { ready ?
        <div className="cleanslate">
          <div style={themeValues?.container} className={`
            ${themeName}
            widget
            docked-widget
            widget-${openAnimation}
            docked-widget-${config.themes[themeName].position}
            `}>
            <div className={`widget widget-${isOpen}`}>
              <div><button type="button" id="closeFeedback" onClick={() => clickOnClose()}>X</button></div>
              <Steps>
                {props.steps.map((step, idx) => {
                  return (
                    <Step
                      key={idx}
                      component={StepComponent as FC}
                      stepData={step}
                      themeValues={themeValues}
                      onSubmit={props.onSubmit}
                      handleClose={clickOnClose}
                      currentPath={props.currentPath}
                      analytics={(analytics) ? analytics : null}
                    />
                  );
                })}
              </Steps>
            </div>
          </div>
        </div>
        : null}
    </>
  );
};

export {
  Widget,
};
