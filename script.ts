import { debouncedRemoveStyles } from "./debounce.js"
import { dropdowmMenuGroups as dropdowmMenuData } from "./navData.js"

const toggle = document.getElementById("nav-toggle")!
const nav =  document.getElementById("nav-menu")!
const dropdownContents =  document.querySelectorAll<HTMLDivElement>(".dropdown-content")!
const dropdownItems =  document.querySelectorAll<HTMLDivElement>(".dropdown-item")!

type DropdowmMenu = {
    icon: string,
    title: string,
    liContents: string[]
}

type DropdowmMenuGroups = DropdowmMenu[]

export type NestedGroups = DropdowmMenu[][]

function generateDropdownList(menuGroups: DropdowmMenuGroups): string {

    if(!menuGroups.length) return ""

    let dropdowmMenuGroups = ``

    menuGroups.forEach((menu) => {

        let liElements = ``
        
        menu.liContents.forEach((item) => {
            liElements += `<li><a href="" class="dropdown-link">${item}</a></li>`
        })
    
        let ul = `<ul class="dropdown-list">${liElements}</ul>`
    
        let dropdowmGroup = `<div class="dropdown-group">
                               <div class="dropdowm-icon">${menu.icon}</div>
                               <span class="dropdown-title">${menu.title}</span>
                               ${ul}
                             </div>`

        dropdowmMenuGroups += dropdowmGroup
    });
  
    return dropdowmMenuGroups
}

for (let i = 0; i < dropdownContents.length; i++) {
    dropdownContents[i].innerHTML += generateDropdownList(dropdowmMenuData[i])
}

toggle.onclick = () => {
    nav.classList.toggle('show-menu')
    toggle.classList.toggle('burger-menu-icon')
    if(!nav.classList.contains('show-menu')){
        dropdownItems.forEach((dropdownItem) => dropdownItem.classList.remove('show-dropdown'))
        dropdownContainer.forEach((container) => container.removeAttribute('style'))
    } 
}

dropdownItems.forEach((item) => {
    const dropdownBtn = item.querySelector<HTMLDivElement>('.dropdown-btn')!
    dropdownBtn.addEventListener('click', () => {
        const currentDropdownMenu = document.querySelector<HTMLDivElement>('.show-dropdown')
        toggleItem(item)
        if(currentDropdownMenu && currentDropdownMenu !== item) toggleItem(currentDropdownMenu)
    })
})

function toggleItem(item: HTMLDivElement) {
 const dropdownContainer = item.querySelector<HTMLDivElement>('.dropdown-container')!
 
 if(item.classList.contains('show-dropdown')){
    dropdownContainer.removeAttribute('style')
    item.classList.remove('show-dropdown')
 }else{
    dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
    item.classList.add('show-dropdown')
 }
}

const mediaQuery = matchMedia('(min-width: 1118px)')
const dropdownContainer = document.querySelectorAll<HTMLDivElement>('.dropdown-container')

function removeStyles() {
    console.log('Calling function...')
    if(mediaQuery.matches){
        document.body.style.backgroundColor = "hotPink"
        dropdownContainer.forEach((container) => container.removeAttribute('style'))
        dropdownItems.forEach((dropdownItem) => dropdownItem.classList.remove('show-dropdown'))
    }else{
        document.body.style.backgroundColor = "initial"
    }
}

window.addEventListener('resize', debouncedRemoveStyles(removeStyles, 300))