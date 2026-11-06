'use strict';
const $=s=>document.querySelector(s),app=$('#app'),modal=$('#modal');
const paths={list:'<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3" cy="6" r=".7"/><circle cx="3" cy="12" r=".7"/><circle cx="3" cy="18" r=".7"/>',search:'<circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/>',back:'<path d="m15 4-8 8 8 8"/>',chevron:'<path d="m9 5 7 7-7 7"/>',close:'<path d="m6 6 12 12M18 6 6 18"/>',heart:'<path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 6l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.3a5.5 5.5 0 0 0 0-7.8Z"/>',history:'<path d="M3.3 9a9 9 0 1 1-.1 6M3 3v6h6m3-3v6l4 2"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.5 10.5 7-4m-7 7 7 4"/>',music:'<path d="M10 17V3h8v5h-6v9"/><ellipse cx="7" cy="18" rx="4" ry="3"/>',home:'<path d="m3 10 2 10q.2 2 2 2h10q2 0 2-2l2-10q.2-2-2-3l-5-4q-2-1-4 0L5 7q-2 1-2 3Z"/><path d="M9 18h6" stroke="#030815"/>',bars:'<path d="M3 21h18M5 18V9h3v9m3 0V3h3v15m3 0v-5h3v5"/>',user:'<circle cx="12" cy="12" r="9"/><path d="M8 8v2m8-2v2" stroke="#030815"/>',play:'<path d="m8 4 13 8L8 20Z"/>',pause:'<path d="M8 5v14M16 5v14" stroke-width="5"/>',prev:'<path d="M6 4v16m14-16L7 12l13 8Z"/>',next:'<path d="M18 4v16M4 4l13 8L4 20Z"/>',sliders:'<path d="M3 6h11m4 0h3M3 12h4m4 0h10M3 18h13m4 0h1M14 3v6M7 9v6m9 0v6"/>',moon:'<path d="M11 3a9.5 9.5 0 1 0 10 13A8 8 0 0 1 11 3Z"/><path d="M17 3h5l-5 5h5"/>',copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',check:'<path d="m5 12 4 4L19 6"/>'};
paths.refresh='<path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m0 5v-5h-5"/>';
paths.timer='<path d="M7 3h10M7 21h10M8 3v2.7c0 2.4 4 4.2 4 6.3s-4 3.9-4 6.3V21M16 3v2.7c0 2.4-4 4.2-4 6.3s4 3.9 4 6.3V21"/>';
paths.lock='<rect x="4.5" y="10" width="15" height="10.5" rx="2.5"/><path d="M8 10V7.5a4 4 0 0 1 8 0V10"/><circle cx="12" cy="15" r="1.2"/>';
function icon(name,fill=false){return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="${fill?'currentColor':'none'}" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[name]||paths.music}</svg>`}
const types=['白噪音','助眠冥想','舒眠音乐','睡前故事','钵音疗愈','深睡眠脑波'];
const effects=['快速入睡','提升深睡','舒缓心绪','遮蔽杂音','放松身体','陪伴入眠','专注'];
const dimensions={1:[1125,2436],2:[724,2172],3:[1125,2436],4:[1125,2436],5:[1125,2436],6:[1125,4041],7:[1125,3690],8:[1125,4308],9:[1125,4806],10:[1125,6327],11:[1125,5679],12:[1125,5580],13:[1125,6975]};
function art(ref,box){let [w,h]=dimensions[ref];return `<svg class="art" viewBox="${box.join(' ')}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><image href="assets/ref${ref}.jpg" width="${w}" height="${h}"/></svg>`}
const arts={sea:[10,[62,2608,440,440]],wave:[10,[561,2608,440,440]],forest:[4,[400,1804,279,280]],bamboo:[4,[0,100,1125,650]],brain:[2,[132,1450,150,150]],deep:[2,[370,1450,150,150]],fire:[6,[61,702,447,445]],stream:[6,[560,702,447,445]],med1:[13,[63,1187,355,460]],med2:[13,[468,1187,355,460]],med3:[13,[63,2030,446,450]],music1:[11,[78,1500,335,335]],music2:[11,[490,1500,330,330]],music3:[11,[898,1452,217,217]],story1:[7,[63,1337,355,460]],story2:[7,[469,1337,355,460]],story3:[7,[63,2174,446,450]],bowl1:[8,[60,1182,355,465]],bowl2:[8,[465,1182,355,465]],bowl3:[8,[60,2015,446,450]],grass:[5,[83,825,450,300]]};
Object.assign(arts,{record1:[11,[62,710,355,355]],record2:[11,[468,710,355,355]],record3:[11,[874,710,251,355]],newsea:[10,[348,578,432,576]],newsand:[10,[0,646,270,451]],newwave:[10,[855,646,270,451]]});
const artwork=k=>art(...(arts[k]||arts.sea));
const groups={白噪音:['精选混音','自定义混音','白噪音类型'],助眠冥想:['助眠冥想','呼吸觉察','身体扫描','可视化','新手入门'],舒眠音乐:['♫ 精选音乐','雨声音乐','轻柔钢琴','氛围音乐','竖琴','摇篮曲','轻柔器乐'],睡前故事:['⭐ 精选故事','宝宝哄睡','哄睡放松','晚安电台'],钵音疗愈:['静心·钵铃','自然·声景','深睡·长音','能量·氛围'],深睡眠脑波:['深度睡眠','深睡Delta波','专注Beta波','减压Alpha波','疗愈Theta波','疗愈频率']};
const names=[['雨夜壁炉','森林溪流','海边晚风','窗外细雨','山间鸟鸣','风吹树叶'],['好呼吸，始于睡眠','暮色中的放松','身体慢慢沉下来','温柔地安顿自己','把思绪交给夜晚','睡前十分钟'],['月光奏鸣曲','雨声与钢琴','月下花开','静夜轻音乐','微风中的竖琴','夜色摇篮曲'],['星星小卖部','绿野仙踪','小红帽','小王子','森林里的晚安','海边来信'],['烛光颂钵','静心·钵铃','大地的回响','山谷长音','深夜共鸣','温柔的频率'],['深睡眠脑波','432HZ–深度睡眠','Delta深睡之旅','Alpha舒缓心绪','Theta宁静时刻','Beta专注时光']];
const keys=[['fire','stream','sea','grass','forest','bamboo'],['med1','med2','med3','forest','grass','bamboo'],['music1','music2','music3','sea','wave','forest'],['story1','story2','story3','story2','story1','story3'],['bowl1','bowl2','bowl3','bowl1','bowl2','bowl3'],['brain','deep','wave','sea','forest','grass']];
const tracks=[];types.forEach((type,i)=>names[i].forEach((title,j)=>tracks.push({id:`t${i}-${j}`,title,type,art:keys[i][j],duration:(i===3&&j<3?12:9+j*3)*60,effect:effects[(i+j)%7],paid:j%3===0?'SVIP':'',series:false})));
tracks.push({id:'course',title:'21天睡眠改善计划',type:'助眠冥想',art:'med1',duration:540,effect:'快速入睡',paid:'SVIP',series:true},{id:'course2',title:'修复深睡眠',type:'深睡眠脑波',art:'deep',duration:720,effect:'提升深睡',paid:'',series:true});
const lessons=['好呼吸，始于睡眠','睡前放松练习','感受身体的重量','卸下一天的疲惫','安顿睡前思绪','温柔的身体扫描','安心入眠'];
const get=id=>tracks.find(t=>t.id===id)||tracks[0],read=(k,d)=>{try{return JSON.parse(localStorage.getItem('panda-v1031-'+k))??d}catch{return d}},save=(k,v)=>{try{localStorage.setItem('panda-v1031-'+k,JSON.stringify(v))}catch{}};
const S={page:'audio',tab:'推荐',stack:[],track:'t0-0',playerTrack:'t0-0',episode:0,playing:false,position:0,mode:'单曲一次',timer:0,timerEnd:0,favs:read('favorites',[]),history:read('history',[]),searchHistory:read('search',[]),query:'',searched:false,modal:'',effect:effects[0],noise:'课堂',filterType:'',filterSleep:'',recommended:null,resultType:'',resultSleep:'',nearTab:'recent',storyBatch:0,miniNoise:false,recommendIndex:0,recommendStep:'sleep',loading:false,expanded:false,fromMonitor:false,refresh:0,moreTitle:'精选音频',moreIds:[],monitorStart:0,alarmKind:'闹钟',alarmTime:'08:00',monitorIds:[]};
if(!S.history.length){S.history=['t0-0','t1-1','t2-2','t3-0','t4-1','t5-2'];save('history',S.history)}
if(!S.favs.length){S.favs=['t2-1','t0-3','t5-2'];save('favorites',S.favs)}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const B=(action,label,cls='',extra='')=>`<button type="button" class="${cls}" data-a="${action}" ${extra}>${cls==='circle'&&['back','search','history','share','close'].includes(action)?icon({back:'back',search:'search',history:'history',share:'share',close:'close'}[action]):cls==='circle'&&action==='favorite'?icon('heart',label==='♥'):label}</button>`;
function toast(t){$('#toast').textContent=t;$('#toast').classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>$('#toast').classList.remove('show'),2400)}
function snapshot(){return {page:S.page,tab:S.tab,track:S.track,query:S.query,searched:S.searched,effect:S.effect,noise:S.noise,moreTitle:S.moreTitle,moreIds:S.moreIds,fromMonitor:S.fromMonitor,modal:S.modal,scroll:app.scrollTop,rails:[...app.querySelectorAll('.rail,.tabs,.chips')].map(x=>x.scrollLeft),sheetScroll:$('.sheet.full')?.scrollTop||0}}
const motionEnabled=()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function clonePageLeaving(strip='.bottom,.float'){
  const leaving=app.cloneNode(true);
  leaving.removeAttribute('id');
  leaving.className='page-leaving';
  leaving.setAttribute('aria-hidden','true');
  leaving.inert=true;
  leaving.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
  if(strip)leaving.querySelectorAll(strip).forEach(el=>el.remove());
  $('#phone').insertBefore(leaving,modal);
  leaving.scrollTop=app.scrollTop;
  const sourceRails=app.querySelectorAll('.rail,.tabs,.chips');
  leaving.querySelectorAll('.rail,.tabs,.chips').forEach((el,i)=>el.scrollLeft=sourceRails[i]?.scrollLeft||0);
  return leaving;
}
function fadeOutLeaving(leaving,duration=180){
  if(!leaving)return;
  leaving.animate([{opacity:1},{opacity:0}],{duration,easing:'ease-out',fill:'forwards'});
  setTimeout(()=>leaving.remove(),duration+80);
}
function transitionPage(update,direction=1){
  document.querySelectorAll('.page-leaving').forEach(el=>el.remove());
  app.querySelectorAll('.page,.audio-content,#library-panel').forEach(el=>el.getAnimations().forEach(animation=>animation.cancel()));
  let leaving=null;
  if(motionEnabled()&&!S.modal)leaving=clonePageLeaving('.bottom,.float');
  update();
  if(!motionEnabled())return;
  fadeOutLeaving(leaving,180);
  const page=app.querySelector('.page');
  if(page){
    const blocks=[];
    [...page.children].forEach(el=>{
      if(el.matches('.bottom,.float'))return;
      if(el.matches('.audio-content,#library-panel'))blocks.push(...el.children);
      else blocks.push(el);
    });
    blocks.forEach((el,i)=>{el.animate([{opacity:0},{opacity:1}],{duration:280,easing:'ease-out',delay:120+i*70,fill:'backwards'})});
  }
}
function clearRecommendation(){clearTimeout(S.recommendTimer);S.recommended=null;S.recommendIndex=0;S.loading=false;}
function resetRecommendModule(){clearTimeout(S.recommendTimer);clearTimeout(S.stepTimer);S.recommended=null;S.recommendIndex=0;S.loading=false;S.recommendStep='sleep';S.filterType='';S.filterSleep='';S.resultType='';S.resultSleep='';}
function go(page,extra={}){if(page==='intro'){clearTimeout(S.recommendTimer);S.loading=false}else{resetRecommendModule()}if(S.page==='monitor'&&S.modal==='monitorAudio'&&page!=='monitor')extra={fromMonitor:true,...extra};S.stack.push(snapshot());transitionPage(()=>{Object.assign(S,{page,modal:'',expanded:false},extra);render();app.scrollTop=0})}
function back(){if(S.page!=='intro'){resetRecommendModule();clearRecommendation()}else{clearTimeout(S.recommendTimer);S.loading=false}if(S.modal){closeModal();return}if(S.page==='brainIntro'&&motionEnabled()){const prev=S.stack[S.stack.length-1];if(prev&&prev.page==='audio'&&prev.tab==='深睡眠脑波'){closeBrainH5();return}}let f=S.stack.pop();if(f){transitionPage(()=>{Object.assign(S,f);render();app.scrollTop=f.scroll;app.querySelectorAll('.rail,.tabs,.chips').forEach((x,i)=>x.scrollLeft=f.rails[i]||0);if($('.sheet.full'))$('.sheet.full').scrollTop=f.sheetScroll},-1)}else go('home')}
function animateContent(element,direction=1,distance=14,duration=360){
  if(!element||!motionEnabled())return;
  element.getAnimations().forEach(animation=>animation.cancel());
  element.animate([{transform:`translate3d(${distance*direction}px,0,0)`,opacity:.88},{transform:'translate3d(0,0,0)',opacity:1}],{duration,easing:'cubic-bezier(.16,1,.3,1)'});
}
function switchTab(value){
  if(value===S.tab)return;
  resetRecommendModule();clearRecommendation();
  document.querySelectorAll('.page-leaving').forEach(el=>el.remove());
  app.querySelectorAll('.page,.audio-content,#library-panel').forEach(el=>el.getAnimations().forEach(animation=>animation.cancel()));
  const leaving=(motionEnabled()&&!S.modal)?clonePageLeaving('.bottom,.float'):null;
  S.tab=value;S.effect=effects[0];
  const page=app.querySelector('.audio-page'),content=app.querySelector('.audio-content');
  page.className=`page audio-page ${value==='推荐'?'recommend-page':'star-page'}`;
  if(value==='推荐')page.querySelector(':scope > .star-field')?.remove();else mountStars();
  app.querySelectorAll('.tabs [data-a="tab"]').forEach(button=>button.classList.toggle('active',button.dataset.value===value));
  content.innerHTML=audioContent();app.scrollTop=0;bindPageInteractions();
  app.querySelector('.tabs .active')?.scrollIntoView({behavior:'auto',block:'nearest',inline:'nearest'});
  if(!motionEnabled())return;
  fadeOutLeaving(leaving,180);
  [...content.children].forEach((el,i)=>{el.animate([{opacity:0},{opacity:1}],{duration:280,easing:'ease-out',delay:220+i*70,fill:'backwards'})});
}
function closeModal(){
  const backdrop=modal.firstElementChild;
  if(!backdrop)return;
  if(backdrop.dataset.closing)return;
  const finish=()=>{if(modal.firstElementChild===backdrop){if(S.modal==='monitorAudio'){clearTimeout(S.recommendTimer);S.loading=false}S.modal='';renderModal();if(S.page==='monitor')redraw()}};
  if(!motionEnabled()){finish();return}
  backdrop.dataset.closing='true';backdrop.inert=true;
  backdrop.querySelector('.sheet-scrim')?.animate([{opacity:1},{opacity:0}],{duration:220,easing:'ease-out',fill:'forwards'});
  const animation=backdrop.querySelector('.sheet').animate([{transform:'translate3d(0,0,0)',opacity:1},{transform:'translate3d(0,32px,0)',opacity:0}],{duration:240,easing:'cubic-bezier(.4,0,1,1)',fill:'forwards'});
  animation.finished.then(finish,finish);
}
const trackMeta=(t,unit='min',noTime=false)=>t.type==='白噪音'?t.type:`${noTime?'':Math.round(t.duration/60)+'分钟'+' · '}${t.effect}`;
function card(t,hideMeta=false){if(typeof t==='string')t=get(t);return `<button class="card" data-track="${t.id}" aria-label="查看${t.title}"><div class="cover">${artwork(t.art)}${t.series?'<span class="badge">系列课</span>':''}</div><strong>${t.title}</strong><small>${t.series?`${t.id==='course'?21:7}节 · 系列课`:trackMeta(t,'min',hideMeta)}</small></button>`}
function rows(list){return list.map((t,i)=>`<div class="row-track"><button class="thumb" data-track="${t.id}">${artwork(t.art)}</button><button class="copy" data-track="${t.id}"><strong>${t.series?'▤ ':''}${t.title}</strong><small>${trackMeta(t)}</small></button>${B('play','▶','play',`data-id="${t.id}" aria-label="播放${t.title}"`)}</div>`).join('')}
const rankListeners=['330w+','280w+','230w+','196w+','172w+','148w+','120w+','96w+','78w+','64w+'];
function rankRows(list,start){
  return list.map((t,i)=>{const n=start+i,rank=n+1,cls=n<3?'top'+rank:'top-other';
    return `<div class="row-track rank-row"><button class="thumb" data-track="${t.id}" aria-label="查看${t.title}">${artwork(t.art)}</button><span class="copy rank-copy" data-track="${t.id}"><span class="rank-title"><span class="rank-top ${cls}">TOP${rank}</span><strong>${t.title}</strong></span><small>${rankListeners[n]}人收听</small></span>${B('play','▶','play',`data-id="${t.id}" aria-label="播放${t.title}"`)}</div>`;
  }).join('');
}
function section(title,list,more=true,style='',hideMeta=false){return `<section class="section ${style}"><div class="heading"><h2>${title}</h2>${more?B('more',`更多 ${icon('chevron')}`,'more',`data-title="${title}" data-ids="${list.map(t=>t.id).join(',')}"`):''}</div><div class="rail">${list.map(t=>card(t,hideMeta)).join('')}</div></section>`}
function chips(values,selected,action){return `<div class="chips">${values.map(v=>B(action,v,v===selected?'active':'',`data-value="${v}"`)).join('')}</div>`}
function header(title,backButton=false){return `<header class="toolbar">${backButton?B('back','‹','circle','aria-label="返回"'):''}<h1>${title}</h1>${!backButton?B('search','⌕','circle','aria-label="搜索"'):''}</header>`}
function nav(active){return `<nav class="bottom" aria-label="底部导航">${[['home','home','首页'],['audio','music','助眠'],['monitor','moon','睡觉'],['report','bars','报告'],['profile','user','个人']].map(([a,i,t])=>B(a,`${a==='monitor'?`<span class="panda">${art(2,[319,2071,92,79])}</span>`:icon(i,a==='home'||a==='profile')}<span>${t}</span>`,active===a?'selected':'')).join('')}</nav>`}
function recommendationResult(){
  if(!S.recommended?.length)return '';
  const t=get(S.recommended[S.recommendIndex%S.recommended.length]);
  return `<div class="recommend-result"><div class="recommend-result-heading recommend-result-caption"><strong>根据「${S.filterSleep}·${S.filterType}」推荐</strong></div><div class="recommend-audio"><button class="recommend-thumb" data-track="${t.id}" aria-label="查看${t.title}">${artwork(t.art)}</button><div class="recommend-audio-copy"><button data-track="${t.id}" class="recommend-audio-title">${t.title}</button><small>${trackMeta(t,'分钟')}</small></div>${B('play',icon('play',true),'recommend-play',`data-id="${t.id}" aria-label="播放${t.title}"`)}</div>${B('pickBySleep',`<span>想自己挑？看看声音怎么帮你</span>${icon('chevron')}`,'recommend-pick')}</div>`;
}
const SLEEP_CHOICES=['快速入睡','提高深睡','舒缓心绪','屏蔽杂音','放松身体','陪伴入眠','专注','不限'];
const TYPE_CHOICES=['白噪音','舒眠音乐','睡前故事','钵音','脑波','冥想','不限'];
function recommendHead(title,progress){
  return `<div class="recommend-head"><div class="recommend-record">${art(10,[83,1544,174,168])}</div><div class="recommend-head-copy"><h3>${title}</h3><small>${progress}</small></div>${B('resetRecommend','重新选择','recommend-clear','aria-label="重新选择筛选条件"')}</div>`;
}
function recommender(){
  const sleepChips=SLEEP_CHOICES.map(v=>B('sleepChoice',v,v===S.filterSleep?'active':'',`data-value="${v}"`)).join('');
  const typeChips=TYPE_CHOICES.map(v=>B('typeChoice',v,v===S.filterType?'active':'',`data-value="${v}"`)).join('');
  const sleepStep=`<div class="recommend-step step-sleep">${recommendHead('选择你的睡眠困扰','为你精准推荐')}<div class="chips recommend-chips">${sleepChips}</div></div>`;
  const typeStep=`<div class="recommend-step step-type">${recommendHead('选择你喜欢的类型','为你精准推荐')}<div class="chips recommend-chips">${typeChips}</div></div>`;
  const pickedList=[S.filterSleep,S.filterType].filter(Boolean);
  const pickedRow=pickedList.length?`<div class="picked-summary ${S.loading?'searching':''}"><div class="picked-label">${S.loading?'根据下列标签搜索中':'您已选择的标签'}</div><div class="picked-row">${pickedList.map(v=>`<span class="picked-chip">${v}</span>`).join('')}</div></div>`:'';
  const body=S.loading?pickedRow:(S.recommended?.length?recommendationResult():pickedRow);
  return `<section class="panel recommender"><div class="recommend-viewport"><div class="recommend-track${S.recommendStep==='type'?' show-type':''}">${sleepStep}${typeStep}</div></div>${body}</section>`;
}
function pickedSleepRow(){
  if(!S.filterSleep||S.recommendStep!=='type')return '';
  return `<div class="picked-sleep-row"><span class="picked-chip">${S.filterSleep}</span></div>`;
}
function privatePicksSection(){
  return `<section class="section private-picks"><div class="heading"><h2>为你推荐</h2></div>${recommender()}</section>`;
}
function fitRecommendViewport(scope){
  if(!scope)return;
  const vp=scope.querySelector('.recommend-viewport');if(!vp)return;
  const track=vp.querySelector('.recommend-track');if(!track)return;
  const showType=track.classList.contains('show-type');
  const step=vp.querySelector(showType?'.recommend-step.step-type':'.recommend-step.step-sleep');
  if(step)vp.style.height=step.offsetHeight+'px';
}
function slideRecommendStep(scope,to,done){
  const vp=scope&&scope.querySelector('.recommend-viewport');if(!vp){done&&done();return}
  const track=vp.querySelector('.recommend-track');if(!track){done&&done();return}
  const targetStep=vp.querySelector(to==='type'?'.recommend-step.step-type':'.recommend-step.step-sleep');
  if(targetStep)vp.style.height=targetStep.offsetHeight+'px';
  vp.classList.remove('sand');void vp.offsetWidth;vp.classList.add('sand');
  const from=to==='type'?0:-50,target=to==='type'?-50:0;
  track.classList.toggle('show-type',to==='type');
  try{track.animate([
    {transform:`translateX(${from}%)`,filter:'blur(0px)'},
    {transform:`translateX(${((from+target)/2).toFixed(2)}%)`,filter:'blur(.7px)',offset:.5},
    {transform:`translateX(${target}%)`,filter:'blur(0px)'}
  ],{duration:640,easing:'cubic-bezier(.34,.06,.16,1)',fill:'both'})}catch(e){}
  setTimeout(()=>{vp.classList.remove('sand');fitRecommendViewport(scope);done&&done()},660);
}

function effectSection(title){let pool=tracks.filter(t=>!t.series);let list=pool.filter(t=>t.effect===S.effect);list=[...list,...pool.filter(t=>t.effect!==S.effect)].slice(0,12);return `<section class="section effect-section"><h2>${title}</h2>${chips(effects,S.effect,'effect')}<div class="grid">${list.map(t=>card(t)).join('')}</div></section>`}
function home(){let rec=Array.from({length:4},(_,i)=>tracks[(S.refresh*4+i+30)%36]);return `<div class="page home"><div class="hero">${art(2,[72,0,580,380])}</div><div class="panel alarm"><div class="info">ⓘ 睡眠监测未开启时，闹钟不生效 ${B('alarm','设置 ›','more','style="float:right"')}</div><div class="row"><div><h2>⏰ ${S.alarmKind==='关闭'?'闹钟已关闭':S.alarmKind}</h2><p class="muted">${S.alarmKind==='任务闹钟'?'跳舞':'安心入睡，准时醒来'}</p></div><span class="time">${S.alarmKind==='关闭'?'—':S.alarmTime}</span></div>${B('monitor','开启睡眠监测','primary')}</div><div class="banner">${art(2,[92,688,540,122])}</div>${chips(['CBT-I计划','挑战赛','助眠声音','呼吸练习'],'','quick')}<section class="section"><div class="heading"><h2>我的专属定制计划</h2>${B('plans','更换计划 ›','more')}</div><div class="rail">${[1,2,3].map(n=>`<div class="plan"><div class="plan-picture">${art(2,[97,980,432,208])}<span class="badge" style="position:absolute;top:12px;left:14px">第${n}天</span><small>${lessons[n-1]}　9分钟</small></div><div class="plan-bottom"><h3>21天睡眠改善计划</h3>${B('intro','开始练习','primary','data-id="course"')}</div></div>`).join('')}</div></section><section class="section"><div class="heading"><h2>今日专属推荐</h2></div><div class="rail">${rec.map(t=>card(t)).join('')}</div></section><section class="section"><div class="heading"><h2>热门榜单</h2>${B('audio','更多 ›','more')}</div><div class="rail ranks">${[0,1].map(n=>`<div class="rank">${rankRows(tracks.slice(n*5,n*5+5),n*5)}</div>`).join('')}</div><div class="dots">● ○</div></section></div>${nav('home')}`}
function mixes(count){return `<div class="rail">${Array.from({length:count},(_,i)=>`<button class="card mix" data-track="t0-${i%6}"><div class="cover"><i>☂</i><i>♨</i><i>≈</i><i>♬</i></div><strong>${['我的雨夜','午后小憩','山林微风','海边晚安','冬日壁炉','安静时光'][i]}</strong><small>雨声 · 火炉 · 风声</small></button>`).join('')}</div>`}
function mixMore(){return `<button class="card mix mix-more" data-a="favorites" aria-label="查看全部我的混音"><div class="cover"><span class="mix-more-arrow">${icon('chevron')}</span></div><strong>更多混音</strong></button>`}
function mixRows(count){let names=['我的雨夜','午后小憩','山林微风','海边晚安','冬日壁炉','安静时光'];return Array.from({length:count},(_,i)=>`<div class="row-track"><button class="thumb mix-thumb" data-track="t0-${i%6}" aria-label="查看${names[i]}"><span class="mix-thumb-grid"><i></i><i></i><i></i><i></i></span></button><button class="copy" data-track="t0-${i%6}"><strong>${names[i]}</strong><small>雨声 · 火炉 · 风声</small></button>${B('play','▶','play',`data-id="t0-${i%6}" aria-label="播放${names[i]}"`)}</div>`).join('')}
function typeFolder(){
 const title={'助眠冥想':'冥想','钵音疗愈':'钵音','深睡眠脑波':'脑波'}[S.tab];
 return B('h5',`<svg class="folder-layers" viewBox="0 0 360 142" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="folderBack" x2="1" y2="1"><stop stop-color="#596482"/><stop offset="1" stop-color="#3e4f78"/></linearGradient><linearGradient id="folderFace" x1="0" y1="0" x2=".25" y2="1"><stop stop-color="#8b95b0"/><stop offset=".48" stop-color="#6479ad"/><stop offset="1" stop-color="#222e48"/></linearGradient></defs><path d="M32 20V9Q32 2 40 2H91Q98 2 104 8L113 17H314Q325 17 324 27L310 128H46Z" fill="url(#folderBack)" stroke="#9baaca" stroke-opacity=".25"/><path d="M13 18H65Q70 18 75 23L87 31H345Q357 31 353 44L329 128Q327 137 317 137H44Q34 137 31 127L3 32Q0 18 13 18Z" fill="url(#folderFace)" stroke="#c8d3e5" stroke-opacity=".45" stroke-width="1.3"/></svg><strong>什么是${title}？</strong><small>你想了解的都在这里</small><span class="circle">${icon('chevron')}</span>`,'folder',`aria-label="什么是${title}？查看类型介绍"`);
}
const brainSamples=[['2HZ深度放松','brain',44.2,38.06],['8HZ睡前放松','wave',26.8,45.13],['9HZ午间放松','sea',44.2,52.91],['14HZ提高注意力','deep',26.8,60.69],['陪伴你的整晚','music2',44.2,68.43],['感受此刻的宁静','sea',26.8,76.15]];
brainSamples.forEach(([title,art],i)=>tracks.push({id:'brain-demo-'+i,title,art,type:'深睡眠脑波',duration:1800,effect:effects[i%effects.length],paid:'',series:false}));
function brainIntro(){return `<div class="page brain-intro-page"><header class="brain-intro-toolbar">${B('back','‹','circle','aria-label="返回脑波分类"')}</header><div class="brain-intro-art"><img src="assets/brain-intro.png" width="1125" height="9330" alt="深睡眠脑波介绍：脑波与频率、Delta、Theta、Alpha、Beta、组合频率、疗愈频率及使用建议。">${brainSamples.map(([title,art,left,top],i)=>B('play','<span class="sr-only">立即试听：'+title+'</span>','brain-hotspot',`data-id="brain-demo-${i}" style="left:${left}%;top:${top}%" aria-label="立即试听：${title}"`)).join('')}</div></div>`}

function category(){let list=tracks.filter(t=>t.type===S.tab&&!t.series);if(S.tab==='白噪音')return `${section('精选混音',list,true,'',true)}<section class="section"><div class="heading"><h2>自定义混音</h2>${B('favorites','更多 ›','more')}</div>${mixes(6)}</section><section class="section"><h2>白噪音类型</h2>${chips(['课堂','雨声','哄睡','大自然声','城市','沉浸音效','生活之声','动物','电子噪音'],S.noise,'noise')}<div class="noise-grid">${Array.from({length:25},(_,i)=>`<button data-track="t0-${i%6}"><b>${['≈','☂','♧','♬','☁'][i%5]}</b>${S.noise}${i%5?i%5+1:''}</button>`).join('')}</div></section>`;let folder=['助眠冥想','钵音疗愈','深睡眠脑波'].includes(S.tab);if(S.tab==='钵音疗愈')return `${typeFolder()}<section class="section bowl-featured"><div class="heading"><h2>精选钵音</h2></div><div class="grid">${list.map(t=>card(t)).join('')}</div></section>`;return `${folder?typeFolder():''}${groups[S.tab].map((title,i)=>S.tab==='睡前故事'&&i===0?featuredStories():section(title,[...list.slice(i%3),...list.slice(0,i%3)].map((t,j)=>S.tab==='舒眠音乐'&&i===0?{...t,art:['record1','record2','record3'][j%3]}:t),!(S.tab==='舒眠音乐'&&i===0),i===0?(S.tab==='睡前故事'?'story-shelf':S.tab==='舒眠音乐'?'record-section':'portrait-section'):i===1?'wide-section':'compact-section')).join('')}`}
function latestSection(){
  const items=tracks.slice(12,17).map((t,i)=>({...t,art:['newsea','newsand','newwave','sea','wave'][i],releaseDate:['2026-11-01','2026-10-31','2026-10-30','2026-10-29','2026-10-28'][i]}));
  const latestCard=(t,i)=>`<button class="card latest-card" data-track="${t.id}" aria-label="查看${t.title}"><div class="cover">${artwork(t.art)}${i%items.length<2?'<span class="new-badge">new</span>':''}</div><strong>${t.title}</strong><small><time datetime="${t.releaseDate}">${t.releaseDate.slice(5).replace('-','.')} 上新</time> · ${t.type}</small></button>`;
  return `<section class="section latest" aria-label="最近上新"><div class="rail loop" data-count="${items.length}" tabindex="0" aria-label="最近上新，共${items.length}个音频，可左右滑动">${[...items,...items,...items].map(latestCard).join('')}</div><div class="latest-dots" aria-hidden="true">● ○ ○</div></section>`;
}
function audioContent(){return S.tab==='推荐'?`${latestSection()}${nearSection()}${privatePicksSection()}${section('精选音频',tracks.slice(0,6))}${seriesSection()}${effectSection('听你所需')}`:category()}
function audio(){let rec=S.tab==='推荐';return `<div class="page audio-page ${rec?'recommend-page':'star-page'}">${header('助眠音频')}<div class="tabs">${['推荐',...types].map(t=>B('tab',t,S.tab===t?'active':'',`data-value="${t}"`)).join('')}</div><div class="audio-content">${audioContent()}</div></div>${nav('audio')}${S.fromMonitor?B('returnMonitor','☾<br>返回监测','float'):''}`}
function moreIconSvg(key){
  const icons={
    note:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17V6l10-2v11"/><circle cx="6.5" cy="17.5" r="2.5"/><circle cx="16.5" cy="15.5" r="2.5"/></svg>',
    mixer:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 4v5M5 15v5M12 4v9M12 19v1M19 4v2M19 12v8"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="16" r="2"/><circle cx="19" cy="9" r="2"/></svg>',
    meditation:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4.6" r="2.1"/><path d="M12 7.8c-2.4 0-3.4 1.9-3.4 3.9 0 1.9 1.5 3.2 3.4 3.2s3.4-1.3 3.4-3.2c0-2-1-3.9-3.4-3.9Z"/><path d="M4.2 18.6c2 0 3.3-1.3 4.3-2.7M19.8 18.6c-2 0-3.3-1.3-4.3-2.7"/></svg>',
    music:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l11 2v10"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="17" r="3"/><path d="M9 9l11 2"/></svg>',
    book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h5.5A2.5 2.5 0 0 1 13 6.5V20a2.5 2.5 0 0 0-2.5-2.5H5Z"/><path d="M19 4h-5.5A2.5 2.5 0 0 0 11 6.5V20a2.5 2.5 0 0 1 2.5-2.5H19Z"/></svg>',
    bowl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5h16c0 4.2-2.8 7.5-8 7.5s-8-3.3-8-7.5Z"/><path d="M7 19h10"/><path d="M9 7.4c1-1.4 3-1.4 4 0"/><path d="M10.5 4.6c.8-.8 2.2-.8 3 0"/></svg>',
    wave:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M3 12h1.5M7 12V8.6M7.01 15.4M11 12V5.5M11.01 18.5M15 12V8.6M15.01 15.4M19 12h1.5M9 12h2M13 12h2"/></svg>'
  };
  return icons[key]||icons.note;
}
function moreIconKey(title){
  if(title==='精选音频')return 'note';
  if(title==='精选混音')return 'mixer';
  const map={'助眠冥想':'meditation','舒眠音乐':'music','睡前故事':'book','钵音疗愈':'bowl','深睡眠脑波':'wave'};
  for(const type of ['助眠冥想','舒眠音乐','睡前故事','钵音疗愈','深睡眠脑波']){
    if(title===type||groups[type].includes(title))return map[type];
  }
  return 'note';
}
function morePageCard(t){
  if(typeof t==='string')t=get(t);
  return `<button class="more-card-2" data-track="${t.id}" aria-label="查看${t.title}"><span class="more-card-cover">${artwork(t.art)}<span class="more-card-shade"></span><span class="more-card-copy"><strong>${t.title}</strong><small>${Math.round(t.duration/60)}分钟·${t.effect}</small></span><span class="more-card-play">${icon('play',true)}</span></span></button>`;
}
function morePage(){
  return `<div class="more-page">${B('close','×','circle more-close','aria-label="关闭弹窗"')}<div class="more-hero"><span class="more-icon">${moreIconSvg(moreIconKey(S.moreTitle))}</span><h2>${S.moreTitle}</h2></div><div class="more-grid-2">${S.moreIds.map(morePageCard).join('')}</div></div>`;
}
function openMore(title,ids){clearTimeout(S.recommendTimer);S.loading=false;S.moreTitle=title;S.moreIds=ids;S.modal='more';renderModal()}
function search(){let result=tracks.filter(t=>`${t.title}${t.type}${t.effect}`.includes(S.query));return `<div class="page search-page"><form class="search-form" id="search-form"><div class="search-input-wrap">${icon('search')}<input aria-label="搜索音频" name="q" value="${esc(S.query)}" placeholder="助眠音乐" autocomplete="off" enterkeyhint="search">${B('clearQuery',S.query?'×':'','clear-input','aria-label="清空搜索"')}</div>${B('back','取消','cancel-search')}</form>${S.searched?`<div class="result-count">“${esc(S.query)}” 的搜索结果 · ${result.length} 个音频</div>${result.length?rows(result):'<div class="empty">暂未找到相关音频<br>试试「雨」「冥想」或「快速入睡」</div>'}`:`<section class="search-block search-history"><div class="small-heading"><span>搜索历史</span>${S.searchHistory.length?B('clearHistory','清空历史'):''}</div><div class="search-chips">${S.searchHistory.map(t=>`<span class="history-chip">${B('keyword',esc(t),'history-keyword',`data-value="${esc(t)}"`)}${B('deleteHistory',icon('close'),'history-delete',`data-value="${esc(t)}" aria-label="删除搜索历史：${esc(t)}"`)}</span>`).join('')}</div></section><section class="search-block discovery"><div class="small-heading">搜索发现</div><div class="search-chips">${[['睡前故事','hot'],['提升深睡','new'],['快速入睡','hot']].map(([t,tag])=>B('keyword',`${t}${tag==='hot'?'<sup class="discovery-tag hot">🔥热🔥</sup>':'<sup class="discovery-tag new">new</sup>'}`, 'search-chip',`data-value="${t}"`)).join('')}</div></section>${searchRanks()}`}</div>`}
function intro(){let t=get(S.track);return `<div class="page"><div class="intro-hero">${artwork(t.art)}<div class="toolbar">${B('back','‹','circle','aria-label="返回"')}<div style="flex:1"></div>${B('favorite',S.favs.includes(t.id)?'♥':'♡','circle','aria-label="收藏音频"')}${B('share','↗','circle','aria-label="分享"')}</div>${t.series?'<div class="intro-people"><span class="intro-avatars"><i>&#x1F642;</i><i>&#x1F634;</i><i>&#x1F98A;</i></span>824个人在这里</div>':''}</div><section class="intro-panel">${t.series?`<div class="labels">${t.paid?`<span class="badge">${t.paid}</span>`:`<span class="badge">免费</span>`}<span class="badge">${t.effect}</span><span class="badge">${t.type}</span></div>`:`<div class="labels">${t.paid?`<span class="badge">${t.paid}</span>`:''}<span class="badge">${t.type}</span><span class="badge">${t.effect}</span></div>`}<h1>${t.title}</h1>${t.series?`<div class="description">睡不好，往往不只是困意不足，也可能与身体紧绷、睡前想太多和环境声音有关。<br>计划分三个阶段：先让身体和思绪慢下来，再稳定睡前状态，最后把熟悉的方法逐渐变成自己的睡前流程。<br>每晚完成一项睡前练习，按自己的节奏推进，逐渐找到适合自己的放松方式。</div>`:`<div class="description ${S.expanded?'':'collapsed'}">给今晚留一段安静的时间。${t.title}陪你放慢节奏，让身体与思绪慢慢安定下来。<br>选择一个舒适的姿势，轻轻闭上眼睛，把注意力带回自己的呼吸。不用刻意追求某种状态，只需跟随声音，感受此刻。<br>每晚完成一项睡前练习，按自己的节奏推进，逐渐找到适合自己的放松方式。你可以重复喜欢的段落，将它变成熟悉的睡前仪式。<br>今晚，放下白天的忙碌，好好休息。</div>${B('expand',S.expanded?'收起 ⌃':'展开全部 ⌄','expand')}`}${t.series?`<section class="section course-content"><h2>课程内容 <small>共${t.id==='course'?21:7}节</small></h2>${lessonRows(t)}</section>`:''}${t.series?'':section('相关推荐',tracks.filter(x=>x.type===t.type&&x.id!==t.id).slice(0,4),false)}</section></div>${!t.series?`<div class="fixed-play">${t.paid?B('unlock',`${icon('lock')}解锁内容`,'primary','data-a="unlock"'):B('play','▶ 开始播放','primary',`data-id="${t.id}"`)}</div>`:''}`}
function lessonRows(t){return Array.from({length:t.id==='course'?21:7},(_,i)=>`<div class="lesson-row ${S.page==='player'&&S.episode===i?'current':''}"><span class="lesson-index">${String(i+1).padStart(2,'0')}</span><span class="lesson-thumb">${artwork(t.art)}</span><span class="copy"><strong>${lessons[i%7]}</strong><small>${9+i%4*3}分钟</small></span>${B('lesson',icon('play',true),'lesson-play',`data-episode="${i}" data-id="${t.id}" aria-label="播放第${i+1}节"`)}</div>`).join('')}
const fmt=n=>`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`;
const fmtElapsed=n=>`${String(Math.floor(n/60)).padStart(2,'0')}:${String(Math.floor(n%60)).padStart(2,'0')}`;
function player(){let t=get(S.playerTrack);return `<div class="page player"><div class="player-background">${artwork(t.art)}</div><div class="player-shade"></div><header class="toolbar player-toolbar">${B('back','‹','circle','aria-label="返回"')}${B('share','↗','circle','aria-label="分享"')}</header><div class="player-controls"><div class="player-title"><div><h1>${t.series?lessons[S.episode%7]:t.title}</h1>${t.series?`<small>${t.title} · 第${S.episode+1}节</small>`:''}</div>${B('toggle',icon(S.playing?'pause':'play',!S.playing),'big-play','aria-label="播放或暂停"')}</div><div class="player-progress"><span id="elapsed">${fmt(S.position)}</span><input class="progress" id="progress" aria-label="播放进度" type="range" min="0" max="${duration()}" value="${S.position}" style="--progress:${S.position/duration()*100}%"><span>${fmt(duration())}</span></div><div class="player-tools">${B('settings',`${icon('sliders')}<span>播放设置</span>`)}${t.series?B('playlist',`${icon('list')}<span>播放列表(${t.id==='course'?21:7})</span>`):''}${B('favorite',`${icon('heart',S.favs.includes(t.id))}<span>${S.favs.includes(t.id)?'已收藏':'收藏'}</span>`)}${B('monitor',`${icon('moon')}<span>去睡觉</span>`)}</div></div></div>`}
function collectionContent(){
  const favorites=S.page==='favorites',ids=favorites?S.favs:S.history;
  return ids.length?rows(ids.map(get)):`<div class="empty">${favorites?'♡ 暂无收藏<br>点击音频介绍或播放器的爱心收藏':'◷ 暂无播放记录<br>开始播放后，会自动保存在这里'}</div>`;
}
function collection(){
  return `<div class="page collection-page">${header(S.page==='favorites'?'我的收藏':'历史播放',true)}<div class="library-tabs" role="tablist" aria-label="我的音频" style="--active-tab:${S.page==='history'?1:0}">${[['favorites','我的收藏'],['history','历史播放']].map(([value,label])=>B('collectionTab',label,S.page===value?'active':'',`data-value="${value}" id="library-tab-${value}" role="tab" aria-selected="${S.page===value}" aria-controls="library-panel" tabindex="${S.page===value?0:-1}"`)).join('')}</div><div id="library-panel" role="tabpanel" aria-labelledby="library-tab-${S.page}">${collectionContent()}</div></div>`;
}
function switchCollectionTab(value){
  if(!['history','favorites'].includes(value)||S.page===value)return;
  const direction=value==='history'?1:-1;S.page=value;
  app.querySelector('.toolbar h1').textContent=value==='favorites'?'我的收藏':'历史播放';
  const tabs=app.querySelector('.library-tabs'),panel=$('#library-panel');
  tabs.style.setProperty('--active-tab',value==='history'?1:0);
  tabs.querySelectorAll('[role="tab"]').forEach(button=>{const selected=button.dataset.value===value;button.classList.toggle('active',selected);button.setAttribute('aria-selected',selected);button.tabIndex=selected?0:-1});
  panel.setAttribute('aria-labelledby',`library-tab-${value}`);panel.innerHTML=collectionContent();app.scrollTop=0;
  animateContent(panel,direction,12,320);
}
function monitorDuration(seconds){const n=Math.max(0,Math.floor(seconds));return n<60?`已监测${n}秒`:n<3600?`已监测${Math.floor(n/60)}分钟`:`已监测${Math.floor(n/3600)}小时${Math.floor(n%3600/60)}分钟`}
function alarmLabel(){return S.alarmKind==='关闭'?'闹钟已关闭':`${S.alarmKind} ${S.alarmTime.replace(/^0(?=\d:)/,'')}`}
function monitor(){
 return `<div class="page monitor-page star-page"><div class="monitor-meteors" aria-hidden="true"></div><section class="monitor-summary" aria-label="睡眠监测"><div class="monitor-clock" id="monitor-clock">${new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false})}</div>${B('alarm',alarmLabel(),'monitor-alarm')}<p id="monitor-time">${monitorDuration((Date.now()-S.monitorStart)/1000)}</p></section><div class="monitor-carousel rail" aria-label="今日专属推荐音频">${[todayPicks()[0].id].map(id=>{const t=get(id),active=S.playerTrack===t.id,pos=active?S.position:0;return `<article class="monitor-audio ${active?'current':''}" data-monitor-id="${id}"><div class="monitor-cover">${artwork(t.art)}</div><div class="monitor-card-shade"></div><span class="monitor-ribbon">${t.paid||'免费'}</span><div class="monitor-card-title"><small>今日专属推荐</small><h2>${t.title}</h2><p>ⓘ 为你推荐了一段适合睡前聆听的助眠音频</p></div>${B('monitorPlay',`<span>${active&&S.playing?'暂停':'播放'}</span>${icon(active&&S.playing?'pause':'play',!(active&&S.playing))}`,'monitor-play',`data-id="${id}" aria-label="${active&&S.playing?'暂停':'播放'}${t.title}"`)}<div class="monitor-track-time"><span data-monitor-elapsed="${id}">${fmtElapsed(active?pos:0)}</span><span>${fmt(t.duration)}</span></div><div class="monitor-track-progress"><i data-monitor-progress="${id}" style="width:${active?pos/t.duration*100:0}%"></i></div><footer>${B('monitorTimer',`${icon('timer')}<span>${S.timer?'定时 '+S.timer+'分钟':'定时播放'}</span>`)}${B('monitorAudio',`${icon('list')}<span>更多音频</span>`)}</footer></article>`}).join('')}</div><div class="monitor-exit-area">${B('endMonitor','退出','monitor-exit')}<p class="analysis-line">睡眠分析中<span class="analysis-dots">…</span></p></div><div class="monitor-noise"><svg viewBox="0 0 402 22" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="noise-line"><stop stop-color="#81dce7"/><stop offset="1" stop-color="#9ee773"/></linearGradient></defs><path d="M0 12 Q40 13 75 12 T150 11 T225 12 T300 13 T402 12" fill="none" stroke="url(#noise-line)" stroke-width="2"/></svg><small>当前环境噪音61分贝 可能会影响睡眠质量</small></div></div>`;
}

function featuredStories(){
 const all=tracks.filter(t=>t.type==='睡前故事'),list=all.slice(S.storyBatch%2*3,S.storyBatch%2*3+3);
 return `<section class="section featured-stories"><div class="heading"><h2>⭐ 精选故事</h2>${B('storyRefresh','换一批 '+icon('refresh'),'more')}</div><div class="book-shelf">${list.map(t=>`<button class="story-book" data-track="${t.id}" aria-label="查看${t.title}">${artwork(t.art)}<span class="book-label"><strong>${t.title}</strong><small>${Math.round(t.duration/60)}分钟</small></span></button>`).join('')}<i class="shelf-glass" aria-hidden="true"></i></div></section>`;
}
function openAudio(id){if(get(id).type==='白噪音')play(id);else go('intro',{track:id})}
function buildFolderStage(folderEl,fr,pr){
  const stage=document.createElement('div');
  stage.className='h5-stage';
  stage.style.cssText='position:absolute;inset:0;z-index:24;pointer-events:none;overflow:hidden';
  const wrap=document.createElement('div');
  wrap.className='h5-folder';
  wrap.style.cssText=`position:absolute;left:${fr.left-pr.left}px;top:${fr.top-pr.top}px;width:${fr.width}px;height:${fr.height}px;perspective:1100px;z-index:5`;
  const cloneH5=folderEl.cloneNode(true);
  cloneH5.removeAttribute('aria-label');
  cloneH5.setAttribute('aria-hidden','true');
  cloneH5.style.cssText='position:absolute;inset:0;width:100%;height:100%;margin:0;padding:0;pointer-events:none';
  const svg=cloneH5.querySelector('svg.folder-layers');
  let faceSvg=null;
  if(svg){
    const faceCandidate=svg.cloneNode(true);
    const facePaths=faceCandidate.querySelectorAll(':scope > path');
    if(facePaths.length>1){facePaths[0].remove();faceSvg=faceCandidate;}
    const backPaths=svg.querySelectorAll(':scope > path');
    for(let i=1;i<backPaths.length;i++)backPaths[i].remove();
    svg.style.cssText='position:absolute;inset:0;width:100%;height:100%';
  }
  const face=document.createElement('div');
  face.className='h5-face';
  face.style.cssText='position:absolute;inset:0;transform-origin:center bottom;backface-visibility:hidden;will-change:transform;z-index:2';
  if(faceSvg){faceSvg.style.cssText='position:absolute;inset:0;width:100%;height:100%';face.appendChild(faceSvg)}
  [...cloneH5.children].forEach(child=>{if(child!==svg)face.appendChild(child)});
  cloneH5.appendChild(face);
  wrap.appendChild(cloneH5);
  stage.appendChild(wrap);
  $('#phone').appendChild(stage);
  return {stage,wrap,face,clone:cloneH5};
}
function openBrainH5(el){
  if(!el||!motionEnabled()){go('brainIntro');return}
  if(document.querySelector('.h5-stage'))return;
  const folderEl=el.closest('.folder')||el;
  const phone=$('#phone'),pr=phone.getBoundingClientRect();
  const fr=folderEl.getBoundingClientRect();
  const {stage,clone,face}=buildFolderStage(folderEl,fr,pr);
  const backdrop=clonePageLeaving('.bottom,.float');
  if(backdrop)backdrop.querySelectorAll('.folder').forEach(el=>{el.style.visibility='hidden'});
  resetRecommendModule();clearRecommendation();
  S.stack.push(snapshot());
  Object.assign(S,{page:'brainIntro',modal:'',expanded:false,fromMonitor:false});
  render();app.scrollTop=0;
  const page=app.querySelector('.brain-intro-page');
  if(!page){stage.remove();if(backdrop)backdrop.remove();return}
  page.style.visibility='hidden';
  const pw=pr.width,ph=pr.height;
  const w0=Math.round(fr.width*0.58),h0=Math.round(fr.height*0.92),s0=w0/pw;
  const x0=Math.round((fr.width-w0)/2),y0=Math.round(fr.height-h0-6);
  const paper=document.createElement('div');
  paper.className='h5-paper';
  paper.style.cssText=`position:absolute;left:${x0}px;top:${y0}px;width:${w0}px;height:${h0}px;border-radius:14px;overflow:hidden;background:#030308;z-index:1;box-shadow:0 22px 60px #000000a6,0 0 0 1px #ffffff12;opacity:0`;
  const inner=page.cloneNode(true);
  inner.removeAttribute('id');
  inner.style.cssText=`position:absolute;left:0;top:0;width:${pw}px;transform-origin:top left;transform:scale(${s0})`;
  const paperBar=inner.querySelector('.brain-intro-toolbar');
  if(paperBar){paperBar.style.opacity='0';paperBar.animate([{opacity:0},{opacity:1}],{duration:280,delay:790,easing:'ease-out',fill:'forwards'})}
  paper.appendChild(inner);
  clone.appendChild(paper);
  face.animate([{transform:'perspective(1100px) rotateX(0deg)',opacity:1,offset:0},{transform:'perspective(1100px) rotateX(58deg)',opacity:1,offset:.6},{transform:'perspective(1100px) rotateX(78deg)',opacity:0,offset:1}],{duration:440,easing:'cubic-bezier(.3,.7,.2,1)',fill:'forwards',delay:20});
  const paperAnim=paper.animate([
    {left:`${x0}px`,top:`${y0}px`,width:`${w0}px`,height:`${h0}px`,borderRadius:'14px',opacity:0,transform:'rotate(-6deg)',easing:'ease-out',offset:0},
    {opacity:1,offset:.08},
    {left:`${x0}px`,top:`${y0-h0*0.55}px`,width:`${w0}px`,height:`${h0}px`,borderRadius:'14px',transform:'rotate(-6deg)',easing:'ease-out',offset:.2},
    {left:`${x0-8}px`,top:`${y0-h0*1.18}px`,width:`${w0*1.04}px`,height:`${h0*1.04}px`,borderRadius:'14px',transform:'rotate(-4deg)',easing:'cubic-bezier(.2,.8,.2,1)',offset:.36},
    {left:`${-Math.round(fr.left-pr.left)}px`,top:`${-Math.round(fr.top-pr.top)}px`,width:`${pw}px`,height:`${ph}px`,borderRadius:'0px',opacity:1,transform:'rotate(0deg)',offset:1}
  ],{duration:820,delay:240,fill:'both'});
  inner.animate([{transform:`scale(${s0})`},{transform:'scale(1)'}],{duration:820,delay:240,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
  setTimeout(()=>{paper.style.zIndex='3'},420);
  paperAnim.finished.catch(()=>{}).then(()=>{page.style.visibility='';stage.remove();if(backdrop)backdrop.remove()});
  setTimeout(()=>{if(stage.isConnected){page.style.visibility='';stage.remove();if(backdrop)backdrop.remove()}},2600);
}
function closeBrainH5(){
  if(document.querySelector('.h5-stage'))return;
  if(!motionEnabled()){back();return}
  const phone=$('#phone'),pr=phone.getBoundingClientRect();
  const cur=app.querySelector('.brain-intro-page');
  if(!cur){back();return}
  const pageClone=cur.cloneNode(true);
  const prev=S.stack[S.stack.length-1];
  S.stack.pop();Object.assign(S,prev);render();app.scrollTop=prev.scroll||0;
  app.querySelectorAll('.rail,.tabs,.chips').forEach((el,i)=>el.scrollLeft=prev.rails?prev.rails[i]||0:0);
  const folderEl=app.querySelector('.folder');
  if(!folderEl){return}
  const fr=folderEl.getBoundingClientRect();
  const {stage,clone,face}=buildFolderStage(folderEl,fr,pr);
  face.style.transform='perspective(1100px) rotateX(78deg)';
  const pw=pr.width,ph=pr.height;
  const w0=Math.round(fr.width*0.58),h0=Math.round(fr.height*0.92),s0=w0/pw;
  const x0=Math.round((fr.width-w0)/2),y0=Math.round(fr.height-h0-6);
  const paper=document.createElement('div');
  paper.className='h5-paper';
  paper.style.cssText=`position:absolute;left:${-Math.round(fr.left-pr.left)}px;top:${-Math.round(fr.top-pr.top)}px;width:${pw}px;height:${ph}px;border-radius:0;overflow:hidden;background:#030308;z-index:3;box-shadow:0 18px 44px #0007`;
  const inner=pageClone;
  inner.removeAttribute('id');
  inner.style.cssText=`position:absolute;left:0;top:0;width:${pw}px;transform-origin:top left;transform:scale(1)`;
  paper.appendChild(inner);
  clone.appendChild(paper);
  paper.animate([
    {left:`${-Math.round(fr.left-pr.left)}px`,top:`${-Math.round(fr.top-pr.top)}px`,width:`${pw}px`,height:`${ph}px`,borderRadius:'0px',transform:'rotate(0deg)',easing:'cubic-bezier(.4,0,.2,1)'},
    {left:`${x0-10}px`,top:`${y0-h0*1.1}px`,width:`${w0*1.08}px`,height:`${h0*1.08}px`,borderRadius:'14px',transform:'rotate(-4deg)',easing:'ease-in',offset:.62},
    {left:`${x0}px`,top:`${y0}px`,width:`${w0}px`,height:`${h0}px`,borderRadius:'14px',transform:'rotate(-5deg)'}
  ],{duration:780,fill:'forwards'});
  inner.animate([{transform:'scale(1)'},{transform:`scale(${s0})`}],{duration:780,easing:'cubic-bezier(.4,0,.2,1)',fill:'forwards'});
  setTimeout(()=>{paper.style.zIndex='1'},1080);
  setTimeout(()=>{
    face.style.opacity='0';const closeAnim=face.animate([{transform:'perspective(1100px) rotateX(78deg)',opacity:0,offset:0},{transform:'perspective(1100px) rotateX(58deg)',opacity:1,offset:.4},{transform:'perspective(1100px) rotateX(0deg)',opacity:1,offset:1}],{duration:400,easing:'cubic-bezier(.3,.7,.2,1)',fill:'forwards'});
    closeAnim.finished.catch(()=>{}).then(()=>stage.remove());
    setTimeout(()=>stage.remove(),1000);
  },1000);
}
function openStory(id,el){
  if(!el||!motionEnabled()){openAudio(id);return}
  const t=get(id);
  const phone=$('#phone'),pr=phone.getBoundingClientRect();
  const srcEl=el.querySelector('.art')||el;
  const sr=srcEl.getBoundingClientRect();
  const stage=document.createElement('div');
  stage.className='story-stage';
  stage.style.cssText='position:absolute;inset:0;z-index:24;pointer-events:none;overflow:hidden';
  const backdrop=clonePageLeaving('.bottom,.float');
  if(backdrop)backdrop.querySelectorAll('.story-book').forEach(b=>{if(b.dataset.track===id)b.style.visibility='hidden'});
  const coverWrap=document.createElement('div');
  coverWrap.style.cssText=`position:absolute;left:${sr.left-pr.left}px;top:${sr.top-pr.top}px;width:${sr.width}px;height:${sr.height}px;perspective:1100px;z-index:5`;
  const cover=el.cloneNode(true);
  cover.removeAttribute('data-track');
  cover.setAttribute('aria-hidden','true');
  cover.style.cssText='position:absolute;inset:0;width:100%;height:100%;margin:0;padding:0;pointer-events:none;transform-origin:left center;backface-visibility:hidden;border-radius:6px;overflow:hidden;will-change:transform';
  coverWrap.appendChild(cover);
  stage.appendChild(coverWrap);
  phone.appendChild(stage);
  resetRecommendModule();clearRecommendation();
  app.querySelectorAll('.page,.audio-content,#library-panel').forEach(x=>x.getAnimations().forEach(a=>a.cancel()));
  S.stack.push(snapshot());
  Object.assign(S,{page:'intro',track:id,modal:'',expanded:false,fromMonitor:false});
  render();app.scrollTop=0;
  const page=app.querySelector('.page');
  if(!page){stage.remove();if(backdrop)backdrop.remove();return}
  page.style.visibility='hidden';
  const fixed=app.querySelector('.fixed-play');
  if(fixed)fixed.style.opacity='0';
  const pw=pr.width,ph=pr.height;
  const w0=Math.max(64,Math.round(sr.width*0.86)),h0=Math.max(96,Math.round(sr.height*0.9)),s0=w0/pw;
  const x0=Math.round(sr.left-pr.left+(sr.width-w0)/2),y0=Math.round(sr.top-pr.top+(sr.height-h0)/2);
  const paper=document.createElement('div');
  paper.className='story-paper';
  paper.style.cssText=`position:absolute;left:${x0}px;top:${y0}px;width:${w0}px;height:${h0}px;border-radius:8px;overflow:hidden;background:#020713;z-index:3;box-shadow:0 18px 44px #000000a6;opacity:0`;
  const inner=page.cloneNode(true);
  inner.removeAttribute('id');
  inner.style.cssText=`position:absolute;left:0;top:0;width:${pw}px;transform-origin:top left;transform:scale(${s0})`;
  paper.appendChild(inner);
  if(fixed){
    const cta=fixed.cloneNode(true);
    cta.removeAttribute('id');
    cta.style.cssText=`position:absolute;left:0;right:0;bottom:0;width:${pw}px;transform-origin:left bottom;transform:scale(${s0})`;
    paper.appendChild(cta);
    cta.animate([{transform:`scale(${s0})`},{transform:'scale(1)'}],{duration:820,delay:190,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
  }
  stage.appendChild(paper);
  cover.animate([{transform:'perspective(1100px) rotateY(0deg)'},{transform:'perspective(1100px) rotateY(-118deg)'}],{duration:560,easing:'cubic-bezier(.3,.7,.2,1)',fill:'forwards',delay:30});
  const paperAnim=paper.animate([
    {left:`${x0}px`,top:`${y0}px`,width:`${w0}px`,height:`${h0}px`,borderRadius:'8px',opacity:0,transform:'rotate(-4deg)',easing:'ease-out',offset:0},
    {opacity:1,offset:.1},
    {left:`${x0-6}px`,top:`${y0-16}px`,width:`${w0*1.05}px`,height:`${h0*1.05}px`,borderRadius:'8px',transform:'rotate(-2deg)',easing:'ease-out',offset:.22},
    {left:`${x0-Math.round(w0*0.05)}px`,top:`${y0-30}px`,width:`${w0*1.12}px`,height:`${h0*1.12}px`,borderRadius:'8px',transform:'rotate(-1deg)',easing:'cubic-bezier(.2,.8,.2,1)',offset:.34},
    {left:'0px',top:'0px',width:`${pw}px`,height:`${ph}px`,borderRadius:'0px',opacity:1,transform:'rotate(0deg)',offset:1}
  ],{duration:820,delay:190,fill:'both'});
  inner.animate([{transform:`scale(${s0})`},{transform:'scale(1)'}],{duration:820,delay:190,easing:'cubic-bezier(.2,.8,.2,1)',fill:'both'});
  setTimeout(()=>{paper.style.zIndex='6'},520);
  const finishStory=()=>{
    if(!stage.isConnected)return;
    page.style.visibility='';
    if(fixed){fixed.style.opacity='';fixed.animate([{opacity:0},{opacity:1}],{duration:220,easing:'ease-out'})}
    stage.remove();
    if(backdrop)backdrop.remove();
  };
  paperAnim.finished.catch(()=>{}).then(finishStory);
  setTimeout(finishStory,2800);
}
function renderNoiseBar(){
 let bar=$('#noise-player');if(!bar){bar=document.createElement('div');bar.id='noise-player';$('#phone').append(bar)}
 const show=S.miniNoise&&S.page!=='player'&&S.page!=='monitor';bar.hidden=!show;$('#phone').classList.toggle('has-noise-bar',show);
 if(!show){bar.innerHTML='';return}
 const t=get(S.playerTrack);bar.classList.toggle('above-nav',!!app.querySelector('.bottom')&&!S.modal);bar.classList.toggle('above-fixed',!!app.querySelector('.fixed-play'));
 bar.innerHTML=`<button class="noise-open" data-a="openPlayer" aria-label="打开播放器"><span class="noise-thumb">${artwork(t.art)}</span><span class="noise-copy"><strong>${t.title}</strong><small>${S.playing?'正在播放':'已暂停'} · ${t.type}</small></span></button>${B('toggle',icon(S.playing?'pause':'play',!S.playing),'noise-toggle',`aria-label="${S.playing?'暂停':'播放'}"`)}${B('stopNoise',icon('close'),'noise-stop','aria-label="关闭播放条"')}`;
}
function returnToMonitor(){
 resetRecommendModule();clearRecommendation();
 const index=S.stack.findIndex(item=>item.page==='monitor');
 const origin=index>=0?S.stack[index]:null;
 if(index>=0)S.stack=S.stack.slice(0,index);
 transitionPage(()=>{if(origin)Object.assign(S,origin);Object.assign(S,{page:'monitor',modal:'',fromMonitor:false});render();app.scrollTop=origin?.scroll||0},-1);
}
function railMore(action,label){return B(action,`<span>${icon('chevron')}</span><strong>${label}</strong>`,'rail-more')}

function todayPicks(){return tracks.slice(30,34)}
function monitorPickCard(t){
  return `<button class="monitor-pick" data-track="${t.id}" aria-label="查看${t.title}"><span class="monitor-pick-cover">${artwork(t.art)}<span class="monitor-pick-tags"><span class="monitor-pick-tag">${icon('moon')}监测到你昨日深睡偏少</span><span class="monitor-pick-tag">↗ 为你推荐专属提高深睡的睡眠音频</span></span><span class="monitor-pick-play">${icon('play',true)}</span></span><span class="monitor-pick-title"><i>✦</i>${t.title}<i>✦</i></span><span class="monitor-pick-meta">${Math.round(t.duration/60)}分钟·${t.effect}</span></button>`;
}
function nearSection(){
  const tab=S.nearTab==='favorites'?'favorites':'recent';
  const ids=(tab==='favorites'?S.favs:S.history).filter(id=>tracks.some(t=>t.id===id)).slice(0,5);
  const items=ids.map(get);
  return `<section class="section near-section"><div class="heading near-heading"><div class="near-tabs" role="tablist">${[['recent','最近'],['favorites','收藏']].map(([v,l])=>B('nearTab',l,tab===v?'active':'',`data-value="${v}" role="tab" aria-selected="${tab===v}"`)).join('')}</div></div><div class="rail near-rail">${items.map(t=>`<button class="near-card" data-track="${t.id}"><span class="near-thumb">${artwork(t.art)}</span><span class="near-copy"><strong>${t.title}</strong><small>${trackMeta(t)}</small></span></button>`).join('')}<button class="near-card near-more" data-a="${tab==='favorites'?'favorites':'history'}" aria-label="查看全部${tab==='favorites'?'收藏':'最近播放'}"><span class="near-more-arrow">${icon('chevron')}</span><strong>更多</strong></button></div>${items.length?'':'<p class="near-empty">'+(tab==='favorites'?'还没有收藏的音频':'还没有播放记录')+'</p>'}</section>`;
}
function updateNear(scope){replaceSection(scope,'.near-section',nearSection())}
function startRecommendation(scope){
  clearTimeout(S.recommendTimer);
  const sleepLabel=S.filterSleep,typeLabel=S.filterType;
  S.loading=true;updateRecommender(scope);
  S.recommendTimer=setTimeout(()=>{
    const typeMap={'白噪音':'白噪音','舒眠音乐':'舒眠音乐','睡前故事':'睡前故事','钵音':'钵音疗愈','脑波':'深睡眠脑波','冥想':'助眠冥想','不限':'不限'};
    const effectMap={'快速入睡':'快速入睡','提高深睡':'提升深睡','舒缓心绪':'舒缓心绪','屏蔽杂音':'遮蔽杂音','放松身体':'放松身体','陪伴入眠':'陪伴入眠','专注':'专注'};
    const type=typeMap[typeLabel]||'不限';
    const effect=effectMap[sleepLabel];
    let pool=tracks.filter(t=>!t.series&&(type==='不限'||t.type===type));
    if(effect)pool.sort((a,b)=>Number(b.effect===effect)-Number(a.effect===effect));
    S.resultType=typeLabel;S.resultSleep=sleepLabel;
    S.recommended=pool.slice(0,3).map(t=>t.id);S.recommendIndex=0;S.loading=false;
    updateRecommender(scope);
  },1000);
}
function monitorSheet(){
 return `<section class="section today-picks"><div class="heading"><h2>今日专属推荐</h2></div><div class="rail today-rail">${todayPicks().slice(0,4).map(monitorPickCard).join('')}</div></section>${nearSection()}${privatePicksSection()}${effectSection('听你所需')}<section class="section monitor-categories"><h2>更多内容</h2><div class="rail">${types.map((type,i)=>`<button class="category-tile" data-a="monitorCategory" data-value="${type}">${artwork(keys[i][0])}<span><strong>${type}</strong><small>${tracks.filter(t=>t.type===type&&!t.series).length}个音频</small><i>⌄</i></span></button>`).join('')}</div></section>`;
}

function renderModal(){renderNoiseBar();const entering=!!S.modal&&modal.dataset.kind!==S.modal;modal.dataset.kind=S.modal;app.inert=!!S.modal;if(!S.modal){modal.innerHTML='';return}let title='',body='',full=false,t=get(S.playerTrack);if(S.modal==='more'){title='';body=morePage();full=true}else if(S.modal==='monitorAudio'){body=monitorSheet();full=true}else if(S.modal==='monitorTimer'){title='定时播放';body=`<p class="muted">时间到后停止音频，睡眠监测继续。</p>${chips(['关闭','15','30','45','60','自定义'],S.timer?String(S.timer):'关闭','timer')}${S.customTimer?'<form id="timer-form" class="custom-time"><input aria-label="自定义分钟" type="number" name="minutes" min="61" max="1440" placeholder="61–1440分钟" required><button type="submit">确定</button></form>':''}` }else if(S.modal==='settings'){title='播放设置';body=`<h3>播放模式</h3>${chips(['单曲一次','单曲循环',...(t.series?['列表一次','列表循环']:[])],S.mode,'mode')}<h3>定时关闭</h3>${chips(['关闭','15','30','45','60','自定义'],S.timer?String(S.timer):'关闭','timer')}${S.customTimer?'<form id="timer-form" class="custom-time"><input aria-label="自定义分钟" type="number" name="minutes" min="61" max="1440" placeholder="61–1440分钟" required><button type="submit">确定</button></form>':''}<p class="muted">${S.timer?'将在 '+S.timer+' 分钟后停止播放':'未设置定时关闭'}</p>`}else if(S.modal==='playlist'){title='播放列表 · '+(t.id==='course'?21:7)+'个音频';body=lessonRows(t)}else if(S.modal==='h5'){title='什么是'+S.tab+'？';body='<div class="empty">类型介绍 H5 尚未完成<br>此处保留页面入口</div>'}else if(S.modal==='alarm'){title='闹钟设置';body=`${chips(['闹钟','任务闹钟','智能闹钟','关闭'],S.alarmKind,'alarmKind')}<form id="alarm-form"><label for="alarm-time">响铃时间</label><input id="alarm-time" name="alarmTime" type="time" value="${S.alarmTime}" required ${S.alarmKind==='关闭'?'disabled':''}>${B('saveAlarm','保存','primary')}</form>`}else {title='提示';body='<p>该功能不在本次原型范围内。</p>'}modal.innerHTML=`<div class="sheet-backdrop"><div class="sheet-scrim" aria-hidden="true"></div><section class="sheet ${full?'full':''} ${S.modal==='more'?'more-sheet':''}" role="dialog" aria-modal="true" aria-label="${title||'选择音频'}"><div class="handle"></div>${(S.modal==='monitorAudio'||S.modal==='more')?'':`<header class="${title?'':'no-title'}">${title?`<h2>${title}</h2>`:''}${B('close','×','circle','aria-label="关闭弹窗"')}</header>`}${body}</section></div>`;fitRecommendViewport(modal);if(entering&&motionEnabled()){modal.querySelector('.sheet').animate([{transform:'translate3d(0,32px,0)',opacity:.85},{transform:'translate3d(0,0,0)',opacity:1}],{duration:400,easing:'cubic-bezier(.16,1,.3,1)'});modal.querySelector('.sheet-scrim').animate([{opacity:0},{opacity:1}],{duration:280,easing:'ease-out'})}}
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function starLayer(){
  const rnd=mulberry32(20261031);let out='';
  for(let i=0;i<132;i++){
    const x=(rnd()*100).toFixed(2),y=Math.round(rnd()*1560),size=(0.9+rnd()*1.5).toFixed(2);
    const dur=(4+rnd()*6).toFixed(2),delay=(-rnd()*dur).toFixed(2);
    const mid=(0.32+rnd()*0.3).toFixed(2),lo=(0.04+rnd()*0.03).toFixed(2);
    out+=`<i style="left:${x}%;top:${y}px;width:${size}px;height:${size}px;--dur:${dur}s;--delay:${delay}s;--mid:${mid};--lo:${lo}"></i>`;
  }
  return `<div class="star-field" aria-hidden="true">${out}</div>`;
}
function mountStars(){
  document.querySelectorAll('.star-page').forEach(page=>{
    if(!page.querySelector(':scope > .star-field'))page.insertAdjacentHTML('afterbegin',starLayer());
  });
}
function render(){let fn={home,audio,search,intro,player,history:collection,favorites:collection,monitor,brainIntro};app.innerHTML=(fn[S.page]||home)();fitRecommendViewport(app);if(S.fromMonitor&&S.page!=='monitor'&&!app.querySelector('[data-a="returnMonitor"]'))app.insertAdjacentHTML('beforeend',B('returnMonitor','☾<br>返回监测','float'));renderModal();app.querySelector('.tabs .active')?.scrollIntoView({block:'nearest',inline:'center'});bindPageInteractions();mountStars()}
function bindPageInteractions(){let loop=app.querySelector('.loop');if(loop){let cards=[...loop.children],count=Number(loop.dataset.count),unit=cards[1].offsetLeft-cards[0].offsetLeft,group=unit*count,base=cards[count].offsetLeft-(loop.clientWidth-cards[count].offsetWidth)/2;const update=()=>{let center=loop.scrollLeft+loop.clientWidth/2;let nearest=cards.reduce((a,c)=>Math.abs(c.offsetLeft+c.offsetWidth/2-center)<Math.abs(a.offsetLeft+a.offsetWidth/2-center)?c:a);cards.forEach(c=>c.classList.toggle('current',c===nearest));let dots=$('.latest-dots');if(dots)dots.textContent=Array.from({length:count},(_,i)=>i===cards.indexOf(nearest)%count?'●':'○').join(' ')};loop.scrollLeft=base;update();loop.addEventListener('scroll',()=>{if(loop.scrollLeft<base-group/2)loop.scrollLeft+=group;else if(loop.scrollLeft>base+group/2)loop.scrollLeft-=group;update()})}let searchRail=$('.rank-scroll');if(searchRail)searchRail.addEventListener('scroll',()=>{let i=Math.round(searchRail.scrollLeft/(searchRail.firstElementChild.getBoundingClientRect().width+16));document.querySelectorAll('.rank-dots button').forEach((b,n)=>b.classList.toggle('active',n===i))});let ranks=$('.ranks');if(ranks)ranks.addEventListener('scroll',()=>{$('.dots').textContent=Array.from({length:ranks.children.length},(_,i)=>i===Math.round(ranks.scrollLeft/ranks.clientWidth)?'●':'○').join(' ')});}
function redraw(){let pos=app.scrollTop,sheet=$('.sheet.full')?.scrollTop||0;render();app.scrollTop=pos;if($('.sheet.full'))$('.sheet.full').scrollTop=sheet}
function replaceSection(scope,selector,html){
  const cur=scope.querySelector(selector);if(!cur)return false;
  const host=document.createElement('div');host.innerHTML=html;
  const fresh=host.firstElementChild;if(!fresh)return false;
  cur.replaceWith(fresh);return true;
}
function updateRecommender(scope=app){replaceSection(scope,'.private-picks',privatePicksSection());fitRecommendViewport(scope)}
function updateEffectSection(scope=app){replaceSection(scope,'.effect-section',effectSection('听你所需'))}
function duration(){let t=get(S.playerTrack);return t.series?(9+S.episode%4*3)*60:t.duration}
function record(id){S.history=[id,...S.history.filter(x=>x!==id)].slice(0,40);save('history',S.history)}
function play(id,episode=0){if(get(id).type==='白噪音'){if(S.playerTrack!==id)S.position=0;S.playerTrack=id;S.playing=true;S.miniNoise=true;S.mode='单曲循环';record(id);renderNoiseBar();return}S.miniNoise=true;let t=get(id),changed=S.playerTrack!==id;if(changed||S.episode!==episode)S.position=0;if(changed)S.mode=t.series?'列表一次':'单曲一次';if(S.position>=duration())S.position=0;S.playerTrack=id;S.episode=episode;S.playing=true;record(id);if(S.page!=='player')go('player');else{S.modal='';render()}}
function execute(a,e){switch(a){case'clearQuery':S.query='';S.searched=false;render();break;case'rankSlide':{let rail=$('.rank-scroll');rail.scrollTo({left:Number(e.dataset.index)*(rail.firstElementChild.getBoundingClientRect().width+16),behavior:'smooth'});break}case'home':go('home',{fromMonitor:false});break;case'audio':go('audio',{tab:'推荐',fromMonitor:false});break;case'back':back();break;case'tab':switchTab(e.dataset.value);break;case'collectionTab':switchCollectionTab(e.dataset.value);break;case'search':go('search',{query:'',searched:false});break;case'history':go('history');break;case'favorites':go('favorites');break;case'more':openMore(e.dataset.title,e.dataset.ids.split(','));break;case'intro':openAudio(e.dataset.id);break;case'stopNoise':S.playing=false;S.miniNoise=false;renderNoiseBar();break;case'openPlayer':go('player');break;case'storyRefresh':S.storyBatch++;redraw();break;case'play':play(e.dataset.id);break;case'unlock':toast('原型演示：开通会员后即可收听');break;case'lesson':play(e.dataset.id,Number(e.dataset.episode));break;case'toggle':S.playing=!S.playing;if(S.playing){if(S.position>=duration())S.position=0;record(S.playerTrack)}redraw();break;case'favorite':{let id=S.page==='player'?S.playerTrack:S.track;S.favs=S.favs.includes(id)?S.favs.filter(x=>x!==id):[id,...S.favs];save('favorites',S.favs);redraw();break}case'expand':S.expanded=!S.expanded;redraw();break;case'close':closeModal();break;case'h5':if(S.tab==='深睡眠脑波')openBrainH5(e);else{S.modal='h5';renderModal()}break;case'monitorTimer':case'settings':case'playlist':case'alarm':S.modal=a;S.customTimer=false;renderModal();break;case'mode':S.mode=e.dataset.value;renderModal();break;case'timer':if(e.dataset.value==='自定义'){S.customTimer=true;renderModal()}else{setTimer(e.dataset.value==='关闭'?0:Number(e.dataset.value));renderModal()}break;case'filterType':case'filterSleep':S[a]=e.dataset.value;updateRecommender(e.closest('#modal')?modal:app);break;case'sleepChoice':{const scope=e.closest('#modal')?modal:app;clearTimeout(S.stepTimer);S.filterSleep=e.dataset.value;S.filterType='';clearRecommendation();updateRecommender(scope);S.stepTimer=setTimeout(()=>{S.recommendStep='type';if(scope.isConnected)slideRecommendStep(scope,'type',()=>{if(scope.isConnected)updateRecommender(scope)})},260);break;}case'typeChoice':{S.recommendStep='type';S.filterType=e.dataset.value;startRecommendation(e.closest('#modal')?modal:app);break;}case'resetRecommend':{const scope=e.closest('#modal')?modal:app;clearTimeout(S.recommendTimer);clearTimeout(S.stepTimer);const track=scope.querySelector('.recommend-track');const reversing=!!(track&&track.classList.contains('show-type'));S.recommended=null;S.recommendIndex=0;S.loading=false;S.recommendStep='sleep';S.filterType='';S.filterSleep='';S.resultType='';S.resultSleep='';if(reversing){scope.querySelector('.recommender')?.classList.add('recommend-resetting');slideRecommendStep(scope,'sleep',()=>{if(scope.isConnected)updateRecommender(scope)})}else updateRecommender(scope);break;}case'nearTab':S.nearTab=e.dataset.value==='favorites'?'favorites':'recent';updateNear(e.closest('#modal')?modal:app);break;case'effect':S.effect=e.dataset.value;updateEffectSection(e.closest('#modal')?modal:app);break;case'noise':S.noise=e.dataset.value;redraw();break;case'recommend':{const selectedType=S.filterType,selectedSleep=S.filterSleep,scope=e.closest('#modal')?modal:app;clearRecommendation();S.loading=true;updateRecommender(scope);S.recommendTimer=setTimeout(()=>{let pool=tracks.filter(t=>!t.series&&(selectedType==='不限'||t.type===selectedType));let effect={'入睡困难':'快速入睡','睡眠浅':'提升深睡','容易早醒':'陪伴入眠','夜间易醒':'遮蔽杂音','睡前焦虑':'舒缓心绪'}[selectedSleep];pool.sort((a,b)=>Number(b.effect===effect)-Number(a.effect===effect));S.resultType=selectedType;S.resultSleep=selectedSleep;S.recommended=pool.slice(0,3).map(t=>t.id);S.recommendIndex=0;S.loading=false;updateRecommender(scope)},850);break}case'nextRecommendation':if(S.recommended?.length&&!S.loading){const scope=e.closest('#modal')?modal:app;clearTimeout(S.recommendTimer);S.loading=true;updateRecommender(scope);S.recommendTimer=setTimeout(()=>{S.recommendIndex=(S.recommendIndex+1)%S.recommended.length;S.loading=false;updateRecommender(scope)},700)}break;case'pickBySleep':(e.closest('.sheet')||app).querySelector('.effect-section')?.scrollIntoView({behavior:motionEnabled()?'smooth':'auto',block:'start'});break;case'refresh':S.refresh++;redraw();toast('已为你换一组推荐');break;case'keyword':searchFor(e.dataset.value);break;case'deleteHistory':S.searchHistory=S.searchHistory.filter(t=>t!==e.dataset.value);save('search',S.searchHistory);redraw();break;case'clearHistory':S.searchHistory=[];save('search',[]);redraw();break;case'alarmKind':S.alarmTime=$('#alarm-time')?.value||S.alarmTime;S.alarmKind=e.dataset.value;renderModal();break;case'saveAlarm':S.alarmTime=$('#alarm-time')?.value||S.alarmTime;S.modal='';redraw();break;case'monitorPlay':{const id=e.dataset.id;if(id===S.playerTrack)S.playing=!S.playing;else{S.playerTrack=id;S.position=0;S.playing=true;S.mode='单曲一次'}S.miniNoise=true;if(S.playing)record(id);redraw();break}case'monitor':if(S.monitorStart&&S.stack.some(item=>item.page==='monitor'))returnToMonitor();else{if(!S.monitorStart)S.monitorStart=Date.now();go('monitor')}break;case'monitorAudio':S.modal='monitorAudio';renderModal();break;case'monitorCategory':go('audio',{tab:e.dataset.value,fromMonitor:true});break;case'returnMonitor':returnToMonitor();break;case'endMonitor':resetRecommendModule();clearRecommendation();S.monitorIds=[];S.monitorStart=0;S.playing=false;S.miniNoise=false;S.fromMonitor=false;S.stack=[];transitionPage(()=>{S.page='home';S.modal='';render();app.scrollTop=0},-1);toast('监测已结束（原型模拟）');break;case'plans':openMore('专属定制计划',['course','course2']);break;case'quick':if(e.dataset.value==='助眠声音')go('audio',{tab:'推荐'});else if(e.dataset.value==='挑战赛')toast('挑战赛不在本次原型范围内');else go('intro',{track:'course'});break;case'share':toast('原型演示：分享入口');break;case'report':case'profile':toast('该页面不在本次原型范围内');break;}}
function searchFor(q){q=q.trim();if(!q){toast('请输入搜索内容');return}S.query=q;S.searched=true;S.searchHistory=[q,...S.searchHistory.filter(x=>x!==q)].slice(0,10);save('search',S.searchHistory);render()}
function setTimer(n){S.timer=n;S.timerEnd=n?Date.now()+n*60000:0;S.customTimer=false;}
document.addEventListener('click',e=>{let book=e.target.closest('.story-book');if(book){openStory(book.dataset.track,book);return}let track=e.target.closest('[data-track]');if(track){openAudio(track.dataset.track);return}let b=e.target.closest('[data-a]');if(b){execute(b.dataset.a,b);return}if(e.target.classList.contains('sheet-backdrop'))closeModal()});
document.addEventListener('submit',e=>{e.preventDefault();if(e.target.id==='search-form')searchFor(new FormData(e.target).get('q'));if(e.target.id==='timer-form'){let n=Number(new FormData(e.target).get('minutes'));if(n>=61&&n<=1440){setTimer(n);renderModal()}else toast('请输入61–1440分钟')}});
document.addEventListener('input',e=>{if(e.target.id==='progress'){S.position=Number(e.target.value);$('#elapsed').textContent=fmt(S.position);e.target.style.setProperty('--progress',S.position/duration()*100+'%')}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&S.modal)closeModal();const tab=e.target.closest('[data-a="collectionTab"]');if(tab&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const value=e.key==='ArrowLeft'||e.key==='Home'?'favorites':'history';switchCollectionTab(value);app.querySelector(`[data-a="collectionTab"][data-value="${value}"]`)?.focus({preventScroll:true})}});
let last=Date.now();setInterval(()=>{let now=Date.now(),delta=(now-last)/1000;last=now;if(S.playing){S.position+=delta;if(S.position>=duration()){let t=get(S.playerTrack),max=t.id==='course'?21:7;if(S.mode==='单曲循环')S.position=0;else if(t.series&&(S.mode==='列表一次'||S.mode==='列表循环')){if(S.episode<max-1){S.episode++;S.position=0}else if(S.mode==='列表循环'){S.episode=0;S.position=0}else{S.position=duration();S.playing=false}}else{S.position=duration();S.playing=false}if(S.page==='player'||S.page==='monitor')redraw();else renderNoiseBar()}}if(S.timerEnd&&now>=S.timerEnd){S.playing=false;setTimer(0);toast('定时已到，播放已停止');if(S.page==='player'||S.page==='monitor')redraw();else renderNoiseBar()}if($('#progress')){$('#progress').value=S.position;$('#progress').style.setProperty('--progress',S.position/duration()*100+'%')};if($('#elapsed'))$('#elapsed').textContent=fmt(S.position);if($('#monitor-time'))$('#monitor-time').textContent=monitorDuration((now-S.monitorStart)/1000);if($('#monitor-clock'))$('#monitor-clock').textContent=new Date(now).toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false});document.querySelectorAll('[data-monitor-elapsed]').forEach(el=>el.textContent=fmtElapsed(el.dataset.monitorElapsed===S.playerTrack?S.position:0));document.querySelectorAll('[data-monitor-progress]').forEach(el=>el.style.width=(el.dataset.monitorProgress===S.playerTrack?S.position/duration()*100:0)+'%')},500);
$('#shortcuts').innerHTML=[['home','首页'],['audio','助眠推荐'],['search','搜索'],['monitor','睡眠监测'],['history','历史播放'],['favorites','收藏']].map(([a,t])=>B(a,t)).join('')+types.map(t=>B('monitorlessCategory',t,'',`data-value="${t}"`)).join('');document.addEventListener('click',e=>{let b=e.target.closest('[data-a="monitorlessCategory"]');if(b)go('audio',{tab:b.dataset.value,fromMonitor:false})});
render();

function seriesSection(){let list=tracks.filter(t=>t.series);return `<section class="section"><div class="heading"><h2>精选系列课</h2></div><div class="rail">${list.map(t=>`<button class="series-card" data-track="${t.id}"><div class="series-copy"><strong>${t.title}</strong><p>慢慢放松身心<br>找回安稳的睡前时光</p><div><span>${t.id==='course'?'21':'7'}节</span><span>${t.type==='助眠冥想'?'冥想':'脑波'}</span></div></div><div class="series-art">${artwork(t.art)}</div></button>`).join('')}</div></section>`}
function rankedRows(list){return list.map((t,i)=>`<button class="rank-audio" data-track="${t.id}"><span class="rank-number">${i+1}</span><span class="rank-cover">${artwork(t.art)}</span><span class="rank-info"><strong>${t.title}</strong><span class="rank-tags"><span>${t.type}</span><span>${t.effect}</span></span></span></button>`).join('')}
function searchRanks(){return `<section class="search-rankings"><div class="rank-scroll rail">${['上新榜','热门榜'].map((title,i)=>`<section class="rank-card"><div class="rank-heading"><h3>${title}</h3></div><div class="rank-entries">${rankedRows(tracks.slice(i*6,i*6+5))}</div></section>`).join('')}</div><div class="rank-dots">${[0,1].map((n)=>B('rankSlide','<span></span>',n===0?'active':'',`data-index="${n}" aria-label="切换到${n?'热门榜':'上新榜'}"`)).join('')}</div></section>`}

function moreCard(id){let t=get(id);return `<button class="more-audio-card" data-track="${id}" aria-label="查看${t.title}">${artwork(t.art)}${t.series?'<span class="badge">系列课</span>':''}<span class="more-card-copy"><strong>${t.title}</strong><small>${t.series?(t.id==='course'?21:7)+'节 · 系列课':trackMeta(t,'分钟')}</small></span><span class="mini-play">${icon('play',true)}</span></button>`}
