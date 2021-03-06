import { GroupCommand } from "../../../utils/lib/commands/core";
import InternalUtls from "../../../utils/core";

new GroupCommand(/(?:^\/whatis)$/i, async function (message) {
	if (message.forwards[0] && message.forwards[0].hasAttachments()) {
		return message.sendMessage({
			disable_mentions: true,
			message: `Прикрепления:
${await InternalUtls.groupCommands.attachmentsToString(message.forwards[0])}`,
		});
	}

	if (message.replyMessage?.hasAttachments()) {
		return message.sendMessage({
			disable_mentions: true,
			message: `Прикрепления:
${await InternalUtls.groupCommands.attachmentsToString(message.replyMessage)}`,
		});
	}

	if (message.hasAttachments()) {
		return message.reply({
			disable_mentions: true,
			message: `Прикрепления:
${await InternalUtls.groupCommands.attachmentsToString(message)}`,
		});
	}

	return message.sendMessage({
		disable_mentions: true,
		message: `Не нашёл прикреплений`,
		dont_parse_links: true,
	});
});
