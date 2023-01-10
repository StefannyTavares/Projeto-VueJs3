<template>
    <div class="notificacoes">
        <article class="message is-success">
            <div class="class message-header">Atenção</div>
            <div class="message-body"></div>
        </article>
        <article class="message is-warning">
            <div class="class message-header">Atenção</div>
            <div class="message-body"></div>
        </article>
        <article class="message is-danger">
            <div class="class message-header">Atenção</div>
            <div class="message-body"></div>
        </article>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "CompNotificacoes",
});
</script>

<style scoped>
.notificacoes {
    position: absolute;
    right: 0;
    width: 300px;
    padding: 8px;
    z-index: 105;
}
</style>