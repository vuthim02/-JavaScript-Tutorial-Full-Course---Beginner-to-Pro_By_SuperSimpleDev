<template>
  <nav class="navbar">
    <div class="nav-inner">
      <router-link to="/" class="logo">Fullstack App</router-link>
      <div v-if="auth.isAuthenticated" class="nav-right">
        <span>{{ auth.user?.name }}</span>
        <button @click="handleLogout" class="btn-logout">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.js';

const auth = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};
</script>

<style scoped>
.navbar {
  background: #2563eb;
  color: white;
  padding: 1rem;
}

.nav-inner {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.btn-logout {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.btn-logout:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
