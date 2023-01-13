const projeto = {
    id: 1,
    descricao: "Projeto vue3"
}

const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave, receptor){
        console.log(`Alguém pediu a chave ${chave}`)
        return Reflect.get(objetoOriginal, chave,receptor)
    },
    set(objetoOriginal, chave, valor){
        console.log(`Alguém alterou a chave ${chave} para o valor ${valor}`)
        objetoOriginal[chave] = valor 
    }
})

proxy.descricao = "Reatividade é massa"

console.log(projeto.descricao)