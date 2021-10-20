<template>
    <component
        :is="tagName"
        v-bind="componentAttrs"
        class="icon"
        :width="iconWidth"
        :height="iconHeight"
        @click="clickHandler"
    >
        <use v-if="!gradient" :xlink:href="iconUrl" />
    </component>
</template>

<script>
    import { computed } from 'vue'
	export default {
		name: 'v-icon',
        emits: ['click'],
		props: {
			name: { type: String, required: true },
            dir: { type: String,  default: 'common'},
            gradient: { type: Boolean, default: false }
		},
        setup(props, { emit }) {
			const icon = computed(() => require(`@icons/sprite/${props.dir}/${props.name}.svg`).default)
			const iconUrl = computed(() => icon.value.url)
			const iconWidth = computed(() => icon.value.viewBox.split(' ')[2])
			const iconHeight = computed(() => icon.value.viewBox.split(' ')[3])

	        const tagName = computed(() => props.gradient ? 'img' : 'svg')
	        const componentAttrs = computed(() => props.gradient ? {'src': iconUrl} : {'xmlns': "http://www.w3.org/2000/svg"})

			const clickHandler = () => emit('click')

            return {
	        	tagName, componentAttrs,
	            iconUrl, iconWidth, iconHeight,
				clickHandler
            }
        }
	};
</script>

<style lang="scss" scoped>
    .icon {
        display: inline-block;
        fill: currentColor;
    }
</style>
