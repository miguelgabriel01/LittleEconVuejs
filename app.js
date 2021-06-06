const vm = new Vue({
    el:'#app',
    data(){
        return{
            produtos:[],//variavel que vai armazenar os dados sobre o produto
            produto:false,//responsavel pela exibição do modal do produto
            //carrinhoTotal:0,//valor inicial do carrinho de compras
            carrinho:[],//neste item vão estar os produtos add ao carinho
            mensagemAlerta:'Item adicionado',
            alertaAtivo:false,//valor que sera usado para iniciar o alerta

            
        }
    },
    computed:{
        carrinhoTotal(){
        //responsavel por computar o valor total de itens add ao carrinho
        let total = 0
        if(this.carrinho.length){
            this.carrinho.forEach(item => {
                total += item.preco
            })
        }
        return total
        } 
    },
    methods: {
        fetchProdutos(){
            //responsavel por buscar todos os produtos 
            fetch('./api/produtos.json')//fazemos a requisição a api atraves da url
            .then(resposta => resposta.json())//transformaos a resposta em um JSON
            .then(resposta => {
                this.produtos = resposta//inserimos o valor da requisição em uma variavel pre definida
            })
        },
        fetchProduto(id){//esse fatch vai receber como parametro o id do produto
            //responsavel por buscar apenas um produto especifico pelo ID
            fetch(`./api/produtos/${id}/dados.json`)//fazemos uma requisição usando como parametro o id do produto
            .then(resposta => resposta.json())//transformamos a resposta em json
            .then(resposta => {
               this.produto = resposta//atribuimos a var produto(no singular) o valor da requisição
            })
        },
        fecharModal({ target, currentTarget }) {
            if (target === currentTarget) this.produto = false;
          },
          adicionarItem(){
              //responsavel p0or adicionar itens ao carrinho
              this.produto.estoque--//removemos o numero de itens disponivel
              const {id,nome,preco} = this.produto//desestruturamos em uma const as variaveis que queremos
              this.carrinho.push({id,nome,preco})//add a var carrinho os nomes do produto
              
              //aqui usamos o metodo de add uma msg ao alerta
              this.alerta(`${nome} adicionado ao carrinho`)//passamos como parametro para a função a msg

         },
          removerItem(index){//recebe como parametr o index do item add ao carrinho
              //responsavel por remover os itens do carrinho
              this.carrinho.splice(index,1)//apaga de acordo com o index informado
          },
          checarLocalStorage(){
              //metodo responsavel por verificar se existem dados salvos no localStorage
              if(window.localStorage.carrinho){
                  this.carrinho = JSON.parse(window.localStorage.carrinho)
                  //o JSON.parse transforma uma string em array
              }
          },
          alerta(mensagem){//recebe como parametro uma msg de acordo com a interação do usuario
              //responsavel por modificar a msg do alerta
              this.mensagemAlerta = mensagem//mensagem que é recebida como parametro
              this.alertaAtivo = true//modifica o valor do alerta

              //retirar o alerta da tela apos um certo tempo
              setTimeout(() => {
                  this.alertaAtivo = false
              },3000)
          }
    },
    watch:{
     carrinho(){//sempre a propiedade é a qual vc quer avaliar se aconteceu mudanças
      //responsavel por verificar se o carrinho aconteceu mudancas e salvar no nlocalStortage
      window.localStorage.carrinho = JSON.stringify(this.carrinho)//maneira mais facil de salvar no localStorage n exitse 
     //o JSON.stringtfy transforma um array em string
    }
    },
    created() {
        //asim que a plicação for iniciada, o created ira chamar o methodo que faz a requisição a api
        this.fetchProdutos()//o metodo é chamado

        //assim que o app for iniciado ele ira chamar a função que verifica se existem valores no localStorage
        this.checarLocalStorage()//o metodo é chamado
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
    
