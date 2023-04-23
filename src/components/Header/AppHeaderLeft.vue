<template>
    <div class="app-header-left">
      <img src="../../assets/logo.png" alt="Google Meet" />
      <span>Meet</span>
    </div>
</template>

<script>
export default {
  name: 'AppHeaderLeft'
}
</script>

<style scoped>
.app-header-left {
  display: flex;
  align-items: center;
}
.app-header-left img {
  height: 2.3rem;
  margin-right: 0.2rem;
  top: -1.5px;
}
.app-header-left span {
  font-size: 20px;
  vertical-align: middle;
  color: #5f6368;
  font-weight: 300;
  cursor: default;
}
.app-header-left span:hover {
  text-decoration: underline;
}
@media screen and (max-width: 640px) {
  .app-header-left span {
    display: none;
  }
}
</style>
