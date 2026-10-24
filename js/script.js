// Accordion - Part 3 2.1
document.querySelectorAll('.accordion-header').forEach(h=>{
  h.addEventListener('click',()=> h.nextElementSibling.classList.toggle('active'))
});
// Tabs - Part 3 2.1
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});
// Map - Part 3 2.1 Leaflet
if(document.getElementById('map')){
  const map=L.map('map').setView([-29.8587,31.0218],14);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  L.marker([-29.8587,31.0218]).addTo(map).bindPopup('<b>BeeCake Bakery</b><br>123 Honey Street, Durban');
}
// Lightbox - Part 3 2.1
const lb=document.getElementById('lightbox'), lbImg=document.getElementById('lightbox-img');
document.querySelectorAll('.gallery-img').forEach(img=>{
  img.addEventListener('click',()=>{ lb.style.display='flex'; lbImg.src=img.src; lbImg.alt=img.alt; })
});
document.getElementById('close-lightbox')?.addEventListener('click',()=> lb.style.display='none');

// Dynamic Content + Search/Filter - Part 3 2.2 - for pricing.html
const cakes=[
  {name:"Cupcakes", category:"cupcake", price:"R25 each", desc:"Chocolate, vanilla, red velvet"},
  {name:"Birthday Cake", category:"birthday", price:"From R250", desc:"Custom birthday cakes with your design"},
  {name:"Wedding Cake", category:"wedding", price:"From R1000", desc:"Elegant 2-3 tier wedding cakes"},
  {name:"Bee Honey Special", category:"birthday", price:"R350", desc:"Our signature honey infused cake"}
];
const productList=document.getElementById('product-list');
if(productList){
  const render=(arr)=> productList.innerHTML=arr.map(c=>`<div class="product-card"><h3>${c.name} - ${c.price}</h3><p><strong>${c.category}</strong> - ${c.desc}</p></div>`).join('');
  render(cakes);
  document.getElementById('search')?.addEventListener('input',e=>{
    render(cakes.filter(c=> c.name.toLowerCase().includes(e.target.value.toLowerCase())))
  });
  document.getElementById('filterCategory')?.addEventListener('change',e=>{
    const v=e.target.value; render(v==='all'?cakes:cakes.filter(c=>c.category===v))
  });
}

// Form Validation - Part 3 Section 4
const form=document.getElementById('contactForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault(); let valid=true;
    document.querySelectorAll('.error').forEach(el=>el.textContent='');
    const name=document.getElementById('name'), email=document.getElementById('email'), phone=document.getElementById('phone'), type=document.getElementById('type'), msg=document.getElementById('message');
    if(name.value.trim().length<3){ document.getElementById('nameError').textContent='Name must be 3+ characters'; valid=false; }
    if(!/^\S+@\S+\.\S+$/.test(email.value)){ document.getElementById('emailError').textContent='Enter valid email e.g info@beecake.co.za'; valid=false; }
    if(!/^[0-9]{10}$/.test(phone.value.replace(/\s/g,''))){ document.getElementById('phoneError').textContent='Enter 10-digit phone'; valid=false; }
    if(!type.value){ document.getElementById('typeError').textContent='Select cake type'; valid=false; }
    if(msg.value.trim().length<10){ document.getElementById('msgError').textContent='Message at least 10 characters'; valid=false; }
    if(valid){ document.getElementById('successModal').style.display='flex'; form.reset(); }
  });
  document.getElementById('closeModal')?.addEventListener('click',()=> document.getElementById('successModal').style.display='none')
}