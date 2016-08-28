import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

export default function (props) {
    let {id, label, default: defaultValue, value, info, onChange} = props;
    let v = typeof value !== 'undefined' ? value : defaultValue;
    let elId = `setting_${id}`;
    let {options = []} = props;
    options = options.sort((a, b) => a.group > b.group ? 1 : a.group < b.group ? -1 : 0);
    return (
        <SelectField
            value={v}
            floatingLabelText={label}
            onChange={(event, key, newValue) => {
                event.target.name = id;
                onChange(event, newValue);
            } }
            fullWidth={true}
            >
            {
                options.reduce(
                    (obj, option) => {
                        if(obj.prevGroup !== option.group){
                            obj.prevGroup = option.group;
                            obj.items.push(<Divider key={`${obj.prevGroup}_${option.group}`}/>);
                        }
                        obj.items.push(
                            <MenuItem
                                key={`${option.group}_${option.value}`}
                                value={option.value}
                                primaryText={option.label}
                                />
                        );
                        return obj;
                    }
                    , { items: [], prevGroup: options[0].group }
                ).items
            }
        </SelectField>
    );
}