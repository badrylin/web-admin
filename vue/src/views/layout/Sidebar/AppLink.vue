<template>
  <a v-if="isExternalLink()" :href="to" target="_blank" rel="noopener">
    <slot/>
  </a>
  <router-link v-else :to="to">
    <slot/>
  </router-link>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { isExternal } from '@/utils/validate.ts';

@Component
export default class AppLink extends Vue {
  @Prop({ required: true }) to!: string;
  isExternalLink() {
    return isExternal(this.to);
  }
}
</script>
