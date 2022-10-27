<template>
    <div id="App">
        <div class="app-search">
			<form v-on:submit.prevent="onSearch">
				<div class="a-s-form">
					<button 
						type="submit"
						class="btn btn-sekunder-color btn-no-border">
						<i class="fa fa-lg fa-search"></i>
					</button>
					<input 
						type="search" 
						class="txt txt-main-color" 
						placeholder="Search Channel"
						v-model="txtSearch"
						required>
				</div>
			</form>
		</div>
    </div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            txtSearch: ''
        }
    },
    methods: {
        onSearch () {
            this.$emit('onSearch', this.txtSearch)
        }
    }
}
</script>