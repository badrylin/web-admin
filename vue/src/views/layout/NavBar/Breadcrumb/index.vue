<template>
  <el-breadcrumb separator="/">
    <transition-group name="breadcrumb">
      <template v-for="(item, index) in levelList">
        <el-breadcrumb-item
          v-if="item.meta.title && item.meta.breadcrumb !== false"
          :key="item.path"
        >
          <span v-if="index==levelList.length-1" class="no-redirect">
            {{item.meta.title}}
          </span>
          <a v-else @click="hanleLink(item)">{{item.meta.title}}</a>
        </el-breadcrumb-item>
      </template>
    </transition-group>
  </el-breadcrumb>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import PathToRegexp from 'path-to-regexp';
import { RouteRecord } from 'vue-router';

@Component
export default class Breadcrumb extends Vue {
  levelList: RouteRecord[] = [];

  @Watch('$route')
  onRouteChange() {
    this.getBreadcrumb();
  }
  created() {
   this.getBreadcrumb();
  }
  getBreadcrumb() {
    let matched: any[] = this.$route.matched.filter((item) => !!item.name);
    if (matched[0] && matched[0].name !== 'Home') {
      matched = [{ path: '/', meta: { title: 'Home' }} as RouteRecord].concat(matched);
    }
    this.levelList = matched;
  }
  pathCompile(path: string): string {
    const { params } = this.$route;
    const toPath = PathToRegexp.compile(path);
    return toPath(params);
  }
  hanleLink(item: any) {
    const { redirect, path } = item;
    if (redirect) {
      this.$router.push(redirect);
    } else {
      this.$router.push(this.pathCompile(path));
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>

