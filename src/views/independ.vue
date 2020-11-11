    <input type="text" v-model="param.title">
    <input type="text" v-model="param.content">
    <input type="file" @change="getFile($event,'file_avatar')">
    <input type="file" @change="getFile($event,'file_thumb')">

    <button @click="submitForm($event)">OK</button>
</div>

<script>
new Vue({
    el: '#app',
    data: {
        param: {
            title: info.title,
            content: info.content,
            file_avatar: '',
            file_thumb: '',
        },
        formData: new FormData(),

    },
    mounted: function () {

    },
    methods: {
        getFile(event, input_file_name) {
            this.formData.append(input_file_name, event.target.files[0]);
        },
        submitForm(event) {
            event.preventDefault();
            for (let i in this.param) {
                this.formData.append(i, this.param[i]);
            }
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };
            this.$http.post('/url', this.formData, config).then(function (res) {
                if (res.status === 200) {
                    console.log(res);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },

});
</script>
