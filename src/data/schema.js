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
