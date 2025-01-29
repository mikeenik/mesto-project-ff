(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r),document.addEventListener("click",o)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r),document.removeEventListener("click",o)}function r(e){if("Escape"===e.key){const e=document.querySelector(".popup_is-opened");e&&t(e)}}function o(e){e.target.classList.contains("popup")&&t(e.target)}const n={baseUrl:"https://nomoreparties.co/v1/wff-cohort-30",headers:{authorization:"862c22fe-fcd9-4bbf-9c6f-5c11db01764c","Content-Type":"application/json"}},c=e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`);function a(e){return fetch(`${n.baseUrl}/cards/likes/${e}`,{method:"PUT",headers:n.headers}).then((e=>c(e)))}function s(e){return fetch(`${n.baseUrl}/cards/likes/${e}`,{method:"DELETE",headers:n.headers}).then((e=>c(e)))}const u=document.querySelector("#card-template").content;function i(e,t,r,o,n){const c=u.cloneNode(!0).querySelector(".places__item"),a=c.querySelector(".card__image"),s=c.querySelector(".card__title"),i=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),d=c.querySelector(".card__like-count");a.src=e.link,a.alt=e.name,s.textContent=e.name,d.textContent=e.likes.length;const p=e._id;return e.owner._id!==n?i.remove():i.addEventListener("click",(()=>{r(c,p)})),e.likes.some((e=>e._id===n))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(()=>{t(l,p,d)})),a.addEventListener("click",o),c}function l(e,t){(function(e){return fetch(`${n.baseUrl}/cards/${e}`,{method:"DELETE",headers:n.headers}).then((e=>c(e)))})(t).then((()=>{e.remove()})).catch((e=>{console.error(`Ошибка удаления карты лайка: ${e}`)}))}function d(e,t,r){const o=e.classList.contains("card__like-button_is-active");(o?s:a)(t).then((t=>{r.textContent=t.likes.length,e.classList.toggle("card__like-button_is-active",!o)})).catch((e=>{console.error(`Ошибка изменения лайка: ${e}`)}))}function p(e,t,r,o){const n=e.querySelector(`.${t.name}-error`);t.classList.add(o.inputErrorClass),n.textContent=r,n.classList.add(o.errorClass)}function _(e,t,r){const o=e.querySelector(`.${t.name}-error`);t.classList.remove(r.inputErrorClass),o.textContent="",o.classList.remove(r.errorClass)}function m(e,t,r){!function(e){return e.some((e=>!e.validity.valid))}(e)?(t.classList.remove(r.inactiveButtonClass),t.disabled=!1):(t.classList.add(r.inactiveButtonClass),t.disabled=!0)}function y(e,t){const r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);r.forEach((r=>{_(e,r,t),r.value=""})),m(r,o,t)}const v=document.querySelector(".places__list"),f=document.querySelector(".popup_type_edit"),h=f.querySelector(".popup__input_type_name"),S=f.querySelector(".popup__input_type_description"),b=document.querySelector(".profile__edit-button"),q=f.querySelector(".popup__close"),L=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),k=f.querySelector(".popup__form"),C=f.querySelector(".popup__button"),g=document.querySelector(".profile__image"),$=document.querySelector(".popup_type_new-card"),x=document.querySelector(".profile__add-button"),U=document.querySelector(".popup__input_type_card-name"),A=document.querySelector(".popup__input_type_url"),B=$.querySelector(".popup__form"),T=$.querySelector(".popup__button"),D=$.querySelector(".popup__close"),P=document.querySelector(".popup_type_edit_avatar"),w=P.querySelector(".popup__input_type_url_avatar"),N=P.querySelector(".popup__close"),O=P.querySelector(".popup__button"),j=document.querySelector(".profile_image__container"),J=document.querySelector(".popup_type_image"),M=J.querySelector(".popup__caption"),H=J.querySelector(".popup__image"),I=J.querySelector(".popup__close"),z=document.querySelector(".popup__form"),F={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function G(t){M.textContent=t.name,H.src=t.link,H.alt=t.name,e(J)}let K;var Q;Promise.all([fetch(`${n.baseUrl}/users/me`,{headers:n.headers}).then((e=>c(e))),fetch(`${n.baseUrl}/cards`,{headers:n.headers}).then((e=>c(e)))]).then((([e,t])=>{L.textContent=e.name,E.textContent=e.about,g.style.backgroundImage=`url(${e.avatar})`,K=e._id,t.forEach((e=>{const t=i(e,d,l,G,K);v.append(t)}))})).catch((e=>{console.error(`Ошибка загрузки данных: ${e}`)})),b.addEventListener("click",(()=>{h.value=L.textContent,S.value=E.textContent,y(k,F),e(f)})),q.addEventListener("click",(()=>t(f))),k.addEventListener("submit",(function(e){e.preventDefault();const r={name:h.value,about:S.value};var o,a;C.textContent="Сохранение...",(o=r.name,a=r.about,fetch(`${n.baseUrl}/users/me`,{method:"PATCH",headers:n.headers,body:JSON.stringify({name:o,about:a})}).then((e=>c(e)))).then((e=>{L.textContent=e.name,E.textContent=e.about,t(f)})).catch((e=>{console.error(`Ошибка обновления данных пользователя: ${e}`)})).finally((()=>{C.textContent="Сохранить"}))})),T.addEventListener("click",(()=>t($))),x.addEventListener("click",(()=>{y(B,F),e($)})),B.addEventListener("submit",(function(e){e.preventDefault();const r=U.value,o=A.value;var a,s;T.textContent="Сохранение...",(a=r,s=o,fetch(`${n.baseUrl}/cards`,{method:"POST",headers:n.headers,body:JSON.stringify({name:a,link:s})}).then((e=>c(e)))).then((r=>{const o=i(r,d,l,G,K);v.prepend(o),t($),e.target.reset()})).catch((e=>{console.error(`Ошибка добавления карточки: ${e}`)})).finally((()=>{T.textContent="Сохранить"}))})),D.addEventListener("click",(()=>t($))),j.addEventListener("click",(()=>{w.value="",y(z,F),O.classList.add(F.inactiveButtonClass),O.disabled=!0,e(P)})),P.addEventListener("submit",(function(e){e.preventDefault();const r=w.value;var o;O.textContent="Сохранение...",(o=r,fetch(`${n.baseUrl}/users/me/avatar`,{method:"PATCH",headers:n.headers,body:JSON.stringify({avatar:o})}).then((e=>c(e)))).then((r=>{g.style.backgroundImage=`url(${r.avatar})`,t(P),e.target.reset()})).catch((e=>{console.error(`Ошибка изменения аватара: ${e}`)})).finally((()=>{O.textContent="Сохранить"}))})),N.addEventListener("click",(()=>t(P))),I.addEventListener("click",(()=>t(J))),Q=F,Array.from(document.querySelectorAll(Q.formSelector)).forEach((e=>{e.addEventListener("submit",(e=>{e.preventDefault()})),function(e,t){const r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);m(r,o,t),r.forEach((n=>{n.addEventListener("input",(()=>{!function(e,t,r){const o=t.dataset.errorMsg||t.validationMessage;t.validity.valueMissing?p(e,t,"Вы пропустили это поле.",r):t.validity.tooShort?p(e,t,`Минимум ${t.minLength} символа.`,r):t.validity.valid?_(e,t,r):p(e,t,o,r)}(e,n,t),m(r,o,t)}))}))}(e,Q)}))})();