(function(){
  var deck=document.getElementById('deck');
  if(!deck) return;
  var slides=[].slice.call(deck.querySelectorAll('.slide'));
  var cur=0, lock=false;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var prevB,nextB,nextPath;
  var ARROW_RIGHT='M9 5l7 7-7 7', ARROW_LEFT='M15 5l-7 7 7 7';
  function mkBtn(label,path,legend){
    var b=document.createElement('button');
    b.type='button'; b.className='deck-nav__btn'; b.setAttribute('aria-label',label);
    if(legend) b.setAttribute('data-label',legend);
    b.innerHTML='<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path d="'+path+'" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    return b;
  }
  function buildNav(){
    var nav=document.createElement('nav');
    nav.className='deck-nav'; nav.setAttribute('aria-label','Navegação entre slides');
    prevB=mkBtn('Slide anterior',ARROW_LEFT,'Voltar');
    nextB=mkBtn('Próximo slide',ARROW_RIGHT,'Avançar');
    nextPath=nextB.querySelector('path');
    prevB.addEventListener('click',function(){go(cur-1);});
    nextB.addEventListener('click',function(){go(cur===slides.length-1?0:cur+1);});
    nav.appendChild(prevB); nav.appendChild(nextB);
    document.body.appendChild(nav);
  }
  function setActive(i){
    cur=i;
    if(prevB){
      var isLast=(i===slides.length-1);
      prevB.hidden=(i===0||isLast);
      nextB.hidden=false;
      nextB.classList.toggle('deck-nav__btn--loop',isLast);
      nextB.setAttribute('aria-label',isLast?'Voltar ao início':'Próximo slide');
      nextB.setAttribute('data-label',isLast?'Voltar':(i===0?'Use a seta ao lado para avançar':'Avançar'));
      nextPath.setAttribute('d',isLast?ARROW_LEFT:ARROW_RIGHT);
    }
    slides.forEach(function(s,k){
      var off=k!==i;
      if('inert' in s) s.inert=off; else s.setAttribute('aria-hidden',off?'true':'false');
    });
  }
  function go(i){
    i=Math.max(0,Math.min(slides.length-1,i));
    if(i===cur&&Math.abs(deck.scrollLeft-i*deck.clientWidth)<2) return;
    deck.scrollTo({left:i*deck.clientWidth,behavior:reduce?'auto':'smooth'});
    setActive(i);
  }
  var t;
  deck.addEventListener('scroll',function(){
    clearTimeout(t);
    t=setTimeout(function(){
      var i=Math.round(deck.scrollLeft/deck.clientWidth);
      if(i!==cur) setActive(i);
    },80);
  },{passive:true});
  document.addEventListener('keydown',function(e){
    if(e.altKey||e.ctrlKey||e.metaKey) return;
    var k=e.key;
    if(k==='ArrowRight'||k==='PageDown') go(cur+1);
    else if(k==='ArrowLeft'||k==='PageUp') go(cur-1);
    else if(k==='Home') go(0);
    else if(k==='End') go(slides.length-1);
    else return;
    e.preventDefault();
  });
  deck.addEventListener('wheel',function(e){
    if(Math.abs(e.deltaY)<=Math.abs(e.deltaX)) return;   // gesto horizontal: nativo
    var s=slides[cur];
    var can=s.scrollHeight>s.clientHeight+1;
    if(can){
      var atTop=s.scrollTop<=0, atBottom=s.scrollTop+s.clientHeight>=s.scrollHeight-1;
      if((e.deltaY<0&&!atTop)||(e.deltaY>0&&!atBottom)) return; // rolagem vertical interna
    }
    e.preventDefault();
    if(lock||Math.abs(e.deltaY)<8) return;
    lock=true; setTimeout(function(){lock=false;},reduce?50:650);
    go(cur+(e.deltaY>0?1:-1));
  },{passive:false});
  buildNav();
  setActive(0);
})();
