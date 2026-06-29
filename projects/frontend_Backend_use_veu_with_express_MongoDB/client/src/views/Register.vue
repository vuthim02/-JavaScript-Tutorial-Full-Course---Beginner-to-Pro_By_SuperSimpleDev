<template>
  <div class="auth-form">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="name" placeholder="Name" required maxlength="50" />
      <input v-model="email" type="email" placeholder="Email" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password (6+ chars)"
        required
        minlength="6"
      />
      <p v-if="error" class="error">{{ error }}</p>
      <button type="submit" class="btn-primary">Register</button>
    </form>
    <p class="link">
      Already have an account? <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth.js';

const auth = useAuthStore();
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

const handleRegister = async () => {
  try {
    error.value = '';
    await auth.register(name.value, email.value, password.value);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed';
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
