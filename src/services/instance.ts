import ky from 'ky';
import axios from "axios";

// const prefixUrl = `${process.env.API_URL ? process.env.API_URL : ''}/`;

export const instance = ky.extend({
	// prefixUrl,
	prefixUrl: `${process.env.API_URL ? process.env.API_URL : ''}/`,
	headers: {
		Accept: 'application/json',
	},
});

export const axiosInstance = axios.create({
	baseURL: `${process.env.API_URL ? process.env.API_URL : ''}/`,
	headers: {
		Accept: 'application/json',
	},
});