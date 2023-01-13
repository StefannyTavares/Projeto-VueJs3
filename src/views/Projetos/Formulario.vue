<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input
                    type="text"
                    class="input"
                    v-model="nomeDoProjeto"
                    id="nomeDoProjet"
                />
            </div>
            <div class="field">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, ref } from "vue";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from "@/store/tipos-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "Formulario",
    props: {
        id: {
            type: String,
        },
    },
    /*mounted() {
        if (this.id) {
            const projeto = this.store.state.projeto.projetos.find(
                (proj) => proj.id == this.id
            );
            this.nomeDoProjeto = projeto?.nome || "";
        }
    },
    data() {
        return {
            nomeDoProjeto: "",
        };
    },*/

    setup(props) {
        const router = useRouter()
        const store = useStore();
        const { notificar } = useNotificador();

        const nomeDoProjeto = ref("")
        if (props.id) {
            const projeto = store.state.projeto.projetos.find(
                (proj) => proj.id == props.id
            );
            nomeDoProjeto.value = projeto?.nome || "";
        }

        const lidarComSucesso = () => {
            nomeDoProjeto.value = "";
            notificar(
                TipoNotificacao.SUCESSO,
                "Excelente",
                "O projeto está salvo"
            );
            router.push("/projetos");
        }

        const salvar = () => {
            if (props.id) {
                store
                    .dispatch(ALTERAR_PROJETO, {
                        id: props.id,
                        nome: nomeDoProjeto.value,
                    })
                    .then(() => lidarComSucesso());
            } else {
                store
                    .dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => lidarComSucesso());
            }
        }

        return {
            nomeDoProjeto,
            salvar
        };
    },
});
</script>

function CADASTRAR_PROJETO(CADASTRAR_PROJETO: any, nomeDoProjeto: string) {
    throw new Error("Function not implemented.");
}

function CADASTRAR_PROJETO(CADASTRAR_PROJETO: any, nomeDoProjeto: string) {
    throw new Error("Function not implemented.");
}
