(()=>{var e={353:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",i="second",s="minute",a="hour",r="day",o="week",c="month",l="quarter",d="year",f="date",u="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},m=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},b={s:m,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,c),a=n-s<0,r=t.clone().add(i+(a?-1:1),c);return+(-(i+(n-s)/(a?s-r:r-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:d,w:o,d:r,D:f,h:a,m:s,s:i,ms:n,Q:l}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},_="en",y={};y[_]=v;var g="$isDayjsObject",$=function(e){return e instanceof w||!(!e||!e[g])},D=function e(t,n,i){var s;if(!t)return _;if("string"==typeof t){var a=t.toLowerCase();y[a]&&(s=a),n&&(y[a]=n,s=a);var r=t.split("-");if(!s&&r.length>1)return e(r[0])}else{var o=t.name;y[o]=t,s=o}return!i&&s&&(_=s),s||!i&&_},T=function(e,t){if($(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new w(n)},M=b;M.l=D,M.i=$,M.w=function(e,t){return T(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function v(e){this.$L=D(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[g]=!0}var m=v.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(p);if(i){var s=i[2]-1||0,a=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,a)}}return new Date(t)}(e),this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===u)},m.isSame=function(e,t){var n=T(e);return this.startOf(t)<=n&&n<=this.endOf(t)},m.isAfter=function(e,t){return T(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<T(e)},m.$g=function(e,t,n){return M.u(e)?this[t]:this.set(n,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,t){var n=this,l=!!M.u(t)||t,u=M.p(e),p=function(e,t){var i=M.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return l?i:i.endOf(r)},h=function(e,t){return M.w(n.toDate()[e].apply(n.toDate("s"),(l?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,m=this.$M,b=this.$D,_="set"+(this.$u?"UTC":"");switch(u){case d:return l?p(1,0):p(31,11);case c:return l?p(1,m):p(0,m+1);case o:var y=this.$locale().weekStart||0,g=(v<y?v+7:v)-y;return p(l?b-g:b+(6-g),m);case r:case f:return h(_+"Hours",0);case a:return h(_+"Minutes",1);case s:return h(_+"Seconds",2);case i:return h(_+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(e,t){var o,l=M.p(e),u="set"+(this.$u?"UTC":""),p=(o={},o[r]=u+"Date",o[f]=u+"Date",o[c]=u+"Month",o[d]=u+"FullYear",o[a]=u+"Hours",o[s]=u+"Minutes",o[i]=u+"Seconds",o[n]=u+"Milliseconds",o)[l],h=l===r?this.$D+(t-this.$W):t;if(l===c||l===d){var v=this.clone().set(f,1);v.$d[p](h),v.init(),this.$d=v.set(f,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[M.p(e)]()},m.add=function(n,l){var f,u=this;n=Number(n);var p=M.p(l),h=function(e){var t=T(u);return M.w(t.date(t.date()+Math.round(e*n)),u)};if(p===c)return this.set(c,this.$M+n);if(p===d)return this.set(d,this.$y+n);if(p===r)return h(1);if(p===o)return h(7);var v=(f={},f[s]=e,f[a]=t,f[i]=1e3,f)[p]||1,m=this.$d.getTime()+n*v;return M.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||u;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),a=this.$H,r=this.$m,o=this.$M,c=n.weekdays,l=n.months,d=n.meridiem,f=function(e,n,s,a){return e&&(e[n]||e(t,i))||s[n].slice(0,a)},p=function(e){return M.s(a%12||12,e,"0")},v=d||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i};return i.replace(h,(function(e,i){return i||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return M.s(t.$y,4,"0");case"M":return o+1;case"MM":return M.s(o+1,2,"0");case"MMM":return f(n.monthsShort,o,l,3);case"MMMM":return f(l,o);case"D":return t.$D;case"DD":return M.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return f(n.weekdaysMin,t.$W,c,2);case"ddd":return f(n.weekdaysShort,t.$W,c,3);case"dddd":return c[t.$W];case"H":return String(a);case"HH":return M.s(a,2,"0");case"h":return p(1);case"hh":return p(2);case"a":return v(a,r,!0);case"A":return v(a,r,!1);case"m":return String(r);case"mm":return M.s(r,2,"0");case"s":return String(t.$s);case"ss":return M.s(t.$s,2,"0");case"SSS":return M.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,f,u){var p,h=this,v=M.p(f),m=T(n),b=(m.utcOffset()-this.utcOffset())*e,_=this-m,y=function(){return M.m(h,m)};switch(v){case d:p=y()/12;break;case c:p=y();break;case l:p=y()/3;break;case o:p=(_-b)/6048e5;break;case r:p=(_-b)/864e5;break;case a:p=_/t;break;case s:p=_/e;break;case i:p=_/1e3;break;default:p=_}return u?p:M.a(p)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return y[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=D(e,t,!0);return i&&(n.$L=i),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),O=w.prototype;return T.prototype=O,[["$ms",n],["$s",i],["$m",s],["$H",a],["$W",r],["$M",c],["$y",d],["$D",f]].forEach((function(e){O[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),T.extend=function(e,t){return e.$i||(e(t,w,T),e.$i=!0),T},T.locale=D,T.isDayjs=$,T.unix=function(e){return T(1e3*e)},T.en=y[_],T.Ls=y,T.p={},T}()},826:function(e){e.exports=function(){"use strict";var e="minute",t=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(i,s,a){var r=s.prototype;a.utc=function(e){return new s({date:e,utc:!0,args:arguments})},r.utc=function(t){var n=a(this.toDate(),{locale:this.$L,utc:!0});return t?n.add(this.utcOffset(),e):n},r.local=function(){return a(this.toDate(),{locale:this.$L,utc:!1})};var o=r.parse;r.parse=function(e){e.utc&&(this.$u=!0),this.$utils().u(e.$offset)||(this.$offset=e.$offset),o.call(this,e)};var c=r.init;r.init=function(){if(this.$u){var e=this.$d;this.$y=e.getUTCFullYear(),this.$M=e.getUTCMonth(),this.$D=e.getUTCDate(),this.$W=e.getUTCDay(),this.$H=e.getUTCHours(),this.$m=e.getUTCMinutes(),this.$s=e.getUTCSeconds(),this.$ms=e.getUTCMilliseconds()}else c.call(this)};var l=r.utcOffset;r.utcOffset=function(i,s){var a=this.$utils().u;if(a(i))return this.$u?0:a(this.$offset)?l.call(this):this.$offset;if("string"==typeof i&&(i=function(e){void 0===e&&(e="");var i=e.match(t);if(!i)return null;var s=(""+i[0]).match(n)||["-",0,0],a=s[0],r=60*+s[1]+ +s[2];return 0===r?0:"+"===a?r:-r}(i),null===i))return this;var r=Math.abs(i)<=16?60*i:i,o=this;if(s)return o.$offset=r,o.$u=0===i,o;if(0!==i){var c=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(r+c,e)).$offset=r,o.$x.$localOffset=c}else o=this.utc();return o};var d=r.format;r.format=function(e){var t=e||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return d.call(this,t)},r.valueOf=function(){var e=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*e},r.isUTC=function(){return!!this.$u},r.toISOString=function(){return this.toDate().toISOString()},r.toString=function(){return this.toDate().toUTCString()};var f=r.toDate;r.toDate=function(e){return"s"===e&&this.$offset?a(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():f.call(this)};var u=r.diff;r.diff=function(e,t,n){if(e&&this.$u===e.$u)return u.call(this,e,t,n);var i=this.local(),s=a(e).local();return u.call(i,s,t,n)}}}()}},t={};function n(i){var s=t[i];if(void 0!==s)return s.exports;var a=t[i]={exports:{}};return e[i].call(a.exports,a,a.exports,n),a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}var i=n(353),s=n.n(i);const a=36e5,r={fullDateTime:"YYYY-MM-DDTHH:mm",yearMonthDay:"YYYY-MM-DD",monthDay:"MMM D",hoursMinutes:"HH:mm",fullDateIncompleteYear:"YY/MM/DD HH:mm"},o=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];var c=n(826),l=n.n(c);function d(e){return e?s().utc(e).format(r.fullDateIncompleteYear):""}function f(e){return e?s().utc(e).format(r.fullDateTime):""}function u(e){return e?s().utc(e).format(r.hoursMinutes):""}s().extend(l());class p{constructor({points:e,destinations:t}){this.points=e,this.destinations=t}getTemplate(){return function(e,t){const{basePrice:n,dateFrom:i,dateTo:s,type:a}=e,r=t.find((t=>t.id===e.destination));return`<li class="trip-events__item">\n              <form class="event event--edit" action="#" method="post">\n                <header class="event__header">\n                  <div class="event__type-wrapper">\n                    <label class="event__type  event__type-btn" for="event-type-toggle-${e.id}">\n                      <span class="visually-hidden">Choose event type</span>\n                      <img class="event__type-icon" width="17" height="17" src="img/icons/${a}.png" alt="Event type icon">\n                    </label>\n                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${e.id}" type="checkbox">\n\n                    <div class="event__type-list">\n                     <fieldset class="event__type-group">\n                      <legend class="visually-hidden">Event type</legend>\n                      ${o.map((t=>`<div class="event__type-item">\n                        <input id="event-type-${t}-${e.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${t===a?"checked":""}>\n                        <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-${e.id}">${t}</label>\n                      </div>`)).join("")}\n                     </fieldset>\n                   </div>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--destination">\n                    <label class="event__label  event__type-output" for="event-destination-1">\n                      ${a}\n                    </label>\n                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">\n                    <datalist id="destination-list-${e.id}">\n                      <option value="Amsterdam"></option>\n                      <option value="Geneva"></option>\n                      <option value="Chamonix"></option>\n                    </datalist>\n                  </div>\n\n                  <div class="event__field-group  event__field-group--time">\n                    <label class="visually-hidden" for="event-start-time-1">From</label>\n                    <input class="event__input  event__input--time" id="event-start-time-${e.id}" type="text" name="event-start-time" value="${d(i)}">\n                    &mdash;\n                    <label class="visually-hidden" for="event-end-time-1">To</label>\n                    <input class="event__input  event__input--time" id="event-end-time-${e.id}" type="text" name="event-end-time" value="${d(s)}">\n                  </div>\n\n                  <div class="event__field-group  event__field-group--price">\n                    <label class="event__label" for="event-price-${e.id}">\n                      <span class="visually-hidden">Price</span>\n                      &euro;\n                    </label>\n                    <input class="event__input  event__input--price" id="event-price-${e.id}" type="text" name="event-price" value="${n}">\n                  </div>\n\n                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n                  <button class="event__reset-btn" type="reset">Cancel</button>\n                </header>\n\n                <section class="event__details">\n                  <section class="event__section  event__section--destination">\n                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n                    <p class="event__destination-description">${r.description}</p>\n\n                    <div class="event__photos-container">\n                      <div class="event__photos-tape">\n                      ${r.pictures.map((e=>`\n                        <img class="event__photo" src="${e.src}" alt="${e.description}"></img>\n                      `))}\n                      </div>\n                    </div>\n                  </section>\n                </section>\n              </form>\n            </li>`}(this.points,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class h{constructor({points:e,offers:t,destinations:n}){this.points=e,this.offers=t,this.destinations=n}getTemplate(){return function(e,t,n){const{basePrice:i,dateFrom:s,dateTo:a,type:r}=e,c=t.find((t=>t.type===e.type)).offers,l=c.filter((t=>e.offers.includes(t.id))),f=n.find((t=>t.id===e.destination));return`<form class="event event--edit" action="#" method="post">\n    <header class="event__header">\n      <div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-${e.id}">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${r}.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${e.id}" type="checkbox">\n\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n            ${o.map((t=>`<div class="event__type-item">\n              <input id="event-type-${t}-${e.id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${t}" ${t===r?"checked":""}>\n              <label class="event__type-label  event__type-label--${t}" for="event-type-${t}-${e.id}">${t}</label>\n            </div>`)).join("")}\n          </fieldset>\n        </div>\n      </div>\n\n      <div class="event__field-group  event__field-group--destination">\n        <label class="event__label  event__type-output" for="event-destination-${e.id}">\n          ${r}\n        </label>\n        <input class="event__input  event__input--destination" id="event-destination-${e.id}" type="text" name="event-destination" value="${f.name}" list="destination-list-${e.id}">\n        <datalist id="destination-list-${e.id}">\n          <option value="Amsterdam"></option>\n          <option value="Geneva"></option>\n          <option value="Chamonix"></option>\n        </datalist>\n      </div>\n\n      <div class="event__field-group  event__field-group--time">\n        <label class="visually-hidden" for="event-start-time-1">From</label>\n        <input class="event__input  event__input--time" id="event-start-time-${e.id}" type="text" name="event-start-time" value="${d(s)}">\n        &mdash;\n        <label class="visually-hidden" for="event-end-time-1">To</label>\n        <input class="event__input  event__input--time" id="event-end-time-${e.id}" type="text" name="event-end-time" value="${d(a)}">\n      </div>\n\n      <div class="event__field-group  event__field-group--price">\n        <label class="event__label" for="event-price-${e.id}">\n          <span class="visually-hidden">Price</span>\n          &euro;\n        </label>\n        <input class="event__input  event__input--price" id="event-price-${e.id}" type="text" name="event-price" value="${i}">\n      </div>\n\n      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n      <button class="event__reset-btn" type="reset">Delete</button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </header>\n    <section class="event__details">\n      <section class="event__section  event__section--offers">\n        <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n        <div class="event__available-offers">\n        ${c.map((t=>`<div class="event__offer-selector">\n            <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${e.id}" type="checkbox" name="event-offer-luggage" ${l.map((e=>e.id)).includes(t.id)?"checked":""}>\n            <label class="event__offer-label" for="event-offer-luggage-${e.id}">\n              <span class="event__offer-title">${t.title}</span>\n              &plus;&euro;&nbsp;\n              <span class="event__offer-price">${t.price}</span>\n            </label>\n          </div>`)).join("")}\n      </section>\n\n      <section class="event__section  event__section--destination">\n        <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n        <p class="event__destination-description">${f.description}</p>\n\n        <div class="event__photos-container">\n          <div class="event__photos-tape">\n          ${f.pictures.map((e=>`\n            <img class="event__photo" src="${e.src}" alt="${e.description}"></img>\n          `))}\n          </div>\n        </div>\n      </section>\n    </section>\n  </form>`}(this.points,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class v{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class m{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n            <div class="trip-sort__item  trip-sort__item--day">\n              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n              <label class="trip-sort__btn" for="sort-day">Day</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--event">\n              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n              <label class="trip-sort__btn" for="sort-event">Event</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--time">\n              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n              <label class="trip-sort__btn" for="sort-time">Time</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--price">\n              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n              <label class="trip-sort__btn" for="sort-price">Price</label>\n            </div>\n\n            <div class="trip-sort__item  trip-sort__item--offer">\n              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n              <label class="trip-sort__btn" for="sort-offer">Offers</label>\n            </div>\n          </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{constructor({points:e,offers:t,destinations:n}){this.points=e,this.offers=t,this.destinations=n}getTemplate(){return function(e,t,n){const{basePrice:i,dateFrom:o,dateTo:c,isFavorite:l,type:d}=e,p=t.find((t=>t.type===e.type)).offers.filter((t=>e.offers.includes(t.id))),h=n.find((t=>t.id===e.destination));return`<li class="trip-events__item">\n              <div class="event">\n                <time class="event__date" datetime="${v=o,v?s().utc(v).format(r.yearMonthDay):""}">${function(e){return e?s().utc(e).format(r.monthDay):""}(o)}</time>\n                <div class="event__type">\n                  <img class="event__type-icon" width="42" height="42" src="img/icons/${d}.png" alt="Event type icon">\n                </div>\n                <h3 class="event__title">${d} ${h.name}</h3>\n                <div class="event__schedule">\n                  <p class="event__time">\n                    <time class="event__start-time" datetime="${f(o)}">${u(o)}</time>\n                    &mdash;\n                    <time class="event__end-time" datetime="${f(c)}">${u(c)}</time>\n                  </p>\n                  <p class="event__duration">${function(e,t){const n=s().utc(t).diff(e);return n<a?s().utc(n).format("mm[M]"):n>a&&n<864e5?s().utc(n).format("HH[H] mm[M]"):s().utc(n).format("DD[D] HH[H] mm[M]")}(o,c)}</p>\n                </div>\n                <p class="event__price">\n                  &euro;&nbsp;<span class="event__price-value">${i}</span>\n                </p>\n                <h4 class="visually-hidden">Offers:</h4>\n                <ul class="event__selected-offers">\n                ${p.map((e=>`<li class="event__offer">\n                    <span class="event__offer-title">${e.title}</span>\n                    &plus;&euro;&nbsp;\n                    <span class="event__offer-price">${e.price}</span>\n                  </li>`)).join("")}\n                </ul>\n                <button class="event__favorite-btn ${l?"event__favorite-btn--active":""}" type="button">\n                  <span class="visually-hidden">${l?"":"Add to favorite"}</span>\n                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n                  </svg>\n                </button>\n                <button class="event__rollup-btn" type="button">\n                  <span class="visually-hidden">Open event</span>\n                </button>\n              </div>\n            </li>\n`;var v}(this.points,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const _=[{id:"7594223c-c977-4e29-98c1-3e874184ce7b",basePrice:8325,dateFrom:"2024-09-27T22:01:09.952Z",dateTo:"2024-09-29T15:49:09.952Z",destination:"3863e6c2-e62e-4dca-935a-b40ca780180b",isFavorite:!0,offers:["461eac96-a50e-484b-84ab-c120da90c021","0c922f03-4dc0-4fd3-b795-e4fd944707d8","3a03c395-c373-45f5-80db-305737047680","66d15808-5a60-4dcf-a3ea-ecc431981d3a","17ea81f9-febb-4d87-921b-4497fb7b2d8b"],type:"check-in"},{id:"e8bd323c-bc4d-476e-a025-1c2b84b270d8",basePrice:3825,dateFrom:"2024-09-30T02:46:09.952Z",dateTo:"2024-10-01T08:26:09.952Z",destination:"085cb853-3a05-413a-a9c6-bd4e3fc3f21f",isFavorite:!0,offers:["6c6c127a-c278-4ac5-9ff1-a7dbeb31ff86","1cee50cd-1bd5-4478-86a2-7a24daf8569b"],type:"flight"},{id:"47fabaf0-2c9a-444a-b3b0-57500c28330b",basePrice:7283,dateFrom:"2024-10-02T15:04:09.952Z",dateTo:"2024-10-03T03:15:09.952Z",destination:"8dc2a6e7-f41e-4814-91b3-595a757d35e6",isFavorite:!0,offers:[],type:"sightseeing"},{id:"e88e8560-1ca6-4ff3-aee4-3019ca224ced",basePrice:4552,dateFrom:"2024-10-04T11:08:09.952Z",dateTo:"2024-10-06T09:05:09.952Z",destination:"8dc2a6e7-f41e-4814-91b3-595a757d35e6",isFavorite:!0,offers:["600abbe0-fab9-484a-81de-6463770115c3"],type:"ship"},{id:"e02d2fc0-b125-487f-8d6f-ec25af57a0c2",basePrice:4413,dateFrom:"2024-10-08T03:27:09.952Z",dateTo:"2024-10-09T06:06:09.952Z",destination:"085cb853-3a05-413a-a9c6-bd4e3fc3f21f",isFavorite:!0,offers:[],type:"sightseeing"},{id:"64ca2f55-68f6-4c57-9df1-9ac73b8da7ee",basePrice:4504,dateFrom:"2024-10-10T12:53:09.952Z",dateTo:"2024-10-11T05:27:09.952Z",destination:"0f076d37-07ca-4bd2-9405-1db9d63555df",isFavorite:!1,offers:[],type:"ship"},{id:"f80cafbc-b737-479e-9a0b-607038d955c5",basePrice:5984,dateFrom:"2024-10-11T13:25:09.952Z",dateTo:"2024-10-13T07:02:09.952Z",destination:"0f076d37-07ca-4bd2-9405-1db9d63555df",isFavorite:!0,offers:["3e6497ae-795a-4ed9-911f-d04b87e46466","545bd287-cabc-4144-a451-6320fc9812c9"],type:"drive"},{id:"92d64d4c-303f-47ee-9116-87e165fb9d26",basePrice:9293,dateFrom:"2024-10-15T02:46:09.952Z",dateTo:"2024-10-15T09:01:09.952Z",destination:"2184d59b-7448-4f1b-bc2a-87ca1b5d25f6",isFavorite:!0,offers:["7fefcce6-0052-4bad-bdb0-3a2ec3d06577","ef4e353b-1321-4f3e-82f5-8b01e60dde18","1f85122d-99c8-4263-8358-bfc474cccc78","74a22452-6155-4edc-a4f1-bc35c0fb08ba","600abbe0-fab9-484a-81de-6463770115c3"],type:"ship"},{id:"4764ed35-02cf-4ed2-a07a-4c74dbc4ef1c",basePrice:868,dateFrom:"2024-10-17T03:44:09.952Z",dateTo:"2024-10-18T13:03:09.952Z",destination:"63210beb-c938-483a-9f84-aa7ca8637320",isFavorite:!0,offers:["4be2bb22-3992-470f-b0b1-84cd7b1cc0fe","b8265f2c-d1be-4434-b634-14f59db3d923","18d62c22-e8b3-4b63-be10-4c3f108b8e8b"],type:"bus"},{id:"0446ef78-fc04-4ea6-a750-d50b91409d6f",basePrice:6291,dateFrom:"2024-10-19T00:52:09.952Z",dateTo:"2024-10-19T17:27:09.952Z",destination:"085cb853-3a05-413a-a9c6-bd4e3fc3f21f",isFavorite:!1,offers:[],type:"sightseeing"}],y=()=>{return(e=_)[Math.floor(Math.random()*e.length)];var e},g=[{type:"taxi",offers:[{id:"41377056-069d-44d0-97f8-605503c74807",title:"Upgrade to a business class",price:77},{id:"fc6134f5-f9b0-4f25-be74-52f5eba11d9b",title:"Choose the radio station",price:43},{id:"093af844-6c49-4bf9-a25c-c762f70a50d3",title:"Choose temperature",price:130},{id:"925d1645-a99e-42c5-8953-e574f382abdb",title:"Drive quickly, I'm in a hurry",price:52},{id:"9dc6e213-ed65-4c42-be21-402ef345145e",title:"Drive slowly",price:158}]},{type:"bus",offers:[{id:"4be2bb22-3992-470f-b0b1-84cd7b1cc0fe",title:"Infotainment system",price:76},{id:"b8265f2c-d1be-4434-b634-14f59db3d923",title:"Order meal",price:147},{id:"18d62c22-e8b3-4b63-be10-4c3f108b8e8b",title:"Choose seats",price:167}]},{type:"train",offers:[{id:"e18f4b94-239f-4035-986d-efc226fb0205",title:"Book a taxi at the arrival point",price:103},{id:"69aa9230-3137-4575-9aec-5ded92245aa9",title:"Order a breakfast",price:155},{id:"8ee8ba3b-362e-43ee-acbd-636b1ce931cc",title:"Wake up at a certain time",price:100}]},{type:"flight",offers:[{id:"77ca6b05-22ac-4693-bf9d-241eeca0893b",title:"Choose meal",price:134},{id:"7de07865-8246-493d-aff6-65294b75fb03",title:"Choose seats",price:78},{id:"01ff0c0a-c802-456b-9af6-bdc8c0c1af08",title:"Upgrade to comfort class",price:72},{id:"d916db22-6f4b-41d2-9eec-badb4b2f3fa0",title:"Upgrade to business class",price:126},{id:"6c6c127a-c278-4ac5-9ff1-a7dbeb31ff86",title:"Add luggage",price:162},{id:"1cee50cd-1bd5-4478-86a2-7a24daf8569b",title:"Business lounge",price:124}]},{type:"check-in",offers:[{id:"461eac96-a50e-484b-84ab-c120da90c021",title:"Choose the time of check-in",price:127},{id:"0c922f03-4dc0-4fd3-b795-e4fd944707d8",title:"Choose the time of check-out",price:61},{id:"3a03c395-c373-45f5-80db-305737047680",title:"Add breakfast",price:186},{id:"66d15808-5a60-4dcf-a3ea-ecc431981d3a",title:"Laundry",price:85},{id:"17ea81f9-febb-4d87-921b-4497fb7b2d8b",title:"Order a meal from the restaurant",price:36}]},{type:"sightseeing",offers:[]},{type:"ship",offers:[{id:"a46e3b48-1fd0-4c4e-b9fa-cd0423665872",title:"Choose meal",price:58},{id:"7fefcce6-0052-4bad-bdb0-3a2ec3d06577",title:"Choose seats",price:107},{id:"ef4e353b-1321-4f3e-82f5-8b01e60dde18",title:"Upgrade to comfort class",price:156},{id:"1f85122d-99c8-4263-8358-bfc474cccc78",title:"Upgrade to business class",price:122},{id:"74a22452-6155-4edc-a4f1-bc35c0fb08ba",title:"Add luggage",price:44},{id:"600abbe0-fab9-484a-81de-6463770115c3",title:"Business lounge",price:197}]},{type:"drive",offers:[{id:"3e6497ae-795a-4ed9-911f-d04b87e46466",title:"With automatic transmission",price:116},{id:"545bd287-cabc-4144-a451-6320fc9812c9",title:"With air conditioning",price:145}]},{type:"restaurant",offers:[{id:"9f24f136-bb4a-4c12-a141-b5f2219fbbbe",title:"Choose live music",price:36},{id:"8acf0435-dde2-4542-a186-d59cc6d26e9c",title:"Choose VIP area",price:131}]}],$=[{id:"2184d59b-7448-4f1b-bc2a-87ca1b5d25f6",description:"Valencia - with an embankment of a mighty river as a centre of attraction",name:"Valencia",pictures:[]},{id:"b1d6dbed-0690-4413-bab8-d8a9c16e6846",description:"Hiroshima - middle-eastern paradise",name:"Hiroshima",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Hiroshima a perfect place to stay with a family"},{src:"https://24.objects.htmlacademy.pro/static/destinations/11.jpg",description:"Hiroshima is a beautiful city"},{src:"https://24.objects.htmlacademy.pro/static/destinations/17.jpg",description:"Hiroshima with a beautiful old town"}]},{id:"ad29a0f1-8aa0-46ac-a44c-f5c0ef158a8c",description:"Vien - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Vien",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/7.jpg",description:"Vien is a beautiful city"}]},{id:"17c4346a-2a7a-48d2-b1d8-0924e888a04f",description:"",name:"Saint Petersburg",pictures:[]},{id:"8dc2a6e7-f41e-4814-91b3-595a757d35e6",description:"Kioto - full of of cozy canteens where you can try the best coffee in the Middle East",name:"Kioto",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/7.jpg",description:"Kioto in a middle of Europe"},{src:"https://24.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Kioto with an embankment of a mighty river as a centre of attraction"},{src:"https://24.objects.htmlacademy.pro/static/destinations/3.jpg",description:"Kioto with a beautiful old town"},{src:"https://24.objects.htmlacademy.pro/static/destinations/6.jpg",description:"Kioto for those who value comfort and coziness"}]},{id:"94a7bc26-34ee-48dc-a577-5a639137630a",description:"Rotterdam - with a beautiful old town",name:"Rotterdam",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/10.jpg",description:"Rotterdam in a middle of Europe"},{src:"https://24.objects.htmlacademy.pro/static/destinations/8.jpg",description:"Rotterdam with a beautiful old town"},{src:"https://24.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Rotterdam middle-eastern paradise"}]},{id:"085cb853-3a05-413a-a9c6-bd4e3fc3f21f",description:"Naples - with an embankment of a mighty river as a centre of attraction",name:"Naples",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/4.jpg",description:"Naples for those who value comfort and coziness"},{src:"https://24.objects.htmlacademy.pro/static/destinations/13.jpg",description:"Naples for those who value comfort and coziness"},{src:"https://24.objects.htmlacademy.pro/static/destinations/6.jpg",description:"Naples with a beautiful old town"}]},{id:"63210beb-c938-483a-9f84-aa7ca8637320",description:"Barcelona - for those who value comfort and coziness",name:"Barcelona",pictures:[{src:"https://24.objects.htmlacademy.pro/static/destinations/11.jpg",description:"Barcelona in a middle of Europe"}]},{id:"3863e6c2-e62e-4dca-935a-b40ca780180b",description:"",name:"Geneva",pictures:[]},{id:"0f076d37-07ca-4bd2-9405-1db9d63555df",description:"",name:"Oslo",pictures:[]}],D=document.querySelector(".page-header"),T=D.querySelector(".trip-main"),M=D.querySelector(".trip-controls__filters"),w=document.querySelector(".page-main").querySelector(".trip-events"),O=new class{points=Array.from({length:5},y);getPoints(){return this.points}},S=new class{offers=(()=>g)();getOffers(){return this.offers}},C=new class{destinations=(()=>$)();getDestinations(){return this.destinations}},j=new class{eventsComponent=new v;constructor({container:e,modelPoints:t,modelOffers:n,modelDestinations:i}){this.eventsContainer=e,this.modelDestinations=i,this.modelOffers=n,this.modelPoints=t}init(){this.points=[...this.modelPoints.getPoints()],this.destinations=this.modelDestinations.getDestinations(),this.offers=this.modelOffers.getOffers(),t(this.eventsComponent,this.eventsContainer),t(new m,this.eventsComponent.getElement()),t(new h,this.eventsComponent.getElement()),t(new p,this.eventsComponent.getElement());for(let e=0;e<this.points.length;e++)t(new b({points:this.points[e],offers:this.offers,destinations:this.destinations}),this.eventsComponent.getElement())}}({container:w,modelPoints:O,modelOffers:S,modelDestinations:C});t(new class{getTemplate(){return'\n    <section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n        <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n      </div>\n\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},T,"afterbegin"),t(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n        <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},M),j.init()})()})();
//# sourceMappingURL=bundle.d79ce12b4bada7e6cc40.js.map