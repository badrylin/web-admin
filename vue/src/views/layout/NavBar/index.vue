<template>
  <div class="navbar" mode="horizontal">
    <Hamburger
      class="hamburger-container"
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
    />
    <Breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="avatar" alt="" class="user-avatar">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>Home</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Hamburger from './Hamburger/index.vue';
import Breadcrumb from './Breadcrumb/index.vue';
import { AppModule } from '@/store/modules/app';
import { UserModule } from '@/store/modules/user';

@Component({
  components: { Hamburger, Breadcrumb },
})
export default class NavBar extends Vue {
  get sidebar() {
    return AppModule.sidebar;
  }
  get avatar() {
    return UserModule.avatar;
  }
  toggleSideBar() {
    AppModule.ToggleSideBar(false);
  }
  logout() {
    UserModule.Logout().then(() => {
      window.location.reload();
    });
  }
}
</script>

<style lang="less">
.navbar {
  height: 50px;
  line-height: 50px;
  border-bottom: solid 1px #e6e6e6;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      line-height: initial;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
