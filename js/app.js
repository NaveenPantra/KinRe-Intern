// Design Pattern: MVC

alert("This is Mobile first allpication");
alert("This is the snapshot of the application development on the timeline... NOT THE FULL VERSION");
let width = window.innerWidth;
if (width > 448 || width < 356)
    document.getElementsByTagName(`html`).display = `none`

(function() {

    //***************  MODEL CONTROLLER  **************//
    let modelController = (() => {

    })();





    //***************  VIEW CONTROLLER  ***************/
    let viewController = (() => {
        let DOMStrings = {
            navItem: ".nav-item",
            navItemActive: 'nav-item--active',
            btnExp: `.btn-exp`,
            orderHide: 'order__hide',
            btnAmore: '.btn__Aorder-more',
            contactMore: '.btn-exp-conct',
            navIcon: 'nav-icon'
        }

        let displayTab = (ID) => {

            console.log(`Displaying Tab: ${ID}`);
            if (ID === 'home') {
                // console.log('HOME');
                displayOnlyTab(ID);
            } else if (ID === 'contact') {
                // console.log('CONTACT');
                displayOnlyTab(ID);
            } else if (ID === 'accepted') {
                // console.log('ACCEPTED');
                displayOnlyTab(ID);
            } else if (ID === 'message') {
                // console.log('MESSAGE');
                displayOnlyTab(ID);
            } else if (ID === 'profile'){
                displayOnlyTab(ID);
            }
        };

        const displayOnlyTab = (ID) => {
            const IDs = ['home', 'contact', 'accepted', 'message', 'profile'];

            // ADDING CLASS 'id-hide'
            IDs.forEach( current => {
                if(current != ID) {
                    document.getElementsByName(`${current}`)[0].classList.add(`${current}-hide`);
                }
            });

            // REMOVING CLASS 'id-hide'
            document.getElementsByName(ID)[0].classList.remove(`${ID}-hide`);
        }

        return {
            getDOMStrings: () => {
                return DOMStrings;
            },

            setTab: (ID) => {
                return displayTab(ID);
            }
        }

    })();





    //***************  CONTROLLER  ***************//
    let Controller = ((model, view) => {
        // Fetching all the DOMStrings (i.e class Names in the DOM)
        let DOMStrings = view.getDOMStrings();

        // Initilizing the JS with event listeners.
        let setUpEventListeners = () => {

            // Event handler for navigation --> Home, Contacts, Accepted Orders, Messages, profile 
            // NAVIGATION
            let navigation = document.querySelectorAll(DOMStrings.navItem);
            navigation = [...navigation];
            navigation.forEach(current => {
                current.addEventListener('click', toggleActive);
            })

            // HOME TAB  VIEW-MORE-DETAILS
            let more = document.querySelectorAll(DOMStrings.btnExp);
            more = [...more];
            more.forEach(current => {
                current.addEventListener('click', veiwMoreDetails);
            });

            // ACCEPTED ORDERS VIEW MORE DETAILS BUTTON
            let btnAmore = document.querySelectorAll(DOMStrings.btnAmore);
            btnAmore = [...btnAmore];
            btnAmore.forEach( current => {
                current.addEventListener('click', veiwMoreDetailsAO);
            });

            // MORE CONTACT DETAILS BUTTON.
            let contact_more = document.querySelectorAll(DOMStrings.contactMore);
            contact_more = [...contact_more];
            contact_more.forEach( current => {
                current.addEventListener('click', viewContact);
            });

        }


        // Toggle navigation
        const toggleActive = (event) => {

            const targetClass = String(event.target.className);
            const targetID = String(event.target.id);
            const targetParentClass = String(event.target.parentElement.className);
            const targetParentID = String(event.target.parentElement.id);
            let navClass = document.querySelectorAll(DOMStrings.navItem);
            navClass = [...navClass];
            navClass.forEach(current => {
                current.classList.remove(DOMStrings.navItemActive);
            });
            
            if(targetParentClass === 'nav-item') {
                event.target.parentElement.classList.add(DOMStrings.navItemActive);
            } else {
                console.log("target: " + event.target.classList);
                if (!event.target.classList.contains(DOMStrings.navIcon)) {
                    event.target.classList.add(DOMStrings.navItemActive);
                }
                // event.target.classList.add(DOMStrings.navItemActive);
            }

            const tabID = targetID?targetID:targetParentID;
            // To dispaly the tab content
            view.setTab(tabID);
        };


        // EVENT LISTENER ON HOME SCREEN ORDERS
        let veiwMoreDetails = (event) => {

            // To get the class name of the order card
            let orderClassName = event.target.parentElement.parentElement.classList[0];
            
            let dis = document.querySelectorAll(`.${orderClassName}`);
            dis = [...dis];
            
            dis.forEach( current => {
                current.classList.toggle(DOMStrings.orderHide)
            });

            // To Display the selected order
            event.target.parentElement.parentElement.classList.remove(DOMStrings.orderHide);
            // console.log(event.target.parentElement.parentElement.classList[1]);
            if (event.target.textContent.includes('more')) {
                event.target.innerHTML = `go back <span class="view--more-arrow">&larr;</span>`;
                event.target.childNodes[1].classList.toggle('order__animate-back');
            } else {
                event.target.innerHTML = `View more details <span class="view--more-arrow">&rarr;</span>`;
            }

            // To display more details
            let moreName = String(event.target.name);
            // console.log(moreName)
            let moreDetails = document.getElementsByName(moreName);
            moreDetails = [...moreDetails];
            moreDetails[1].classList.toggle('more__hide');
            

        };

        // EVENT LISTENE ON THE ACCEPTED ORDERS
        const veiwMoreDetailsAO = (event) => {

            const name = event.target.name;
            const moreDetail = document.querySelector(`.Amore[name='${name}']`);
            const btnBack = `Get Back <span class="view--more-arrow">&larr;</span>`;
            const btnView = `view more details <span class="view--more-arrow">&rarr;</span>`;
            moreDetail.classList.toggle('more__hide');
            if(event.target.textContent.includes('view')) {
                event.target.innerHTML = btnBack;
            } else {
                event.target.innerHTML = btnView;
            }

        };

        // MORE CONTACT DETAILS
        const viewContact = (event) => {
            const name = event.target.name;
            const more = document.querySelector(`.contact__more[name='${name}']`);
            const btnBack = `get back <span class="contact__option--more-contact-arrow" name="1">&nbsp;&nbsp;&larr;</span>`;
            const btnView = `contact details <span class="contact__option--more-contact-arrow" name="1">&nbsp;&nbsp;&rarr;</span>`;
            more.classList.toggle('contact__more-hide');
            if (event.target.innerHTML.includes('details')) {
                event.target.innerHTML = btnBack;
            } else {
                event.target.innerHTML = btnView;
            }
        };

        return {
            init: () => {
                setUpEventListeners();
            }
        }

    })(modelController, viewController);





    //**************  CONTROLLER INITILIZATION  **************//
    ( () => {
        Controller.init();
    })();




})();


(
    function() {
        var waypoint = new Waypoint({
            element: document.getElementById('order__search'),
            handler: function(direction) {
                // document.getElementById('order__search').classList.toggle('search__fix')
            },
            offset: '3%'
        })
    }
)();
