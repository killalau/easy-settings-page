import React from 'react';

export default function SettingsSection(props){
    let {schema = {}, data = {}, renderer = {}} = props;
    let {name, icon, settings = []} = schema;
    const callRenderer = (type, props) => {
        if(typeof renderer[type] === 'function' || renderer[type] instanceof React.Component){
            return React.createElement(renderer[type], props);
        } else {
            return React.createElement('div', props);
        }
    };

    return (
        <div>
            {
                settings.map((setting, i) =>
                    callRenderer(setting.type, Object.assign({
                        key: setting.id || i,
                        value: data[setting.id],
                        onChange: props.onChange,
                    }, setting))
                )
            }
        </div>
    );
}