<template>
  <div v-if="(!item.meta || !item.meta.hidden) && item.children" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item.children) && !onlyOneChild.children && (!item.meta || !item.meta.alwaysShow)">
      <AppLink :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown': !isNest}">
          <MenuItem v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </AppLink>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)">
      <template slot="title">
        <MenuItem v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title"/>
      </template>

      <template v-for="child in item.children">
        <template v-if="!child.meta.hidden">
          <sub-menu
            class="nest-menu"
            v-if="child.children && child.children.length > 0"
            :key="child.path"
            :item="child"
            :base-path="resolvePath(child.path)"
            :is-nest="false"
          />
          <AppLink v-else :to="resolvePath(child.path)" :key="child.name">
            <el-menu-item :index="resolvePath(child.path)">
              <MenuItem v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
            </el-menu-item>
          </AppLink>
        </template>
      </template>
    </el-submenu>
  </div>
</template>
<script lang="ts">
import path from 'path';
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Route } from 'vue-router';
import MenuItem from '@/views/layout/Sidebar/MenuItem.vue';
import AppLink from '@/views/layout/Sidebar/AppLink.vue';
import { isExternal } from '@/utils/validate';

@Component({
  components: {
    MenuItem,
    AppLink,
  },
})
export default class SubMenu extends Vue {
  @Prop({ required: true }) item!: Route;
  @Prop({ default: false }) isNest!: boolean;
  @Prop({ default: '' }) basePath!: string;

  onlyOneChild: Route | null = null;

  // 筛选只有一个children的路由
  hasOneShowingChild(children: Route[]) {
    if (!children) { return false; }
    const showingChild = children.filter((item: Route) => {
      if (item.meta && item.meta.hidden) {
        return false;
      } else {
        this.onlyOneChild = item;
        return true;
      }
    });
    return showingChild.length === 1;
  }
  resolvePath(routePath: string): string {
    if (isExternal(routePath)) {
      return routePath;
    }
    return path.resolve(this.basePath, routePath);
  }
}
</script>
