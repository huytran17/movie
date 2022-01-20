import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      info: 'test/info'
    })
  },
  methods: {
    ...mapActions({
      GET_INFO: 'test/GET_INFO'
    }),

    ...mapMutations({
      SET_INFO: 'test/SET_INFO'
    })
  }
}
