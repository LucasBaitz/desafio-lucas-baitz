class CaixaDaLanchonete {
    cardapio = {
        "cafe": {
          "item": "Café",
          "descricao": "Café",
          "preco": 3.00
        },
        "chantily": {
          "item": "Chantily",
          "descricao": "Chantily (extra do Café)",
          "preco": 1.50
        },
        "suco": {
          "item": "Suco",
          "descricao": "Suco Natural",
          "preco": 6.20
        },
        "sanduiche": {
          "item": "Sanduíche",
          "descricao": "Sanduíche",
          "preco": 6.50
        },
        "queijo": {
          "item": "Queijo",
          "descricao": "Queijo (extra do Sanduíche)",
          "preco": 2.00
        },
        "salgado": {
          "item": "Salgado",
          "descricao": "Salgado",
          "preco": 7.25
        },
        "combo1": {
          "item": "Combo 1",
          "descricao": "1 Suco e 1 Sanduíche",
          "preco": 9.50
        },
        "combo2": {
          "item": "Combo 2",
          "descricao": "1 Café e 1 Sanduíche",
          "preco": 7.50
        }
    }

      itensExtras = {
        "chantily": "cafe",
        "queijo": "sanduiche"
    }

      meiosDeCompra = ['credito', 'debito', 'dinheiro'];

      calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        const novosItens = this.receberInputs(itens);
        if (this.quantidadeInvalida(novosItens)) {
            return "Quantidade inválida!";
        }
        if (this.codigoInvalido(novosItens)) {
            return "Item inválido!";
        }
        if (!this.meiosDeCompra.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }
        if(this.itemExtraInvalido(novosItens)) {
            return "Item extra não pode ser pedido sem o principal";
        }


        let valor = 0;

        novosItens.forEach(item => {
            valor += this.cardapio[item.nome].preco * item.quantidade;
        });

        if (metodoDePagamento === "credito" || metodoDePagamento === "dinheiro") {
            valor = metodoDePagamento === 'credito' ? valor = valor *= 1.03 : valor = valor *= 0.95;
        }

        return `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }

    receberInputs(itens) {
        const novosItens = [];

        itens.forEach(item => {
            const [nome, quantidade] = item.split(',');
            novosItens.push({ nome, quantidade });
        });

        return novosItens;
    }

    quantidadeInvalida(novosItens) {
        const itensInvalidos = novosItens.filter(item => item.quantidade === "0");
        return itensInvalidos.length > 0;
    }

    codigoInvalido(novosItens) {
        for (let item of novosItens) {
            if(!this.cardapio.hasOwnProperty(item.nome)) {
                return true;
            }
        }
        return false;
    }

    itemExtraInvalido(novosItens) {
        for (let item of novosItens) {
            if (this.itensExtras[item.nome] && !novosItens.some(it => it.nome === this.itensExtras[item.nome])) {
                return true;
            }
        }
        return false;
    }
}

export { CaixaDaLanchonete };
