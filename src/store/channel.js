const defaultPayloadUser = () => {
    return {
        id: '',
        name : '',
        foto : '',
    }
}

const defaultPayloadChannel = () => {
    return {
        id: '',
        name : '',
        status : '',
        foto : '',
        message : [],
    }
}

const defaultPayloadMessage = () => {
    return {
        id: '',
        name: '',
        foto: '',
        date: '',
        type: '',
        body: ''
    }
}

export default {
    namespaced: true,

    state: {
        formUser: defaultPayloadUser(),
        formChannel: defaultPayloadChannel(),
        formMessage: defaultPayloadMessage(),
        sessionUser: null,
        sessionChannel: null,
        channels: [],
        messages: [],
        users: [],
    },

    getters: {},

    mutations: {},

    actions: {
        resetFormUser ({ commit, state }) {
            state.formUser = defaultPayloadUser()
        },
        resetFormChannel ({ commit, state }) {
            state.formChannel = defaultPayloadChannel()
        },
        resetFormMessage ({ commit, state }) {
            state.formMessage = defaultPayloadMessage()
        },
        resetData ({ commit, state }) {
            state.channels = []
            state.messages = []
            state.sessionChannel = null
        },
        setSessionUser ({ commit, state }, data) {
            state.sessionUser = data
        },
        setData ({ commit, state }, data) {
            state.channels = data
        },
        setDataMessage ({ commit, state }, data) {
            state.messages = data
        },
        setDataUser ({ commit, state }, data) {
            state.users = data
        },
        setSessionChannel ({ commit, state }, data) {
            state.sessionChannel = data
        },
    }
}
