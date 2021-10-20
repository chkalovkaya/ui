<style src="./breadcrumbs.scss" lang="scss" scoped></style>

<template>
    <div class="breadcrumbs">
        <ul class="breadcrumbs__content">
            <li v-for="(crumb, i) in breadcrumbs" class="breadcrumbs__item">
                <v-icon v-if="i !== 0" class="breadcrumbs__arrow" name="arrow-right-small" />
                <span v-if="i === breadcrumbs.length - 1" class="breadcrumbs__current">{{ crumb.title }}</span>
                <a v-else :href="crumb.link" class="breadcrumbs__link link m-grey">{{ crumb.title }}</a>
            </li>
        </ul>
    </div>
</template>

<script>

	export default {
		name: "breadcrumbs",
        props: {
			breadcrumbs: {
				type: Array,
                required: true
            }
        }
	}
</script>