const{shell} = require('electron')

class Bookmarks{
    constructor(){
        this.msgError = document.querySelector('.message-error')
        this.bookmarkCreateForm = document.querySelector('.create-form-bookmark')
        this.bookmarkUrl = document.querySelector('.create-bookmark-url')
        this.bookmarkButton = document.querySelector('.create-button-bookmark')
        this.bookmarks = document.querySelector('.bookmarks')
        this.bookmarksDelete = document.querySelector('.delete-bookmarks')

        this.parser = new DOMParser()

        this.addEvenLiss()
    }
    
            addEvenLiss(){
            this.bookmarkUrl.addEventListener('keyup', ()=>{
                this.bookmarkButton.disabled = !this.bookmarkUrl.validity.valid // true disabled, false enabled
            })
            this.bookmarkCreateForm.addEventListener('submit', this.createBookmark.bind(this))

            this.bookmarksDelete.addEventListener('click', this.deleteCreatedBookmark.bind(this))

            this.bookmarks.addEventListener('click', this.openLinkFromBookmark.bind(this))
        }
        createBookmark(event){
            event.preventDefault()

            const url =  this.bookmarkUrl.value

            fetch(url)
            .then(res => res.text())
            .then(this.extractContent.bind(this))
            .then(this.findTitlePage)
            .then(title => this.storageBookmark(url,title))
            .then(this.cleanForm.bind(this))
            .then(this.viewBookmarks.bind(this))
            .catch(error => this.reportError(error,url))
        }
    extractContent(content){
        return this.parser.parseFromString(content, 'text/html');
    }
    

    findTitlePage(html){
        return html.querySelector('title').innerText
    }

    storageBookmark(url, title){
        localStorage.setItem(url, JSON.stringify({title: title, url: url}))
    }

    cleanForm(){
        this.bookmarkUrl.value = null
    }

    getBookmarks(){

        return Object.keys(localStorage).map(k => JSON.parse(localStorage.getItem(k)))

    }

    htmlBookmarkGenerator(bookmark){
        return `<div class ="links"><h3>${bookmark.title}</h3>
            <p>
                <a href="${bookmark.url}">
                ${bookmark.url}
                </a>
            </p>
        </div>`
    }

    viewBookmarks(){
        let bookmarks = this.getBookmarks()

        let html = bookmarks.map(this.htmlBookmarkGenerator).join('')

        this.bookmarks.innerHTML = html
    }

    reportError(error,url){
        this.msgError.innerHTML = `An error has ocurred ${url}: ${error}`

        setTimeout(()=>{
            this.msgError.innerText = null
        }, 5000)
    }

    deleteCreatedBookmark(){
        localStorage.clear()

        this.bookmarks.innerHTML = ''
    }

    openLinkFromBookmark(event){
        if(event.target.href){ //if aim to link
            event.preventDefault() //prevents open the link in the app
            shell.openExternal(event.target.href)
        }
    }
}

let bookmarks = new Bookmarks()
bookmarks.viewBookmarks()