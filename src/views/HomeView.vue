<template>
  <el-container class="tw-container tw-mx-auto tw-px-4">
    <el-main class="tw-mx-auto tw-max-w-screen-xl">
      <el-input :prefix-icon="SearchIcon" placeholder="搜索" size="large">
        <template #prepend>
          <el-select
            v-model="iconCategory"
            class="tw-w-32"
            clearable
            placeholder="类别"
            size="large"
          >
            <el-option
              v-for="item in iconData.summary?.moduleCn ?? []"
              :key="item.module"
              :label="item.module"
              :value="item.module"
            />
          </el-select>
        </template>
      </el-input>

      <div class="tw-flex tw-flex-wrap tw-gap-y-2 tw-my-4">
        <el-button
          v-for="item in iconData.summary?.styleCn ?? []"
          :key="item"
          :type="iconStyle === item ? 'primary' : undefined"
          round
          @click="iconStyle = iconStyle === item ? undefined : item"
        >
          {{ item }}
        </el-button>
      </div>

      <div class="tw-grid tw-grid-cols-4 tw-justify-items-center">
        <div v-for="item in iconData.icons" :key="item.id" class="">
          <img
            :alt="item.nameCn"
            :src="`data:image/svg+xml;base64,${Base64.encode(item.svgCode)}`"
            height="40"
            width="40"
          />
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, shallowRef } from 'vue';
import { Search as SearchIcon } from '@element-plus/icons-vue';
import { Base64 } from 'js-base64';

const iconData = shallowRef({});
const iconCategory = ref();
const iconStyle = ref();

window.network.fetchIconData().then((data) => (iconData.value = data));
</script>
