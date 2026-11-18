"use strict";
const samples=[
 {bad:"Ты разбираешься в сайтах?",good:"Привет! На сайте не открывается главная страница. Как проверить причину ошибки 404?"},
 {bad:"Можно задать вопрос?",good:"Привет! Подскажи, пожалуйста, как в CSS сделать сетку из трёх колонок, которая перестраивается на телефоне?"},
 {bad:"Ты тут? Мне нужна помощь.",good:"Привет! После обновления приложения не получается войти: появляется ошибка авторизации. Какие данные стоит проверить?"},
 {bad:"Это вообще работает?",good:"Привет! Нажимаю «Отправить», но форма не реагирует. В консоли ошибок нет. С чего начать проверку?"}
];
let current=0;
const before=document.querySelector("#beforeText"),after=document.querySelector("#afterText"),counter=document.querySelector("#exampleCounter");
function renderExample(){before.textContent=samples[current].bad;after.textContent=samples[current].good;counter.textContent=String(current+1).padStart(2,"0")+" / "+String(samples.length).padStart(2,"0")}
document.querySelector("#prevExample")?.addEventListener("click",()=>{current=(current-1+samples.length)%samples.length;renderExample()});
document.querySelector("#nextExample")?.addEventListener("click",()=>{current=(current+1)%samples.length;renderExample()});
const toggle=document.querySelector("#menuToggle"),menu=document.querySelector("#mobileMenu");
function closeMenu(){if(!menu||!toggle)return;menu.hidden=true;toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Открыть меню")}
toggle?.addEventListener("click",()=>{const open=menu.hidden;menu.hidden=!open;toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Закрыть меню":"Открыть меню")});
menu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
window.addEventListener("resize",()=>{if(window.innerWidth>760)closeMenu()});
const exampleText="Привет! После обновления страницы пропали стили. CSS подключён через отдельный файл. Что проверить?";
document.querySelector("#copyExample")?.addEventListener("click",async()=>{const label=document.querySelector("#copyLabel");try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(exampleText)}else{const box=document.createElement("textarea");box.value=exampleText;box.style.position="fixed";box.style.opacity="0";document.body.appendChild(box);box.select();const ok=document.execCommand("copy");box.remove();if(!ok)throw Error("Copy unavailable")}label.textContent="Скопировано ✓"}catch{label.textContent="Не удалось скопировать"}setTimeout(()=>{label.textContent="Скопировать пример"},2400)});
document.querySelector("#year").textContent=new Date().getFullYear();
if("IntersectionObserver" in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}})},{threshold:.07});document.querySelectorAll(".reveal").forEach(el=>observer.observe(el))}else{document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"))}