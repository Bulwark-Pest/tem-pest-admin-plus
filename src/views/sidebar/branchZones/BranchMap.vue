<script setup>
import ContentPanel from "@/components/atoms/ContentPanel.vue";
</script>

<template>
    <ContentPanel>
      <template #open-space>
        <slot></slot>
      </template>
    </ContentPanel>
</template>