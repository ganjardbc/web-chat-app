<template>
    <div id="App">
        <div class="app-background-chat">
            <div 
				v-for="(item, index) in messages" 
				:key="index">
                <!-- left -->
				<div v-if="!isMyMessage(item)">
					<div class="card-message c-m-left">
						<div class="c-m-col-1">
							<div 
								class="image image-45px image-circle"
								:style="{
									'background-image': 'url('+item.foto+')'
								}">
									<i v-if="!item.foto" class="icn icn-big fa fa-lw fa-user"></i>
								</div>
						</div>
						<div class="c-m-col-2">								
							<div class="c-m-content">
								<div class="c-m-top">
									<div class="c-m-name">
										{{ item.fromName }}
									</div>
									<div class="c-m-date">
										{{ item.date | moment("from", "now") }}
									</div>
								</div>
								<div class="c-m-mid">
									{{ item.body }}
								</div>
								<div class="c-m-mid" style="padding-top: 0; display: flex; justify-content: flex-end;">
									<button class="btn btn-grey2-color btn-icon btn-circle" @click="likeThisChat(item)">
										<i class="fa fa-lw fa-thumbs-up"></i>
									</button>
								</div>
							</div>

						</div>
					</div>
				</div>

                <!-- right -->
				<div v-else>
					<div class="card-message c-m-right">								
						<div class="c-m-content">
							<div class="c-m-top">
								<div class="c-m-name">
									{{ sessionUser.name }} (You)
								</div>
								<div class="c-m-date">
									{{ item.date | moment("from", "now") }}
								</div>
							</div>
							<div class="c-m-mid">
								{{ item.body }}
							</div>
						</div>
					</div>
				</div>
            </div>
        </div>

        <div class="app-chat">
			<form v-on:submit.prevent="addMessage()">
				<div v-if="isThereSessionUser" class="a-c-form">
					<input 
						type="text" 
						class="txt txt-main-color" 
						placeholder="Write message..."
						v-model="txtChat"
						required>
					<button 
						type="submit"
						class="btn btn-post-color btn-circle"
                        :disabled="!txtChat">
						<i class="fa fa-lg fa-paper-plane"></i>
					</button>
				</div>
			</form>
		</div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import { v4 as uuidv4 } from 'uuid'

export default {
    name: 'App',
	mounted () {},
    data () {
        return {
            txtChat: '',
        }
    },
	computed: {
		...mapState({
			formMessage: (state) => state.channel.formMessage,
			messages: (state) => state.channel.messages,
            sessionChannel: (state) => state.channel.sessionChannel,
			sessionUser: (state) => state.channel.sessionUser,
        }),
		isThereSessionUser () {
			return this.sessionUser
		},
	},
    methods: {
		...mapActions({
			setData: 'channel/setData',
			setDataMessage: 'channel/setDataMessage',
		}),
		isMyMessage (item) {
			let status = false 
			if (this.sessionUser) {
				if (item.from === this.sessionUser.id) {
					status = true
				}
			}
			return status
		},
		likeThisChat (item) {
			const payload = {
				id: item.from,
				message: `${this.sessionUser.name} reacted to your message "${item.body}"`,
			}
			this.$socket.emit('notification', payload)
			this.$message('Your reacted to this message !')
		},
        addMessage () {
			const payload = {
				...this.formMessage,
				id: uuidv4(),
				from: this.sessionUser.id,
				fromName: this.sessionUser.name,
				to: this.sessionChannel.id,
				toName: this.sessionChannel.name,
				foto: this.sessionChannel.foto,
				date: new Date(),
				body: this.txtChat,
			}
			this.$socket.emit('addMessage', payload)
			this.txtChat = ''
        },
    },
	sockets: {
        messageList (data) {
			this.setDataMessage(data)
        },
		channelList (data) { 
			this.setData(data)
        },
	}
}
</script>