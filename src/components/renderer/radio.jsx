import React, {PropTypes} from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class RadioRenderer extends React.Component {
    render() {
        let props = this.props;
        let {id, label, default: defaultValue, value, options = [], onChange} = props;
        let elId = `setting_${id}`;
        let muiThem = this.context.muiTheme;
        let labelStyle = {
            color: muiThem.textField.floatingLabelColor,
            lineHeight: '22px',
            fontSize: '12px',
            transformOrigin: 'left top 0px',
            pointerEvents: 'none',
            WebkitUserSelect: 'none',
        };
        let wrapperStyle = {
            marginTop: '14px',
            marginBottom: '14px',
        };
        return (
            <div style={wrapperStyle}>
                <label style={labelStyle}>{label}</label>
                <RadioButtonGroup
                    id={elId}
                    name={id}
                    defaultSelected={defaultValue}
                    valueSelected={value}
                    onChange={(event, newValue) => onChange(id, newValue) }
                    >
                    {
                        options.map(option =>
                            <RadioButton key={option.value} value={option.value} label={option.label} />
                        )
                    }
                </RadioButtonGroup>
            </div>
        );
    }
}

RadioRenderer.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    default: PropTypes.any,
    value: PropTypes.any,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.any.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired,
};

RadioRenderer.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

export default RadioRenderer;
