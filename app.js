const vm = new Vue({
    el:'#app',
    data(){
        return{
            produtos:[],//variavel que vai armazenar os dados sobre o produto
        }
    },
    methods: {
        fetchProdutos(){
            fetch('./api/produtos.json')//fazemos a requisição a api atraves da url
            .then(resposta => resposta.json())//transformaos a resposta em um JSON
            .then(resposta => {
                this.produtos = resposta//inserimos o valor da requisição em uma variavel pre definida
            })
        }
    },
    created() {
        //asim que a plicação for iniciada, o created ira chamar o methodo que faz a requisição a api
        this.fetchProdutos()//o metodo é chamado
    },
    filters:{
        //filtro criado para a validação do preco dos produtos
        numeropreco(valor){
          //o valor passado como paraemtro é o dado que esta no html e que vai usar o filtro
          //ex:
          //{{produyo.preco}} = valor
          //ou
          //{{produto.marca}} = valor

          return valor.toLocaleString('pt-BR',{style:"currency", currency: 'BRL'})
        }
    },

})
    
