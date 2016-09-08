'use strict'

import React from 'react'
import Select from 'react-select';

let options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

function logChange(val) {
    console.log("Selected: " + val);
}

<Select
    name="form-field-name"
    value="one"
    options={options}
    onChange={logChange}
/>

export default Select
