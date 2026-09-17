const PRODUCTS = [
  { id:'blanco',name:'Tableta de chocolate blanco',category:'tabletas',image:'assets/tableta_chocolate_blanco.png',description:'Suave y cremosa, también disponible con frutos secos.',options:['100 g','100 g con frutos secos'] },
  { id:'leche',name:'Tableta de chocolate con leche',category:'tabletas',image:'assets/tableta_chocolate_con_leche.png',description:'El clásico más tentador, suave y equilibrado.',options:['100 g','100 g con frutos secos'] },
  { id:'semiamargo',name:'Tableta de chocolate semiamargo',category:'tabletas',image:'assets/tableta_chocolate_semi_amargo.png',description:'Intensa, aromática y con el punto justo de dulzor.',options:['100 g','100 g con frutos secos'] },
  { id:'rellena',name:'Tableta rellena',category:'especiales',image:'assets/tableta_rellena.png',description:'Elegí tu chocolate y consultanos por los rellenos disponibles.',options:['40 g'] },
  { id:'corazones',name:'Corazones de dulce de leche',category:'bombones',image:'assets/bombones_con_ddl.png',description:'Bombones con forma de corazón y centro bien argentino.',options:['Caja de 100 g','Caja de 250 g'] },
  { id:'bastones',name:'Bastones de Nutella',category:'especiales',image:'assets/barra_de_chocolate_con_ddl_2.png',description:'Chocolate artesanal con un centro irresistible.',options:['Caja de 5 · 150 g'] },
  { id:'surtidos',name:'Bombones surtidos',category:'bombones',image:'assets/surtidos.png',description:'Una selección variada para probar un poco de todo.',options:['Caja de 100 g','Caja de 250 g'] },
  { id:'pistacho',name:'Bombones de pistacho',category:'bombones',image:'assets/pistacho.png',description:'Chocolate y pistacho en una combinación delicada.',options:['Caja de 100 g','Caja de 250 g'] },
  { id:'maracuya',name:'Bombones de maracuyá',category:'bombones',image:'assets/maracuya.png',description:'Un centro fresco y frutal que equilibra el chocolate.',options:['Caja de 100 g','Caja de 250 g'] },
  { id:'frutos-rojos',name:'Bombones de frutos rojos',category:'bombones',image:'assets/frutos_rojos.png',description:'Frutales, delicados y con una acidez irresistible.',options:['Caja de 100 g','Caja de 250 g'] },
  { id:'marroc',name:'Chocolates Marroc',category:'especiales',image:'assets/marroc.png',description:'Capas de chocolate y maní inspiradas en un clásico.',options:['Caja de 100 g','Caja de 250 g'] },
  { id:'bonobon',name:'Bombones de Bon o Bon',category:'bombones',image:'assets/bon_o_bon.png',description:'Cremosos, crocantes y perfectos para compartir.',options:['Caja de 100 g','Caja de 250 g'] }
];
function loadCart(){
  try{
    const saved=JSON.parse(localStorage.getItem('cinnamon-cart')||'[]');
    if(!Array.isArray(saved))return [];
    return saved.filter(item=>PRODUCTS.some(product=>product.id===item.id)&&typeof item.option==='string'&&Number.isFinite(item.quantity)&&item.quantity>0);
  }catch(error){return []}
}
const state={cart:loadCart(),filter:'todos'};
const $=(selector,parent=document)=>parent.querySelector(selector);
const $$=(selector,parent=document)=>[...parent.querySelectorAll(selector)];
const productGrid=$('#product-grid'),drawer=$('.cart-drawer'),overlay=$('.overlay'),dialog=$('.checkout-dialog');

function renderProducts(){
  const visible=state.filter==='todos'?PRODUCTS:PRODUCTS.filter(product=>product.category===state.filter);
  productGrid.innerHTML=visible.map(product=>`<article class="product-card"><div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="product-tag">${product.category}</span></div><div class="product-info"><h3>${product.name}</h3><p>${product.description}</p><div class="product-controls"><label for="option-${product.id}">Presentación</label><select id="option-${product.id}">${product.options.map(option=>`<option>${option}</option>`).join('')}</select><button class="add-to-cart" type="button" data-id="${product.id}">Agregar al pedido</button></div></div></article>`).join('');
}
function saveAndRenderCart(){
  try{localStorage.setItem('cinnamon-cart',JSON.stringify(state.cart))}catch(error){}
  const count=state.cart.reduce((total,item)=>total+item.quantity,0);
  $('.cart-count').textContent=count;
  $('.cart-trigger').setAttribute('aria-label',`Abrir carrito, ${count} ${count===1?'producto':'productos'}`);
  $('.empty-cart').hidden=state.cart.length>0;$('.cart-footer').hidden=state.cart.length===0;
  $('.cart-total-items').textContent=`${count} ${count===1?'unidad':'unidades'}`;
  $('.cart-items').innerHTML=state.cart.map(item=>{const product=PRODUCTS.find(entry=>entry.id===item.id);return `<article class="cart-item" data-key="${item.id}|${item.option}"><img src="${product.image}" alt=""><div><h3>${product.name}</h3><p>${item.option}</p><div class="quantity" aria-label="Cantidad"><button type="button" data-action="decrease" aria-label="Restar uno">−</button><span>${item.quantity}</span><button type="button" data-action="increase" aria-label="Sumar uno">+</button></div></div><button class="remove-item" type="button" data-action="remove">Quitar</button></article>`}).join('');
}
function addToCart(id,option){const existing=state.cart.find(item=>item.id===id&&item.option===option);existing?existing.quantity++:state.cart.push({id,option,quantity:1});saveAndRenderCart();showToast('Agregado a tu pedido')}
function openCart(){drawer.classList.add('open');drawer.setAttribute('aria-hidden','false');overlay.hidden=false;document.body.classList.add('locked');$('.cart-close').focus()}
function closeCart(){drawer.classList.remove('open');drawer.setAttribute('aria-hidden','true');overlay.hidden=true;document.body.classList.remove('locked')}
let toastTimer;function showToast(message){const toast=$('.toast');toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2200)}

productGrid.addEventListener('click',event=>{const button=event.target.closest('.add-to-cart');if(!button)return;addToCart(button.dataset.id,$(`#option-${button.dataset.id}`).value);button.textContent='¡Agregado!';setTimeout(()=>button.textContent='Agregar al pedido',1000)});
$('.filters').addEventListener('click',event=>{const button=event.target.closest('.filter');if(!button)return;$$('.filter').forEach(filter=>filter.classList.remove('active'));button.classList.add('active');state.filter=button.dataset.filter;renderProducts()});
$('.cart-items').addEventListener('click',event=>{const action=event.target.dataset.action;if(!action)return;const [id,option]=event.target.closest('.cart-item').dataset.key.split('|');const item=state.cart.find(entry=>entry.id===id&&entry.option===option);if(action==='increase')item.quantity++;if(action==='decrease')item.quantity--;if(action==='remove'||item.quantity<=0)state.cart=state.cart.filter(entry=>entry!==item);saveAndRenderCart()});
$('.cart-trigger').addEventListener('click',openCart);$('.cart-close').addEventListener('click',closeCart);$('.keep-shopping').addEventListener('click',()=>{closeCart();$('#productos').scrollIntoView()});overlay.addEventListener('click',closeCart);$('.checkout-button').addEventListener('click',()=>{closeCart();dialog.showModal()});$('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
$('#checkout-form').addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget);const lines=state.cart.map(item=>{const product=PRODUCTS.find(entry=>entry.id===item.id);return `• ${item.quantity} x ${product.name} (${item.option})`});const message=[`Hola Cinnamon, soy ${data.get('name')} y quiero hacer este pedido:`,'',...lines,'',`Modalidad: ${data.get('delivery')}`,data.get('notes')?`Notas: ${data.get('notes')}`:'','','¿Me confirman disponibilidad y precio?'].join('\n');window.open(`https://wa.me/5493489452943?text=${encodeURIComponent(message)}`,'_blank','noopener');dialog.close()});
const menuToggle=$('.menu-toggle');menuToggle.addEventListener('click',()=>{const open=$('.nav-links').classList.toggle('open');menuToggle.setAttribute('aria-expanded',open);menuToggle.textContent=open?'×':'☰'});$$('.nav-links a').forEach(link=>link.addEventListener('click',()=>{$('.nav-links').classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰'}));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&drawer.classList.contains('open'))closeCart()});
$('#current-year').textContent=new Date().getFullYear();
renderProducts();saveAndRenderCart();
