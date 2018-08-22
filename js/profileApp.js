(() => {
    
    console.log(`This message from profileApp.js`)
    
    let DOMStrings = {
        subopt: `.subopt`,
        subActive: `.subopt-active`,
        suboptMore: `.subopt__more`,
        suboptHide: `subopt__hide`,
        prodUpload: 'prod-upload-opt',
        hide: 'hide',
        uploadImg: '.upload__image-img',
        uploadImageInp: '.upload__image-inp',
        uploadImagePlace: '.upload__image-img--place',
        btnEditProfile: '.button-edit',
        profileDetail: '.profile__detail',
        profileMore: '.profile__more',
        btnPromote: '.button-promote',
        profileEdt: '.profile__edit',
        profilePromote: '.profile__promote'
    }

    let setupEventListeners = () => {
        let subOptions = document.querySelectorAll(DOMStrings.subopt);
        subOptions = [...subOptions];
        subOptions.forEach(current => {
            current.addEventListener('click', toggleSubActive);
        });

        let prodUpload = document.querySelector(`[name = "${DOMStrings.prodUpload}"`);
        prodUpload.addEventListener('click', toggleUpload);


        const imgInp = document.querySelector(DOMStrings.uploadImageInp);
        imgInp.addEventListener('change', imageIntake);

        const btnEdit = document.querySelector(DOMStrings.btnEditProfile);
        btnEdit.addEventListener('click', toggleDetailProfile);

        const btnPromote = document.querySelector(DOMStrings.btnPromote);
        btnPromote.addEventListener('click', togglePromote);

    }

    const toggleDetailProfile = (event) => {
        toggleHide(DOMStrings.profileDetail);
        toggleHide(DOMStrings.profileMore);
        toggleHide(DOMStrings.profileEdt);
    }

    const togglePromote = (event) => {
        toggleHide(DOMStrings.profileDetail);
        toggleHide(DOMStrings.profileMore);
        toggleHide(DOMStrings.profilePromote);
    }

    const toggleHide = (element) => {
        const ele = document.querySelector(element);
        ele.classList.toggle(DOMStrings.hide);
    }

    const imageIntake = (event) => {
        const imgInp = document.querySelector(DOMStrings.uploadImageInp);
        const file = imgInp.files[0];
        console.log(file);

        if (file.type.startsWith('image/')){

             let fReader = new FileReader();

             fReader.onload = ( () => {
                return (imgData) => {
                    let image = document.querySelector(DOMStrings.uploadImagePlace);
                    image.setAttribute('src', imgData.target.result)
                }
             })();

            fReader.readAsDataURL(file);

        } else {

        }
        
    }

    const toggleUpload = (event) => {
        const domNodeUpload = document.querySelector(`.${DOMStrings.prodUpload}`);
        domNodeUpload.classList.toggle(DOMStrings.hide);

        const profileMoreSubOpt = document.querySelector(`.profile__more-subtions-block`);
        profileMoreSubOpt.classList.toggle(`hide`);
    }

    let toggleSubActive = (event) => {
        let target = event.target.classList[0];
        if (!target.includes('subView')) {
            target = event.target.getAttribute('name');
        }
        let subopt = document.querySelectorAll(DOMStrings.subopt);
        subopt = [...subopt];
        subopt.forEach( current => {
            if(current.classList.contains(DOMStrings.subActive.slice(1,))) {
                current.classList.remove(DOMStrings.subActive.slice(1,));
            }
            if (current.getAttribute('name') === target) {
                current.classList.add(DOMStrings.subActive.slice(1,));
            }
        });

        toggleSubView(target);
        
    }


    let toggleSubView = (target) => {
        let view = document.querySelectorAll(`div[name = "${target}"]`)[1];
        let all = document.querySelectorAll(`${DOMStrings.suboptMore}`);
        all = [...all];

        all.forEach(current => {
            if(!current.classList.contains(DOMStrings.suboptHide)) {
                current.classList.add(DOMStrings.suboptHide);
            }
            if(current.getAttribute(`name`) === target ) {
                current.classList.remove(DOMStrings.suboptHide)
            }
        });
    }



    setupEventListeners();
    
})();