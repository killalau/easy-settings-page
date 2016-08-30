import React, {PropTypes} from 'react';
import { defaultsDeep } from 'lodash';

import {Tabs, Tab} from 'material-ui/Tabs';

import SettingsSection from './settingsSection';
import * as Renderer from './renderer/index.js';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        let {schema, data} = props;
        this.state = {
            data: SettingsPage.getDefaultValues(schema, data)
        };
        this.onChange = this.onChange.bind(this);
    }

    render() {
        let {schema = [], renderer = Renderer} = this.props;
        let {data} = this.state;
        return (
            <Tabs>
                {schema.map(
                    s =>
                        <Tab label={s.name} key={s.name}>
                            <SettingsSection
                                key={s.name}
                                schema={s}
                                data={data}
                                renderer={renderer}
                                onChange={this.onChange}
                                />
                        </Tab>
                ) }
            </Tabs>
        );
    }

    onChange(id, newValue) {
        let {data: oldData} = this.state;
        let newData = Object.assign({}, oldData);
        let oldValue = newData[id];
        newData[id] = newValue;
        this.setState(Object.assign({}, this.state, { data: newData }));
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(newData, oldData, { id, newValue, oldValue });
        }
    }
}

SettingsPage.getDefaultValues = function (schema = [], data) {
    let defaultValue = schema.reduce((data, section) => {
        let {settings} = section;
        settings.forEach(setting => {
            let {type, id, default: defaultValue} = setting;
            if (id && typeof defaultValue !== 'undefined') {
                data[id] = defaultValue;
            }
        });
        return data;
    }, {});
    if (typeof data !== 'undefined') {
        defaultValue = defaultsDeep(defaultValue, data);
    }
    return defaultValue;
};

SettingsPage.propTypes = {
    schema: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string,
            settings: PropTypes.arrayOf(
                PropTypes.shape({
                    type: PropTypes.string.isRequired,
                    id: PropTypes.string,
                })
            ),
        })
    ).isRequired,
    data: PropTypes.object,
    renderer: PropTypes.object,
    onChange: PropTypes.func.isRequired,
};

export default SettingsPage;