// Error class to check for input errors
export default class Errors {
  constructor(fields, errors) {
    this.fields = fields;
    this.errors = errors;
  }

  // Function for validating errors
  validateErrors() {
    let errorObj = {};
    Object.entries(this.fields).forEach(([fieldName, fieldValue]) => {
      if(fieldValue === '' || (fieldName !== '' && !fieldValue.match(this.errors[fieldName]))) {
        errorObj = {
          ...errorObj,
          [fieldName]: true
        }
      } else {
        errorObj = {
          ...errorObj,
          [fieldName]: false
        }
      }
    })
    return errorObj;
  }
}