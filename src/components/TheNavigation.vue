<template>
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/protected-page" class="protected">Protected Page</router-link> |
        <button
            v-if="showAuthButton && !isAuthenticated"
            @click="login"
        >
            Log In
        </button> |

        <button
            v-if="isAuthenticated"
            class="btn btn-bp-auth"
            @click="logout"
        >
            Log out
        </button>
    </nav>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'TheNavigation',
  computed: {
    ...mapState([
      'isAuthenticated',
      'showAuthButton'
    ])
  },
  methods: {
    ...mapMutations([
      'updateAuthenticationStatus'
    ]),
    async login () {
      try {
        await this.$auth0.loginWithPopup()
        this.updateAuthenticationStatus({ isAuthenticated: this.$auth0.isAuthenticated.value })
        await this.$router.push({ name: 'protected-page' })
      } catch (error) {
        console.log(error.message)
      }
    },
    logout () {
      this.$auth0.logout({ returnTo: window.location.origin })
    }
  }
}
</script>
