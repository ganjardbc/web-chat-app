<template>
    <div id="App">
		<EmptyListChannel v-if="channels.length === 0" />
        <div v-for="(item, index) in channels" :key="index">
			<div 
                :class="`card-chat ${isChannelSelected(item) && 'active'} ${item.status}`"
                style="cursor: pointer;"
				@click="selectChannel(item)">
				<div class="c-c-col-1">
					<div 
						class="image image-50px image-circle" 
						:style="{
							'background-image': 'url('+item.foto+')'
						}">
						<i v-if="!item.foto" class="icn icn-big fa fa-lw fa-comments"></i>
					</div>
				</div>
				<div class="c-c-col-2">
					<div class="c-c-mid">
						<div class="c-c-info">
							<div class="txt-site txt-11 txt-bold txt-main">
								{{ item.name }}
							</div>
							<div v-if="getFirstMessage(item)">
								<div class="txt-site txt-10 txt-main txt-overflow-ellipsis">
									{{ getFirstMessage(item).fromName }} - {{ getFirstMessage(item).body }}
								</div>
								<div class="txt-site txt-9 txt-sekunder">
									{{ getFirstMessage(item).date | moment('from', 'now') }}
								</div>
							</div>
						</div>
						<div v-if="item.message.length" class="c-c-status">
							<div class="ttl">{{ item.message.length }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import EmptyListChannel from './EmptyListChannel'

export default {
    name: 'App',
	components: {
		EmptyListChannel
	},
	computed: {
		...mapState({
			channels: (state) => state.channel.channels,
			messages: (state) => state.channel.messages,
			sessionUser: (state) => state.channel.sessionUser,
			sessionChannel: (state) => state.channel.sessionChannel
		})
	},
	methods: {
		...mapActions({
			setData: 'channel/setData',
			setDataMessage: 'channel/setDataMessage',
			setSessionChannel: 'channel/setSessionChannel'
		}),
		selectChannel (value) {
			this.setSessionChannel(value)
			this.messageList(value.id)
			this.channelList()
		},
		isChannelSelected (value) {
			return this.sessionChannel && this.sessionChannel.id === value.id
		},
		getFirstMessage (value) {
			const message = value && value.message && value.message[0]
			return message
		},
		messageList (data) {
			this.$socket.emit('messageList', data)
		},
		channelList () {
            this.$socket.emit('channelList')
        }
	},
	sockets: {
		messageList (data) {
			this.setDataMessage(data)
        },
		channelList (data) { 
			this.setData(data)
        }
	}
}
</script>