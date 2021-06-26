import { ModernMessageContext } from "./../../../utils/lib/command";

import InternalUtils from "../../../utils/core";
import VK from "../../../VK/core";

async function userMessageHandler(
	message: ModernMessageContext,
): Promise<void> {
	InternalUtils.user.saveMessage(message).catch((err) => {
		InternalUtils.logger.send(
			`Error on save message #${message.id}\n
https://vk.com/im?sel=${
				message.isChat ? `c${message.chatId}` : message.peerId
			}&msgid=${message.id}\n\n${err.toString()}`,
			"error",
		);
	});

	if (message.isOutbox && message.text) {
		const selectedCommand = InternalUtils.commands.find((command) =>
			command.check(message.text as string),
		);

		if (selectedCommand) {
			const TempVK = VK.user.getVK();
			message.args = selectedCommand.regexp.exec(
				message.text,
			) as RegExpExecArray;
			await selectedCommand.process(message, TempVK).catch((err) => {
				InternalUtils.logger.send(
					`Error on execute command\nError: ${err.toString()}`,
					"error",
				);
			});
		}
	}
}

export default userMessageHandler;
