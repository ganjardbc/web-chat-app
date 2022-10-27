<template>
    <div id="App">
        <div v-if="isThereSessionUser" class="app-add-person">
			<button 
                class="btn btn-main-color btn-width-all" 
                @click="openPopup">
				<i class="fa fa-lw fa-plus"></i> Add New Channel
			</button>
		</div>

        <div v-if="visiblePopup" class="card-popup">
            <div class="card-popup-position">
                <el-card class="width width-400px">
                    <div class="card-popup-header">
                        <span>Add New Channel</span>
                        <button 
                            class="btn btn-icon btn-circle btn-grey2-color"
                            @click="openPopup">
                            <i class="fa fa-lg fa-times"></i>
                        </button>
                    </div>
                    <div class="card-popup-content">
                        <el-form ref="form" :model="formChannel">
                            <el-form-item label="Name">
                                <el-input v-model="formChannel.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Url Foto">
                                <el-input v-model="formChannel.foto"></el-input>
                            </el-form-item>
                        </el-form>
                        <button 
                            class="btn btn-main-color btn-width-all"
                            @click="addChannel">
                            <i class="fa fa-lw fa-plus"></i> Submit
                        </button>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'App',
    data () {
        return {
            visiblePopup: false,
        }
    },
    mounted () {},
    computed: {
        ...mapState({
            formChannel: (state) => state.channel.formChannel,
            sessionUser: (state) => state.channel.sessionUser,
        }),
        isThereSessionUser () {
            return this.sessionUser
		},
    },
    methods: {
        ...mapActions({
            setData: 'channel/setData',
            resetFormChannel: 'channel/resetFormChannel'
        }),
        openPopup () {
            this.visiblePopup = !this.visiblePopup
        },
        addChannel () {
            let payload = {
                ...this.formChannel,
                id: this.$socket.id,
                status: 'read',
            }
            this.$socket.emit('addChannel', payload)
            this.resetFormChannel()
            this.visiblePopup = false
        },
    },
    sockets: {
        channelList (data) { 
			this.setData(data)
        }
    }
}
</script>