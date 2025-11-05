/* ---------------------------
  Images mapping (change filenames to your Gemini outputs)
  Each pet must have: blank (base), bg (background), and accessory image names.
  ---------------------------- */
const IMAGES = {
  dog: {
    blank: 'dog_blank.jpg',
    bg: 'dog-bg.jpg',
    clothes: { hoodie: 'dog_hoodie.png', shirt: 'dog_shirt.png' },
    glasses: { aviator: 'dog_glasses.png', round: 'dog_glasses_round.png' },
    shoes: { boots: 'dog_boots.png', sneakers: 'dog_sneakers.png' },
    collar: { simple: 'dog_collar.png' }
  },
  cat: {
    blank: 'cat_blank.jpg',
    bg: 'cat-bg.jpg',
    clothes: { sweater: 'cat_sweater.png' },
    glasses: { tiny: 'cat_glasses.png' },
    shoes: { booties: 'cat_booties.png' },
    collar: { bell: 'cat_bell.png' }
  },
  bird: {
    blank: 'bird_blank.jpg',
    bg: 'bird-bg.jpg',
    clothes: { vest: 'bird_vest.png' },
    glasses: { tiny: 'bird_glasses.png' },
    shoes: { none: '' },
    collar: { band: 'bird_band.png' }
  }
};

/* Game config */
const START_POINTS = 50;
const START_FOOD = 3;
const MAX_HAPPY = 100;
const SHOP_ITEMS = [
  { id:'food_pack', name:'Food Pack (+5)', cost:6, type:'food', payload:5 },
  { id:'toy_ball', name:'Bouncy Toy', cost:8, type:'toy' },
  { id:'buy_cat', name:'Buy Cat', cost:35, type:'pet', pet:'cat' },
  { id:'buy_bird', name:'Buy Bird', cost:40, type:'pet', pet:'bird' }
];
const COLORS = [
  { name:'black', cost:0, hex:'#222' },
  { name:'white', cost:0, hex:'#fff' },
  { name:'orange', cost:7, hex:'#FF8A3D' },
  { name:'blue', cost:7, hex:'#4AA3FF' }
];

/* ---------------------------
  Persistence
  ---------------------------- */
const KEY = 'petplay_v2';
function defaultState(){
  return {
    points: START_POINTS,
    foodBase: START_FOOD,
    inventory: { food:0, toys:[], colors:[] },
    happiness: 40,
    owned: ['dog'],
    active: 'dog',
    custom: {
      dog: { clothes:null, color:'black', glasses:null, shoes:null, collar:null, name:'' },
      cat: { clothes:null, color:'black', glasses:null, shoes:null, collar:null, name:'' },
      bird: { clothes:null, color:'black', glasses:null, shoes:null, collar:null, name:'' }
    }
  };
}
function load(){
  const raw = localStorage.getItem(KEY);
  if(!raw) { localStorage.setItem(KEY, JSON.stringify(defaultState())); return defaultState(); }
  try { return JSON.parse(raw); } catch(e){ localStorage.removeItem(KEY); return load(); }
}
function save(){ localStorage.setItem(KEY, JSON.stringify(state)); updateHeader(); render(); }

/* ---------------------------
  App state + refs
  ---------------------------- */
let state = load();
let currentPage = 2; // center page is 2 (1-left,2-center,3-right) to match sketch (start at choose = left?) We'll start at page 1 visually.
const pager = document.getElementById('pager');
const toast = document.getElementById('toast');

const pointsEl = document.getElementById('points');
const foodEl = document.getElementById('foodCount');
const chooseList = document.getElementById('chooseList');
const avatarPetSelect = document.getElementById('avatarPetSelect');
const avatarBase = document.getElementById('avatarBase');
const avatarBg = document.getElementById('avatarBg');
const avatarCloth = document.getElementById('avatarCloth');
const avatarGlasses = document.getElementById('avatarGlasses');
const avatarShoes = document.getElementById('avatarShoes');
const avatarCollar = document.getElementById('avatarCollar');

const optClothes = document.getElementById('optClothes');
const optGlasses = document.getElementById('optGlasses');
const optShoes = document.getElementById('optShoes');
const optCollar = document.getElementById('optCollar');
const optColors = document.getElementById('optColors');

const gameBase = document.getElementById('gameBase');
const gameBg = document.getElementById('gameBg');
const gameCloth = document.getElementById('gameCloth');
const gameGlasses = document.getElementById('gameGlasses');
const gameShoes = document.getElementById('gameShoes');
const gameCollar = document.getElementById('gameCollar');
const happyBar = document.getElementById('happyBar');
const gameName = document.getElementById('gameName');
const shopGrid = document.getElementById('shopGrid');
const logDiv = document.getElementById('log');

/* ---------------------------
  Navigation: place pages left/center/right according to sketch
  We'll programmatically set .page positions and active class to slide.
  ---------------------------- */
function positionPages(){
  // page-choose = left (-100%), page-avatar = center (0), page-game = right (100%)
  const p1 = document.getElementById('page-choose');
  const p2 = document.getElementById('page-avatar');
  const p3 = document.getElementById('page-game');
  // set transforms so they are in proper horizontal layout; use active classes for transition
  p1.style.transform = 'translateX(-100%)';
  p2.style.transform = 'translateX(0)';
  p3.style.transform = 'translateX(100%)';
  // then activate desired page by translating all pages relative to chosen center
  applyPage(currentPage);
}

function applyPage(pageIndex){
  const p1 = document.getElementById('page-choose');
  const p2 = document.getElementById('page-avatar');
  const p3 = document.getElementById('page-game');
  // Page mapping: 1 => choose (left), 2 => avatar center, 3 => game right
  // When user moves to page k, we want that page to show centered (translateX 0),
  // the page left to be -100%, right +100%.
  if(pageIndex === 1){
    p1.style.transform = 'translateX(0)'; p2.style.transform = 'translateX(100%)'; p3.style.transform = 'translateX(200%)';
  } else if(pageIndex === 2){
    p1.style.transform = 'translateX(-100%)'; p2.style.transform = 'translateX(0)'; p3.style.transform = 'translateX(100%)';
  } else if(pageIndex === 3){
    p1.style.transform = 'translateX(-200%)'; p2.style.transform = 'translateX(-100%)'; p3.style.transform = 'translateX(0)';
  }
}

/* ---------------------------
  Renderers
  ---------------------------- */
function updateHeader(){
  pointsEl.textContent = state.points;
  foodEl.textContent = state.foodBase + (state.inventory.food||0);
}

function renderChoose(){
  chooseList.innerHTML = '';
  ['dog','cat','bird'].forEach(k=>{
    const card = document.createElement('div'); card.className='pet-card';
    const thumb = document.createElement('div'); thumb.className='pet-thumb';
    thumb.style.backgroundImage = `url(${IMAGES[k].blank})`;
    const info = document.createElement('div'); info.className='pet-info';
    const title = document.createElement('div'); title.className='pet-title'; title.textContent = k[0].toUpperCase()+k.slice(1);
    const sub = document.createElement('div'); sub.className='pet-sub'; sub.textContent = `Background: ${IMAGES[k].bg}`;
    const price = document.createElement('div'); price.className='pet-price';
    if(state.owned.includes(k)){ price.textContent='Owned'; price.style.background='linear-gradient(90deg,#67c18a,#2ea66b)'; }
    else price.textContent = getPetPrice(k) + ' pts';
    info.appendChild(title); info.appendChild(sub);
    card.appendChild(thumb); card.appendChild(info); card.appendChild(price);
    card.onclick = ()=>{
      if(state.owned.includes(k)){
        state.active = k;
        showToast(k + ' selected');
        save();
      } else {
        showToast('Go to shop to buy this pet');
        goToShop();
      }
    };
    chooseList.appendChild(card);
  });
}

function getPetPrice(k){
  const it = SHOP_ITEMS.find(x=>x.type==='pet' && x.pet===k);
  return it ? it.cost : 99;
}

function renderAvatarSelection(){
  // populate select with owned pets
  avatarPetSelect.innerHTML = '';
  state.owned.forEach(p=>{
    const o = document.createElement('option'); o.value=p; o.textContent = p[0].toUpperCase()+p.slice(1);
    avatarPetSelect.appendChild(o);
  });
  avatarPetSelect.value = state.active;
  loadAvatarPreview(state.active);
  renderOptionsFor(state.active);
}

function loadAvatarPreview(pKey){
  const imgSet = IMAGES[pKey];
  avatarBase.src = imgSet.blank;
  avatarBg.style.backgroundImage = `url(${imgSet.bg})`;
  const c = state.custom[pKey];
  avatarCloth.src = c.clothes ? (imgSet.clothes[c.clothes] || '') : '';
  avatarGlasses.src = c.glasses ? (imgSet.glasses[c.glasses] || '') : '';
  avatarShoes.src = c.shoes ? (imgSet.shoes[c.shoes] || '') : '';
  avatarCollar.src = c.collar ? (imgSet.collar[c.collar] || '') : '';
}

function renderOptionsFor(pKey){
  // clothes
  optClothes.innerHTML = ''; optGlasses.innerHTML=''; optShoes.innerHTML=''; optCollar.innerHTML=''; optColors.innerHTML='';
  const imgs = IMAGES[pKey];

  Object.keys(imgs.clothes||{}).forEach(k=>{
    const el = makeOption('clothes',k,imgs.clothes[k]);
    optClothes.appendChild(el);
  });
  Object.keys(imgs.glasses||{}).forEach(k=>{
    const el = makeOption('glasses',k,imgs.glasses[k]);
    optGlasses.appendChild(el);
  });
  Object.keys(imgs.shoes||{}).forEach(k=>{
    const el = makeOption('shoes',k,imgs.shoes[k]);
    optShoes.appendChild(el);
  });
  Object.keys(imgs.collar||{}).forEach(k=>{
    const el = makeOption('collar',k,imgs.collar[k]);
    optCollar.appendChild(el);
  });

  // colors: show swatches, lock if not purchased and cost>0
  COLORS.forEach(c=>{
    const div = document.createElement('div'); div.className='item';
    div.style.background = c.hex; div.title = `${c.name} (${c.cost} pts)`;
    if(c.cost>0 && !state.inventory.colors.includes(c.name)){ div.classList.add('locked'); const lb = document.createElement('div'); lb.className='lockBadge'; lb.textContent='🔒'; div.appendChild(lb); }
    div.onclick = ()=>{
      if(c.cost>0 && !state.inventory.colors.includes(c.name)){
        if(state.points >= c.cost){
          state.points -= c.cost;
          state.inventory.colors.push(c.name);
          showToast(`Bought color ${c.name}`);
        } else { showToast('Not enough points'); return; }
      }
      state.custom[pKey].color = c.name; save();
    };
    optColors.appendChild(div);
  });
}

function makeOption(category,key,imgSrc){
  const el = document.createElement('div'); el.className='item';
  const img = document.createElement('img'); img.src = imgSrc || ''; img.style.maxWidth='84%'; img.style.maxHeight='84%';
  el.appendChild(img);
  el.onclick = ()=>{
    const cur = state.custom[avatarPetSelect.value];
    cur[category] = cur[category] === key ? null : key;
    loadAvatarPreview(avatarPetSelect.value);
    save();
  };
  return el;
}

function renderGame(){
  const p = state.active;
  const imgs = IMAGES[p];
  gameBase.src = imgs.blank; gameBg.style.backgroundImage = `url(${imgs.bg})`;
  const custom = state.custom[p];
  gameCloth.src = custom.clothes ? imgs.clothes[custom.clothes] || '' : '';
  gameGlasses.src = custom.glasses ? imgs.glasses[custom.glasses] || '' : '';
  gameShoes.src = custom.shoes ? imgs.shoes[custom.shoes] || '' : '';
  gameCollar.src = custom.collar ? imgs.collar[custom.collar] || '' : '';
  happyBar.style.width = Math.min(100, Math.max(0, state.happiness)) + '%';
  gameName.value = custom.name || '';
}

/* ---------------------------
  Shop
  ---------------------------- */
function renderShopGrid(){
  shopGrid.innerHTML = '';
  SHOP_ITEMS.forEach(it=>{
    const card = document.createElement('div'); card.className='shop-item';
    const title = document.createElement('div'); title.textContent = it.name; title.style.fontWeight='700';
    const desc = document.createElement('div'); desc.textContent = it.type === 'food' ? 'Restores food' : it.type==='pet' ? `Unlock ${it.pet}` : 'Useful item';
    const meta = document.createElement('div'); meta.style.display='flex'; meta.style.justifyContent='space-between'; meta.style.marginTop='8px';
    const price = document.createElement('div'); price.textContent = it.cost + ' pts';
    const btn = document.createElement('button'); btn.textContent = 'Buy'; btn.onclick = ()=> buyItem(it);
    meta.appendChild(price); meta.appendChild(btn);
    card.appendChild(title); card.appendChild(desc); card.appendChild(meta);
    shopGrid.appendChild(card);
  });
}
function buyItem(it){
  if(state.points < it.cost){ showToast('Not enough points'); return; }
  state.points -= it.cost;
  if(it.type === 'food'){ state.inventory.food = (state.inventory.food||0) + (it.payload||1); showToast('Food bought'); }
  else if(it.type === 'toy'){ state.inventory.toys.push(it.id); showToast('Toy bought'); }
  else if(it.type === 'pet'){ if(!state.owned.includes(it.pet)){ state.owned.push(it.pet); showToast(it.pet + ' unlocked'); } else showToast('Already own'); }
  save(); renderChoose(); renderAvatarSelection();
}

/* ---------------------------
  Actions
  ---------------------------- */
function feedAction(){
  const available = (state.inventory.food||0) + state.foodBase;
  if(available <= 0){ showToast('Out of Food',3000); return; }
  if(state.inventory.food && state.inventory.food>0) state.inventory.food--;
  else state.foodBase = Math.max(0,state.foodBase-1);
  state.happiness = Math.min(MAX_HAPPY, state.happiness + 12);
  state.points += 1; // small reward
  appendLog('You fed your pet. Happiness +12');
  save();
}
function appendLog(txt){
  const d = document.createElement('div'); d.textContent = txt; logDiv.prepend(d);
}

/* ---------------------------
  Helpers & Navigation
  ---------------------------- */
function showToast(msg, time = 2200){
  toast.textContent = msg; toast.classList.remove('hidden');
  setTimeout(()=> toast.classList.add('hidden'), time);
}
function goToPage(n){
  currentPage = n;
  applyPage(currentPage);
}
function onPetSelectChange(){
  const k = avatarPetSelect.value;
  loadAvatarPreview(k);
  renderOptionsFor(k);
}
function saveCustomization(){
  const key = avatarPetSelect.value;
  // name is saved from gameName if edited; but we keep name field only in game name box
  save();
  showToast('Saved');
}
/* Shop navigation */
function goToShop(){ document.getElementById('page-shop').style.display='block'; renderShopGrid(); }
function closeShop(){ document.getElementById('page-shop').style.display='none'; renderChoose(); renderAvatarSelection(); renderGame(); }

/* ---------------------------
  Boot / initial render
  ---------------------------- */
function render(){
  updateHeader(); renderChoose(); renderAvatarSelection(); renderGame();
}
positionPages();
render();

/* expose for debugging */
window.goToPage = goToPage;
window.goToShop = goToShop;
window.buyItem = buyItem;
window.feedAction = feedAction;
