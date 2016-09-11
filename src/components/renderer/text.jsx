import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

function TextRenderer(props) {
    let {id, label, default: defaultValue, value, info, onChange} = props;
    let v = typeof value !== 'undefined' ? value : defaultValue;
    let elId = `setting_${id}`;
    return (
        <TextField
            id={elId}
            name={id}
            value={v || ''}
            hintText={info}
            floatingLabelText={label}
            onChange={(event, newValue) => onChange(id, newValue) }
            fullWidth={true}
            />
    );
}

TextRenderer.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    default: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TextRenderer;