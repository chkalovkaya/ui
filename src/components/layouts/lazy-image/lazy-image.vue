
<template>
    <img
        ref="root"
        :src="srcImage"
        :srcset="srcsetImage || null"
        class="image"
        :class="{'m-load': loaded}"
    />
</template>

<script>
    import { ref, reactive, computed, onMounted, onBeforeUnmount } from "vue";

    export default {
    	name: 'lazy-image',
        emits: ['load', 'error', 'intersect'],
        props: {
            src: { type: String, required: true },
            srcset: String,
            intersectionOptions: {
                type: Object,
                default: () => ({rootMargin: '200px 200px 200px 200px'})
            }
        },
        setup(props, { emit }) {
            const root = ref(null);
            const state = reactive({ observer: null, intersected: false, loaded: false });

            const srcImage = computed(() => state.intersected ? props.src : '');
            const srcsetImage = computed(() => (state.intersected && props.srcset ? props.srcset : false));

            const load = () => {
                if (root.value.getAttribute("src")) {
                    state.loaded = true;
                    emit("load");
                }
            };
            const error = () => emit("error", root.value);

            onMounted(() => {
	            state.observer = new IntersectionObserver((entries) => {
		            const image = entries[0];
		            if (image.isIntersecting) {
			            state.intersected = true;
			            state.observer.disconnect();
			            emit("intersect");
		            }
	            }, props.intersectionOptions);

	            state.observer.observe(root.value);
            });
            onBeforeUnmount(() => state.observer.disconnect());

            return {
            	root, srcImage, srcsetImage, load, error, loaded: state.loaded
            }
        }
    };
</script>