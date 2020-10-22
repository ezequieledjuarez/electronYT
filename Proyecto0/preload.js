function stablishVersion(selectorId, version){
    let element = document.getElementById(selectorId)

    if(element){
        element.innerText = version
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    const components = ['Node', 'Chrome', 'Electron']

    for(const component of components){
        stablishVersion(`version${component}`, process.versions[component.toLocaleLowerCase()])
    }
})