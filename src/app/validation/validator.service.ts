import { Component, OnInit } from '@angular/core';
export class ValidatorList {
    static account_validation_messages: any = {
        'first_name': [
            { type: 'required', message: 'First Name is required' },
            { type: 'minlength', message: 'Username must be at least 5 characters long' },
            { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Your username must contain only numbers and letters' },
            { type: 'validUsername', message: 'Your username has already been taken' }
        ],
        'last_name': [
            { type: 'required', message: 'Last Name is required' },
            { type: 'minlength', message: 'Username must be at least 5 characters long' },
            { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
            { type: 'pattern', message: 'Your username must contain only numbers and letters' },
            { type: 'validUsername', message: 'Your username has already been taken' }
        ],

        'mobile_number': [
            { type: 'required', message: 'Mobile No is required' },
            { type: 'minlength', message: 'Mobile No must be at least 5 characters long' },
            { type: 'maxlength', message: 'Mobile No cannot be more than 10 characters long' },
            { type: 'pattern', message: 'Invalid Mobile No' },
            { type: 'validUsername', message: 'Your Mobile No has already been taken' }
        ],

        'email': [
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', message: 'Enter a valid Email' },
            { type: 'emailValidator', message: 'Enter a valid email' },
        ],
        'confirm_password': [
            { type: 'required', message: 'Confirm password is required' },
            { type: 'areEqual', message: 'Password mismatch' },
            { type: 'pattern', message: 'Confirm password must be alpha-numeric' }
        ],
       
        'password': [
            { type: 'required', message: 'Password is required' },
            { type: 'minlength', message: 'Password must be at least 6 characters long' },
            { type: 'pattern', message: 'Password must be alpha-numeric' },
            { type: 'nameValidator', message: 'Enter a valid password' },
        ],
      

    }


    static numberNotRequiredValidator(number): any {
        if (number.pristine) {
            return null;
        }
        const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;

        number.markAsTouched();

        var value = number.value.trim();

        if (NUMBER_REGEXP.test(value)) {
            return {
                numberNotRequiredValidator: true
            };
        }

        return null;
    }

    static percentValidation(number): any {
        if (number.pristine) {
            return null;
        }
        number.markAsTouched();
        var temp_number = parseInt(number.value)
        if ((temp_number > 100) || (temp_number < 0)) {
            return {
                percentValidation: true
            }
        }
        else {
            return null
        }
    }

    static avoidEmptyStrigs(value): any {
        if (value.pristine) {
            return null;
        }

        value.markAsTouched();

        if (value.value.trim() == '' && value.value.length > 0) {
            return {
                avoidEmptyStrigs: true
            };
        }

        return null;
    }

    static emailValidator(value): any {

        if (value.pristine) {
            return null;
        }

        if (value.value.length == 0) {
            return;
        }


        const EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        value.markAsTouched();

        if (EMAIL_REGEXP.test(value.value)) {
            return null;
        }

        return {
            emailValidator: true
        };
    }

    static nameValidator(value): any {

        if (value.pristine) {
            return null;
        }

        if (value.value.length == 0) {
            return;
        }


        const EMAIL_REGEXP = /^[^\s]+$/;

        value.markAsTouched();

        if (EMAIL_REGEXP.test(value.value)) {
            return null;
        }

        return {
            namelValidator: true
        };
    }

}