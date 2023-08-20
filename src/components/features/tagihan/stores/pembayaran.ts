import { acceptHMRUpdate, defineStore } from 'pinia'
import { getPembayaranRequest, createPembayaranRequest } from '../apis/pembayaran'
import { TPembayaran, TPembayaranForm } from '../types/pembayaran.interface'

import { detectOS } from '~/utils/detect'

export const usePembayaranStore = defineStore('pembayaran', {
    state: () => ({
        data: [] as TPembayaran[],
        responseStatus: false,
        error: ''
    }),
    actions: {
        async getPembayaran() {
            const { data } = await getPembayaranRequest()

            if(data.status){
                this.data = data.result
            }
        },
        async createPemabyaran(params: TPembayaranForm) {

            const OS = detectOS()

            try {
                const { data } = await createPembayaranRequest(params)

                this.$router.push({
                    path: OS == "Win" ? '/pembayaran/invoice' : 'pembayaran/invoice',
                    query: {
                      url: data.result.checkout_url
                    }
                })

            } catch (err: any) {
                const { response } = err

                this.error = response.data.message

                setTimeout(() => {
                    this.error = ''
                }, 2000)
            }
        },
    }
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(usePembayaranStore, import.meta.hot))
