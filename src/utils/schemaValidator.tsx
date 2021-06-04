import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, useDefaults: true, keywords: ['uniforms', 'options', 'defaultValue', 'allowedValues'] });
// eslint-disable-next-line import/prefer-default-export
export function schemaValidator(schemaInput) {
  const validator = ajv.compile(schemaInput);

  // eslint-disable-next-line consistent-return
  return (model: any) => {
    validator(model);

    if (validator.errors && validator.errors.length) {
      return { details: validator.errors };
    }
    return null;
  };
}
