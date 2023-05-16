<script>
export default {
  async middleware ({ $auth, redirect, store }) {
    try {
      await $auth.logout()
      store.commit('setLogoutSuccess', true);
      return redirect('/')
    } catch (error) {
      // ログアウト失敗のトーストメッセージを表示
      store.dispatch('getToast', { msg: 'ログアウトできませんでした', color: 'error' });
    }
  }
}
</script>
