<template>
  <div class="auth-form">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" class="btn-primary">Login</button>
    </form>
    <p class="link">
      Don't have an account? <router-link to="/register">Register</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.js';

const auth = useAuthStore();
const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  try {
    error.value = '';
    await auth.login(email.value, password.value);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed';
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 3rem auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.auth-form h2 {
  margin-bottom: 1rem;
}

.btn-primary {
  background: #2563eb;
  color: white;
}

.error {
  color: #ef4444;
  font-size: 0.85rem;
}

.link {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}
</style>
