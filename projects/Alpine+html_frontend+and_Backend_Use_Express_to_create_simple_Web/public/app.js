function app() {
  return {
    items: [],
    newItemName: '',
    loading: false,
    error: '',
    editingId: null,
    editName: '',

    async init() {
      await this.fetchItems();
    },

    async fetchItems() {
      this.loading = true;
      this.error = '';
      try {
        const res = await fetch('/api/items');
        if (!res.ok) throw new Error('Failed to fetch items');
        this.items = await res.json();
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },

    async addItem() {
      if (!this.newItemName.trim()) return;
      this.error = '';
      try {
        const res = await fetch('/api/items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.newItemName }),
        });
        if (!res.ok) throw new Error('Failed to add item');
        const item = await res.json();
        this.items.push(item);
        this.newItemName = '';
      } catch (e) {
        this.error = e.message;
      }
    },

    async toggleItem(item) {
      this.error = '';
      try {
        const res = await fetch(`/api/items/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: !item.completed }),
        });
        if (!res.ok) throw new Error('Failed to update item');
        const updated = await res.json();
        const idx = this.items.findIndex(i => i.id === item.id);
        if (idx !== -1) this.items[idx] = updated;
      } catch (e) {
        this.error = e.message;
      }
    },

    async deleteItem(id) {
      this.error = '';
      try {
        const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete item');
        this.items = this.items.filter(i => i.id !== id);
      } catch (e) {
        this.error = e.message;
      }
    },

    startEdit(item) {
      this.editingId = item.id;
      this.editName = item.name;
    },

    async saveEdit(item) {
      if (this.editingId !== item.id) return;
      if (!this.editName.trim()) {
        this.cancelEdit();
        return;
      }
      this.error = '';
      try {
        const res = await fetch(`/api/items/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: this.editName }),
        });
        if (!res.ok) throw new Error('Failed to update item');
        const updated = await res.json();
        const idx = this.items.findIndex(i => i.id === item.id);
        if (idx !== -1) this.items[idx] = updated;
      } catch (e) {
        this.error = e.message;
      }
      this.editingId = null;
      this.editName = '';
    },

    cancelEdit() {
      this.editingId = null;
      this.editName = '';
    },
  };
}
