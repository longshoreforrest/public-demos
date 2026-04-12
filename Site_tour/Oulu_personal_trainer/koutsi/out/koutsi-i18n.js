(function(){
var lang=localStorage.getItem('siteTourLang')||'fi';

var s=document.createElement('style');
s.textContent='.koutsi-lang-switcher{display:flex;border:1px solid rgba(255,255,255,0.2);border-radius:100px;overflow:hidden;margin-left:auto;margin-right:12px}.koutsi-lang-btn{display:flex;align-items:center;gap:4px;padding:4px 10px;font-size:0.75rem;font-weight:500;border:none;background:transparent;color:rgba(255,255,255,0.7);cursor:pointer;transition:all 0.2s}.koutsi-lang-btn.active{background:rgba(255,255,255,0.2);color:#fff}.koutsi-lang-btn:hover:not(.active){color:#fff;background:rgba(255,255,255,0.1)}';
document.head.appendChild(s);

var bar=document.querySelector('nav div[style*="border-top"]');
if(bar){
  var sw=document.createElement('div');
  sw.className='koutsi-lang-switcher';
  sw.innerHTML='<button class="koutsi-lang-btn'+(lang==='fi'?' active':'')+'" data-lang="fi"><span style="font-size:0.85rem;line-height:1">&#127467;&#127470;</span> FI</button><button class="koutsi-lang-btn'+(lang==='en'?' active':'')+'" data-lang="en"><span style="font-size:0.85rem;line-height:1">&#127468;&#127463;</span> EN</button>';
  var gl=bar.querySelector('a[href*="guide"]');
  if(gl) bar.insertBefore(sw,gl);
  else bar.appendChild(sw);
}

var T=[
['Kokonaisvaltainen hyvinvointivalmentaja ruuhkavuosiin','Comprehensive wellness coach for busy years'],
['tavoitteet, kalenteri ja treenikaverit yhdessä.','goals, calendar and workout buddies in one place.'],
['Yhdistetty näkymä arjen menoista ja treeneistä.','Combined view of daily events and workouts.'],
['Klikkaa tavoitetta nähdäksesi harjoitusohjelman.','Click a goal to see the training program.'],
['Joskus sohva vain kutsuu...','Sometimes the couch just calls...'],
['Kuinka paljon aikaa sinulla on?','How much time do you have?'],
['Tässä on päiväsi yhteenveto.','Here\'s your daily summary.'],
['Raahaa tapahtumia siirtääksesi','Drag events to reschedule'],
['Hei! Mitä tänään?','Hi! What\'s up today?'],
['Aktiiviset tavoitteet','Active goals'],
['Pikatreeni-optimoija','Quick workout optimizer'],
['treenaa juuri nyt','working out now'],
['kaveria paikalla','buddies online'],
['Tuoreet tapahtumat','Recent events'],
['Liity mukaan!','Join in!'],
['Näytä kaikki','Show all'],
['Päivän ohjelma','Today\'s schedule'],
['vaihetta tehty','steps done'],
['Streak-lista','Streak list'],
['Treeniviikko','Training week'],
['Palautuminen','Recovery'],
['LAISKOTTAA!','FEELING LAZY!'],
['Treenikamut','Workout buddies'],
['pv jäljellä','days left'],
['pv putkeen','day streak'],
['Hyvinvointi','Wellbeing'],
['Käyttöohje','User guide'],
['Tavoitteet','Goals'],
['Treenaa!','Working out!'],
['min sitten','min ago'],
['Kalenteri','Calendar'],
['Ei jaksa?','No energy?'],
['Aloitettu','Started'],
['Kuntoilu','Fitness'],
['h sitten','h ago'],
['Askeleet','Steps'],
['Kaikki','All'],
['Stressi','Stress'],
['Treeni','Workout'],
['Matala','Low'],
['Perhe','Family'],
['Kamut','Buddies'],
['Tavoite:','Goal:'],
['Nyt:','Now:'],
['Tyo','Work'],
['Uni','Sleep'],
['Sinä','You'],
['pv','d']
];

var dayMap={ma:'Mon',ti:'Tue',ke:'Wed',to:'Thu',pe:'Fri',la:'Sat',su:'Sun'};
var dayRev={Mon:'ma',Tue:'ti',Wed:'ke',Thu:'to',Fri:'pe',Sat:'la',Sun:'su'};
var orig=new Map();

function apply(l){
  var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
  var n;
  while(n=w.nextNode()){
    var p=n.parentElement;
    if(!p||p.tagName==='SCRIPT'||p.tagName==='STYLE') continue;
    if(p.closest&&p.closest('.koutsi-lang-switcher')) continue;
    if(!n.nodeValue.trim()) continue;
    if(!orig.has(n)) orig.set(n,n.nodeValue);
    if(l==='fi'){
      n.nodeValue=orig.get(n);
    } else {
      var txt=orig.get(n);
      for(var i=0;i<T.length;i++){
        if(txt.indexOf(T[i][0])!==-1) txt=txt.replace(T[i][0],T[i][1]);
      }
      n.nodeValue=txt;
    }
  }
  document.querySelectorAll('.uppercase').forEach(function(el){
    var t=el.textContent.trim();
    if(l==='en'&&dayMap[t]) el.textContent=dayMap[t];
    else if(l==='fi'&&dayRev[t]) el.textContent=dayRev[t];
  });
  document.querySelectorAll('.koutsi-lang-btn').forEach(function(b){
    b.classList.toggle('active',b.dataset.lang===l);
  });
  localStorage.setItem('siteTourLang',l);
}

document.querySelectorAll('.koutsi-lang-btn').forEach(function(b){
  b.addEventListener('click',function(){ apply(this.dataset.lang); });
});

if(lang==='en') apply('en');
})();
