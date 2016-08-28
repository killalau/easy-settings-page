import React from 'react';
import TextField from 'material-ui/TextField';

export default function(props){
    let {id, label, default: defaultValue, value, info, onChange} = props;
    let v = typeof value !== 'undefined' ? value : defaultValue;
    let elId = `setting_${id}`;
    return (
        <TextField
            id={elId}
            name={id}
            value={v}
            hintText={info}
            floatingLabelText={label}
            onChange={onChange}
            fullWidth={true}
            />
    );
}