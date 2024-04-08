export enum ActionType {
	RUN = 'RUN',
	SAVE = 'SAVE',
	CLEAR = 'CLEAR',
	GENERATE_FIGURE = 'GENERATE_FIGURE',
	ANSWER = 'ANSWER'
}

export interface Student {
	id: string,
	name: string
}

export interface StudentAction {
	id: string;
	type: ActionType;
	createdAt: string;
	member: Student,
	data: {
		code?: string,
		figure?: string,
		userAnswer?: string
	}
}