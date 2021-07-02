function lazyLoad() {
    const targets = document.querySelectorAll('[thumbnail-src]')

    const options = {
        root: null, 
        rootMargin: '0px', 
        threshold: 0.05 
    }
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach( entry => {
            if (entry.isIntersecting && entry.target.classList.contains('loading')) {
                entry.target.src = entry.target.getAttribute('thumbnail-src')
                entry.target.onload = () => {
                    entry.target.classList.remove('loading')
                    entry.target.removeAttribute('thumbnail-src')
                }
            }
        })

    } ,options)

    targets.forEach((target) => {
        observer.observe(target)
    })


}

export {lazyLoad}