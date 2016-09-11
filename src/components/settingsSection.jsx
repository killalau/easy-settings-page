import React, {PropTypes} from 'react';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

import RaisedButton from 'material-ui/RaisedButton';

function SettingsSection(props) {
    let {schema = {}, data = {}, renderer = {}, onChange} = props;
    let {name, icon, settings = []} = schema;
    const callRenderer = (type, props) => {
        if (typeof renderer[type] === 'function' || renderer[type] instanceof React.Component) {
            return React.createElement(renderer[type], props);
        } else {
            return React.createElement('div', props);
        }
    };

    return (
        <div>
            {
                // Loop through settings
                settings.map((setting, i) => {
                    let { multiple = false } = setting;
                    if (!multiple) {
                        // Single value settings
                        return callRenderer(setting.type, Object.assign({
                            key: setting.id || i,
                            value: data[setting.id],
                            onChange: onChange,
                        }, setting));

                    } else {
                        // Mutiple values settings
                        let originalValues = data[setting.id];
                        let originalArray = originalValues ? originalValues : defaultValues;
                        let values = originalValues || [];
                        let { default: defaultValues = []} = setting;
                        let length = originalValues ? values.length : defaultValues.length;
                        let elements = [];
console.log(length,defaultValues);
                        for (let j = 0; j < length; j++) {
                            let config = Object.assign({}, setting);
                            config.id = `${config.id}[${j}]`;
                            if (j !== 0) {
                                delete config.label;
                            }
                            delete config.default;

                            // Settings input
                            elements.push(
                                <div key={j} style={{ display: 'flex' }}>
                                    <div style={{ flex: 1 }}>
                                        {
                                            callRenderer(setting.type, Object.assign({
                                                key: config.id,
                                                value: values[j],
                                                default: defaultValues[j],
                                                onChange: (id, newValue) => {
                                                    let newArray = originalArray.slice(0);
                                                    newArray[j] = newValue;
                                                    onChange(setting.id, newArray);
                                                },
                                            }, config))
                                        }
                                    </div>

                                    <div style={{ width: 100, position: 'relative' }}>
                                        <RaisedButton label="Remove" style={{ position: 'absolute', bottom: 10, right: 0 }} secondary
                                            onClick={ () => {
                                                let newArray = originalArray.slice(0);
                                                newArray.splice(j, 1);
                                                onChange(setting.id, newArray.length === 0 ? [null] : newArray);
                                            }}
                                        />
                                    </div>
                                </div>
                            );
                        }
                        // Add button
                        elements.push(
                            <div key={length}>
                                <RaisedButton label="Add" primary onClick={ () => {
                                    let newArray = originalArray.slice(0);
                                    newArray.push(null);
                                    onChange(setting.id, newArray);
                                } } />
                            </div>
                        );
                        return elements;
                    }
                })
            }
        </div>
    );
}

SettingsSection.propTypes = {
    schema: PropTypes.shape({
        name: PropTypes.string.isRequired,
        icon: PropTypes.string,
        settings: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                id: PropTypes.string,
            })
        ),
    }).isRequired,
    data: PropTypes.object,
    renderer: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SettingsSection;