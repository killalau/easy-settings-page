import React, {PropTypes} from 'react';
import Checkbox from 'material-ui/Checkbox';

export default function (props) {
    let {id, label, default: defaultValue, value, info, onChange} = props;
    let v = typeof value !== 'undefined' ? value : defaultValue;
    let elId = `setting_${id}`;
    let wrapperStyle = {
        marginTop: '14px',
        marginBottom: '14px',
    }
    return (
        <div style={wrapperStyle}>
            <Checkbox
                id={elId}
                name={id}
                checked={v}
                label={label}
                onCheck={onChange}
                />
        </div>
    );
}
