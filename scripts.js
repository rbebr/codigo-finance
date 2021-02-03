const Modal = 
{
	open(){
		//Adicionar modal
		//Adicionar a class Active aoodal
		document.querySelector('modal-overlay')
		.classlist
		.add('active')
	},
	close(){
		//fechar o modal
		//remover o class Active do modal
		document.querySelector('modal-overlay')
		.classlist
		.remove('active')
	}
}	

/*
const transactions = 
[
    {
	//id: 1,
	description: 'Luz',
	amount: -50000,
	date: '23/01/2021', //Colocar já as casas decimais para depois formatar
	}, 
	{
	//id: 2,
	description: 'Website',
	amount: 50000,
	date: '23/01/2021', //Colocar já as casas decimais para depois formatar
	},
	{
	//id: 3,
	description: 'Internet',
	amount: -20000,
	date: '23/01/2021', //Colocar já as casas decimais para depois formatar
    },
]
*/
		
const storage = 
{
	get() {
		return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
	},
	set() {
		localStorage.setItem("dev.finances:transactions",JSON.stringify(
		transactions))
	},
}

const Transaction = {
    all: Storage.get(), //transactions,
	
	add(transaction){
		Transaction.all.push(transaction)
		App.reload()
	},
	incomes(){
	    let income = 0; 
		//pegar todas as transações
		//Para cada transação 
		transaction.all.forEach(transaction => {})
		//se for maior que zero
		if(transaction.amount > 0 ) {
			//somar a uma variável e retornar
			income += transaction.amount;
		}
		
		return income;
	},
	expenses(){
		let expense = 0; 
		//pegar todas as transações
		//Para cada transação 
		transaction.all.forEach(transaction => {})
		//se for menor que zero
		if(transaction.amount < 0 ) {
			//somar a uma variável e retornar
			expense += transaction.amount;
		}
		
		return expense;
	},
	total(){
		return transaction.incomes() + transaction.expenses ();
	}, 
	remove(index){
		transaction.all.splice(index, 1) //Espera a posição do array, posso deletar a partir do elemento index
		App.reload()
	},
}

// Substituir os dados do HTML com os dados do JS
// objeto aqui no javascript
// e colocar lá no html
// ou Substituir os dados do HTML com os dados do JS
	
const DOM = 
{

    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction,index){
		const tr = document.createElement('tr')
		tr.innerHtml = DOM.innerHTMLTransaction(transaction, index)
		tr.dataset.index = index
    	DOM.transactionsContainer.appendchild(tr)
    	//console.log(tr.innerHTML)
	},
    innerHTMLTransaction(transaction, index)
    {
	    const CSSClass = transaction.amount > 0 ? "income" : "expense"
		
		const amount = Utils.formatCurrency(transaction.amount)
		
        const html = 
            `
			<td class="description">${transaction.description}</td>
			<td class="${CSSclass}">${amount}</td>
			<td class="date">${transaction.date}</td>
			<td>
				<img onclick= src="Transaction.remove(${index})"./assets/minus.svg" alt="Remover transação">
			</td>
	        `		
        return html
    },
		
	updateBalance(){
		document.getElementById('incomeDisplay')
		.innerHTML = Utils.formatCurrency(transaction.incomes())
	    document.getElementById('expenseDisplay')
		.innerHTML = Utils.formatCurrency(transaction.expenses())
		document.getElementById('totalDisplay')
		.innerHTML = Utils.formatCurrency(transaction.total())
	},
	clearTransactions(){
		DOM.TransactionsContainer.innerHTML = ""
    },
	
},


const Utils = {
	formatAmount(value){
	    //value = Number(value.replace(/\,\./g "")) * 100,
		value = Number(value) * 100
	},
	formatDate(date){
		const splittedDate = date.split("-")
		return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
	},
	formatCurrency(value){
		const signal = Number(value) < 0 ? "-" :""
		value = String(value).replace(/\D/g,"")
		value = Number(value) /100
		value = value.tolocaleString("pt-BR",{
			style:"currency",
			currency:"BRL"
		})
		return signal + value
		//value = String(value).replace("0","Discover))
		//console.log.
	}
}

const Form = 
{
	description: document.querySelector('input#description'),
	amount: document.querySelector('input#amount'),
	date: document.querySelector('input#date'),
	
	getValues()
	{
		return{
			description: Form.description.value,
			amount: Form.amount.value,
			date: Form.date.value,
		}
	},
	validateFields()
	{
		/* Desestrutura (tirar de do getValues) */
		const { description, amount, date} = Form.getValues()
		
		//console.log('validar os campos')
		if(
		description.trim() === ""  || // Trim(Verificar se o campo esta vazio) 
		amount.trim() === "" ||
        date.trim() === "")
        {
			throw new Error("Por favor, preencha todos os campos") //Capturar
		}
	},
	formatvalues(){
		let { description, amount, date} = Form.getValues()	
		amount = Utils.formatAmount(amount)
		date = Utils.formatDate(date)
		return{
			description,
			amount,
			date
		}
		
	},
	clearFields(){
		Form.description.value=""
		Form.amount.value=""
		Form.date.value=""
	},

    /*
	saveTransaction(transaction){
	Transaction.add(transaction)
	}
	*/
	submit(event){	
		event.preventDefault() //Interrompe o comportamento Padrão(envia formulário com vários parâmetros )

		try{
			
			//verificar se todas as informações foram preenchidas
			Form.validateFields()
			
			//formatar os dados para salvar
			const transaction = Form.formatValues()
						
			//salvar
			//Form.saveTransaction(transaction)
			Transaction.add(transaction)
			
			//Apagar o dados do formulário
			Form.clearFields()
			
			//Fechar modal
			Modal.close()
			
			//Atualizar a aplicação
			//App.reload()

        } catch (error){	
			alert(error.message)
		}
	}
}

//Storage.set("Valor")
//Storage.get()

const App = {
	init(){
	    Transaction.all.ForEach(DOM.addTransaction) 
     	//transactions.all.forEach((transaction,index) => {
	    //DOM.addTransaction(transaction, index)
		Dom.updateBalance() //Atualizando os cartões
		Storage.set(Transaction.all)
	},
	reload(){
	    DOM.clearTransactions()
		App.init()
	}
}

App.init();

//transaction.remove(0)

/*
transaction.add({
	//id :39, 
	description: 'Alo',
	amount:200,
	date:'23/01/2021'
})
*/
