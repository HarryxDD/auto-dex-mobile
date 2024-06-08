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
	baseURL: `https://f052-116-110-245-125.ngrok-free.app`,
	headers: {
		Accept: 'application/json',
	},
});