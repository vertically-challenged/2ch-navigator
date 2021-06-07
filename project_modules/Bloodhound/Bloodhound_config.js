module.exports = {
    DEFAULT_BOARDS: ['b'],
    fileTypeClasses: {
        ALL_FILES: {
            classNames: ['file']
        }, 
        VIDEO_FILES: {
            classNames: ['video'], 
            listOfFormats: [
                'webm',
                'mp4'
            ]
        }, 
        IMAGE_FILES: {
            classNames: ['image', 'img'], 
            listOfFormats: [
                'png',
                'jpg', 
                'jpeg', 
                'gif'
            ]
        }
    }
}