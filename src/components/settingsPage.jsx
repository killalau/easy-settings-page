import React from 'react';
import { defaultsDeep } from 'lodash';

import {Tabs, Tab} from 'material-ui/Tabs';

import SettingsSection from './settingsSection';

export default class SettingsPage extends React.Component {
    constructor(props) {
        super(props);
        let {schema, data} = props;
        this.state = {
            data: defaultsDeep(this.getDefaultValues(schema), data)
        };
        this.onChange = this.onChange.bind(this);
    }

    render() {
        let {schema = [], renderer} = this.props;
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

    getDefaultValues(schema = []) {
        return schema.reduce((data, section) => {
            let {settings} = section;
            settings.forEach(setting => {
                let {type, id, default: defaultValue} = setting;
                if (id && typeof defaultValue !== 'undefined') {
                    data[id] = defaultValue;
                }
            });
            return data;
        }, {});
    }

    onChange(event, newValue) {
        let {target: {name}} = event;
        this.state.data[name] = newValue;
        this.setState(this.state);
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(this.state);
        }
    }
}