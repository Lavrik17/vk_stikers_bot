/* eslint-disable @typescript-eslint/no-non-null-assertion */
import moment from "moment";
import { GroupUserContext, getRandomId } from "vk-io";

import VK from "../../../VK/core";

const reasons = [
	`другое`,
	`спам`,
	`оскорбление участников`,
	`нецензурные выражения`,
	`сообщения не по теме`,
];

async function userBlock(event: GroupUserContext): Promise<void> {
	const usersData = await VK.fakes.getUserFakeAPI().users.get({
		user_ids: [event.adminId!.toString(), event.userId.toString()],
		fields: ["sex", "first_name_gen", "last_name_gen"],
	});
	VK.group.getVK().api.messages.send({
		message: `@id${usersData[0].id} (${usersData[0].first_name} ${
			usersData[0].last_name
		}) ${usersData[0].sex === 1 ? "заблокировала" : "заблокировал"} @id${
			usersData[1].id
		} (${usersData[1].first_name_gen} ${
			usersData[1].last_name_gen
		}) по причине ${reasons[event.reasonId!]}${
			event.comment ? ` с комментарием ${event.comment}` : ""
		} ${
			event.unblockAt
				? ` до ${moment(event.unblockAt * 1000).format("DD.MM.YYYY, HH:mm:ss")}`
				: "навсегда"
		} `,
		disable_mentions: true,
		peer_id: 2e9 + 6,
		random_id: getRandomId(),
	});
}

export default userBlock;
