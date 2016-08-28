import React, {PropTypes} from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

export default class Radio extends React.Component {
    render() {
        let props = this.props;
        let {id, label, default: defaultValue, value, info, onChange} = props;
        let v = typeof value !== 'undefined' ? value : defaultValue;
        let elId = `setting_${id}`;
        let {options = []} = props;
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
        }
        return (
            <div style={wrapperStyle}>
                <label style={labelStyle}>{label}</label>
                <RadioButtonGroup id={elId} name={id} defaultSelected={defaultValue} valueSelected={value} onChange={onChange} hintText={info}>
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

Radio.contextTypes = {
    muiTheme: PropTypes.object.isRequired,
};