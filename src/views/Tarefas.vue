<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="semTarefas">
            Você não está muito produtivo hoje
            <span class="has-text-weight-bold">:(</span>
        </Box>
        <div class="field">
            <p class="control has-icons-left">
                <input
                    class="input"
                    type="text"
                    placeholder="Digite para filtrar"
                    v-model="filtro"
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Tarefa
            v-for="(tarefa, index) in tarefas"
            :tarefa="tarefa"
            :key="index"
            @aoTarefaClicada="selecionarTarefa"
        />
        <modal-comp :mostrar="tarefaSelecionado != null">
            <header class="modal-card-head">
                <p class="modal-card-title">Editando tarefa</p>
                <button
                    @click="fecharModal"
                    class="delete"
                    aria-label="close"
                ></button>
            </header>
            <section class="modal-card-body">
                <div class="field">
                    <label for="descricaoDaTarefa" class="label">
                        Descrição
                    </label>
                    <input
                        type="text"
                        class="input"
                        v-model="tarefaSelecionado.descricao"
                        id="descricaoDaTarefa"
                    />
                </div>
            </section>
            <footer class="modal-card-foot">
                <button @click="alterarTarefa" class="button is-success">
                    Salvando Tarefa
                </button>
                <button @click="fecharModal" class="button">Cancelar</button>
            </footer>
        </modal-comp>
    </div>
</template>

<script lang="ts">
import ModalComp from "@/components/ModalComp.vue";
import ITarefa from "@/interfaces/ITarefa";
import { useStore } from "@/store";
import {
    ALTERAR_TAREFA,
    CADASTRAR_TAREFA,
    OBTER_PROJETOS,
    OBTER_TAREFAS,
} from "@/store/tipos-acoes";
import { computed, defineComponent, ref, watchEffect } from "vue";
import Box from "../components/Box.vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";

export default defineComponent({
    name: "App",
    components: {
        Formulario,
        Tarefa,
        Box,
        ModalComp,
    },
    data() {
        return {
            tarefaSelecionado: null as ITarefa | null,
        };
    },
    methods: {
        salvarTarefa(tarefa: ITarefa): void {
            this.store.dispatch(CADASTRAR_TAREFA, tarefa);
        },
        selecionarTarefa(tarefa: ITarefa) {
            this.tarefaSelecionado = tarefa;
        },
        fecharModal() {
            this.tarefaSelecionado = null;
        },
        alterarTarefa() {
            this.store
                .dispatch(ALTERAR_TAREFA, this.tarefaSelecionado)
                .then(() => this.fecharModal());
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

        const filtro = ref("");
        /*const tarefas = computed(() =>
            store.state.tarefas.filter(
                (t) => !filtro.value || t.descricao.includes(filtro.value)
            )
        );*/

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value);
        });

        return {
            tarefas: computed(() => store.state.tarefas),
            store,
            filtro,
        };
    },
});
</script>
