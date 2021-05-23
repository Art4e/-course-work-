const arreyPersons = [
  ...arreyPersonsFra,
  ...arreyPersonsGer,
  ...arreyPersonsRus,
  ...arreyPersonsBel,
  ...arreyPersonsIta
]

const catalogHeadText = {
  ita: `О кельтской живописи нам ровно ничего неизвестно, а от галльско-римского периода во Франции дошли до нас только кое-какие фрагменты мозаик. Равным образом и от живописи времен франкийской монархии не сохранилось ничего, кроме миниатюр в тогдашних рукописях. Вообще, из всех отраслей искусства средневековой Франции, живопись — самая бедная количеством сохранившихся памятников.`,
  ger: `Развитие искусства Возрождения в Германии проходило под влиянием идей Реформации. По времени это был довольно короткий период с середины XV века до 1520-х гг. Крестьянская война, жестокое подавление крестьянских беспорядков, религиозный раскол и отход нескольких земель от католицизма оборвали развитие возрождения. 1530 год пережили только некоторые мастера, среди которых Альтдорфер, Ганс Гольбейн Младший и Лукас Кранах Старший, который провел последние годы жизни в ссылке вместе со своим высоким покровителем.`,
  ita: `Акционеры крупнейших компаний, которые представляют собой яркий пример континентально-европейского типа политической культуры, будут объявлены нарушающими общечеловеческие нормы этики и морали. Являясь всего лишь частью общей картины, стремящиеся вытеснить традиционное производство, нанотехнологии и по сей день остаются уделом либералов, которые жаждут быть функционально разнесены на независимые элементы.`,
  rus: `Русская иконопись — развивавшееся в недрах православной церкви изобразительное искусство Древней Руси, начало которому было положено в конце X века крещением Руси. Иконопись оставалась ядром древнерусской культуры вплоть до конца XVII века, когда в петровскую эпоху была потеснена светскими видами изобразительного искусства.`,
  bel: `Ещё в эпоху Ренессанса Фландрия прославилась своей живописью (фламандские примитивисты). Позднее во Фландрии жил и творил Рубенс (в Бельгии Антверпен до сих пор часто называют городом Рубенса). Однако ко второй половине XVII века фламандское искусство постепенно пришло в упадок. Позднее в Бельгии развивалась живопись в стилях романтизма, экспрессионизма и сюрреализма. Известные бельгийские художники — Джеймс Энсор (экспрессионизм и сюрреализм), Констант Пермеке (экспрессионизм), Леон Спиллиарт (символизм), Франц Ричард Унтербергер (романтизм), Ги Гюйгенс (фр.), Рене Магритт (считающийся одним из самых важных представителей сюрреализма).`
};

// ========================== Создаем аккардион ===============================================================
const crteatAccordion = (titleAccordeon) => {
  const titleAllAccordeonEl = document.querySelectorAll(titleAccordeon);
  const bodyAllAccordeonEl = document.querySelectorAll(`.col-right__items`);
  if (titleAllAccordeonEl.length < 0) return;

  const toggleClassActiv = (el, on = true) => {
    const nextEl = el.nextElementSibling;

    if (on) {
      titleAllAccordeonEl.forEach(el => {
        el.classList.remove(`activ`);
        setTimeout(() => { el.nextElementSibling.classList.remove(`in-visible`) }, 20);
        el.nextElementSibling.classList.remove(`activ`);
      })
      el.classList.add(`activ`);
      nextEl.classList.add(`activ`);
      setTimeout(() => { nextEl.classList.add(`in-visible`) }, 20);
    } else {
      el.classList.remove(`activ`);
      setTimeout(() => { nextEl.classList.remove(`in-visible`) }, 20);
      nextEl.classList.remove(`activ`);
    }
  };

  titleAllAccordeonEl.forEach(el => {

    el.addEventListener('click', (ev) => {
      const element = ev.target;

      if (el.classList.contains(`activ`)) {
        toggleClassActiv(element, false);
      } else {
        toggleClassActiv(element);
      }

    })
    toggleClassActiv(titleAllAccordeonEl[ 0 ]);
  });
};

// ========================== Создаем и заполняем табы ===============================================================
const wrapperBtn = document.querySelector(`.js-country-select`)
const btnAll = wrapperBtn.querySelectorAll(`[data-country]`)

const toSwitchBtn = (element) => {
  btnAll.forEach(e => {
    e.dataset.activ = false
    e.classList.remove(`activ`)
  })
  element.dataset.activ = true
  element.classList.add(`activ`)
}

// Создаем и заполняем тело раздела - каталог
const createBodyCatalog = (arreyPer) => {
  const arreyPeriodEl = document.querySelectorAll(`[date-period]`)
  arreyPeriodEl.forEach(e => e.innerHTML = null);

  arreyPer.forEach(person => {
    arreyPeriodEl[ person.period ].insertAdjacentHTML(`beforeend`, `
      <li class="col-right__item" data-item-person="">
        <button class="col-right__btn">${person.name}</button>
      </li>`)
  });
}

const getPerson = (pesonsArrey, name) => {
  const cardPersonEl = document.querySelector(`.js-person`)
  const personAllEl = cardPersonEl.querySelectorAll(`[data-person]`)

  pesonsArrey.forEach((person) => {

    if (name === person.name) {
      personAllEl.forEach(el => {

        if (el.getAttribute(`src`)) {
          el.setAttribute(`src`, person[ el.dataset.person ])
        } else {
          el.innerText = null
          el.innerText = person[ el.dataset.person ]
        }
      })
    }
  })
}
// Создаем и заполняем карточку персоны
const createCardPerson = (pesonsArreyNew) => {
  const arreyCreatePersons = document.querySelectorAll(`[data-item-person]`)

  arreyCreatePersons.forEach(el => {
    el.addEventListener(`click`, (ev) => {
      arreyCreatePersons.forEach(e => e.classList.remove(`activ`));
      ev.currentTarget.classList.add(`activ`)
      getPerson(pesonsArreyNew, ev.target.innerText)
    })
  });
}
// действия при отурытии таба
const onTab = (element) => {

  const atrBtnCountry = element.dataset.country
  const newArreyPersons = arreyPersons.filter((el) => el.country === atrBtnCountry)

  toSwitchBtn(element)

  if (catalogHeadText[ atrBtnCountry ]) document.querySelector(`.js-catalog-text`).innerText = catalogHeadText[ atrBtnCountry ]

  createBodyCatalog(newArreyPersons)
  createCardPerson(newArreyPersons)
  return newArreyPersons
}

toSwitchBtn(document.querySelector(`[data-activ="true"]`))

btnAll.forEach(el => {
  let textCatalogEl = document.querySelector(`.js-catalog-text`)
  const countryEl = el.dataset.country
  const activEl = el.dataset.activ

  if (activEl) {
    textCatalogEl.innerText = catalogHeadText[ countryEl ]
    createBodyCatalog(arreyPersons, countryEl)
  }

  el.addEventListener(`click`, (ev) => {
    ev.preventDefault
    // Запускаем onTab внутри getPerson, для открытия 1-й персоны массива страны
    getPerson(onTab(ev.target), document.querySelectorAll(`[data-item-person]`)[ '0' ].innerText)
    // onTab(ev.target)
  })
});

// Открытие страны, периода времени и персоны по умолчанию при загрузке
crteatAccordion('.col-right__header');
const tempArreyPerson = onTab(document.querySelector(`[data-activ="true"]`))
console.log(document.querySelectorAll(`[data-item-person]`)[ '0' ])
console.log(tempArreyPerson)
setTimeout(() => {
  getPerson(tempArreyPerson, document.querySelectorAll(`[data-item-person]`)[ '0' ].innerText)
}, 300)