module.exports = {
    DEFAULT_BOARDS: ['pr'],
    BLOCKED_BOARDS: ['fg','fur','gg','ga','hc','e','fet','sex','fag','d','b','soc','media','r','api','rf','o'],
    ONLY_OP: true,
    fileTypeClasses: {
        ALL_FILES: {
            classNames: ['file']
        }, 
        VIDEO_FILES: {
            classNames: ['video'], 
            listOfFormats: ['webm', 'mp4']
        }, 
        IMAGE_FILES: {
            classNames: ['image', 'img'], 
            listOfFormats: ['png', 'jpg', 'jpeg', 'gif']
        }
    }
}