import Settings from "./settings";

register("command", () => {
    Settings.openGUI();
}).setName('bridge')


const colorArray = ["&4", "&c", "&6", "&e", "&2", "&a", "&b", "&3", "&1", "&9", "&d", "&5", "&f", "&7", "&8", "&0"];
register("chat", bridgeChat).setCriteria("&r&2Guild > ${*} ${bot} ${*}: &r${player}" + Settings.seperator + " ${msg}&r");
register("chat", bridgeChat).setCriteria("&r&2Guild > ${bot} ${*}: &r${player}" + Settings.seperator + " ${msg}&r");
register("chat", bridgeChat).setCriteria("&r&2Guild > ${*} ${bot}: &r${player}" + Settings.seperator + " ${msg}&r");
register("chat", bridgeChat).setCriteria("&r&2Guild > ${bot}: &r${player}" + Settings.seperator + " ${msg}&r");

function bridgeChat(bot, player, msg, event) {
    if (!Settings.enabled || Settings.botName.toLowerCase() !== ChatLib.removeFormatting(bot).toLowerCase()) return;
    cancel(event);
    let bridgeBold = Settings.prefixBold ? "&l" : "";
    let discordBold = Settings.userBold ? "&l" : "";
    let combined = addLinks(`§2Guild > ${colorArray[Settings.bridgeColor] + bridgeBold + Settings.prefix} ${colorArray[Settings.userColor] + discordBold + player}§r: ${msg}`, event);
    ChatLib.chat(combined);
}

function addLinks(msg, event) { //adds the links and hoverables to the output string
    let newmsg = new TextComponent(msg.replace("&rhttp", "http"));
    new Message(event).getMessageParts().forEach(part => {
        if (part.clickValue) newmsg.setClick(part.clickAction, part.clickValue);
        if (part.hoverValue) newmsg.setHoverValue(part.hoverValue);
    });
    return newmsg;
}