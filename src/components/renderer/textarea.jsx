import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

function TextareaRenderer(props) {
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
            multiLine={true}
            rows={6}
            rowsMax={6}
            />
    );
}

TextareaRenderer.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    default: PropTypes.string,
    value: PropTypes.string,
    info: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default TextareaRenderer;