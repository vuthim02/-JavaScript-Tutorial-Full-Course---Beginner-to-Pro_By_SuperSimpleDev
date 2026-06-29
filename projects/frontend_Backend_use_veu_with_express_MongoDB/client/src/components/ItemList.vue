<template>
  <div v-if="items.length === 0" class="empty">No items yet.</div>
  <div v-for="item in items" :key="item._id" class="item-card">
    <div class="item-content">
      <h3 :class="{ done: item.completed }">{{ item.title }}</h3>
      <p v-if="item.description">{{ item.description }}</p>
      <small>{{ new Date(item.createdAt).toLocaleDateString() }}</small>
    </div>
    <div class="item-actions">
      <button @click="$emit('toggle', item)" class="btn-toggle">
        {{ item.completed ? 'Undo' : 'Done' }}
      </button>
      <button @click="$emit('edit', item)" class="btn-edit">Edit</button>
      <button @click="$emit('delete', item._id)" class="btn-delete">Del</button>
    </div>
  </div>
</template>

<script setup>
defineProps({ items: Array });
defineEmits(['toggle', 'edit', 'delete']);
</script>

<style scoped>
.empty {
  text-align: center;
  color: #999;
  padding: 2rem;
}

.item-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.item-content h3 {
  margin-bottom: 0.25rem;
}

.done {
  text-decoration: line-through;
  color: #999;
}

.item-content p {
  color: #666;
  font-size: 0.85rem;
}

.item-content small {
  color: #999;
  font-size: 0.75rem;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-toggle {
  background: #10b981;
  color: white;
}

.btn-edit {
  background: #f59e0b;
  color: white;
}

.btn-delete {
  background: #ef4444;
  color: white;
}
</style>
