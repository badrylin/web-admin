<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SvgIcon extends Vue {
  @Prop({ required: true }) name!: string;
  @Prop({ default: '' }) className!: string;

  get iconName() {
    return `#icon-${this.name}`;
  }
  get svgClass() {
    if (this.className) {
      return 'svg-icon ' + this.className;
    } else {
      return 'svg-icon';
    }
  }
}
</script>
<style lang="less" scoped>
.svg-icon{
  height: 1em;
  width: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
