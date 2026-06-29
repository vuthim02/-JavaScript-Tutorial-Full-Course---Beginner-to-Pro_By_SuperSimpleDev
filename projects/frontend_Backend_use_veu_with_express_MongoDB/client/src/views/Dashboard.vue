<template>
  <div>
    <h2>My Items</h2>
    <ItemForm @submit="handleCreate" :item="editingItem" />
    <ItemList
      :items="items"
      @toggle="handleToggle"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../utils/api.js';
import ItemForm from '../components/ItemForm.vue';
import ItemList from '../components/ItemList.vue';

const items = ref([]);
const editingItem = ref(null);

const fetchItems = async () => {
  const { data } = await api.get('/items');
  items.value = data.items;
};

const handleCreate = async (form) => {
  if (editingItem.value) {
    const { data } = await api.put(`/items/${editingItem.value._id}`, form);
    const idx = items.value.findIndex((i) => i._id === data._id);
    if (idx !== -1) items.value[idx] = data;
    editingItem.value = null;
  } else {
    const { data } = await api.post('/items', form);
    items.value.unshift(data);
  }
};

const handleToggle = async (item) => {
  const { data } = await api.put(`/items/${item._id}`, {
    completed: !item.completed,
  });
  const idx = items.value.findIndex((i) => i._id === data._id);
  if (idx !== -1) items.value[idx] = data;
};

const handleEdit = (item) => {
  editingItem.value = item;
};

const handleDelete = async (id) => {
  await api.delete(`/items/${id}`);
  items.value = items.value.filter((i) => i._id !== id);
};

onMounted(fetchItems);
</script>
