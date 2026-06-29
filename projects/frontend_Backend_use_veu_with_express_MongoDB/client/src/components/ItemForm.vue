<template>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="form.title"
      placeholder="Item title"
      required
      maxlength="100"
    />
    <textarea
      v-model="form.description"
      placeholder="Description (optional)"
      rows="2"
      maxlength="500"
    ></textarea>
    <button type="submit" class="btn-primary">
      {{ editing ? 'Update' : 'Add' }} Item
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({ item: Object });
const emit = defineEmits(['submit']);

const form = ref({ title: '', description: '' });
const editing = ref(false);

watch(
  () => props.item,
  (val) => {
    if (val) {
      form.value = { title: val.title, description: val.description || '' };
      editing.value = true;
    }
  }
);

const handleSubmit = () => {
  emit('submit', { ...form.value });
  form.value = { title: '', description: '' };
  editing.value = false;
};
</script>

<style scoped>
.btn-primary {
  background: #2563eb;
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
}
</style>
