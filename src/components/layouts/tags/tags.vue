
<template>
    <div class="tags">
        <template v-for="tag in tags">
            <a v-if="!sort" :href="`/search/?q=${tag}`" class="tag">{{ tag }}</a>
            <div v-else-if="sort" class="tag" @click="tagClick(tag)">{{ tag.text }}</div>
        </template>
    </div>
</template>

<script>
export default {
    name: "tags",
    emits: ['on-tag'],
    props: {
        tags: Array,
        sort: Boolean
    },
    setup(props, {emit}) {
        const tagClick = (tag) => emit('on-tag', tag)
        return { tagClick }
    }
}
</script>

<style lang="scss" scoped>
    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .tag {
        color: $text-black;
        background: $el-bg-grey;
        white-space: nowrap;
        border-radius: 5px;
        transition: background $transition-speed-normal;
        cursor: pointer;
        padding: 5px 10px;

        &:hover {
            background: $el-bg-hover;
        }
    }
</style>