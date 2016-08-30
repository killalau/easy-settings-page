import React, {PropTypes} from 'react';

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
                settings.map((setting, i) =>
                    callRenderer(setting.type, Object.assign({
                        key: setting.id || i,
                        value: data[setting.id],
                        onChange: onChange,
                    }, setting))
                )
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