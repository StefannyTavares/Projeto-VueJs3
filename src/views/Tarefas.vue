<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="semTarefas">
            Você não está muito produtivo hoje
            <span class="has-text-weight-bold">:(</span>
        </Box>
        <Tarefa
            v-for="(tarefa, index) in tarefas"
            :tarefa="tarefa"
            :key="index"
        />
        <div class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Modal title</p>
                    <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <!-- Content ... -->
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success">Save changes</button>
                    <button class="button">Cancel</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import { useStore } from "@/store";
import {
    CADASTRAR_TAREFA,
    OBTER_PROJETOS,
    OBTER_TAREFAS,
} from "@/store/tipos-acoes";
import ITarefa from "@/interfaces/ITarefa";

export default defineComponent({
    name: "App",
    components: {
        Formulario,
        Tarefa,
        Box,
    },
    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa);
        },
    },
    computed: {
        semTarefas(): boolean {
            return this.tarefas.length == 0;
        },
    },
    setup() {
        const store = useStore();
        store.dispatch(OBTER_TAREFAS);
        store.dispatch(OBTER_PROJETOS);
        return {
            tarefas: computed(() => store.state.tarefas),
            store,
        };
    },
});
</script>
