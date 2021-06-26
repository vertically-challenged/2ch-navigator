function viewport() {
    let $preview = document.querySelector('body')
    if ($preview) {
        $preview.addEventListener('click', event => {
            let viewport = document.querySelector('.viewport')
            let viewportVideo = document.querySelector('#viewport-video')
            let viewportImg = document.querySelector('#viewport-img')
            let viewportFileName = document.querySelector('#viewport-file-name')

            if (event.target.classList.contains('file__preview')) {
                let fullSizeLink = event.target.attributes['full-size-link'].value
                let displayName = event.target.attributes.displayname.value
                let type = event.target.attributes.type.value

                viewport.classList.remove("hidden")
                viewportFileName.textContent=displayName

                if (type == '1' || type == '2') {
                    viewportImg.classList.remove("hidden")
                    viewportImg.setAttribute('src', fullSizeLink)

                } else if (type == '6' || type == '10') {
                    viewportVideo.classList.remove("hidden")
                    viewportVideo.setAttribute('src', fullSizeLink)
                    viewportVideo.play()
                }
            } else if (event.target.classList.contains('viewport__content')) {
                return
            } else {
                viewport.classList.add("hidden")
                viewportVideo.pause()
                viewportVideo.classList.add("hidden")
                viewportImg.classList.add("hidden")
            }

        })
    }

    document.onkeyup = function (KeyboardEvent) {
        if (KeyboardEvent.key == 'Escape') {
            let viewport = document.querySelector('.viewport')
            let viewportVideo = document.querySelector('#viewport-video')
            let viewportImg = document.querySelector('#viewport-img')
            viewport.classList.add("hidden")
            viewportVideo.pause()
            viewportVideo.classList.add("hidden")
            viewportImg.classList.add("hidden")
        }
    }
}

export {viewport} 
