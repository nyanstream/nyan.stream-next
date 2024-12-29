/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ChatUser {
	/** @format uuid */
	id: string;
	nickname: string;
	role: ChatUserRoleEnum;
	status: ChatUserStatusEnum;
}

export interface ChatMessage {
	/** @format uuid */
	id: string;
	/** @format date-time */
	createdAt: string;
	/** @format uuid */
	userId: string | null;
	nickname: string;
	text: string;
	type: ChatMessageTypeEnum;
}

export interface Emoji {
	/** @format uuid */
	id: string;
	code: string;
	/** @format uri */
	imageUrl: string;
	/**
	 * @min 0
	 * @exclusiveMin true
	 */
	imageWidth: number;
	/**
	 * @min 0
	 * @exclusiveMin true
	 */
	imageHeight: number;
	uiHidden: boolean;
	uiColorInverted: boolean;
	uiReversedX: boolean;
}

export type ChatUserRoleEnum = 'Administrator' | 'Moderator' | 'User' | 'Guest';

export type ChatUserStatusEnum = 'active' | 'inactive' | 'afk';

export type ChatMessageTypeEnum = 'User' | 'System';

export interface GetChatUsersListData {
	/** @min 0 */
	connectionsCount: number;
	users: ChatUser[];
}

export type GetCurrentChatUserListData = ChatUser;

export interface GetDiscordOauthUrlListData {
	/** @format uri */
	url: string;
}

export type GetEmojisListData = Emoji[];

export type GetLatestMessagesListData = ChatMessage[];

export interface PostDiscordSignupCreateData {
	bearer: string;
}

export interface PostGuestLoginCreateData {
	bearer: string;
}

export interface PostLoginWithTokenCreateData {
	success: boolean;
}

export interface PostLogoutCreateData {
	success: boolean;
}

export interface PostSendChatMessageCreateData {
	/** @format uuid */
	id: string;
}

export type GetSseData = any;

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
	/** set parameter to `true` for call `securityWorker` for this request */
	secure?: boolean;
	/** request path */
	path: string;
	/** content type of request body */
	type?: ContentType;
	/** query params */
	query?: QueryParamsType;
	/** format of response (i.e. response.json() -> format: "json") */
	format?: ResponseFormat;
	/** request body */
	body?: unknown;
	/** base url */
	baseUrl?: string;
	/** request cancellation token */
	cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
	baseUrl?: string;
	baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
	securityWorker?: (
		securityData: SecurityDataType | null
	) => Promise<RequestParams | void> | RequestParams | void;
	customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
	data: D;
	error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
	Json = 'application/json',
	FormData = 'multipart/form-data',
	UrlEncoded = 'application/x-www-form-urlencoded',
	Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
	public baseUrl: string = '';
	private securityData: SecurityDataType | null = null;
	private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
	private abortControllers = new Map<CancelToken, AbortController>();
	private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

	private baseApiParams: RequestParams = {
		credentials: 'same-origin',
		headers: {},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
	};

	constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
		Object.assign(this, apiConfig);
	}

	public setSecurityData = (data: SecurityDataType | null) => {
		this.securityData = data;
	};

	protected encodeQueryParam(key: string, value: any) {
		const encodedKey = encodeURIComponent(key);
		return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
	}

	protected addQueryParam(query: QueryParamsType, key: string) {
		return this.encodeQueryParam(key, query[key]);
	}

	protected addArrayQueryParam(query: QueryParamsType, key: string) {
		const value = query[key];
		return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
	}

	protected toQueryString(rawQuery?: QueryParamsType): string {
		const query = rawQuery || {};
		const keys = Object.keys(query).filter(key => 'undefined' !== typeof query[key]);
		return keys
			.map(key =>
				Array.isArray(query[key])
					? this.addArrayQueryParam(query, key)
					: this.addQueryParam(query, key)
			)
			.join('&');
	}

	protected addQueryParams(rawQuery?: QueryParamsType): string {
		const queryString = this.toQueryString(rawQuery);
		return queryString ? `?${queryString}` : '';
	}

	private contentFormatters: Record<ContentType, (input: any) => any> = {
		[ContentType.Json]: (input: any) =>
			input !== null && (typeof input === 'object' || typeof input === 'string')
				? JSON.stringify(input)
				: input,
		[ContentType.Text]: (input: any) =>
			input !== null && typeof input !== 'string' ? JSON.stringify(input) : input,
		[ContentType.FormData]: (input: any) =>
			Object.keys(input || {}).reduce((formData, key) => {
				const property = input[key];
				formData.append(
					key,
					property instanceof Blob
						? property
						: typeof property === 'object' && property !== null
							? JSON.stringify(property)
							: `${property}`
				);
				return formData;
			}, new FormData()),
		[ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
	};

	protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
		return {
			...this.baseApiParams,
			...params1,
			...(params2 || {}),
			headers: {
				...(this.baseApiParams.headers || {}),
				...(params1.headers || {}),
				...((params2 && params2.headers) || {}),
			},
		};
	}

	protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
		if (this.abortControllers.has(cancelToken)) {
			const abortController = this.abortControllers.get(cancelToken);
			if (abortController) {
				return abortController.signal;
			}
			return void 0;
		}

		const abortController = new AbortController();
		this.abortControllers.set(cancelToken, abortController);
		return abortController.signal;
	};

	public abortRequest = (cancelToken: CancelToken) => {
		const abortController = this.abortControllers.get(cancelToken);

		if (abortController) {
			abortController.abort();
			this.abortControllers.delete(cancelToken);
		}
	};

	public request = async <T = any, E = any>({
		body,
		secure,
		path,
		type,
		query,
		format,
		baseUrl,
		cancelToken,
		...params
	}: FullRequestParams): Promise<HttpResponse<T, E>> => {
		const secureParams =
			((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
				this.securityWorker &&
				(await this.securityWorker(this.securityData))) ||
			{};
		const requestParams = this.mergeRequestParams(params, secureParams);
		const queryString = query && this.toQueryString(query);
		const payloadFormatter = this.contentFormatters[type || ContentType.Json];
		const responseFormat = format || requestParams.format;

		return this.customFetch(
			`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`,
			{
				...requestParams,
				headers: {
					...(requestParams.headers || {}),
					...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
				},
				signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
				body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
			}
		).then(async response => {
			const r = response.clone() as HttpResponse<T, E>;
			r.data = null as unknown as T;
			r.error = null as unknown as E;

			const data = !responseFormat
				? r
				: await response[responseFormat]()
						.then(data => {
							if (r.ok) {
								r.data = data;
							} else {
								r.error = data;
							}
							return r;
						})
						.catch(e => {
							r.error = e;
							return r;
						});

			if (cancelToken) {
				this.abortControllers.delete(cancelToken);
			}

			if (!response.ok) throw data;
			return data;
		});
	};
}

/**
 * @title Snat API
 * @version 1.0.0
 */
export class SnatApiClient<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
	api = {
		/**
		 * No description
		 *
		 * @name GetChatUsersList
		 * @request GET:/api/get-chat-users
		 * @response `200` `GetChatUsersListData` Default Response
		 */
		getChatUsersList: (params: RequestParams = {}) =>
			this.request<GetChatUsersListData, any>({
				path: `/api/get-chat-users`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @name GetCurrentChatUserList
		 * @request GET:/api/get-current-chat-user
		 * @response `200` `GetCurrentChatUserListData` Default Response
		 */
		getCurrentChatUserList: (params: RequestParams = {}) =>
			this.request<GetCurrentChatUserListData, any>({
				path: `/api/get-current-chat-user`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @name GetDiscordOauthUrlList
		 * @request GET:/api/get-discord-oauth-url
		 * @response `200` `GetDiscordOauthUrlListData` Default Response
		 */
		getDiscordOauthUrlList: (params: RequestParams = {}) =>
			this.request<GetDiscordOauthUrlListData, any>({
				path: `/api/get-discord-oauth-url`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @name GetEmojisList
		 * @request GET:/api/get-emojis
		 * @response `200` `GetEmojisListData` Default Response
		 */
		getEmojisList: (params: RequestParams = {}) =>
			this.request<GetEmojisListData, any>({
				path: `/api/get-emojis`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @name GetLatestMessagesList
		 * @request GET:/api/get-latest-messages
		 * @response `200` `GetLatestMessagesListData` Default Response
		 */
		getLatestMessagesList: (params: RequestParams = {}) =>
			this.request<GetLatestMessagesListData, any>({
				path: `/api/get-latest-messages`,
				method: 'GET',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @name PostDiscordSignupCreate
		 * @request POST:/api/post-discord-signup
		 * @response `200` `PostDiscordSignupCreateData` Default Response
		 */
		postDiscordSignupCreate: (
			data: {
				/** @format uuid */
				oauthSessionId: string;
				/** @format uuid */
				connectionId: string;
				/**
				 * @minLength 1
				 * @maxLength 20
				 */
				nickname: any;
			},
			params: RequestParams = {}
		) =>
			this.request<PostDiscordSignupCreateData, any>({
				path: `/api/post-discord-signup`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @name PostGuestLoginCreate
		 * @request POST:/api/post-guest-login
		 * @response `200` `PostGuestLoginCreateData` Default Response
		 */
		postGuestLoginCreate: (
			data: {
				/** @format uuid */
				connectionId: string;
				/**
				 * @minLength 1
				 * @maxLength 20
				 */
				nickname: any;
			},
			params: RequestParams = {}
		) =>
			this.request<PostGuestLoginCreateData, any>({
				path: `/api/post-guest-login`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @name PostLoginWithTokenCreate
		 * @request POST:/api/post-login-with-token
		 * @response `200` `PostLoginWithTokenCreateData` Default Response
		 */
		postLoginWithTokenCreate: (
			data: {
				/** @format uuid */
				connectionId: string;
			},
			params: RequestParams = {}
		) =>
			this.request<PostLoginWithTokenCreateData, any>({
				path: `/api/post-login-with-token`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @name PostLogoutCreate
		 * @request POST:/api/post-logout
		 * @response `200` `PostLogoutCreateData` Default Response
		 */
		postLogoutCreate: (params: RequestParams = {}) =>
			this.request<PostLogoutCreateData, any>({
				path: `/api/post-logout`,
				method: 'POST',
				format: 'json',
				...params,
			}),

		/**
		 * No description
		 *
		 * @name PostSendChatMessageCreate
		 * @request POST:/api/post-send-chat-message
		 * @response `200` `PostSendChatMessageCreateData` Default Response
		 */
		postSendChatMessageCreate: (
			data: {
				/**
				 * @minLength 1
				 * @maxLength 500
				 * @pattern ^[^\x7F\u202A-\u202E\u202D\u2066-\u2069\u200E\u200F\u061C]*$
				 */
				text: string;
			},
			params: RequestParams = {}
		) =>
			this.request<PostSendChatMessageCreateData, any>({
				path: `/api/post-send-chat-message`,
				method: 'POST',
				body: data,
				type: ContentType.Json,
				format: 'json',
				...params,
			}),
	};
	sse = {
		/**
		 * No description
		 *
		 * @tags sse
		 * @name GetSse
		 * @request GET:/sse
		 * @response `200` `GetSseData` Default Response
		 */
		getSse: (params: RequestParams = {}) =>
			this.request<GetSseData, any>({
				path: `/sse`,
				method: 'GET',
				...params,
			}),
	};
}
