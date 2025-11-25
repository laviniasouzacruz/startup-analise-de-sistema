window.cart = JSON.parse(localStorage.getItem('cart')) || [];

console.log('[cart] script loaded. Cart length:', window.cart.length);

// Atualiza contador do carrinho
window.updateCartCount = function () {
    const countSpan = document.querySelector('.carrinho1 span');
    if (countSpan) countSpan.textContent = window.cart.length;
};

// Adiciona produto ao carrinho
window.addToCart = function (product) {
    if (!product || !product.name || !product.price) {
        alert('Erro ao adicionar produto: dados inválidos.');
        return;
    }

    window.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(window.cart));
    window.updateCartCount();
    window.renderCart();
    alert(`${product.name} adicionado ao carrinho!`);

    console.log('[cart] adicionado:', product.name, 'novo tamanho:', window.cart.length);
};

// Remove item do carrinho
window.removeFromCart = function (index) {
    if (index < 0 || index >= window.cart.length) return;

    const removed = window.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(window.cart));
    window.updateCartCount();
    window.renderCart();

    console.log('[cart] item removido:', removed, 'novo tamanho:', window.cart.length);
};

// Abre/fecha o carrinho (VERSÃO QUE VOCÊ PEDIU)
window.toggleCart = function () {
    document.getElementById("cartModal").classList.toggle("active");
};

// Renderiza os itens do carrinho
window.renderCart = function () {
    const list = document.getElementById('cartItems');
    if (!list) return;
    list.innerHTML = '';

    const footer = document.querySelector('#cartModal .modal-footer');

    if (!window.cart || window.cart.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Seu carrinho está vazio.';
        li.style.listStyle = 'none';
        li.style.padding = '10px';
        list.appendChild(li);

        if (footer) footer.style.display = 'none';
        return;
    }

    window.cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
        li.style.marginBottom = '8px';

        // Lado esquerdo: nome e preço
        const left = document.createElement('div');
        left.style.display = 'flex';
        left.style.flexDirection = 'column';

        const name = document.createElement('span');
        name.textContent = item.name;
        name.style.fontWeight = '600';
        name.style.fontSize = '14px';

        const price = document.createElement('small');
        price.textContent = `R$ ${Number(item.price).toFixed(2)}`;

        left.appendChild(name);
        left.appendChild(price);

        // Lado direito: botão remover
        const right = document.createElement('div');
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.onclick = () => window.removeFromCart(index);
        removeBtn.style.marginLeft = '8px';
        right.appendChild(removeBtn);

        li.appendChild(left);
        li.appendChild(right);
        list.appendChild(li);
    });

    if (footer) {
        footer.style.display = 'block';
        const totalSpan = footer.querySelector('.cart-total-amount');
        if (totalSpan) {
            const total = window.cart.reduce((s, it) => s + Number(it.price || 0), 0);
            totalSpan.textContent = `R$ ${total.toFixed(2)}`;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.updateCartCount();

    const carrinhoEl = document.querySelector('.carrinho1');
    if (carrinhoEl) {
        carrinhoEl.addEventListener('click', (e) => {
            e.preventDefault();
            window.toggleCart();
        });
    }

    window.renderCart();
});

// Finaliza a compra
window.finishCheckout = function () {
    if (window.cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra finalizada com sucesso! Obrigado pela preferência ❤️");

    // limpa o carrinho
    window.cart = [];
    localStorage.removeItem('cart');
    
    window.updateCartCount();
    window.renderCart();

    // fecha o modal
    window.toggleCart();
};

//LOGIN
function fazerLogin() {
    const cpf = document.getElementById("cpf").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const msg = document.getElementById("mensagemErro");

    msg.textContent = ""; // limpa erro anterior

    // CPF precisa ter somente números e tamanho 11
    if (!/^\d{11}$/.test(cpf)) {
        msg.textContent = "O CPF deve ter exatamente 11 números.";
        return;
    }

    // Senha com mínimo 6 caracteres
    if (senha.length < 6) {
        msg.textContent = "A senha deve ter pelo menos 6 caracteres.";
        return;
    }

    // Login OK → redireciona
    window.location.href = "login.html"; 
}
