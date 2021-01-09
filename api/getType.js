function getType(mimeType){
    switch(mimeType) {
        case 'video/x-msvideo':  return 'avi';
        case 'video/x-ms-wmv': return 'wmv';
        case 'video/x-flv': return 'flv';
        case 'image/x-ico': return 'ico';
        case 'image/x-psd': return 'psd';
        case 'text/csv': return 'csv';
        case 'text/html': return 'html';
        case 'text/plain': return 'txt';
        case 'text/xml': return 'xml';
        case 'video/mp4': return 'mp4';
        case 'video/mpeg': return 'mpg';
        case 'application/x-shockwave-flash': return 'swf';
        case 'audio/mpeg': return 'mp3';
        case 'audio/x-ogg': return 'ogg';
        case 'audio/x-wav': return 'wav';
        case 'image/jpeg': return 'jpg';
        case 'image/png': return 'png';
        case 'image/svg+xml': return 'svg';
        case 'application/x-mspublisher': return 'pub';
        case 'application/vnd.visio': return 'vsd';
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return 'docx';
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': return 'xlsx';
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': return 'pptx';
        case 'application/msword': return 'doc';
        case 'application/pdf': return 'pdf';
        case 'application/postscript': return 'ps';
        case 'application/rtf': return 'rtf';
        case 'application/vnd.ms-access': return 'mdb';
        case 'application/vnd.ms-excel': return 'xls';
        case 'application/vnd.ms-powerpoint': return 'ppt';
        case 'application/vnd.oasis.opendocument.text': return 'ott';
    }
}

module.exports = { getType }
