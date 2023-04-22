<template>
  <div class="unauthenticated-home-page">
    <div class="login-form">
      <h2>Login</h2>
      <p>Email:</p>
      <el-input v-model="email" placeholder="Email" />
      <p>Password:</p>
      <el-input v-model="password" placeholder="Password" type="password" />
      <el-button type="primary" @click="signInWithEmail">Login</el-button>
    </div>

    <div class="external-providers">
      <h2>Or login with:</h2>
      <el-button @click="signInWithProvider('google')">
        <font-awesome-icon :icon="['fab', 'google']" />
        Google
      </el-button>
      <el-button @click="signInWithProvider('github')">
        <font-awesome-icon :icon="['fab', 'github']" />
        GitHub
      </el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'
import { auth } from '#/firebase'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
} from 'firebase/auth'

export default {
  setup () {
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const authStore = useAuthStore()

    const signInWithEmail = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        authStore.setUser(userCredential.user)
        router.push({ name: 'authenticated' })
      } catch (error) {
        console.error('Error logging in:', error)
      }
    }

    const signInWithProvider = async (providerName) => {
      try {
        let provider
        if (providerName === 'google') {
          provider = new GoogleAuthProvider()
        } else if (providerName === 'github') {
          provider = new GithubAuthProvider()
        } else {
          throw new Error('Unsupported provider')
        }

        const userCredential = await signInWithPopup(auth, provider)
        authStore.setUser(userCredential.user)
        router.push({ name: 'authenticated' })
      } catch (error) {
        console.error(`Error logging in with ${providerName}:`, error)
      }
    }

    return {
      email,
      password,
      signInWithEmail,
      signInWithProvider
    }
  }
}
</script>
