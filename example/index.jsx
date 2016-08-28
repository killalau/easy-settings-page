import React, {PropTypes} from 'react';
import { render } from 'react-dom';

import { SettingsPage, Renderer } from '../src/index.js';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component {
    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    render() {
        let props = this.props;
        return (
            <MuiThemeProvider>
                <SettingsPage schema={props.schema} data={props.data} renderer={props.renderer} onChange={this.onChange.bind(this)}/>
            </MuiThemeProvider>
        )
    }
    onChange(data){
        console.log(data);
    }
}

App.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};

const schema = [
  {
      "name": "Basic",
      "icon": "32",
      "settings": [
          {
              "type": "text",
              "id": "store_name",
              "label": "Store Name",
              "info": "Store name display in website",
              "default": "Testing store"
          },
          {
              "type": "textarea",
              "id": "description",
              "label": "Store Description",
              "info": "Store description for website",
              "default": "It is good"
          },
          {
              "type": "radio",
              "id": "store_type",
              "label": "Store Type",
              "options": [
                  { "value": "retail", "label": "Retail" },
                  { "value": "restaurant", "label": "Restaurant" }
              ],
              "default": "retail"
          },
          {
              "type": "checkbox",
              "id": "show_header",
              "label": "Show Header",
              "default": false
          },
          {
              "type": "select",
              "id": "products_per_page",
              "label": "Products Per Page",
              "options": [
                  { "group": "4 A Row", "value": 8, "label": "8 Products" },
                  { "group": "4 A Row", "value": 12, "label": "12 Products" },
                  { "group": "4 A Row", "value": 16, "label": "16 Products" },
                  { "group": "3 A Row", "value": 9, "label": "9 Products" },
                  { "group": "3 A Row", "value": 15, "label": "15 Products" },
                  { "group": "3 A Row", "value": 18, "label": "18 Products" },
                  { "group": "5 A Row", "value": 10, "label": "10 Products" },
                  { "group": "5 A Row", "value": 20, "label": "20 Products" },
                  { "group": "5 A Row", "value": 30, "label": "30 Products" }
              ],
              "default": 12
          },
          {
              "type": "select",
              "id": "theme_style",
              "label": "Theme Style",
              "options": [
                  { "value": "dark", "label": "Dark Theme" },
                  { "value": "light", "label": "Light Theme" },
                  { "value": "colorful", "label": "Colorful Theme" }
              ],
              "default": "dark"
          }
      ]
  },
  {
      "name": "Misc",
      "icon": "12",
      "settings": [
          {
              "type": "textarea",
              "id": "policy",
              "label": "Policy Statement",
              "info": "Policy statement in checkout page"
          }
      ]
  }
];

const data = {};

const renderer = Renderer;

render(<App schema={schema} data={data} renderer={renderer} />, document.querySelector("#app"));
