import React, {PropTypes} from 'react';
import Checkbox from 'material-ui/Checkbox';

function CheckboxRender(props) {
    let {id, label, default: defaultValue, value, onChange} = props;
    let v = typeof value !== 'undefined' ? value : defaultValue;
    let elId = `setting_${id}`;
    let wrapperStyle = {
        marginTop: '14px',
        marginBottom: '14px',
    };
    return (
        <div style={wrapperStyle}>
            <Checkbox
                id={elId}
                name={id}
                checked={v}
                label={label}
                onCheck={(event, newValue) => onChange(id, newValue) }
                />
        </div>
    );
}

CheckboxRender.PropTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    default: PropTypes.bool,
    value: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
};

export default CheckboxRender;