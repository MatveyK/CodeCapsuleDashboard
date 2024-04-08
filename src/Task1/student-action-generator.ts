import { ActionType, Student, StudentAction } from "./student-action";
import { NameList } from "./names-list";

export default function generateStudentActions(studentNumber: number, actionsPerStudent: number): StudentAction[] {
	const result = [];
	for(let i = 0; i < studentNumber; i++) {
		const student = generateStudent(i);

		for(let j = 0; j < actionsPerStudent; j++) {
			result.push(generateRandomAction(student, i.toString() + j.toString()));
		}
	}

	console.log(result)

	return result;
}

const generateStudent = (id: number): Student => {
	return {
		id: id.toString(),
		name: NameList[Math.floor(Math.random() * NameList.length)]
	};
}

const generateRandomAction = (student: Student, idNumber: string): StudentAction => {

	return {
		id: idNumber,
		type: getRandomActionEnum(),
		createdAt: getRandomDateWithinThreeHours().toISOString(),
		member: student,
		data: {}
	}
}

const getRandomActionEnum = (): ActionType => {
	const index = Math.floor(Math.random() * Object.keys(ActionType).length);
	const value = Object.values(ActionType)[index];

	return ActionType[value];
}

const getRandomDateWithinThreeHours = (): Date => {
	const hour = Math.floor(Math.random() * 3);
	const minute = Math.floor(Math.random() * 60);
	const date = new Date();
	
	date.setHours(hour);
	date.setMinutes(minute);

	return date;
}