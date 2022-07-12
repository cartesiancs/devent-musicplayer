class CardAlbum extends HTMLElement {
    connectedCallback() {
        let title_element_tag = this.getElementsByTagName('card-album-title')
        let text_element_tag = this.getElementsByTagName('card-album-text')

        let image_src = this.getAttribute('image-src')

        let body = document.createElement('div')
        let image = document.createElement('img')
        let title = document.createElement('h5')
        let text = document.createElement('p')

        this.classList.add('col-6')

        body.classList.add('card', 'card-border-none', 'mb-3')
        image.classList.add('card-img-square')
        title.classList.add('card-title', 'mt-2')
        text.classList.add('card-text')

        image.setAttribute('src', image_src)
        title.innerText = title_element_tag[0].innerText
        text.innerText = text_element_tag[0].innerText

        while (this.firstChild) this.removeChild(this.firstChild);

        body.appendChild(image)
        body.appendChild(title)
        body.appendChild(text)

        this.appendChild(body)
    }
}

export { CardAlbum }