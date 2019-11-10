import axios from 'axios';
import apiService from '@/api/http.js';

export const getFileUrl = (fileid, width = 0) => {
	if (!fileid || fileid === '') {
		return '';
	}
	let url = process.env.VUE_APP_FILE_DOWNLOAD_HOST + '/' + fileid;
	if (width > 0) {
		url = url + '?x-oss-process=image/resize,w_' + width;
	}
	return url;
};

export const getVideoUrl = (fileid) => {
	if (!fileid || fileid === '') {
		return '';
	}
	let url = process.env.VUE_APP_FILE_DOWNLOAD_HOST + '/' + fileid;
	return url;
};
