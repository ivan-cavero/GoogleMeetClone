<template>
    <el-button type="primary">
      <font-awesome-icon :icon="'fa-user'" style="padding-right: 0.5rem;" />
      Login
    </el-button>
    <el-button class="desktop">Join a meeting</el-button>
    <el-button class="desktop">Start a meeting</el-button>
    <el-dropdown class="mobile">
      <el-button type="primary" style="margin-left: 0.5rem;">
        Meeting
        <font-awesome-icon :icon="'fa-caret-down'" style="padding-left: 0.5rem;" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Join a meeting</el-dropdown-item>
          <el-dropdown-item>Start a meeting</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
</template>

<script>
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

export default {
  name: 'AppHeaderRightNotAuthenticated',
  components: {
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem
  }
}
</script>

<style scoped>
.desktop {
  display: inline-block;
}

.mobile {
  display: none;
}
@media screen and (max-width: 640px) {

.desktop {
  display: none;
}
.mobile {
  display: inline-block;
}
}
</style>
