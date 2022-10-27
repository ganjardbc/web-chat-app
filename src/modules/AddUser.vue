<template>
    <div id="App">
        <div v-if="!isThereSessionUser">
			<button 
                class="btn btn-main-color btn-width-all" 
                @click="openPopup">
				<i class="fa fa-lw fa-plus"></i> Add New User
			</button>
		</div>

        <div v-if="visiblePopup" class="card-popup">
            <div class="card-popup-position">
                <el-card class="width width-400px">
                    <div class="card-popup-header">
                        <span>Add New User</span>
                        <button 
                            class="btn btn-icon btn-circle btn-grey2-color"
                            @click="openPopup">
                            <i class="fa fa-lg fa-times"></i>
                        </button>
                    </div>
                    <div class="card-popup-content">
                        <el-form ref="form" :model="formUser">
                            <el-form-item label="Name">
                                <el-input v-model="formUser.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Url Foto">
                                <el-input v-model="formUser.foto"></el-input>
                            </el-form-item>
                        </el-form>
                        <button 
                            class="btn btn-main-color btn-width-all"
                            @click="addUser">
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
            formUser: (state) => state.channel.formUser,
            sessionUser: (state) => state.channel.sessionUser,
        }),
        isThereSessionUser () {
            return this.sessionUser
		},
    },
    methods: {
        ...mapActions({
            setDataUser: 'channel/setDataUser',
            setSessionUser: 'channel/setSessionUser',
            resetFormUser: 'channel/resetFormUser'
        }),
        openPopup () {
            this.visiblePopup = !this.visiblePopup
        },
        addUser () {
            let payload = {
                ...this.formUser,
                id: this.$socket.id,
                status: 'read',
            }
            this.$socket.emit('addUser', payload)
            this.setSessionUser(payload)
            this.resetFormUser()
            this.visiblePopup = false
        },
    },
    sockets: {
        userList (data) { 
			this.setDataUser(data)
        }
    }
}
</script>