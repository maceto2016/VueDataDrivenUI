<template>
  <form-generator :schema="schema" />
</template>

<script>
import FormGenerator from "../components/FormGenerator";
import jsonSchema from "../data/schema.js";

export default {
  components: { FormGenerator },
  data() {
    return {
      schema: {},
    };
  },
  created() {
    this.schema = jsonSchema;
  },
};
</script>
