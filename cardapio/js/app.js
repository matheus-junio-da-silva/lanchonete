$(document).ready(function () {
    menu.eventos.init();
});
var menu = {};
var CARRINHO = [];
var ENDERECO = null;
var VALOR_CARRINHO = 0;
menu.eventos = {init: () => {
    menu.metodos.obterItensMenu();
}};
menu.metodos = {obterItensMenu: (categoria = "burgers", verMais = false) => {
    let itensCategoria = MENU[categoria];
    if (!verMais) {
      $("#itensMenu").html("");
      $("#btnVerMais").removeClass("hidden");
    }
    $.each(itensCategoria, (indice, item) => {
      let itemFormatado = menu.templates.item.replace(/\${imagem}/g, item.img).replace(/\${nome}/g, item.name).replace(/\${preco}/g, item.price.toFixed(2).replace(".", ",")).replace(/\${id}/g, item.id);
      console.log("vermais", verMais);
      console.log("i", indice);
      if (verMais && indice >= 8 && indice < 12) {
        $("#itensMenu").append(itemFormatado);
      }
      if (!verMais && indice < 8) {
        $("#itensMenu").append(itemFormatado);
      }
    });
    $(".container-menu a").removeClass("active");
    $("#menu-" + categoria).addClass("active");
}, verMais: () => {
    var categoriaAtiva = $(".container-menu a.active").attr("id").split("menu-")[1];
    console.log("ativo", categoriaAtiva);
    menu.metodos.obterItensMenu(categoriaAtiva, true);
    $("#btnVerMais").addClass("hidden");
}, clickItemMenu: idItem => {
    $("#itensMenu .card-item").removeClass("active");
    $("#" + idItem).addClass("active");
}, diminuirQuantidade: idItem => {
    let quantidade = parseInt($("#qntd-" + idItem).text());
    if (quantidade > 0) {
      $("#qntd-" + idItem).text(quantidade - 1);
    }
}, aumentarQuantidade: idItem => {
    let quantidade = parseInt($("#qntd-" + idItem).text());
    console.log(quantidade);
    $("#qntd-" + idItem).text(quantidade + 1);
}, adicionarAoCarrinho: idItem => {
    let quantidade = parseInt($("#qntd-" + idItem).text());
    if (quantidade > 0) {
      var categoriaAtiva = $(".container-menu a.active").attr("id").split("menu-")[1];
      let itensCategoria = MENU[categoriaAtiva];
      let itemSelecionado = $.grep(itensCategoria, (item, indice) => {
        return item.id == idItem;
      });
      if (itemSelecionado.length > 0) {
        let itemCarrinho = $.grep(CARRINHO, (item, indice) => {
          return item.id == idItem;
        });
        console.log("existe", itemCarrinho);
        if (itemCarrinho.length > 0) {
          let indiceItem = CARRINHO.findIndex(item => item.id == idItem);
          console.log("objIndex", indiceItem);
          CARRINHO[indiceItem].qntd = CARRINHO[indiceItem].qntd + quantidade;
        } else {
          itemSelecionado[0].qntd = quantidade;
          CARRINHO.push(itemSelecionado[0]);
        }
        menu.metodos.mensagem("Item adicionado ao carrinho", "green");
        $("#qntd-" + idItem).text(0);
        menu.metodos.atualizarBadgeTotal();
      }
    }
}, atualizarBadgeTotal: () => {
    var totalItens = 0;
    $.each(CARRINHO, (indice, item) => {
      totalItens += item.qntd;
    });
    if (totalItens > 0) {
      $(".botao-carrinho").removeClass("hidden");
      $(".container-total-carrinho").removeClass("hidden");
    } else {
      $(".botao-carrinho").addClass("hidden");
      $(".container-total-carrinho").addClass("hidden");
    }
    $(".badge-total-carrinho").html(totalItens);
  }, abrirCarrinho: abrir => {
    if (abrir) {
      $("#modalCarrinho").removeClass("hidden");
      menu.metodos.carregarCarrinho();
    } else {
      $("#modalCarrinho").addClass("hidden");
    }
  }, carregarEtapa: etapa => {
    if (etapa == 1) {
      $("#lblTituloEtapa").text("Seu carrinho:");
      $("#itensCarrinho").removeClass("hidden");
      $("#localEntrega").addClass("hidden");
      $("#resumoCarrinho").addClass("hidden");
      $(".etapa").removeClass("active");
      $(".etapa1").addClass("active");
      $("#btnEtapaPedido").removeClass("hidden");
      $("#btnEtapaEndereco").addClass("hidden");
      $("#btnEtapaResumo").addClass("hidden");
      $("#btnVoltar").addClass("hidden");
    }
    if (etapa == 2) {
      $("#lblTituloEtapa").text("Endereço de entrega:");
      $("#itensCarrinho").addClass("hidden");
      $("#localEntrega").removeClass("hidden");
      $("#resumoCarrinho").addClass("hidden");
      $(".etapa").removeClass("active");
      $(".etapa1").addClass("active");
      $(".etapa2").addClass("active");
      $("#btnEtapaPedido").addClass("hidden");
      $("#btnEtapaEndereco").removeClass("hidden");
      $("#btnEtapaResumo").addClass("hidden");
      $("#btnVoltar").removeClass("hidden");
    }
    if (etapa == 3) {
      $("#lblTituloEtapa").text("Resumo do pedido:");
      $("#itensCarrinho").addClass("hidden");
      $("#localEntrega").addClass("hidden");
      $("#resumoCarrinho").removeClass("hidden");
      $(".etapa").removeClass("active");
      $(".etapa1").addClass("active");
      $(".etapa2").addClass("active");
      $(".etapa3").addClass("active");
      $("#btnEtapaPedido").addClass("hidden");
      $("#btnEtapaEndereco").addClass("hidden");
      $("#btnEtapaResumo").removeClass("hidden");
      $("#btnVoltar").removeClass("hidden");
    }
  }, voltarEtapa: () => {
    let etapaAtual = $(".etapa.active").length;
    menu.metodos.carregarEtapa(etapaAtual - 1);
  }, carregarCarrinho: () => {
    menu.metodos.carregarEtapa(1);
    if (CARRINHO.length > 0) {
      $("#itensCarrinho").html("");
      $.each(CARRINHO, (indice, item) => {
        let itemFormatado = menu.templates.itemCarrinho.replace(/\${imagem}/g, item.img).replace(/\${nome}/g, item.name).replace(/\${preco}/g, item.price.toFixed(2).replace(".", ",")).replace(/\${id}/g, item.id).replace(/\${qntd}/g, item.qntd);
        $("#itensCarrinho").append(itemFormatado);
        if (indice + 1 == CARRINHO.length) {
          menu.metodos.carregarValores();
        }
      });
    } else {
      $("#itensCarrinho").html('<p class="carrinho-vazio"><i class="fa fa-shopping-bag"></i>Seu carrinho está vazio.</p>');
      menu.metodos.carregarValores();
    }
}, removerItemCarrinho: idItem => {

    CARRINHO = $.grep(CARRINHO, (item, indice) => {
      return item.id != idItem;
    });
    menu.metodos.carregarCarrinho();
    menu.metodos.atualizarBadgeTotal();
  }, diminuirQuantidadeCarrinho: idItem => {
    let quantidade = parseInt($("#qntd-carrinho-" + idItem).text());
    if (quantidade > 1) {
      $("#qntd-carrinho-" + idItem).text(quantidade - 1);
      menu.metodos.atualizarCarrinho(idItem, quantidade - 1);
    } else {
      menu.metodos.removerItemCarrinho(idItem);
    }
  }, aumentarQuantidadeCarrinho: idItem => {
    let quantidade = parseInt($("#qntd-carrinho-" + idItem).text());
    console.log(quantidade);
    $("#qntd-carrinho-" + idItem).text(quantidade + 1);
    menu.metodos.atualizarCarrinho(idItem, quantidade + 1);
  }, atualizarCarrinho: (idItem, quantidade) => {
    let indiceItem = CARRINHO.findIndex(item => item.id == idItem);
    CARRINHO[indiceItem].qntd = quantidade;
    menu.metodos.atualizarBadgeTotal();
    menu.metodos.carregarValores();
  }, carregarValores: () => {
    VALOR_CARRINHO = 0;
    $("#lblSubTotal").text("R$ 0,00");
    $("#lblValorEntrega").text("+ R$ 0,00");
    $("#lblValorTotal").text("R$ 0,00");
    $.each(CARRINHO, (indice, item) => {
      VALOR_CARRINHO += parseFloat(item.price * item.qntd);
      if (indice + 1 == CARRINHO.length) {
        $("#lblSubTotal").text("R$ " + VALOR_CARRINHO.toFixed(2).replace(".", ","));
        $("#lblValorEntrega").text("+ R$ " + 5..toFixed(2).replace(".", ","));
        $("#lblValorTotal").text("R$ " + (VALOR_CARRINHO + 5).toFixed(2).replace(".", ","));
      }
    });
  }, carregarEndereco: () => {
    if (CARRINHO.length <= 0) {
      menu.metodos.mensagem("Seu carrinho está vazio :/");
      return;
    }
    menu.metodos.carregarEtapa(2);
  }, buscarCep: () => {

    var cep = $("#txtCEP").val().replace(/\D/g, "");
    if (cep != "") {
      if (/^[0-9]{8}$/.test(cep)) {
        $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function (dadosCep) {
          if (!("erro" in dadosCep)) {
            $("#txtEndereco").val(dadosCep.logradouro);
            $("#txtBairro").val(dadosCep.bairro);
            $("#txtCidade").val(dadosCep.localidade);
            $("#ddlUf").val(dadosCep.uf);
            $("#txtNumero").focus();
          } else {
            menu.metodos.mensagem("CEP não encontrado. Preencha as informações manualmente, por favor.");
            $("#txtCEP").focus();
          }
        });
      } else {
        menu.metodos.mensagem("Formato de CEP inválido.");
        $("#txtCEP").focus();
      }
    } else {
      menu.metodos.mensagem("Informe o CEP, por favor.");
      $("#txtCEP").focus();
    }
  }, resumoPedido: () => {
    let cep = $("#txtCEP").val().trim();
    let endereco = $("#txtEndereco").val();
    let bairro = $("#txtBairro").val();
    let cidade = $("#txtCidade").val();
    let uf = $("#ddlUf").val();
    let numero = $("#txtNumero").val();
    let complemento = $("#txtComplemento").val();
    if (cep.length <= 0) {
      menu.metodos.mensagem("Informe o CEP, por favor.");
      $("#txtCEP").focus();
      return;
    }
    if (endereco.length <= 0) {
      menu.metodos.mensagem("Informe o Endereço, por favor.");
      $("#txtEndereco").focus();
      return;
    }
    if (bairro.length <= 0) {
      menu.metodos.mensagem("Informe o Bairro, por favor.");
      $("#txtBairro").focus();
      return;
    }
    if (cidade.length <= 0) {
      menu.metodos.mensagem("Informe a Cidade, por favor.");
      $("#txtCidade").focus();
      return;
    }
    if (uf == "-1") {
      menu.metodos.mensagem("Informe a UF, por favor.");
      $("#ddlUf").focus();
      return;
    }
    if (numero.length <= 0) {
      menu.metodos.mensagem("Informe o Número, por favor.");
      $("#txtNumero").focus();
      return;
    }
    ENDERECO = {cep: cep, endereco: endereco, bairro: bairro, cidade: cidade, uf: uf, numero: numero, complemento: complemento};
    menu.metodos.carregarEtapa(3);
    menu.metodos.carregarResumo();
  }, carregarResumo: () => {

    $("#listaItensResumo").html("");
    $.each(CARRINHO, (indice, item) => {
      let itemResumo = menu.templates.itemResumo.replace(/\${imagem}/g, item.img).replace(/\${nome}/g, item.name).replace(/\${preco}/g, item.price.toFixed(2).replace(".", ",")).replace(/\${qntd}/g, item.qntd);
      $("#listaItensResumo").append(itemResumo);
    });
    $("#resumoEndereco").html(ENDERECO.endereco + ", " + ENDERECO.numero + ", " + ENDERECO.bairro);
    $("#cidadeEndereco").html(ENDERECO.cidade + "-" + ENDERECO.uf + " / " + ENDERECO.cep);
    menu.metodos.finalizarPedido();
  }, finalizarPedido: () => {
    if (CARRINHO.length > 0 && ENDERECO != null) {
      var mensagemPedido = "Olá! gostaria de fazer um pedido:";
      mensagemPedido += "\n*Itens do pedido:*\n\n${itens}";
      mensagemPedido += "\n*Endereço de entrega:*";
      mensagemPedido += "\n" + ENDERECO.endereco + ", " + ENDERECO.numero + ", " + ENDERECO.bairro;
      mensagemPedido += "\n" + ENDERECO.cidade + "-" + ENDERECO.uf + " / " + ENDERECO.cep;
      mensagemPedido += "\n\n*Total (ENTREGA SOMAR + R$5,00): R$ " + VALOR_CARRINHO.toFixed(2).replace(".", ",") + "*";
      var itensPedido = "";
      $.each(CARRINHO, (indice, item) => {
        itensPedido += "*" + item.qntd + "x* " + item.name + " ....... R$ " + item.price.toFixed(2).replace(".", ",") + " \n";
        if (indice + 1 == CARRINHO.length) {
          mensagemPedido = mensagemPedido.replace(/\${itens}/g, itensPedido);
          let mensagemCodificada = encodeURI(mensagemPedido);
          let linkWhatsApp = "https://wa.me/5537999389584?text=" + mensagemCodificada;
          $("#btnEtapaResumo").attr("href", linkWhatsApp);
        }
      });
    }
  }, carregarBotaoReserva: () => {
    
    let mensagemReserva = encodeURI("Olá! gostaria de fazer uma *reserva*");
    let linkWhatsApp = "https://wa.me/5537999389584?text=" + mensagemReserva;
    $("#btnEtapaResumo").attr("href", linkWhatsApp);
  }, abrirDepoimento: idDepoimento => {
    $("#depoimento-1").addClass("hidden");
    $("#depoimento-2").addClass("hidden");
    $("#depoimento-3").addClass("hidden");
    $("#btnDepoimento-1").removeClass("active");
    $("#btnDepoimento-2").removeClass("active");
    $("#btnDepoimento-3").removeClass("active");
    $("#depoimento-" + idDepoimento).removeClass("hidden");
    $("#btnDepoimento-" + idDepoimento).addClass("active");
  }, mensagem: (texto, cor = "red", duracao = 3500) => {
    let idMensagem = Math.floor(Date.now() * Math.random()).toString();
    let mensagemFormatada = '<div id="msg-' + idMensagem + '" class="animated fadeInDown toast ' + cor + '">' + texto + "</div>";
    $("#container-mensagens").append(mensagemFormatada);
    setTimeout(() => {
      $("#msg-" + idMensagem).removeClass("fadeInDown");
      $("#msg-" + idMensagem).addClass("fadeOutUp");
      setTimeout(() => {
        $("#msg-" + idMensagem).remove();
      }, 800);
    }, duracao);
  }};
  menu.templates = {item: '\n        <div class="col-12 col-lg-3 col-md-3 col-sm-6 mb-5 wow fadeInUp">\n            <div class="card card-item" id="${id}" onclick="menu.metodos.clickItemMenu(\'${id}\')">\n                <div class="img-produto">\n                    <img src="${imagem}"/>\n                </div>\n                <p class="title-produto text-center mt-4">\n                    <b>${nome}</b>\n                </p>\n                <p class="price-produto text-center">\n                    <b>R$ ${preco}</b>\n                </p>\n                <div class="add-carrinho">\n                    <span class="btn-menos" onclick="menu.metodos.diminuirQuantidade(\'${id}\')"><i class="fas fa-minus"></i></span>\n                    <span class="add-numero-itens" id="qntd-${id}">0</span>\n                    <span class="btn-mais" onclick="menu.metodos.aumentarQuantidade(\'${id}\')"><i class="fas fa-plus"></i></span>\n                    <span class="btn btn-add" onclick="menu.metodos.adicionarAoCarrinho(\'${id}\')"><i class="fa fa-shopping-bag"></i></span>\n                </div>\n            </div>\n        </div>\n    ', itemCarrinho: '\n        <div class="col-12 item-carrinho animated fadeInUp">\n            <div class="img-produto">\n                <img src="${imagem}"/>\n            </div>\n            <div class="dados-produto">\n                <p class="title-produto">\n                    <b>${nome}</b>\n                </p>\n                <p class="price-produto">\n                    <b>R$ ${preco}</b>\n                </p>\n            </div>\n            <div class="add-carrinho">\n                <span class="btn-menos" onclick="menu.metodos.diminuirQuantidadeCarrinho(\'${id}\')"><i class="fas fa-minus"></i></span>\n                <span class="add-numero-itens" id="qntd-carrinho-${id}">${qntd}</span>\n                <span class="btn-mais" onclick="menu.metodos.aumentarQuantidadeCarrinho(\'${id}\')"><i class="fas fa-plus"></i></span>\n                <span class="btn btn-remove no-mobile" onclick="menu.metodos.removerItemCarrinho(\'${id}\')"><i class="fa fa-times"></i></span>\n            </div>\n        </div>\n    ', itemResumo: '\n        <div class="col-12 item-carrinho resumo">\n            <div class="img-produto-resumo">\n                <img src="${imagem}"/>\n            </div>\n            <div class="dados-produto">\n                <p class="title-produto-resumo">\n                    <b>${nome}</b>\n                </p>\n                <p class="price-produto-resumo">\n                    <b>R$ ${preco}</b>\n                </p>\n            </div>\n            <p class="quantidade-produto-resumo">\n                x <b>${qntd}</b>\n            </p>\n        </div>\n    '};
