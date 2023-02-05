//Click menu
const toggle = document.getElementById("toggle")
const overlayNav = document.getElementById("overlay-Navbar"); 
const nav = document.getElementById('navigation');

toggle.addEventListener("click", OpenNavbar);
overlayNav.addEventListener("click", CloseNavbar); 

function OpenNavbar(){
    nav.classList.toggle('active');
    overlayNav.classList.toggle('active');
}
function CloseNavbar(){
    nav.classList.remove('active');
    overlayNav.classList.remove('active');
}

const openPopupClicks = document.querySelectorAll('[data-popup-target]')
const closePopupClicks = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
const lock = document.getElementById('lock')

openPopupClicks.forEach(button => {
button.addEventListener('click', () => {
    const popup = document.querySelector(button.dataset.popupTarget)
    openPopup(popup)
})
})

overlay.addEventListener('click', () => {
 const popups = document.querySelectorAll('.modal.active')
 popups.forEach(popup => {
      closePopup(popup)
     })
})

closePopupClicks.forEach(button => {
     button.addEventListener('click', () => {
         const popup = button.closest('.modal')
         closePopup(popup)
     })
})   

function openPopup(popup) {
if (popup == null) return
popup.classList.add('active')
overlay.classList.add('active')
lock.classList.add('lock')
}

function closePopup(popup) {
if (popup == null) return
popup.classList.remove('active')
overlay.classList.remove('active')
lock.classList.remove('lock')
}

