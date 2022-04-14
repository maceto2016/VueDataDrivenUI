<template>
  <!--
        Dynamic wrapper `form` component
        `fixedSchema` is the ajusted version of property `schema`
      -->
  <component v-if="fixedSchema" :is="componentMap['form']" ref="form">
    <!-- 
          Only shows information about the data input by the user
        -->
    <div>{{ getEventInfo + " - " + JSON.stringify(formData) }}</div>

    <!--
        ==================  
        Groups with fields
        ==================
        -->
    <div v-if="fixedSchema.groups && fixedSchema.groups.length > 0">
      <!--
          ==========
          TAB Model
          ==========
          -->
      <!--
            Dynamic `tab` component
          -->
      <component
        v-if="fixedSchema.groupModel == 'tab'"
        :is="componentMap['tabs']"
        v-model="selectedGroup"
        dense
      >
        <!--
              Dynamic `tab itens` components  
            -->
        <component
          v-for="(group, index) in fixedSchema.groups"
          :is="componentMap['tab']"
          :key="index"
          v-bind="group"
        >
        </component>
      </component>

      <q-separator />

      <!--
            Dynamic `tabpanel` component
          -->
      <component
        v-for="(group, index) in fixedSchema.groups"
        :is="componentMap['tabpanel']"
        :key="index"
        :selected="selectedGroup"
        v-bind="group"
      >
        <div v-if="group.fields && group.fields.length > 0">
          <!--
                And finally all UI field controls:
                - Compoenent type specified by `componentMap[field.fieldType]`
                - Data contents linked to `formData[field.name]` by `v-model`
                - All `field` properties linked by `v-bind`
              -->
          <component
            v-for="(field, index) in validFieldComps(group.fields)"
            :key="index"
            :is="componentMap[field.fieldType]"
            v-model="formData[field.name]"
            v-bind="field"
            v-show="!field.hidden"
          >
          </component>
        </div>
      </component>
    </div>
  </component>
</template>

<script>
import Vue from "vue";
import { date as dateUtils } from "quasar";
import componentMap from "./_componentMap01";
import isPlainObject from "is-plain-object";
import cloneDeep from "clone-deep";

function isValidDate(val, mask, dateLocale) {
  const d = dateUtils.__splitDate(val, mask, dateLocale);
  return d.month >= 1 && d.month <= 12 && d.day >= 1 && d.day <= 31;
}

function hasMask(mask, submask, val) {
  return mask.indexOf(submask) < 0 || val != null;
}

function isValidTime(val, mask, dateLocale) {
  const d = dateUtils.__splitDate(val, mask, dateLocale, null, true);
  console.log(JSON.stringify(d) + "-" + val + "-" + mask);
  return (
    (hasMask(mask, "H", val) || hasMask(mask, "h", val)) &&
    d.hour >= 0 &&
    d.hour <= 59 &&
    hasMask(mask, "m", val) &&
    d.minute !== null &&
    d.minute >= 0 &&
    d.minute <= 59 &&
    hasMask(mask, "s", val) &&
    d.second >= 0 &&
    d.second <= 59 &&
    hasMask(mask, "S", val) &&
    d.millisecond >= 0 &&
    d.millisecond <= 999
  );
}

function isValidDateTime(val, mask, dateLocale) {
  const d = dateUtils.__splitDate(val, mask, dateLocale, null, true);
  return (
    d.month >= 1 &&
    d.month <= 12 &&
    d.day >= 1 &&
    d.day <= 31 &&
    (hasMask(mask, "H", val) || hasMask(mask, "h", val)) &&
    d.hour >= 0 &&
    d.hour <= 59 &&
    hasMask(mask, "m", val) &&
    d.minute !== null &&
    d.minute >= 0 &&
    d.minute <= 59 &&
    hasMask(mask, "s", val) &&
    d.second >= 0 &&
    d.second <= 59 &&
    hasMask(mask, "S", val) &&
    d.millisecond >= 0 &&
    d.millisecond <= 999
  );
}

export default {
  name: "FormGenerator",

  mixins: [componentMap],

  provide() {
    return {
      // The event bus to comunicate with components
      eventBus: this.eventBus,
    };
  },
  props: {
    // The schema placeholder property
    schema: {
      type: Object,
    },
  },
  data() {
    return {
      // The event bus instance
      eventBus: new Vue(),

      // Input event info to display
      eventInfo: {
        name: null,
        sender: null,
        info: null,
      },

      // Current group page
      selectedGroup: null,
      // Ajusted component schema
      fixedSchema: null,
      // Form data with input field contents
      formData: {},
    };
  },
  computed: {
    // Reactive input event info
    getEventInfo() {
      if (this.eventInfo.name) {
        return (
          `${this.eventInfo.name} - ${this.eventInfo.sender.$$attrs.id} - ${this.eventInfo.info}` +
          (this.eventInfo.sender.$$attrs.fieldType === "inputdate"
            ? " => " + this.eventInfo.sender.isoValue
            : "")
        );
      } else {
        return "<none>";
      }
    },
  },
  watch: {
    schema: {
      immediate: true,
      deep: true,
      handler(n, o) {
        if (n) {
          this.$nextTick(() => {
            this.fixedSchema = this.fixSchema(n);
          });
        }
      },
    },
  },
  methods: {
    validFieldComps(fields) {
      return fields.filter((field) => field.fieldType !== undefined);
    },
    async validate() {
      return this.$refs.form.validate();
    },
    findField(fieldName) {
      let res = null;
      if (this.fixedSchema.groups) {
        for (let i = 0; i < this.fixedSchema.groups.length; i++) {
          let group = this.fixedSchema.groups[i];
          if (group.fields) {
            res = group.fields.find((field) => {
              return field.name === fieldName;
            });
          }
          if (res) {
            break;
          }
        }
      }
      if (!res && this.fixedSchema.fields) {
        res = this.fixedSchema.fields.find((field) => {
          return field.name === fieldName;
        });
      }
      return res;
    },
    findFieldById(fieldId, schema) {
      schema = schema || this.fixedSchema;
      let res = null;
      if (schema.groups) {
        for (let i = 0; i < schema.groups.length; i++) {
          let group = schema.groups[i];
          if (group.fields) {
            res = group.fields.find((field) => {
              return field.id === fieldId;
            });
          }
          if (res) {
            break;
          }
        }
      }
      if (!res && schema.fields) {
        res = schema.fields.find((field) => {
          return field.id === fieldId;
        });
      }
      return res;
    },
    findDepField(fieldId, schema) {
      schema = schema || this.fixedSchema;
      let res = null;
      if (schema.groups) {
        for (let i = 0; i < schema.groups.length; i++) {
          let group = schema.groups[i];
          if (group.fields) {
            res = group.fields.find((field) => {
              return field.ref && field.ref.dep === fieldId;
            });
          }
          if (res) {
            break;
          }
        }
      }
      if (!res && schema.fields) {
        res = schema.fields.find((field) => {
          return field.ref && field.ref.dep === fieldId;
        });
      }
      return res;
    },
    clearField(fieldName) {
      let field = isPlainObject(fieldName)
        ? fieldName
        : this.findField(fieldName);
      if (field) {
        if (field.fieldType === "editor") {
          this.$set(this.formData, field.name, "");
        } else if (field.fieldType === "range") {
          this.$set(this.formData, field.name, { min: null, max: null });
        } else if (field.fieldType === "rating") {
          this.$set(this.formData, field.name, NaN);
        } else if (field.defValue !== undefined) {
          this.$set(this.formData, field.name, field.defValue);
        } else {
          this.$set(this.formData, field.name, null);
        }
        if (Array.isArray(field._childFields)) {
          field._childFields.forEach((child) => this.clearField(child));
        }
      }
    },
    reset() {
      for (let prop in this.formData) {
        if (this.formData.hasOwnProperty(prop)) {
          this.clearField(prop);
        }
      }
    },
    assign(data) {
      if (!data) {
        this.reset();
      } else if (isPlainObject(data)) {
        for (let prop in this.data) {
          if (data.hasOwnProperty(prop) && this.formData.hasOwnProperty(prop)) {
            this.formData[prop] = cloneDeep(data[prop]);
          }
        }
      }
    },
    fixSchema(schema) {
      let retSchema = cloneDeep(schema);
      let fnFixFormData = (fields) => {
        fields.forEach((field) => {
          if (this.formData[field.name] === undefined) {
            if (field.fieldType === "editor") {
              this.$set(this.formData, field.name, "");
            } else if (field.fieldType === "range") {
              this.$set(this.formData, field.name, { min: null, max: null });
            } else if (field.fieldType === "rating") {
              this.$set(this.formData, field.name, NaN);
            } else if (field.defValue !== undefined) {
              this.$set(this.formData, field.name, field.defValue);
            } else {
              this.$set(this.formData, field.name, null);
            }
          }
        });
        return fields.map((field) => {
          if (field.clearable) {
            if (field.fieldType === "range") {
              field["clear-value"] = {
                max: null,
                min: null,
              };
              field.clearable = false;
            } else if (field.fieldType === "rating") {
              field["clear-value"] = NaN;
              field.clearable = false;
            } else if (field.fieldType === "uploader") {
              field._clearable = true;
              field.clearable = false;
            } else if (
              field.fieldType === "editor" ||
              field.fieldType === "editorex"
            ) {
              field["clear-value"] = "";
              field.clearable = false;
            }
          }

          if (isPlainObject(field.ref)) {
            if (
              Array.isArray(field.ref.keyFields) &&
              field.ref.keyFields.length > 0
            ) {
              if (!field.ref.valueField) {
                field.ref.valueField =
                  field.ref.keyFields[field.ref.keyFields.length - 1];
              }
            }
            // Fix dependencies
            if (field.ref.dep && !this.findDepField(field.id, retSchema)) {
              let fldStack = [];
              let fnProccessDep = (fld) => {
                fldStack.forEach((f) => {
                  f._parentFields.unshift(fld);
                });
                if (fld.ref.dep) {
                  let fld2 = this.findFieldById(fld.ref.dep, retSchema);
                  if (fld2) {
                    if (!fld2._childFields) {
                      fld2._childFields = [];
                    }
                    fld2._childFields.push(fld);
                    if (!fld._parentFields) {
                      fld._parentFields = [];
                    }
                    fldStack.push(fld);
                    fnProccessDep(fld2);
                  }
                }
              };
              fnProccessDep(field);
            }
          }

          if (field.rules) {
            field.rules = field.rules.map((rule) => {
              let body = rule.exp ? `return (${rule.exp})` : rule.body;
              if (body) {
                return rule.params
                  ? new Function(...rule.params, body)
                  : new Function(body);
              } else {
                return rule;
              }
            });
          } else if (field.fieldType === "inputdate") {
            field.rules = [
              (val) => {
                return (
                  isValidDate(val, field.dateMask || "YYYY-MM-DD") ||
                  "Data inválida"
                );
              },
            ];
          } else if (field.fieldType === "inputtime") {
            field.rules = [
              (val) => {
                return (
                  isValidTime(val, field.timeMask || "HH:mm") ||
                  "Horário inválido"
                );
              },
            ];
          } else if (field.fieldType === "inputdatetime") {
            field.rules = [
              (val) => {
                return (
                  isValidDateTime(val, field.dateMask || "YYYY-MM-DD HH:mm") ||
                  "Data/Horário inválidos"
                );
              },
            ];
          }
          if (!field.mask) {
            if (field.fieldType === "inputdate") {
              field.mask = "##/##/####";
            } else if (field.fieldType === "inputime") {
              field.mask = "##:##";
            } else if (field.fieldType === "inputdatetime") {
              field.mask = "##/##/#### ##:##";
            }
          }
          if (!field.dateMask && field.fieldType === "inputdate") {
            field.dateMask = "DD/MM/YYYY";
          } else if (!field.timeMask && field.fieldType === "inputtime") {
            field.timeMask = "HH:mm";
          } else if (!field.dateMask && field.fieldType === "inputdatetime") {
            field.dateMask = "DD/MM/YYYY HH:mm";
          }
          return field;
        });
      };
      if (retSchema.groups) {
        retSchema.groups = retSchema.groups.map((group) => {
          if (group.fields) {
            group.fields = fnFixFormData(group.fields);
          }
          return group;
        });
      }
      if (retSchema.fields) {
        retSchema.fields = fnFixFormData(retSchema.fields);
      }
      return retSchema;
    },
  },
  created() {
    this.eventBus.$on("input", (sender, value) => {
      this.eventInfo.name = "input";
      this.eventInfo.sender = sender;
      this.eventInfo.info = value;
    });
  },
  mounted() {
    this.initComponentsMap();
    if (this.schema.groups.length) {
      this.selectedGroup = this.schema.groups[0].name;
    }
  },
};
</script>
