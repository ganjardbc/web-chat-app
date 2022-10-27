<template>
    <div id="app">
        <div class="app a-col">
            <div class="a-col-1">
                <div class="app-top no-border">
                    <div class="a-t-btn">
                        <center>
                            <div 
                                class="image image-35px image-circle" 
                                :style="{
                                    'background-image': `url(${isTherePersonFoto})`
                                }">
                                <i v-if="!isTherePersonFoto" class="icn icn-big fa fa-lw fa-user"></i>
                            </div>
                        </center>
                    </div>
                </div>
                <div class="app-content">
                    <router-link :to="{name: 'main'}">
                        <center>
                            <button class="btn btn-main-color btn-circle-small">
                                <i class="fa fa-lg fa-envelope"></i>
                            </button>
                            <span class="txt-site txt-white txt-8 txt-center">
                                Home
                            </span>
                        </center>
                    </router-link>
                </div>
            </div>

            <div class="a-col-2">
                <div class="app-top">
                    <div class="a-t-title">
                        Inbox
                    </div>
                </div>
                
                <div class="app-list-chat">
                    <SearchField @onSearch="onSearch" />
                    <AddChannel />
                    <ListChannel />
                </div>
            </div>

            <div class="a-col-3">
                <div class="app-top">
                    <div class="a-t-title">
                        <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;">
                            <div 
                                class="image image-35px image-circle" 
                                :style="{
                                    'background-image': `url(${isTherePersonFoto})`,
                                    'margin-right': '10px',
                                }">
                                <i v-if="!isTherePersonFoto" class="icn icn-big fa fa-lw fa-user"></i>
                            </div>
                            {{ sessionUser ? sessionUser.name : 'No User' }}
                        </div>
                        <div>
                            <AddUser />
                        </div>
                    </div>
                </div>

                <div>
                    <ContainerMessage v-if="sessionChannel" />
                    <EmptyMessage v-else />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import SearchField from '../modules/SerchField'
import AddChannel from '../modules/AddChannel'
import AddUser from '../modules/AddUser'
import ListChannel from '../modules/ListChannel'
import EmptyMessage from '../modules/EmptyMessage'
import ContainerMessage from '../modules/ContainerMessage'

export default {
    name: 'app',
    data () {
        return {}
    },
    mounted () {
        this.channelList()
    },
    components: {
        SearchField,
        AddUser,
        AddChannel,
        ListChannel,
        EmptyMessage,
        ContainerMessage,
    },
    computed: {
        ...mapState({
            sessionChannel: (state) => state.channel.sessionChannel,
            sessionUser: (state) => state.channel.sessionUser,
        }),
        isTherePersonFoto () {
            return this.sessionUser && this.sessionUser.foto
        }
    },
    methods: {
        ...mapActions({
			setData: 'channel/setData' 
		}),
        onSearch (value) {
            console.log('onSearch', value)
        },
        channelList () {
            this.$socket.emit('channelList')
        }
    },
    sockets: {
        connect () {
            this.isConnected = true 
            this.$message('Connected to Server !')
            this.channelList()
        },
        disconnect () {
            this.isConnected = false 
            this.$message.error('Disconnected from Server !')
        },
        channelList (data) { 
			this.setData(data)
        },
        notification (data) {
            this.$notify({
                title: 'Notification',
                message: data,
                duration: 0
            })
        }
    }
}
</script>