import ky from 'ky';
import axios from "axios";

const URL = "https://70ed-113-185-106-243.ngrok-free.app";

export const instance = ky.extend({
	// prefixUrl,
	prefixUrl: `${process.env.API_URL ? process.env.API_URL : ''}/`,
	headers: {
		Accept: 'application/json',
	},
});

export const axiosInstance = axios.create({
	baseURL: URL,
	headers: {
		Accept: 'application/json',
	},
});