/**
 * A mixin object that mantain a dictionary de components
 */

export default {
  data() {
    return {
      componentMap: {},
    };
  },
  methods: {
    initComponentsMap() {
      this.componentMap = {
        // Group components
        card: () => import("./Card01"),
        tabs: () => import("./Tabs01"),
        tab: () => import("./Tab01"),
        tabpanel: () => import("./TabPanel01"),
        expansion: () => import("./Expansion01"),

        // Form component
        form: () => import("./Form01"),

        // Field components
        inputtext: () => import("./Input01"),
        inputdate: () => import("./DateInput01"),
        inputtime: () => import("./TimeInput01"),
        inputdatetime: () => import("./DateTimeInput01"),
        select: () => import("./Select01"),
        checkbox: () => import("./CheckBox01"),
        radio: () => import("./Radio01"),
        toggle: () => import("./Toggle01"),
        btntoggle: () => import("./ButtonToggle01"),
        optgroup: () => import("./OptionGroup01"),
        range: () => import("./Range01"),
        slider: () => import("./Slider01"),
        datepicker: () => import("./DatePicker01"),
        timepicker: () => import("./TimePicker01"),
        rating: () => import("./Rating01"),
        uploader: () => import("./Uploader01"),
        editor: () => import("./Editor01"),

        // Other
        icon: () => import("./Icon01"),
      };
    },
  },
};
