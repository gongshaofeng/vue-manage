<template>
    <div>
        <h1>这是中转站</h1>
    </div>
</template>
<script>
export default {
    data(){
        this.$router.replace({
            path: '/table',
            // name: 'basetable'
        })
        return {

        }
    }
}
</script>

