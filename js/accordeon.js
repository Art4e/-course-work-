; (() => {
    // const contAccordeonEl = document.querySelectorAll('.col-right__items');

    // for (let i = 0; i < titleAccordeonEl.length; i++) {
    //     titleAccordeonEl[i].addEventListener('click', function() {
    //         if (!(this.classList.contains('active'))) {
    //             for(let i = 0; i < titleAccordeonEl.length; i++) {
    //                 titleAccordeonEl[i].classList.remove('active');
    //             }
    //             this.classList.add('active');
    //         }
    //     })
    // }
    window.crteatAccordion = function (titleAccordeon) {
        const titleAccordeonEl = document.querySelectorAll(titleAccordeon);

        for (let i = 0; i < titleAccordeonEl.length; i++) {
            let curTitle = titleAccordeonEl[i];
            titleAccordeonEl[i].addEventListener('click', function () {
                let classes = this.getAttribute('class'),
                    newClasses = '',
                    classesArr = classes.split(' '),
                    newClassesArr = classes.split(' ');
                for (let j = 0; j < classesArr.length; j++) {
                    if (classesArr[j] == 'active') {
                        classesArr.splice([j], 1);
                    }
                }
                if (classesArr.length === newClassesArr.length) {
                    classesArr.push('active');
                    newClasses = classesArr.join(' ');
                } else {
                    newClasses = classesArr.join(' ');
                }

                for (let l = 0; l < titleAccordeonEl.length; l++) {
                    oldClasses = titleAccordeonEl[l].getAttribute('class');
                    oldClassesArr = oldClasses.split(' ');
                    for (let k = 0; k < oldClassesArr.length; k++) {
                        if (oldClassesArr[k] == 'active') {
                            oldClassesArr.splice([k], 1);
                        }
                        oldClasses = oldClassesArr.join(' ');
                        titleAccordeonEl[l].setAttribute('class', oldClasses);

                    }
                }
                this.setAttribute('class', newClasses);
            })
        };

        // document.onclick = function (e) {
        //     if (!e.target.classList.contains('active')) {
        //         const activeAccordeon = document.querySelectorAll('.active');
        //         activeAccordeon.forEach(el => {
        //             if (el.classList.contains('active')) {
        //                 el.classList.remove('active')
        //             };
        //         });
        //     }
        // };
    };
})();