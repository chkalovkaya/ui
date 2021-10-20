<style src="./button.scss" lang="scss" scoped></style>

<template>
    <button
        class="button"
        :class="[
            `m-${this.color}`,
            {'m-icon': circle, 'm-disabled': disabled},
        ]"
        :type="type"
        @click="clickHandler"
    >
        <v-icon v-if="icon && !loading" :name="icon" class="button__icon" />
        <span v-if="$slots.default && !loading && !circle" class="button__text"><slot></slot></span>
        <Loading v-if="loading" />
    </button>
</template>

<script>
    import Loading from '@layouts/loading'

	export default {
		name: "v-button",
        components: { Loading },
        emits: ['click'],
        props: {
			color: {type: String, default: 'm-blue-dark'},
			icon: String,
			type: {type: String, default: 'button'},
            loading: Boolean,
            circle: Boolean,
	        disabled: Boolean,
        },
        setup(props, {emit}) {
			const clickHandler = () => emit('click')
			return { clickHandler }
        }
	}
</script>