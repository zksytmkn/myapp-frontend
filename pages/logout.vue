<script>
export default {
  async middleware ({ $auth, redirect }) {
    await $auth.logout()
    return redirect('/')
  }
}
</script>
