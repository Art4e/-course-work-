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
    arreyPeriodEl[person.period].insertAdjacentHTML(`beforeend`, `
      <li class="col-right__item" data-item-person="">
        <button class="col-right__btn">${person.name}</button>
      </li>`)
  });
}

// Создаем и заполняем карточку персоны
const createCardPerson = (pesonsArreyNew) => {
  const arreyCreatePersons = document.querySelectorAll(`[data-item-person]`)
  const cardPersonEl = document.querySelector(`.js-person`)
  const personAllEl = cardPersonEl.querySelectorAll(`[data-person]`)

  arreyCreatePersons.forEach(el => {

    el.addEventListener(`click`, (ev) => {
      const namePerson = ev.target.innerText;

      pesonsArreyNew.forEach((person) => {

        if (namePerson === person.name) {
          console.log(namePerson === person.name, person.name)
          personAllEl.forEach(el => {
            console.log(el)
            if (el.getAttribute(`src`)) {
              el.setAttribute(`src`, person[el.dataset.person])
            } else {
              el.innerText = null
              el.innerText = person[el.dataset.person]
            }
          })
        }
      })
    })

  });
}
//js-active-tab
// if (btnAll.length < 0) return

toSwitchBtn(document.querySelector(`[data-activ="true"]`))

btnAll.forEach(el => {
  let textCatalogEl = document.querySelector(`.js-catalog-text`)
  const countryEl = el.dataset.country
  const activEl = el.dataset.activ

  if (activEl) {
    textCatalogEl.innerText = catalogHeadText[countryEl]
    createBodyCatalog(arreyPersons, countryEl)
  }

  el.addEventListener(`click`, (ev) => {
    ev.preventDefault
    const elData = ev.target
    const atrBtnCountry = elData.dataset.country
    const newArreyPersons = arreyPersons.filter((el) => el.country === atrBtnCountry)

    toSwitchBtn(elData)

    if (catalogHeadText[atrBtnCountry]) textCatalogEl.innerText = catalogHeadText[atrBtnCountry]

    createBodyCatalog(newArreyPersons)

    createCardPerson(newArreyPersons)

  })

});