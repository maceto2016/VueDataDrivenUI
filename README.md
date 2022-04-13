# Data Driven UI with Vue.js and Quasar

![Data Driven UI](./assets/DataDrivenUI-2.png)

## Description

In mid-March/2020 we started a first attempt at dynamic UI generation, based on a schema definitions in JSON (**Data Driven UI**) using the frameworks **Vue.js + Quasar**.

The idea was to link to the database schema API, an API that provides UI definitions for forms related to tables and views (entities) in the database. These UI definitions would be structured in JSON format and a client-side interpreter would generate the UI based on JSON information (at the time in Vue.js 2.0 + Quasar framework 1.0).

The form would present a field definition schema for each corresponding entity field in the database with the type of edit component (and other relevant properties) for the field. These controls would be rendered one below the other or within groups (tabs, cards, expansions, and so on). The scheme also provided lookup fields with their dependencies (eg countries, states, cities). The edit controls are based on the **_Quasar Framework's form controls_** with some tweaks such as the use of **_event bus_** for event communication and **_scoped slots_** for property communication between the form, edit controls and the wrapper component. A renderless wrapper component was also provided for interaction with the RESTful/GraphQL API to interact with the data of the corresponding entity in the database.

Most features were excluded from the original code to focus only on dynamic rendering of the main components, i.e. form, groups and edit controls (which is the focus of this article). We only kept the implementation of forms with the fields grouped in tabs.

The Data Driven UI concept allows interesting solutions such as:

- Define UI model definition schema related to database tables and views thant generates UI dynamically;
- Create the UI model definition schema agnostic to technologies and frameworks (one can develop a generator for **Vue+Quasar**, another in **React+Material UI**, and so on).

## Pre-requisites

We assume you have a good knowledge of **git cli**, **javascript**, **Vue.js** and **Quasar UI Framework**. You must have **Vue cli** and **quasar cli** installed on your system installed on your system. This tutorial was run in a **_linux environment_**, but you would easily tweak this for your preferred operating system.

## The JSON schema structure

The JSON structure is fairly simple. Define the groups and list of fields in each group item.

However, defining field properties can be as complex as supported Quasar UI controls allow (**_to find out which properties are supported, see the documentation for the corresponding Quasar control_**).

For example, it is allowed to define validation rules on the value entered for the field, editing mask and much more.

The JSON structure is as follows:

- **_groupModel: string_** => (Only 'tab' is currently supported);
- **_groups: array_** => array of group itens:
  - Main group properties (**_name, label, icon_**);
  - Other **optional** group control type specific properties
  - **_fields: array_** => UI controls definition list for fields:
    - Main field properties (**_name, id, fieldType_**);
    - Other **optional** field control type specific properties.

Below is an example of a JSON schema used in this article:

```javascript
export default {
  /*
   * Group type: Only 'tab' is currently supported
   */
  groupModel: "tab",
  /*
   * List od group itens
   */
  groups: [
    {
      /*
       * Main properties (name, label, icon)
       */
      name: "Group 1",
      label: "Group 1",
      icon: "mail",

      /*
       * Control type specific properties
       */
      flat: true,
      "expand-separator": true,

      /*
           * Field list: name, id and fieldType 
             are the mais properties, the others are 
             UI control specific properties.
           */
      fields: [
        {
          /*
           * Main field properties
           */
          name: "id",
          id: "g1_id",
          fieldType: "inputtext",
          /*
           * Control type specific properties
           */
          label: "id",
          dense: false,
          readonly: true,
          hidden: true,
        },
        /*
         * Other fields definitions...
         */
        {
          name: "name",
          id: "g1_name",
          fieldType: "inputtext",
          label: "Name",
          placeholder: "Name...",
          hint: "Inform the name...",
          dense: true,
          clearable: true,
          "clear-icon": "close",
          /*
           * Validation rules can be defined as in the example below
           */
          rules: [
            {
              params: ["val"],
              exp: '!!val || "Name is required!"',
            },
          ],
        },
        {
          name: "on",
          id: "g1_on",
          fieldType: "btntoggle",
          label: "On?",
          hint: "Report if ON or OFF...",
          dense: false,
          clearable: true,
          "stack-label": true,
          filled: false,
          options: [
            { label: "On", value: "on" },
            { label: "Off", value: "off" },
          ],
        },
        {
          name: "onoff",
          id: "g1_onoff",
          fieldType: "checkbox",
          "outer-label": "On or Off?",
          label: "On/Off",
          hint: "Report if ON or OFF...",
          "indeterminate-value": null,
          "true-value": "on",
          "false-value": "off",
          dense: false,
          clearable: true,
          "stack-label": true,
          filled: false,
        },
        {
          name: "alive",
          id: "g1_alive",
          fieldType: "radio",
          "outer-label": "Is alive?",
          label: "Alive",
          hint: "let me know if you're alive...",
          val: "alive",
          dense: false,
          clearable: true,
          "stack-label": true,
          filled: false,
        },
        {
          name: "birthday",
          id: "g1_birthday",
          fieldType: "datepicker",
          label: "Birthday",
          hint: "enter your birthday...",
          mask: "YYYY-MM-DD",
          titleFormat: "ddd., DD [de] MMM.",
          dense: false,
          clearable: true,
          "stack-label": true,
          filled: false,
        },
        {
          name: "time",
          id: "g1_time",
          fieldType: "timepicker",
          label: "Time",
          hint: "Inform the time...",
          format24h: true,
          dense: false,
          clearable: true,
          "stack-label": true,
          filled: false,
        },
        {
          name: "date",
          id: "g1_date",
          fieldType: "inputdate",
          label: "Date",
          placeholder: "Date...",
          dateMask: "DD/MM/YYYY",
          mask: "##/##/####",
          hint: "Inform the date...",
          titleFormat: "ddd., DD [de] MMM.",
          dense: true,
          clearable: true,
        },
        {
          name: "time2",
          id: "g1_time2",
          fieldType: "inputtime",
          label: "Time",
          placeholder: "Time...",
          timeMask: "HH:mm:ss",
          mask: "##:##:##",
          hint: "Inform the time...",
          format24h: true,
          withSeconds: true,
          dense: true,
          clearable: true,
        },
        {
          name: "date_time",
          id: "g1_date_time",
          fieldType: "inputdatetime",
          label: "Date/Time",
          placeholder: "Date/Time...",
          dateMask: "DD/MM/YYYY HH:mm:ss",
          mask: "##/##/#### ##:##:##",
          hint: "Inform the date and time...",
          dateTitleFormat: "ddd., DD [de] MMM.",
          format24h: true,
          withSeconds: true,
          dense: true,
          clearable: true,
        },
        {
          name: "options",
          id: "g1_options",
          fieldType: "select",
          label: "Options",
          hint: "Inform the option...",
          dense: true,
          clearable: true,
          transitionShow: "flip-up",
          transitionHide: "flip-down",
          options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
        },
        {
          name: "word",
          id: "g1_word",
          fieldType: "editor",
          label: "Editor",
          hint: "Spills the beans...",
          clearable: true,
          "stack-label": true,
          "min-height": "5rem",
        },
        {
          name: "range",
          id: "g1_range",
          fieldType: "range",
          outerLabel: "Range",
          hint: "Inform the range...",
          clearable: true,
          "stack-label": true,
          min: 0,
          max: 50,
          label: true,
        },
        {
          name: "track",
          id: "g1_track",
          fieldType: "slider",
          outerLabel: "Track",
          hint: "Drag...",
          clearable: true,
          "stack-label": true,
          min: 0,
          max: 50,
          step: 5,
          label: true,
        },
        {
          name: "evaluate",
          id: "g1_evaluate",
          fieldType: "rating",
          label: "Rating",
          hint: "Do the evaluation...",
          clearable: true,
          "stack-label": true,
          max: 5,
          size: "2em",
          color: "primary",
        },
        {
          name: "open_close",
          id: "g1_open_close",
          fieldType: "toggle",
          "outer-label": "Open?",
          label: "Open",
          hint: "Open or closed report...",
          dense: false,
          clearable: true,
          "stack-label": true,
          filled: false,
          color: "primary",
          "true-value": "on",
          "false-value": "off",
        },
        {
          name: "files",
          id: "g1_files",
          fieldType: "uploader",
          "outer-label": "Send files",
          label: "Select the files",
          hint: "Select the files...",
          dense: false,
          clearable: true,
          multiple: true,
          "stack-label": true,
        },
      ],
    },
    {
      name: "Group 2",
      label: "Group 2",
      icon: "alarm",

      flat: true,
      "expand-separator": true,
    },
    {
      name: "Group 3",
      label: "Group 3",
      icon: "movie",

      flat: true,
      "expand-separator": true,
    },
  ],
};
```

## The component structure

ToDo...

## Running the example from this tutorial

### Installation

```bash
# Clone tutorial repository
$ git clone https://github.com/maceto2016/VueDataDrivenUI

# access the project folder through the terminal
$ cd VueDataDrivenUI

# Install dependencies
$ npm install
```

### Running the application (from NestJSDynLoad folder)

```bash
# Run the Quasar/Vue application
$ yarn quasar dev
```

### Testing the application

Enter the following URL in your preferred browser

**_http://localhost:8080_**

## Conclusion
