<template>
  <div id="person">
    <Person/>
  </div>
</template>

<script>
  import Person from "@/components/Person.vue";
  export default {
    name: 'PersonView',
    components: {
        Person,
    }
  }
</script>
