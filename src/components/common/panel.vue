<template>
    <div class="panel-container">
        <slot name="body"></slot>
    </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
 .panel-container {
     border-top: 3px solid #3c8dbc;
     width: 100%;
     background-color: #fff;
     border-radius: 3px;
 }
</style>
